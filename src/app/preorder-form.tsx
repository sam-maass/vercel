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
      className="h-14 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition hover:scale-105 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Reserving..." : "Reserve My Beans"}
    </button>
  );
}

export function PreorderForm() {
  const [state, formAction] = useActionState(submitPreorder, initialState);

  return (
    <form action={formAction} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="hello@example.com"
          className="h-14 rounded-xl border-2 border-border bg-background px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="kg" className="text-sm font-semibold text-foreground">
          How many 1 kg bags?
        </label>
        <input
          id="kg"
          name="kg"
          type="number"
          min={1}
          max={100}
          defaultValue={1}
          required
          className="h-14 w-32 rounded-xl border-2 border-border bg-background px-4 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <SubmitButton />
      {state.message && (
        <p
          role="status"
          className={`text-sm font-medium ${state.ok ? "text-accent" : "text-primary"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
