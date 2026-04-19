import { cookies, headers } from "next/headers";
import Image from "next/image";
import { cacheLife, cacheTag } from "next/cache";

type Region = "EU" | "NA" | "AS";
type Bucket = "A" | "B";

const CTA_STYLES: Record<Bucket, string> = {
  A: "bg-secondary text-secondary-foreground",
  B: "bg-emerald-500 text-white",
};

const HERO_CONTENT: Record<
  Region,
  {
    image: string;
    alt: string;
    badge: string;
    headlineTop: string;
    headlineBottom: string;
    subhead: string;
    ctaPrimary: string;
  }
> = {
  EU: {
    image: "/images/coffee-hero-eu.jpg",
    alt: "Espresso cup on a marble bistro table in morning light",
    badge: "Café Culture",
    headlineTop: "Slow down.",
    headlineBottom: "Sip deeper.",
    subhead:
      "Small-batch roasts in the European tradition — where coffee is a pause, not a fuel-up.",
    ctaPrimary: "Reserve Your Roast",
  },
  NA: {
    image: "/images/coffee-hero-na.jpg",
    alt: "Oversized to-go cup with steam against a city skyline",
    badge: "On the Go, Done Right",
    headlineTop: "Big cup energy.",
    headlineBottom: "Small-batch soul.",
    subhead:
      "From our roastery to your commute. Ethically sourced, stupidly good, ready when you are.",
    ctaPrimary: "Preorder Your Bags",
  },
  AS: {
    image: "/images/coffee-hero-as.jpg",
    alt: "Minimalist pour-over setup on dark wood with neon reflection",
    badge: "Craft & Calm",
    headlineTop: "Precision in",
    headlineBottom: "every pour.",
    subhead:
      "Single-origin beans, roasted in micro-lots. For those who taste the difference.",
    ctaPrimary: "予約する — Reserve Now",
  },
};

function toRegion(continent: string | null | undefined): Region {
  if (continent === "EU") return "EU";
  if (continent === "AS" || continent === "OC") return "AS";
  return "NA";
}

async function RegionalHeroContent({
  region,
  bucket,
}: {
  region: Region;
  bucket: Bucket;
}) {
  "use cache: remote";
  cacheTag("hero");
  cacheLife("days");
  const c = HERO_CONTENT[region];
  const ctaStyle = CTA_STYLES[bucket];
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      <Image
        src={c.image}
        alt={c.alt}
        fill
        sizes="100vw"
        quality={65}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="flex max-w-2xl flex-col gap-6">
            <span className="w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
              {c.badge}
            </span>
            <h1 className="font-serif text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
              <span className="text-balance">{c.headlineTop}</span>
              <span className="block text-secondary">{c.headlineBottom}</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-white/80 md:text-xl">
              {c.subhead}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href="#preorder"
                data-ab-cta={bucket}
                className={`rounded-full px-8 py-4 text-lg font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl ${ctaStyle}`}
              >
                {c.ctaPrimary}
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
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-muted via-muted/70 to-transparent" />
    </section>
  );
}

export async function RegionalHero() {
  const [h, c] = await Promise.all([headers(), cookies()]);
  const region = toRegion(h.get("x-vercel-ip-continent"));
  const bucket: Bucket = c.get("ab-cta")?.value === "B" ? "B" : "A";
  return <RegionalHeroContent region={region} bucket={bucket} />;
}

export function HeroFallback() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-stone-900">
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-muted via-muted/70 to-transparent" />
    </section>
  );
}
