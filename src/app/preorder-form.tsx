"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitPreorder, type PreorderState } from "./actions";

const initialState: PreorderState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 rounded-full bg-amber-600 px-6 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Reserving..." : "Reserve my beans"}
    </button>
  );
}

export function PreorderForm() {
  const [state, formAction] = useActionState(submitPreorder, initialState);

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-stone-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="h-12 rounded-lg border border-stone-700 bg-stone-900/80 px-4 text-sm text-stone-100 placeholder:text-stone-500 focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="kg" className="text-sm font-medium text-stone-200">
          How many 1&nbsp;kg bags?
        </label>
        <input
          id="kg"
          name="kg"
          type="number"
          min={1}
          max={100}
          defaultValue={1}
          required
          className="h-12 w-32 rounded-lg border border-stone-700 bg-stone-900/80 px-4 text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
        />
      </div>
      <SubmitButton />
      {state.message && (
        <p
          role="status"
          className={`text-sm ${state.ok ? "text-emerald-400" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
