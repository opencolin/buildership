"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addTeammate, type AddTeammateState } from "./actions";

const initial: AddTeammateState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-lime text-sm disabled:opacity-60">
      {pending ? "Adding…" : "Add teammate"}
    </button>
  );
}

export function AddTeammateForm() {
  const [state, formAction] = useFormState(addTeammate, initial);
  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input
        name="email"
        type="email"
        required
        placeholder="teammate@email.com"
        className="input sm:max-w-xs"
        aria-label="Teammate email"
      />
      <SubmitButton />
      {state.status !== "idle" ? (
        <p
          className={`text-sm ${
            state.status === "ok"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
