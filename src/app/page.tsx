import Image from "next/image";
import { readPreorders, totalKg } from "@/lib/preorders";
import { PreorderForm } from "./preorder-form";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [total, orders] = await Promise.all([totalKg(), readPreorders()]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <span className="font-serif text-2xl font-bold text-primary">Vercel Roast</span>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#craft" className="transition hover:text-primary">Our Craft</a>
          <a href="#preorder" className="transition hover:text-primary">Preorder</a>
          <a href="#about" className="transition hover:text-primary">About</a>
        </div>
      </nav>

      {/* Hero Section - Full Width */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        {/* Full-width background image */}
        <Image
          src="/images/coffee-hero.jpg"
          alt="Luxurious artisanal coffee moment with steam rising"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div className="flex max-w-2xl flex-col gap-6">
              <span className="w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
                Coming Soon
              </span>
              <h1 className="font-serif text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
                <span className="text-balance">Savor the</span>
                <span className="block text-secondary">Moment</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-white/80 md:text-xl">
                Fresh, luxurious, small-batch coffee that transforms your morning into a ritual. Close your eyes. Breathe deep. This is your moment.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href="#preorder"
                  className="rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground shadow-lg transition hover:scale-105 hover:shadow-xl"
                >
                  Reserve Your Beans
                </a>
                <a
                  href="#craft"
                  className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Our Craft
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth gradient transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </section>

      {/* Craft Section */}
      <section id="craft" className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <h2 className="mb-4 text-center font-serif text-4xl font-bold md:text-5xl">
            The Art of <span className="text-primary">Coffee Craft</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
            Every bag tells a story. From farm to cup, we honor the traditions that make great coffee while adding our own sunny twist.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-card p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-2xl">
                <svg className="h-7 w-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Ethically Sourced</h3>
              <p className="text-muted-foreground">
                Direct relationships with farmers in Colombia, Ethiopia, and Guatemala. Fair prices, sustainable practices.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl">
                <svg className="h-7 w-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Small-Batch Roasted</h3>
              <p className="text-muted-foreground">
                Roasted weekly in small batches to ensure peak freshness. Each roast profile is carefully developed over months.
              </p>
            </div>
            <div className="rounded-2xl bg-card p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl">
                <svg className="h-7 w-7 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold">Roasted with Love</h3>
              <p className="text-muted-foreground">
                Every bag is packed by hand in compostable packaging. We treat every order like it&apos;s going to a friend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
            A Cup Full of <span className="text-accent">Sunshine</span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            Born from a love of great coffee and good company, Vercel Roast is our dream come true. We believe coffee should be an experience that brightens your day, connects you with others, and supports the communities that grow these incredible beans.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Our beans travel from high-altitude farms to our roastery, where we coax out flavors of chocolate, citrus, and caramel. Whether you take it black or loaded with oat milk, we want every sip to feel like a warm hug.
          </p>
        </div>
      </section>

      {/* Preorder Section */}
      <section id="preorder" className="bg-muted py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl border-2 border-border bg-card p-8 shadow-lg md:p-10">
              <h2 className="mb-2 font-serif text-3xl font-bold">Reserve Your Bags</h2>
              <p className="mb-8 text-muted-foreground">
                Be the first to taste our launch roast. No payment now, just save your spot.
              </p>
              <PreorderForm />
            </div>

            <div className="flex flex-col justify-between rounded-3xl border-2 border-primary/30 bg-primary/5 p-8 md:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Reserved So Far
                </p>
                <p className="mt-4 font-serif text-7xl font-black text-primary">
                  {total}
                  <span className="ml-2 text-3xl font-bold text-primary/70">kg</span>
                </p>
                <p className="mt-2 text-muted-foreground">
                  across {orders.length} preorder{orders.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="mt-10 flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Fresh roasted weekly
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Ethically sourced beans
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Compostable packaging
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center md:px-12">
          <span className="font-serif text-2xl font-bold text-primary">Vercel Roast</span>
          <p className="text-sm text-muted-foreground">
            PoC &middot; Not a real coffee shop &middot; No payment taken
          </p>
          <p className="text-xs text-muted-foreground/60">
            Made with love and caffeine
          </p>
        </div>
      </footer>
    </div>
  );
}
