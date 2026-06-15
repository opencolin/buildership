"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server/db";
import {
  events,
  teams,
  teamMemberships,
  teamInvitations,
  users,
} from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";

export type AddTeammateState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string };

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email.");

/**
 * Add a teammate to the signed-in leader's team. If the email already belongs
 * to a registered builder they're added straight away; otherwise we record a
 * pending invitation they pick up when they sign in with that email.
 */
export async function addTeammate(
  _prev: AddTeammateState,
  formData: FormData,
): Promise<AddTeammateState> {
  const session = await safeAuth();
  const uid = session?.user?.id;
  if (!uid) return { status: "error", message: "Not signed in." };

  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Enter a valid email." };
  }
  const email = parsed.data;

  const [event] = await db
    .select({ id: events.id })
    .from(events)
    .where(eq(events.slug, "buildership"))
    .limit(1);
  if (!event) return { status: "error", message: "Event not found." };

  const [team] = await db
    .select({ id: teams.id })
    .from(teams)
    .where(and(eq(teams.eventId, event.id), eq(teams.leaderId, uid)))
    .limit(1);
  if (!team) {
    return { status: "error", message: "You don't lead a team yet — save your project first." };
  }

  try {
    const [u] = await db
      .select({ id: users.id, name: users.name })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (u) {
      if (u.id === uid) {
        return { status: "error", message: "That's you — you already lead this team." };
      }
      await db
        .insert(teamMemberships)
        .values({ teamId: team.id, userId: u.id, role: "member" })
        .onConflictDoNothing();
      revalidatePath("/builders/teams");
      return { status: "ok", message: `Added ${u.name ?? email} to your team.` };
    }

    // No account yet → record (or keep) a pending invitation.
    const [existing] = await db
      .select({ id: teamInvitations.id })
      .from(teamInvitations)
      .where(and(eq(teamInvitations.teamId, team.id), eq(teamInvitations.email, email)))
      .limit(1);
    if (!existing) {
      await db.insert(teamInvitations).values({
        teamId: team.id,
        email,
        invitedById: uid,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    }
    revalidatePath("/builders/teams");
    return {
      status: "ok",
      message: `Invited ${email} — they'll join when they sign in with that email.`,
    };
  } catch (err) {
    console.error("[addTeammate] failed", err);
    return { status: "error", message: "Couldn't add them right now. Try again." };
  }
}
