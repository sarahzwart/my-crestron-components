# my-crestron-components

A custom Crestron CH5 touch panel interface built with React, TypeScript, and Tailwind CSS. Designed for integration with a Crestron control processor via the CrComLib WebSocket library, the UI provides control over audio zones, A/V routing, PTZ cameras, lighting, VoIP, and Apple TV from a single cohesive application.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Crestron touch panel or CH5-compatible device with `@crestron/ch5-crcomlib` loaded (required for processor communication; the app renders without it for local development)

### Install dependencies

```bash
npm install @crestron/ch5-crcomlib
```

### Run in development

```bash
npm run dev
```

Opens at `http://localhost:5173`. The app is fully navigable without a processor — pages switch locally on tap.

## Steps for Deployment

### 1. Build the app

```bash
npm run build
```

Output goes to `dist/`.

### 2. Create the CH5 contract

Use the **CH5 Contract Editor** to define all signal mappings between the touch panel and the control processor. This produces a `.cce` file. When ready, export the interface mapping — this generates a `.cse2j` file (already located at `output/contract_v1/interface/mapping/` in this repo).

### 3. Package into a `.ch5z` archive

Run the CH5 CLI to bundle the built app and contract mapping into a single archive for upload:

```bash
ch5-cli archive -p project -d dist -o archive -c ./output/contract_v1/interface/mapping/contract_v1.cse2j
```

This creates a `.ch5z` file in the `archive/` folder.

### 4. Load to the touch panel

Upload the `.ch5z` archive to the Crestron touch panel using **Crestron Toolbox** (Device > CH5 Load Project). The panel will load and display the application automatically.

---

## Project Structure

```
src/
├── App.tsx                  # Root layout, page routing, header/footer
├── pages/                   # Full-page views (one per control domain)
├── components/
│   ├── layout/              # Header and Footer shell components
│   ├── lib/
│   │   ├── common/          # Core CH5 components (button, slider, keypad, etc.)
│   │   ├── volume/          # Volume slider and mute button
│   │   ├── call/            # Call controls, display screen, history list
│   │   └── routing/         # Routing buttons, section layout, action bar
│   └── ui/                  # Base shadcn/Radix primitives (card, tabs, dialog, etc.)
├── config/                  # Static data — apps, audio zones, routing sources/destinations
├── contexts/                # CH5Provider — initializes CrComLib on mount
├── hooks/                   # useCH5Boolean, useCH5Numeric, useCH5String
├── services/
│   └── ch5Service.ts        # CrComLib wrapper — publish/subscribe for all signal types
└── lib/
    ├── theme.ts             # Theme definitions, ThemeProvider, useTheme hook
    └── utils.ts             # cn() class merging utility
```

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `HomePage.tsx` | App tile grid — tap a tile to navigate |
| Overview | `OverviewPage.tsx` | Dashboard with audio, camera, routing, and music at a glance |
| Audio | `AudioPage.tsx` | Per-zone volume sliders and mute controls |
| Phone | `AudioCallPage.tsx` | VoIP call controls with keypad and call history |
| Routing | `RoutingPage.tsx` | A/V matrix source-to-destination routing |
| Lights | `LightsPage.tsx` | Lighting scene and zone control |
| Camera | `CameraPage.tsx` | PTZ camera selection and control with presets |
| Apple TV | `AppleTVPage.tsx` | Directional pad, media controls, and menu navigation |
| Settings | `SettingsPage.tsx` | Theme and font selection |

---

## Core Components

### `CH5Button` (`components/lib/common/CH5Button.tsx`)
General-purpose button with three variants (`toggle`, `momentary`, `glass`) and four shapes (`rounded`, `square`, `pill`, `circle`). Binds to a `commandSignal` (publishes on press) and optional `feedbackSignal` (reflects processor state).

### `CH5Slider` (`components/lib/common/CH5Slider.tsx`)
Horizontal or vertical range slider. Supports sizes `sm / md / lg / xl`, gradient or solid track colors, and multiple thumb styles.

### `CH5VolumeSlider` (`components/lib/volume/CH5Volume.tsx`)
Composed control combining a label, icon, `CH5Slider`, and `CH5MuteButton`. Accepts a `size` prop (`sm / md / lg`) for use in compact layouts like the Overview page.

### `CH5Keypad` (`components/lib/common/CH5Keypad.tsx`)
12-key dial pad. Generates signals dynamically as `{baseSignal}_1` through `{baseSignal}_#`, plus `_Dial` and `_Backspace`.

### `CH5RoutingSection` / `CH5RoutingButton` (`components/lib/routing/`)
Source and destination selection grids used on the Routing page and the Overview dashboard.

---

## Configuration

Page content is driven by config files rather than hardcoded in components — edit these to change labels, icons, and signal names without touching page logic.

| File | Exports | Purpose |
|---|---|---|
| `config/apps.config.tsx` | `APPS` | Home page tile definitions and nav signals |
| `config/audio.config.tsx` | `AUDIO_CONTROLS` | Audio zone labels, icons, and signals |
| `config/routing.config.tsx` | `SOURCES`, `DESTINATIONS` | Routing matrix items and signals |

---

## Signal Architecture

All Crestron signals follow the format `Category.SignalName` with feedback signals using a `_FB` suffix (e.g. `Audio.Master_Volume` → `Audio.Master_Volume_FB`).

Full signal reference: [`SIGNALS.md`](./SIGNALS.md)

**Signal types used:**
- **Digital** (boolean) — button presses, mute toggles, page navigation
- **Analog** (numeric) — volume levels, camera selection (`Camera.Select`), theme selection (`Theme.Select`), font selection (`Font.Select`)

All signal I/O goes through `src/services/ch5Service.ts`, which wraps `window.CrComLib` and exposes:

```ts
ch5Service.publishBool(signal, value)
ch5Service.publishNumeric(signal, value)
ch5Service.subscribeBool(signal, callback)
ch5Service.subscribeNumeric(signal, callback)
ch5Service.unsubscribe(signal)
```

---

## Theming

Built-in themes and fonts  are selectable from the Settings page.

The active theme and font are stored in React context (`ThemeProvider` in `src/lib/theme.ts`) and applied via Tailwind utility class strings — no CSS variables required at runtime.

When connected to a processor, theme and font selections are sent as **analog signals** (`Theme.Select`, `Font.Select`) so the processor can persist and restore the last selection.

---

## Checking Your Component Count & DOM Size in Console

### Total DOM element count (limit: 1500)

```js
console.log("DOM elements:", document.querySelectorAll("*").length);
```

### Max nesting depth (limit: 32)

```js
function maxDepth(el, d = 0) {
  if (!el.children.length) return d;
  return Math.max(...[...el.children].map(c => maxDepth(c, d + 1)));
}
console.log("Max depth:", maxDepth(document.body));
```

### Max children on any single element (limit: 60)

```js
function maxChildren(el) {
  return Math.max(el.children.length, ...[...el.children].map(maxChildren));
}
console.log("Max children:", maxChildren(document.body));
```


## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS v4, shadcn/ui (Radix) |
| Icons | Lucide React |
| Fonts | Quicksand, Roboto Flex (Google Fonts), Inter Variable |
| Processor comms | `@crestron/ch5-crcomlib` v2.17.4 |
| Testing | Vitest + Playwright (browser) |


