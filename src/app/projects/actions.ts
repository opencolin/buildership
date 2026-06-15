"use server";

import { revalidatePath } from "next/cache";
import { and, eq, isNotNull, ne, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server/db";
import {
  judges,
  judgeScores,
  submissions,
  projects,
  eventRegistrations,
} from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";

const schema = z.object({
  projectId: z.string().uuid(),
  overall: z.number().int().min(1).max(5),
  notes: z.string().max(4000).optional().nullable(),
});

export type ScoreResult =
  | { ok: true; overall: number; avg: number | null; count: number }
  | { ok: false; error: string };

/**
 * A judge rates a project 1–5 stars (+ optional notes). Scores live on the existing
 * submission/judge_scores tables: we lazily create one submission per project
 * (judges grade projects, not GitHub snapshots, here) and upsert one score row
 * per (submission, judge). After saving we recompute the project's average and
 * its rank within the event so /judges and /admin stay current.
 */
export async function scoreProject(input: {
  projectId: string;
  overall: number;
  notes?: string | null;
}): Promise<ScoreResult> {
  const session = await safeAuth();
  if (!session?.user?.id) return { ok: false, error: "Not signed in." };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid score." };
  const { projectId, overall, notes } = parsed.data;
  const uid = session.user.id;

  // Open judging: anyone signed in can score. Give them a judge row on first save.
  let judge = (
    await db.select().from(judges).where(eq(judges.userId, uid)).limit(1)
  )[0];
  if (!judge) {
    [judge] = await db
      .insert(judges)
      .values({ userId: uid, kind: "sponsor", active: true })
      .returning();
  }

  try {
    const result = await db.transaction(async (tx) => {
      const proj = (
        await tx
          .select({ eventId: projects.eventId })
          .from(projects)
          .where(eq(projects.id, projectId))
          .limit(1)
      )[0];
      if (!proj) throw new Error("project not found");

      let sub = (
        await tx
          .select({ id: submissions.id })
          .from(submissions)
          .where(eq(submissions.projectId, projectId))
          .limit(1)
      )[0];
      if (!sub) {
        [sub] = await tx
          .insert(submissions)
          .values({ projectId, status: "scored" })
          .returning({ id: submissions.id });
      }

      const scoresJson = { overall };
      await tx
        .insert(judgeScores)
        .values({
          submissionId: sub.id,
          judgeId: judge!.id,
          judgeKind: judge!.kind,
          scoresJson,
          weighted: overall.toFixed(2),
          notes: notes ?? null,
        })
        .onConflictDoUpdate({
          target: [judgeScores.submissionId, judgeScores.judgeId],
          set: {
            judgeKind: judge!.kind,
            scoresJson,
            weighted: overall.toFixed(2),
            notes: notes ?? null,
          },
        });

      // Only count votes from Luma registrants (registration has a ticket-type
      // `role`); accounts created just to vote get a null-role auto-RSVP and are
      // excluded — matching the aggregate on /projects.
      const [agg] = await tx
        .select({
          avg: sql<string | null>`avg(${judgeScores.weighted})::numeric(5,2)::text`,
          cnt: sql<number>`count(*)::int`,
        })
        .from(judgeScores)
        .innerJoin(submissions, eq(submissions.id, judgeScores.submissionId))
        .innerJoin(judges, eq(judges.id, judgeScores.judgeId))
        .innerJoin(
          eventRegistrations,
          and(
            eq(eventRegistrations.userId, judges.userId),
            eq(eventRegistrations.eventId, proj.eventId),
          ),
        )
        .where(
          and(
            eq(submissions.projectId, projectId),
            isNotNull(eventRegistrations.role),
            ne(eventRegistrations.role, ""),
          ),
        );

      const avg = agg?.avg != null ? Number(agg.avg) : null;
      await tx
        .update(projects)
        .set({
          humanScore: avg != null ? avg.toFixed(2) : null,
          compositeScore: avg != null ? avg.toFixed(2) : null,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, projectId));

      await tx.execute(sql`
        WITH ranked AS (
          SELECT id, RANK() OVER (
            ORDER BY composite_score DESC NULLS LAST, created_at ASC
          ) AS rnk
          FROM projects WHERE event_id = ${proj.eventId}
        )
        UPDATE projects p SET composite_rank = ranked.rnk
        FROM ranked WHERE p.id = ranked.id
      `);

      return { avg, count: agg?.cnt ?? 1 };
    });

    revalidatePath("/projects");
    return { ok: true, overall, avg: result.avg, count: result.count };
  } catch (err) {
    console.error("[scoreProject] failed", err);
    return { ok: false, error: "Couldn't save your score. Try again." };
  }
}
