"use client";

import { useState, useTransition } from "react";
import { signOut } from "next-auth/react";
import { setShareContact, deleteMyData } from "./actions";

/**
 * Opt-in switch: consent to sharing contact info with sponsors/partners.
 * Persists immediately on toggle.
 */
export function ConsentToggle({ defaultConsent }: { defaultConsent: boolean }) {
  const [on, setOn] = useState(defaultConsent);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);

  function toggle() {
    const next = !on;
    setOn(next); // optimistic
    setError(false);
    startTransition(async () => {
      const res = await setShareContact(next);
      if (!res.ok) {
        setOn(!next); // revert
        setError(true);
      }
    });
  }

  return (
    <div className="card flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-ink-900 dark:text-ink-50">
          Consent to sharing contact information
        </p>
        <p className="text-sm text-ink-500 dark:text-ink-400">
          Let organizers share your email, phone, and links with event sponsors
          and partners.{" "}
          {error ? (
            <span className="text-red-600 dark:text-red-400">
              Couldn&apos;t save — try again.
            </span>
          ) : (
            <span className="text-ink-400 dark:text-ink-500">
              {on ? "Sharing is on." : "Sharing is off."}
            </span>
          )}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Consent to sharing contact information"
        onClick={toggle}
        disabled={pending}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${
          on ? "bg-navy-700 dark:bg-lime" : "bg-ink-300 dark:bg-ink-700"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform dark:bg-ink-900 ${
            on ? "translate-x-[1.375rem]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

/**
 * Right to erasure: permanently delete the user and everything tied to them,
 * then sign out. Guarded by a type-to-confirm step.
 */
export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const armed = confirm.trim().toUpperCase() === "DELETE";

  function handleDelete() {
    if (!armed) return;
    setError(null);
    startTransition(async () => {
      const res = await deleteMyData();
      if (res.ok) {
        await signOut({ callbackUrl: "/?deleted=1" });
      } else {
        setError(res.message ?? "Something went wrong.");
      }
    });
  }

  return (
    <div className="card border-red-200 bg-red-50/40 dark:border-red-500/30 dark:bg-red-500/5">
      <p className="font-semibold text-red-700 dark:text-red-400">
        Delete all my information
      </p>
      <p className="mt-1 max-w-prose text-sm text-ink-600 dark:text-ink-300">
        Permanently erase your profile, team, and project submission from the
        database. This cannot be undone, and you&apos;ll be signed out.
      </p>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          Delete all my information
        </button>
      ) : (
        <div className="mt-4 max-w-md">
          <label className="block text-sm font-medium text-ink-700 dark:text-ink-200">
            Type <span className="font-mono font-bold">DELETE</span> to confirm
          </label>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoFocus
            placeholder="DELETE"
            className="input mt-1"
            aria-label="Type DELETE to confirm"
          />
          {error ? (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          ) : null}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={!armed || pending}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Deleting…" : "Permanently delete"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setConfirm("");
                setError(null);
              }}
              disabled={pending}
              className="btn-ghost text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
