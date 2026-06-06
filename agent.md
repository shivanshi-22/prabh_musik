# Musik Project Agent Notes

## Project Overview
- Framework: Next.js (App Router) with TypeScript
- Styling: Global CSS in `app/globals.css`
- Linting: ESLint (`eslint.config.mjs`)
- Package manager/config: `package.json`

## Current App Structure
- Root pages and layout:
	- `app/layout.tsx`
	- `app/page.tsx`
- Main UI sections/components:
	- `app/Header.tsx`
	- `app/Hero.tsx`
	- `app/HomePage.tsx`
	- `app/ArtistsPage.tsx`
	- `app/ArtistsWorkedWith.tsx`
	- `app/Beatstar.tsx`
	- `app/ServicesPage.tsx`
	- `app/TrustedBrandsBar.tsx`
	- `app/testimonials.tsx`
	- `app/genre.tsx`
	- `app/TrendingBeats.jsx`
	- `app/Footer.tsx`
- Routed pages:
	- `app/about/page.tsx`
	- `app/beat/page.tsx`
	- `app/services/page.tsx`

## Baseline State (June 4, 2026)
- Repository is pushed to `main`.
- `agent.md` has now been initialized and populated.

## Change Tracking
Use this section to record all future updates in a consistent format.

### Template
```
## YYYY-MM-DD
- Area: <file or feature>
- Change: <what was changed>
- Reason: <why this was changed>
- Impact: <UI/logic/perf/SEO/etc>
```

### Latest Changes
## 2026-06-04
- Area: `agent.md`
- Change: Added full project summary, structure map, and standardized change log format.
- Reason: Keep all project changes and guidance in one place.
- Impact: Improves maintainability and team/agent handoff clarity.

## Conventions
- Prefer TypeScript (`.tsx`) for new React components.
- Keep route files under `app/<route>/page.tsx`.
- Keep reusable UI sections in `app/` as separate components.
- Avoid mixing multiple naming styles in filenames (prefer consistent PascalCase for components).

## Next Recommended Cleanup
- Consider converting `app/TrendingBeats.jsx` to `app/TrendingBeats.tsx` for type safety.
- Consider normalizing filename casing for consistency:
	- `app/genre.tsx` -> `app/Genre.tsx`
	- `app/testimonials.tsx` -> `app/Testimonials.tsx`

