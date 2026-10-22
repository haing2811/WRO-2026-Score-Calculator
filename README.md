# WRO 2026 Robomission — Score Calculator

A single-page web app for scoring **World Robot Olympiad (WRO) 2026 RoboMission** runs across the **Elementary**, **Junior**, and **Senior** age categories. Click a mission element on the game mat (or its matching button in the sidebar) to mark it as None / Partial / Full, and the app tallies your live score.

## Features

- **Three category tabs** — Elementary ("Robot Rockstars"), Junior ("Heritage Heroes"), and Senior ("Mosaic Masters") — each with its own accent color, missions, and point values.
- **Interactive field map** — a canvas view of the official game mat with clickable overlay zones for each scorable mission element.
- **Scoring sidebar** — sections listing every mission item, with:
  - Individual None/Partial/Full buttons for most items
- **Run header** — enter team name, round number, and time; Save or Reset the current run.
- **Run history** — a sortable table of saved runs (team, round, score, time), with delete support.
- **Offline-ready (PWA)** — `manifest.json` is linked from `index.html`, and `sw.js` registers an offline cache (small shell precached on install; the three game mats are background-prefetched right after activation). Once you have loaded the page once, it works without an internet connection. Remember to bump `VERSION` in `sw.js` on every deploy.
- **Persistent state** — in-progress runs and history are saved to `localStorage`, so nothing is lost on refresh.
- **Responsive layout** — two-column (map + sidebar) on desktop, stacked on mobile; supports dark mode.

## Getting Started

No build step, no dependencies to install — it's a static site.

1. open `index.html` directly in a browser (double-click it).

## Deploy on Vercel

The site is deployed as a plain static project (no build step) as **`wro2026-score-calculator`**.

1. Import the GitHub repo **`haing2811/WRO-2026-Score-Calculator`** at vercel.com/new.
2. Framework Preset: **Other**. Leave **Build Command** and **Output Directory** **empty** — do not add any build settings (`vercel.json` intentionally contains only `rewrites` and `headers`).
3. Project Name must be exactly **`wro2026-score-calculator`** — the portal (`haing2811` deployment) proxies `/wro2026-score-calculator` to `https://wro2026-score-calculator.vercel.app/wro2026-score-calculator/`.
4. Deploy. The site works at the root and under the `/wro2026-score-calculator/` path prefix (both are covered by the rewrite triplet in `vercel.json`).
5. **Every deploy: bump `VERSION` in `sw.js`** (cache name `wro-score-v<N>`). There is no build step to hash filenames, so the version constant is the only cache-invalidation mechanism; the SW's `activate` handler deletes caches from older versions automatically.
6. `localStorage` is per-origin: runs saved via `file://` or `localhost` do **not** appear on the deployed domain — history on the live site starts empty.

## Project Structure

```
WRO_SCORE/
├── index.html                    # Main app (structure)
├── styles.css                    # All styling
├── script.js                     # Scoring logic, state, canvas rendering
├── manifest.json                 # PWA manifest
├── iconrb.png / icon.png         # App icons/logo
├── GameField/                    # Game mat images (Elementary/Junior/Senior)
├── GameField_BlockAllocation/    # Block allocation reference images (not referenced by the app; excluded from deploy)
└── sw.js                         # Service worker (offline cache — bump VERSION each deploy)
```

## Scoring Categories 

| Category   | Theme             | Max Points |
|------------|-------------------|-----------:|
| Elementary | Robot Rockstars   | 255        |
| Junior     | Heritage Heroes   | 230        |
| Senior     | Mosaic Masters    | 233        |

Each category is broken into mission sections (e.g. setup, main tasks, bonus objectives), matching the official WRO 2026 RoboMission rules. (Rulebook PDFs are not bundled in this repo — look them up on the official WRO site.)

## Notes

- All data is stored locally in your browser — nothing is sent to a server.
- This repo ships the three game-mat PNGs used by the field map; it does not include rulebook PDFs.
