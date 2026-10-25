# Video Editor Portfolio

Mobile-first portfolio for showcasing edits and rates. Built with Next.js, Tailwind CSS and Motion.

## Edit the content

Everything personal lives in `src/content/`:

| File | What it controls |
| --- | --- |
| `site.ts` | Name, bio, tools, experience, strip words, WhatsApp / Instagram / email |
| `videos.ts` | Reels (portrait 9:16) and long-form cuts (landscape 16:9) — add `src` and `poster` to replace a placeholder |
| `pricing.ts` | Rate cards and "What's included" |

Images live in `public/` (`avatar-*.png`, `logos/`, `textures/`).

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Pushing to `main` deploys to production on Vercel.
