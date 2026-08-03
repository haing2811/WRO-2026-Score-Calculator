# WRO 2026 Robomission — Score Calculator

A single-page web app for scoring **World Robot Olympiad (WRO) 2026 RoboMission** runs across the **Elementary**, **Junior**, and **Senior** age categories. Click a mission element on the game mat (or its matching button in the sidebar) to mark it as None / Partial / Full, and the app tallies your live score.

## Features

- **Three category tabs** — Elementary ("Robot Rockstars"), Junior ("Heritage Heroes"), and Senior ("Mosaic Masters") — each with its own accent color, missions, and point values.
- **Interactive field map** — a canvas view of the official game mat with clickable overlay zones for each scorable mission element.
- **Scoring sidebar** — sections listing every mission item, with:
  - Individual None/Partial/Full buttons for most items
- **Run header** — enter team name, round number, and time; Save or Reset the current run.
- **Run history** — a sortable table of saved runs (team, round, score, time), with delete support.
- **Offline-ready (PWA)** — installable via `manifest.json` + `sw.js`, works without an internet connection once loaded.
- **Persistent state** — in-progress runs and history are saved to `localStorage`, so nothing is lost on refresh.
- **Responsive layout** — two-column (map + sidebar) on desktop, stacked on mobile; supports dark mode.

## Getting Started

No build step, no dependencies to install — it's a static site.

1. open `index.html` directly in a browser (double-click it).

## Project Structure

```
WRO_SCORE/
├── index.html                    # Main app (structure)
├── styles.css                    # All styling
├── script.js                     # Scoring logic, state, canvas rendering
├── manifest.json                 # PWA manifest
├── iconrb.png / icon.png         # App icons/logo
├── GameField/                    # Game mat images (Elementary/Junior/Senior)
├── GameField_BlockAllocation/    # Block allocation reference images
└── <Category>/                   # Official WRO rulebooks & printable game mats (PDF)
```

## Scoring Categories (at a glance)

| Category   | Theme             | Max Points |
|------------|-------------------|-----------:|
| Elementary | Robot Rockstars   | 255        |
| Junior     | Heritage Heroes   | 230        |
| Senior     | Mosaic Masters    | 233        |

Each category is broken into mission sections (e.g. setup, main tasks, bonus objectives), matching the official WRO 2026 RoboMission rules included in the `Elementary/`, `Junior/`, and `Senior/` folders.

## Notes

- All data is stored locally in your browser — nothing is sent to a server.
- Reference rulebooks (`*-Game-Rules.pdf`) and printable game mats (`*-Printing-File.pdf`) for each category are included for quick lookup during scoring.