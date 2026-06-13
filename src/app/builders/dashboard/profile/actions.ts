"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/server/db";
import { users, teams } from "@/server/db/schema";
import { safeAuth } from "@/server/lib/safe-auth";

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .transform((v) => (v ? v : null))
  .refine(
    (v) => v === null || /^https?:\/\//i.test(v),
    "Must be a URL starting with http:// or https://",
  );

const optionalText = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((v) => (v ? v : null));

const schema = z.object({
  phone: optionalText,
  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  discordId: optionalText,
  twitterUrl: optionalUrl,
});

export type ProfileSaveState =
  | { status: "idle" }
  | { status: "ok"; savedAt: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export async function saveProfile(
  _prev: ProfileSaveState,
  formData: FormData,
): Promise<ProfileSaveState> {
  const session = await safeAuth();
  if (!session?.user?.id) {
    return { status: "error", message: "Not signed in." };
  }

  const parsed = schema.safeParse({
    phone: formData.get("phone"),
    githubUrl: formData.get("github"),
    linkedinUrl: formData.get("linkedin"),
    discordId: formData.get("discord"),
    twitterUrl: formData.get("twitter"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Some fields look off — check the highlighted ones.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await db
      .update(users)
      .set({
        phone: parsed.data.phone,
        githubUrl: parsed.data.githubUrl,
        linkedinUrl: parsed.data.linkedinUrl,
        discordId: parsed.data.discordId,
        twitterUrl: parsed.data.twitterUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));
  } catch (err) {
    console.error("[saveProfile] db update failed", err);
    return { status: "error", message: "Couldn't save right now. Try again in a moment." };
  }

  revalidatePath("/builders/dashboard/profile");
  return { status: "ok", savedAt: new Date().toISOString() };
}

/**
 * Toggle the user's consent to share contact info with sponsors/partners.
 * Returns the value that was persisted so the client can reconcile.
 */
export async function setShareContact(
  consent: boolean,
): Promise<{ ok: boolean; shareContact: boolean }> {
  const session = await safeAuth();
  if (!session?.user?.id) return { ok: false, shareContact: false };

  try {
    await db
      .update(users)
      .set({ shareContact: consent, updatedAt: new Date() })
      .where(eq(users.id, session.user.id));
  } catch (err) {
    console.error("[setShareContact] db update failed", err);
    return { ok: false, shareContact: !consent };
  }

  revalidatePath("/builders/dashboard/profile");
  return { ok: true, shareContact: consent };
}

/**
 * Right to erasure: permanently delete the signed-in user and everything tied
 * to them. Teams they lead are removed first (teams.leader_id is ON DELETE
 * RESTRICT), which cascades to their projects, submissions, and judge scores;
 * deleting the user then cascades accounts, sessions, registrations, team
 * memberships, and judge rows. After this the caller must sign out — the
 * session row no longer exists.
 */
export async function deleteMyData(): Promise<{ ok: boolean; message?: string }> {
  const session = await safeAuth();
  const uid = session?.user?.id;
  if (!uid) return { ok: false, message: "Not signed in." };

  try {
    await db.transaction(async (tx) => {
      await tx.delete(teams).where(eq(teams.leaderId, uid));
      await tx.delete(users).where(eq(users.id, uid));
    });
  } catch (err) {
    console.error("[deleteMyData] delete failed", err);
    return { ok: false, message: "Couldn't delete your data right now. Try again in a moment." };
  }

  return { ok: true };
}
