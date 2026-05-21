# Roast

A proof-of-concept coffee-roaster launch site built on **Next.js 16**. Roast is a
fictional small-batch specialty coffee brand — visitors can browse the brand
story and reserve bags of the launch roast before the shop opens.

The project exists to exercise modern Next.js and Vercel platform features in a
small, real-feeling app: Server Actions, the `use cache` directive with Partial
Prerendering, edge geolocation, and cookie-based A/B testing.

> PoC only — not a real coffee shop, no payment is taken.

## Features

- **Preorder flow** — a Server Action validates the submission and persists it
  to Upstash Redis.
- **Live preorder counter** — total reserved kilograms, cached remotely and
  invalidated on each new order via `cacheTag` / `updateTag`.
- **Edge geolocation** — the hero section adapts its imagery and copy to the
  visitor's continent (EU / NA / AS) using the `x-vercel-ip-continent` header.
- **A/B testing** — middleware assigns each visitor to a CTA-style bucket (A/B)
  via a cookie; the bucket drives the call-to-action button appearance.
- **Partial Prerendering** — static shell streams instantly while cached
  dynamic segments (`use cache: remote`) fill in.
- **Analytics** — Vercel Analytics and Speed Insights are wired into the root
  layout.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components / PPR)
- React 19
- TypeScript
- Tailwind CSS 4
- [Upstash Redis](https://upstash.com) for preorder storage
- [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights)

## Getting started

Install dependencies:

```bash
npm install
```

Create a `.env.local` with your Upstash Redis credentials:

```bash
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Project structure

```
src/
  app/
    actions.ts          Server Action for preorder submission
    page.tsx            Landing page + cached preorder counter
    layout.tsx          Root layout, fonts, analytics
    preorder-form.tsx   Client form using useActionState
    regional-hero.tsx   Geolocation- and A/B-aware hero section
  lib/
    preorders.ts        Upstash Redis data access
  middleware.ts         A/B bucket cookie assignment
```

## Deployment

Built to run on [Vercel](https://vercel.com). Configure the Upstash Redis
environment variables in the project settings and deploy — edge geolocation
headers and remote caching work out of the box.
