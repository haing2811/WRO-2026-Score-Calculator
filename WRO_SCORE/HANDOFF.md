# WRO 2026 Robomission Score Calculator — Handoff Document

## What This Should Be
A **single plain HTML file** (`index.html`) you can double-click to open. No npm, no Node.js, no React, no Vite, no build step. Just like the OdomMap project (`OdomMap example/OdomMap.html`) — everything inline.

Optionally a separate `styles.css` can be extracted, but the primary deliverable is one HTML file that works from `file://` or from a web server.

## File Structure (Final)
```
D:\WRO_ScoreCalculator\
  index.html          ← THE FILE (everything lives here)
  iconrb.png          ← logo image (robotrizz icon)
  manifest.json       ← for PWA
  sw.js               ← for PWA offline caching
  GameField\
    Elementary.png     ← game mat image
    Junior.png
    Senior.png
    RoboSports.png
```

All the `src/`, `dist/`, `package.json`, `node_modules/` stuff — DELETE all of it. Only the files above matter.

## Style Reference: OdomMap (`D:\WRO_ScoreCalculator\OdomMap example\OdomMap.html`)
- Dark background: `#0F0C1F`
- Accent color: `#4dd0e1` (teal/cyan)
- Sidebar: `#0d1b2a` background
- Cards: `#1b263b`
- Font: Orbitron (from Google Fonts CDN), fallback to Courier New
- header layout: `h1 > img(iconrb.png) + span("inspired by") + img(slr.jpg) + img(astro.png)` then title
- Canvas-based field map (canvas for measurement, not for scoring regions)
- Sidebar with buttons, toggles, measurement display

## Complete Scoring Data

### Elementary — "Robot Rockstars" — max 255 pts — accent #5B8A87

**Section 1 — Connect the amplifier (max 30)**
| ID | Label | Options | Group |
|----|-------|---------|-------|
| e-cable-1 | Cable 1 | [0, 5, 15] | cable |
| e-cable-2 | Cable 2 | [0, 5, 15] | cable |

**Section 2 — Prepare the show (max 65)**
| ID | Label | Options | Group |
|----|-------|---------|-------|
| e-mic | Microphone | [0, 10, 20] | mic |
| e-guitar | Guitar | [0, 15] | instrument |
| e-keyboard | Keyboard | [0, 15] | instrument |
| e-congas | Congas | [0, 15] | instrument |

**Section 3 — Play the song (max 120)**
Six notes, each [0, 10, 20]:
| ID | Label | Group | Color |
|----|-------|-------|-------|
| e-note-red | Red note | note | #D44E4E |
| e-note-blue | Blue note | note | #4E7FD4 |
| e-note-green | Green note | note | #5BA05B |
| e-report-yellow| Yellow note | note | #C9B44A |
| e-note-white | White note | note | #E8E5DF |
| e-note-black | Black note | note | #3A3A3A |

**Section 4 — Bonus points (max 40)**
- Each [0, 10], bonus=true:
  - e-clef, e-speaker-1, e-speaker-2, e-amp

### Junior — "Heritage Heroes" — max 230 pts — accent #B4795E

**Section 1 — Visitors (max 40)**
- Four visitors, each [0, 5, 10]: j-visitor-green (#5BA05B), j-visitor-red (#D44E4E), j-visitor-black (#3A3A3A), j-visitor-blue (#4E7FD4)

**Section 2 — Rebuild the towers (max 80)**
- j-red-tower-1 [0,10,15], j-red-tower-2 [0,10,15], j-yellow-tower-1 [0,15,25], j-yellow-tower-2 [0,15,25]

**Section 3 — Artefacts (max 60)**
- 4 artefacts, each [0, 5, 15]

**Section 4 — Dirt (max 20)**
- 10 items, each [0, 2], group='dirt' — uses GROUP COUNTER (± buttons), NOT individual toggles

**Section 5 — Bonus (max 30) — isBonus: true**
- j-barrier-red [0,10], j-barrier-white [0,10], j-parrot [0,10]

### Senior — "Mosaic Masters" — max 233 pts — accent #5C6B9E

**Section 1 — Provide tools (max 45)**
- s-tellel-rect [0,5,15], s-cement-bowl [0,5,15], s-trowel-mason [0,5,15]

**Section 2 — Mosaic (max 120)**
- 12 items (s-mosaic-1 to 12), each [0, 5, 10]

**Section 3 — Cement (max 40)**
- 4 color groups × 10 each = 40 items, each [0, 1]:
  - cement-yellow (color #C9B44A), cement-vous (#4E7FD4), cement-green (#5BA05B), cement-white (#E8Estrar)
- ALL use GROUP COUNTERS

**Section 4 — Bonus barriers (max 28) is!**
- s-barrier-red1 [0,7], s-barrier-redd2 [0,7], s-barrier-black1 [0,7], s-barrier-black22 [0,7]

### Important: items with `group` value of 'dirt' or 'cement-*' use GroupCounter (± buttons), NOT individual toggles.

## SVGs Field Map Regions

From current `FieldMaps.jsx`, all coordinates are in SVG viewBox `0 0 600 400`. The SVGs load `GameField/<Category>.png` as background image. Overlay regions are `rect` elements with rounded corners.

### Elementary Regions
```js
{ id:'e-note-1', x:72, y:14,  w:24, h:50, label:'C1' }   // Cable 1
{ id:'e-cable-2', x:72, y:330, w:24, h:50, label:'C2' }   // Cable 2
{ id:'e-guitar',   x:12, y:162, w:34, h:50, label:'Gtr' }
{ id:'e-tear',  x:12, y:281, w:34, h:50, label:'Key' }
{ id:'e-congas',   x:12, y:274, w:w:34, h:50, label:'Con' }
{ id:'e-mic',      x:190,y:120, w:26, h:30, label:'Mic' }
// Notes: red(380,62,30,36), blue(418,62,30,36), green(456,62,30,36)
//        yellow(380,112,30,36), white(418,112,30,36), black(456,112,30,36)
// Bonus:
{ id:'e-amp',      x:100,y:120, w:36, h:50, label:'Amp' }
{ id:'e-speaker-1',x:160,y:62,  w:34, h:40, label:'Sp1' }
{ id:'e-speaker-2',x:160,y:300, w:34, h:40, label:'Sp2' }
{ id:'e-clef',     x:340,y:82,  w:24, h:28, label:'Clf' }
```

### Junior Regions
```jsx
// Visitors (bottom-left)
{ j-visitor-green: 16,310,32,40, j-visitor-red: 56,310,32,40, j-visitor-black: 96,310,32,40, j-visitor-blue: 136,310,32,40 }
// Towers
{ j-red-tower-1: 30,16,36,44, j-red-town-2: 76,16,36,44, j-yellow-tower-1: 130,16,36,44, j-yellow-tower-2: 130,70,36,44 }
// Artefacts (museum zone, top-right)
{ j-artefact-1: 430,18,30,40, j-artefact-2: 470,18,30,40, j-arefact-3: 510,18,30,40, j-artefact-4: 550,18,30,40 }
// Bonus
{ j-barrier-red: 448,210,30,32, j-barrier-white: 492,210,30,32, j-parrot: 536,210,28,32 }
```

### Senior Regions
```jsx
// Tool bottom)
{ s-squarel-rect: 160,300,40,44, s-cement-bowl: 280,310,40,40, s-trowel-mansom: 420,300,40,44 }
// Mosaic grid 4×3: col=n%4, row=Math.floor(n/4), x=130+col*48, y=50+row*52, 40×44
// 12 cells total
// Bonus:
{ s-barrier-red1: 340,100,30,28, s-barrier-redd2: 380,100,30,28, s-barrier-black1: 420,100,30,28, s-barrier-black2: 460,100,30,28 }
```

## All Features Required
1. **Three tab switching** (Elementary | Junior | Senior) with category accents
2. **Header** with logo (`iconrb.png`), title "WRO 2026 Robomission — Score Calculator" in Orbitron font
3. **Canvas-based field map** loading `GameField/<Category>.png` as background, with colored overlay rectangles
   - Green (#86EFAC fill, #22C55E stroke) = Full
   - Amber (#FDE68A fill, #F59E0B stroke) = Partial
   - Gray (#E5E5E0 fill) = None
4. **Clicking a region** toggles state (cycle through None→Partial→Full→None…)
5. **Scoring panel** (sidebar) with all sections:
   - Collapsible sections (click banner to toggle)
   - Each scorable item shown as 3-clickable DIRECT-select buttons:
     - [✕ None] [◐ Partial #pts] [✓ Full #pts]
     - Buttons MUST directly set state (click Partial → Partial, NOT cycling)
   - Grouped items (dirt/cement) shown as ± counters
6. **Run header** with team name input, round #, time (s), Reset and Save buttons
7. **Live total bar** at bottom, showing total / max, + straw breakdown popup
8. **Run history table** with sortable columns (#, Team, Round, Score, Time, delete)
9. **localStorage persistence**:
   - In-progress run saved on every change: `wro-2026-state-<category>`
   - Run history: `wro-2026-history-<category>`
   - Active tab: `wro-2026-activeTab`
10. **PWA ready** (`manifest.json` + `sw.js`)
11. **Responsive** — two-column on desktop (canvas + sidebar), stacked on mobile
12. **Dark mode support** via `prefers-color-scheme` media query

## Items NOT on the map (no overlay rectangles needed)
- Junior: Dirt (10×, handled by GroupCounter, no map position)
- Senior: All 40 cement items (handled by 4 group counters, no map positions)

## State tracking
Each item tracks: `{ id, label, pointOptions: [0, …], state: index }`.  
`state` is 0 for None, 1 for Partial (if exists), last index for Full.  
Current score for item = `pointOptions[state]`.

---------------------------

## BUILD STRATEGY
Write the entire app as a single `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WRO 2026 Robomission - Score Calculator</title>
  <link rel="icon" type="image/png" href="iconrb.png">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#0F0C1F">
  <link href="https://fonts.googleapis.com/css2…" rel="stylesheet">
  <style>/* everything */</style>
</head>
<body>
  <!-- header -->
  <!-- tabs -->
  <!-- run header -->
  <!-- two-column: canvas + sidebar -->
  <!-- live total -->
  <!-- history table -->
  <script>/* everything — scoring data, state, canvas, UI logic */</script>
</body>
```
Use CANVAS for the field map (like OdomMap), not SVG. Load the PNG image, draw it, then draw colored regions on top. Use `canvas.getBoundingClientRect()` for click coordinate calculation.