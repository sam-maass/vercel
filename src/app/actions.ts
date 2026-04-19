"use server";

import { updateTag } from "next/cache";
import { addPreorder } from "@/lib/preorders";

export type PreorderState = {
  ok: boolean;
  message: string;
};

export async function submitPreorder(
  _prev: PreorderState,
  formData: FormData,
): Promise<PreorderState> {
  const email = String(formData.get("email") ?? "").trim();
  const kgRaw = String(formData.get("kg") ?? "").trim();
  const kg = Number.parseInt(kgRaw, 10);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!Number.isFinite(kg) || kg < 1 || kg > 100) {
    return { ok: false, message: "Quantity must be between 1 and 100 kg." };
  }

  await addPreorder({ email, kg, createdAt: new Date().toISOString() });
  updateTag("preorders");
  return {
    ok: true,
    message: `Thanks! Reserved ${kg} kg of Vercel Roast for ${email}.`,
  };
}
