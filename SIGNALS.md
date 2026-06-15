# Signal Reference

All signals follow the format `Category.SignalName` with both sides capitalized. Command signals are sent **to** the processor; feedback signals are received **from** the processor and use the `_FB` suffix.

---

## Navigation

Used by both the app tile buttons (home page) and the page display logic in `App.tsx`. The processor sets exactly one feedback signal high at a time to indicate the active page.

| Signal | Type | Direction |
|---|---|---|
| `Navpage.Home_Press` | Digital | → Processor |
| `Navpage.Home_FB` | Digital | ← Processor |
| `Navpage.Audio` | Digital | → Processor |
| `Navpage.Audio_FB` | Digital | ← Processor |
| `Navpage.Call` | Digital | → Processor |
| `Navpage.Call_FB` | Digital | ← Processor |
| `Navpage.Routing` | Digital | → Processor |
| `Navpage.Routing_FB` | Digital | ← Processor |
| `Navpage.Lights` | Digital | → Processor |
| `Navpage.Lights_FB` | Digital | ← Processor |
| `Navpage.Camera` | Digital | → Processor |
| `Navpage.Camera_FB` | Digital | ← Processor |
| `Navpage.AppleTV` | Digital | → Processor |
| `Navpage.AppleTV_FB` | Digital | ← Processor |
| `Navpage.Overview` | Digital | → Processor |
| `Navpage.Overview_FB` | Digital | ← Processor |
| `Navpage.Settings_Press` | Digital | → Processor |
| `Navpage.Settings_FB` | Digital | ← Processor |

---

## Audio — Footer

Global volume slider and mute button shown in the footer.

| Signal | Type | Direction |
|---|---|---|
| `Audio.Footer_Volume` | Analog | → Processor |
| `Audio.Footer_Volume_FB` | Analog | ← Processor |
| `Audio.Footer_Mute_Press` | Digital | → Processor |
| `Audio.Footer_Mute_FB` | Digital | ← Processor |

---

## Audio — Zone Controls

Per-zone volume sliders and mute buttons on the Audio page (`audio.config.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `Audio.Master_Volume` | Analog | → Processor |
| `Audio.Master_Volume_FB` | Analog | ← Processor |
| `Audio.Master_Mute` | Digital | → Processor |
| `Audio.Master_Mute_FB` | Digital | ← Processor |
| `Audio.Volume1` | Analog | → Processor |
| `Audio.Volume1_FB` | Analog | ← Processor |
| `Audio.Volume1Mute` | Digital | → Processor |
| `Audio.Volume1_FB` | Digital | ← Processor |
| `Audio.Volume2` | Analog | → Processor |
| `Audio.Volume2_FB` | Analog | ← Processor |
| `Audio.Volume2_Mute` | Digital | → Processor |
| `Audio.Volume2Mute_FB` | Digital | ← Processor |
| `Audio.Volume3` | Analog | → Processor |
| `Audio.Volume3_FB` | Analog | ← Processor |
| `Audio.Volume3_Mute` | Digital | → Processor |
| `Audio.Volume3Mute_FB` | Digital | ← Processor |
| `Audio.Volume4` | Analog | → Processor |
| `Audio.Volume4_FB` | Analog | ← Processor |
| `Audio.Volume4_Mute` | Digital | → Processor |
| `Audio.Volume4Mute_FB` | Digital | ← Processor |
| `Audio.Volume5` | Analog | → Processor |
| `Audio.Volume5_FB` | Analog | ← Processor |
| `Audio.Volume5_Mute` | Digital | → Processor |
| `Audio.Volume5Mute_FB` | Digital | ← Processor |
| `Audio.Volume6` | Analog | → Processor |
| `Audio.Volume6_FB` | Analog | ← Processor |
| `Audio.Volume6_Mute` | Digital | → Processor |
| `Audio.Volume6Mute_FB` | Digital | ← Processor |
---

## Phone / Call

Dialer, call controls, and in-call keypad toggle (`AudioCallPage.tsx`, `CH5CallControls.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `Phone.Keypad` | Digital | → Processor |
| `Phone.Keypad_FB` | Digital | ← Processor |
| `Phone.Hangup` | Digital | → Processor |
| `Phone.Hangup_FB` | Digital | ← Processor |
| `Phone.Privacy` | Digital | → Processor |
| `Phone.Privacy_FB` | Digital | ← Processor |
| `Phone.Hold` | Digital | → Processor |
| `Phone.Hold_FB` | Digital | ← Processor |
| `Phone.Keypad_Toggle` | Digital | → Processor |
| `Phone.Keypad_Toggle_FB` | Digital | ← Processor |

---

## Routing — Sources

Source selection buttons on the Routing page (`routing.config.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `Routing.Source1` | Digital | → Processor |
| `Routing.Source1_FB` | Digital | ← Processor |
| `Routing.Source2` | Digital | → Processor |
| `Routing.Source2_FB` | Digital | ← Processor |
| `Routing.Source3` | Digital | → Processor |
| `Routing.Source3_FB` | Digital | ← Processor |
| `Routing.Source4` | Digital | → Processor |
| `Routing.Source4_FB` | Digital | ← Processor |
| `Routing.Source5` | Digital | → Processor |
| `Routing.Source5_FB` | Digital | ← Processor |
| `Routing.Source6` | Digital | → Processor |
| `Routing.Source6_FB` | Digital | ← Processor |
| `Routing.Source7` | Digital | → Processor |
| `Routing.Source7_FB` | Digital | ← Processor |

---

## Routing — Destinations

Destination selection buttons on the Routing page (`routing.config.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `Routing.Dest1` | Digital | → Processor |
| `Routing.Dest1_FB` | Digital | ← Processor |
| `Routing.Dest2` | Digital | → Processor |
| `Routing.Dest2_FB` | Digital | ← Processor |
| `Routing.Dest3` | Digital | → Processor |
| `Routing.Dest3_FB` | Digital | ← Processor |
| `Routing.Dest4` | Digital | → Processor |
| `Routing.Dest4_FB` | Digital | ← Processor |
| `Routing.Dest5` | Digital | → Processor |
| `Routing.Dest5_FB` | Digital | ← Processor |
| `Routing.Dest6` | Digital | → Processor |
| `Routing.Dest6_FB` | Digital | ← Processor |

---

## Routing — Route Action

Confirm/execute the route (`CH5ActionBar.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `Routing.Route` | Digital | → Processor |
| `Routing.Route_FB` | Digital | ← Processor |

---

## Camera

Camera selection, PTZ controls, auto-focus, and presets (`CameraPage.tsx`). `{n}` = camera number (e.g. `1`, `2`, `3`). `{p}` = preset number.

| Signal | Type | Direction |
|---|---|---|
| `Camera.{n}_Press` | Digital | → Processor |
| `Camera.{n}_FB` | Digital | ← Processor |
| `Camera.{n}_AutoFocus_Press` | Digital | → Processor |
| `Camera.{n}_AutoFocus_FB` | Digital | ← Processor |
| `Camera.{n}_Tilt_Up_Press` | Digital | → Processor |
| `Camera.{n}_Tilt_Down_Press` | Digital | → Processor |
| `Camera.{n}_Pan_Left_Press` | Digital | → Processor |
| `Camera.{n}_Pan_Right_Press` | Digital | → Processor |
| `Camera.{n}_Zoom_In_Press` | Digital | → Processor |
| `Camera.{n}_Zoom_Out_Press` | Digital | → Processor |
| `Camera.{n}_Home_Press` | Digital | → Processor |
| `Camera.{n}_Preset_{p}` | Digital | → Processor |

---

## Apple TV

Directional pad, OK, and media controls (`AppleTVPage.tsx`). All are momentary digital signals.

| Signal | Type | Direction |
|---|---|---|
| `AppleTV.Up` | Digital | → Processor |
| `AppleTV.Down` | Digital | → Processor |
| `AppleTV.Left` | Digital | → Processor |
| `AppleTV.Right` | Digital | → Processor |
| `AppleTV.Enter` | Digital | → Processor |
| `AppleTV.Menu` | Digital | → Processor |
| `AppleTV.Home` | Digital | → Processor |
| `AppleTV.Back` | Digital | → Processor |
| `AppleTV.PlayPause` | Digital | → Processor |

---

## Settings — Tabs

Tab selection for Theme vs Font on the Settings page (`SettingsPage.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `Settings_Tab.Theme` | Digital | → Processor |
| `Settings_Tab.Theme_FB` | Digital | ← Processor |
| `Settings_Tab.Font` | Digital | → Processor |
| `Settings_Tab.Font_FB` | Digital | ← Processor |

---

## Settings — Themes

One signal per theme. Available theme names: `glassDark`, `neonPurple`, `minimal`, `oceanBlue`, `sunset`, `charcoal`, `crimsonDark`, `studioLight`.

| Signal | Type | Direction |
|---|---|---|
| `Theme.{themeName}` | Digital | → Processor |
| `Theme.{themeName}_FB` | Digital | ← Processor |

---

## Settings — Fonts

One signal per font. Available font names defined in `APP_FONTS` in `src/lib/theme`.

| Signal | Type | Direction |
|---|---|---|
| `Font.{fontName}` | Digital | → Processor |
| `Font.{fontName}_FB` | Digital | ← Processor |

---

## System

| Signal | Type | Direction |
|---|---|---|
| `System.Power` | Digital | → Processor |
| `System.Power_FB` | Digital | ← Processor |
