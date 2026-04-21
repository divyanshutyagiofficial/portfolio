# divyanshutyagiofficial.com — Portfolio

Personal portfolio for **Divyanshu Tyagi** — Full-Stack Technical Lead.

Built as a terminal/IDE-themed single-page experience. Live at
[https://www.divyanshutyagiofficial.com](https://www.divyanshutyagiofficial.com).

## Stack

- **Next.js 15** with the App Router and `output: 'export'` for static hosting
- **React 19** + TypeScript 5
- **Tailwind CSS 4** (with the new `@tailwindcss/postcss` engine)
- **framer-motion** for section reveals & micro-interactions
- **lucide-react** for icons

Hosted on **GitHub Pages**, custom domain via `public/CNAME`.

## Sections

- **Hero** — animated terminal prompt cycling through commands
- **About** — terminal-styled bio block
- **Skills** — categorised "filesystem" view of skills
- **Projects** — `git log`-styled feed merging three sources:
  - Hardcoded production work (`src/data/projects-personal.ts`)
  - LinkedIn highlights (`src/data/projects-linkedin.ts`)
  - **Live** GitHub repos via the public REST API
- **GitHub** — live contributions heatmap (identical to github.com), language
  bars, recent repos, current/longest streak stats
- **Resume** — three downloadable variants (JS, .NET, Java) backed by JSON
  files in `public/resumes/`. Each variant has a live in-app viewer at
  `/resume?variant=<id>` with a one-click "print → PDF" flow
- **Contact** — JSON-styled contact block

Plus:

- `⌘K` / `Ctrl+K` command palette for instant nav
- macOS-style boot sequence on first visit (gated by `sessionStorage`)
- VS Code-style status bar

## Local dev

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build        # writes static export to ./out
```

## Deployment

Pushes to `develop` trigger the workflow at
`.github/workflows/nextjs.yml`, which:

1. Installs deps with `npm ci`
2. Type-checks
3. Builds the static export (`./out`)
4. Uploads as a Pages artifact
5. Deploys to GitHub Pages

Pull requests to `develop` run a lighter check (`pr-check.yml`).

## Adding a new project

- **Production / closed-source work** → add to `src/data/projects-personal.ts`
- **LinkedIn-flavoured highlights** → add to `src/data/projects-linkedin.ts`
- **Open-source repos** → push to GitHub; the homepage will pick it up
  automatically on next visit (cached for 6 h in `sessionStorage`)

## Updating resumes

Edit the JSON files in `public/resumes/`. They're consumed both by the in-app
viewer (`/resume`) and (optionally) shipped as PDF alongside if you drop a
`divyanshu-tyagi-<variant>-fullstack.pdf` next to the JSON.

The JSON shape lives in `src/components/ResumeViewer.tsx#ResumeJson`.
