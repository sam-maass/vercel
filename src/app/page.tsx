import { readPreorders, totalKg } from "@/lib/preorders";
import { PreorderForm } from "./preorder-form";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [total, orders] = await Promise.all([totalKg(), readPreorders()]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950 text-stone-100">
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20 sm:py-28">
        <header className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amber-300">
            Coming soon
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Vercel Roast
            <span className="block text-amber-400">Deployed in your cup.</span>
          </h1>
          <p className="max-w-xl text-lg text-stone-300">
            A small-batch specialty roast from our soon-to-open coffee shop.
            Reserve your bags now — we&rsquo;ll ship on launch day.
          </p>
        </header>

        <section className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-8 shadow-xl backdrop-blur">
            <h2 className="mb-6 text-xl font-semibold">Preorder your bags</h2>
            <PreorderForm />
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-amber-300">
                Reserved so far
              </p>
              <p className="mt-3 text-6xl font-bold text-amber-200">
                {total}
                <span className="ml-2 text-2xl font-medium text-amber-300/80">
                  kg
                </span>
              </p>
              <p className="mt-2 text-sm text-stone-400">
                across {orders.length} preorder{orders.length === 1 ? "" : "s"}
              </p>
            </div>
            <p className="mt-10 text-sm text-stone-400">
              Fresh roasted, ethically sourced, and delivered in compostable
              bags. One bag = 1&nbsp;kg of whole beans.
            </p>
          </div>
        </section>

        <footer className="border-t border-stone-800 pt-8 text-xs text-stone-500">
          PoC &middot; Not a real coffee shop &middot; No payment taken
        </footer>
      </main>
    </div>
  );
}
