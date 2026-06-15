# Signal Reference

All signals follow the format `Category.SignalName` (one dot). Command signals are sent **to** the processor; feedback signals are received **from** the processor. Feedback signals are suffixed with `_FB` (pages/components) or `_fb` (config-driven controls).

---

## Navigation — Page Routing

Used in `App.tsx` to track and switch the active page.

| Signal | Type | Direction |
|---|---|---|
| `Navpage.Home_Press` | Digital | → Processor |
| `Navpage.Home_FB` | Digital | ← Processor |
| `Navpage.Audio_FB` | Digital | ← Processor |
| `Navpage.Call_FB` | Digital | ← Processor |
| `Navpage.Routing_FB` | Digital | ← Processor |
| `Navpage.Settings_FB` | Digital | ← Processor |
| `Navpage.Lights_FB` | Digital | ← Processor |
| `Navpage.Camera_FB` | Digital | ← Processor |
| `Navpage.AppleTV_FB` | Digital | ← Processor |
| `Navpage.Overview_FB` | Digital | ← Processor |
| `Navpage.Settings_Press` | Digital | → Processor |
| `Navpage.Settings_FB` | Digital | ← Processor |

---

## Navigation — App Tiles (Home Page)

Used by app tile buttons on the home page (`apps.config.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `nav.audio` | Digital | → Processor |
| `nav.audio_fb` | Digital | ← Processor |
| `nav.call` | Digital | → Processor |
| `nav.call_fb` | Digital | ← Processor |
| `nav.routing` | Digital | → Processor |
| `nav.routing_fb` | Digital | ← Processor |
| `nav.lights` | Digital | → Processor |
| `nav.lights_fb` | Digital | ← Processor |
| `nav.camera` | Digital | → Processor |
| `nav.camera_fb` | Digital | ← Processor |
| `nav.appleTV` | Digital | → Processor |
| `nav.appleTV_fb` | Digital | ← Processor |
| `nav.overview` | Digital | → Processor |
| `nav.overview_fb` | Digital | ← Processor |

---

## Audio — Master Volume & Mute (Footer)

Global volume slider and mute button shown in the footer.

| Signal | Type | Direction |
|---|---|---|
| `Audio.Volume` | Analog | → Processor |
| `Audio.Volume_FB` | Analog | ← Processor |
| `Audio.Mute_Press` | Digital | → Processor |
| `Audio.Mute_FB` | Digital | ← Processor |

---

## Audio — Zone Controls

Per-zone volume sliders and mute buttons on the Audio page (`audio.config.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `audio.masterVolume` | Analog | → Processor |
| `audio.masterVolume_fb` | Analog | ← Processor |
| `audio.masterMute` | Digital | → Processor |
| `audio.masterMute_fb` | Digital | ← Processor |
| `audio.tvVolume` | Analog | → Processor |
| `audio.tvVolume_fb` | Analog | ← Processor |
| `audio.tvMute` | Digital | → Processor |
| `audio.tvMute_fb` | Digital | ← Processor |
| `audio.musicVolume` | Analog | → Processor |
| `audio.musicVolume_fb` | Analog | ← Processor |
| `audio.musicMute` | Digital | → Processor |
| `audio.musicMute_fb` | Digital | ← Processor |
| `audio.speakersVolume` | Analog | → Processor |
| `audio.speakersVolume_fb` | Analog | ← Processor |
| `audio.speakersMute` | Digital | → Processor |
| `audio.speakersMute_fb` | Digital | ← Processor |
| `audio.headphonesVolume` | Analog | → Processor |
| `audio.headphonesVolume_fb` | Analog | ← Processor |
| `audio.headphonesMute` | Digital | → Processor |
| `audio.headphonesMute_fb` | Digital | ← Processor |
| `audio.micVolume` | Analog | → Processor |
| `audio.micVolume_fb` | Analog | ← Processor |
| `audio.micMute` | Digital | → Processor |
| `audio.micMute_fb` | Digital | ← Processor |

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
| `routing.source1` | Digital | → Processor |
| `routing.source1_fb` | Digital | ← Processor |
| `routing.source2` | Digital | → Processor |
| `routing.source2_fb` | Digital | ← Processor |
| `routing.source3` | Digital | → Processor |
| `routing.source3_fb` | Digital | ← Processor |
| `routing.source4` | Digital | → Processor |
| `routing.source4_fb` | Digital | ← Processor |
| `routing.source5` | Digital | → Processor |
| `routing.source5_fb` | Digital | ← Processor |
| `routing.source6` | Digital | → Processor |
| `routing.source6_fb` | Digital | ← Processor |
| `routing.source7` | Digital | → Processor |
| `routing.source7_fb` | Digital | ← Processor |

---

## Routing — Destinations

Destination selection buttons on the Routing page (`routing.config.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `routing.dest1` | Digital | → Processor |
| `routing.dest1_fb` | Digital | ← Processor |
| `routing.dest2` | Digital | → Processor |
| `routing.dest2_fb` | Digital | ← Processor |
| `routing.dest3` | Digital | → Processor |
| `routing.dest3_fb` | Digital | ← Processor |
| `routing.dest4` | Digital | → Processor |
| `routing.dest4_fb` | Digital | ← Processor |
| `routing.dest5` | Digital | → Processor |
| `routing.dest5_fb` | Digital | ← Processor |
| `routing.dest6` | Digital | → Processor |
| `routing.dest6_fb` | Digital | ← Processor |

---

## Routing — Route Action

Confirm/execute the route (`CH5ActionBar.tsx`).

| Signal | Type | Direction |
|---|---|---|
| `routing.route` | Digital | → Processor |
| `routing.route_fb` | Digital | ← Processor |

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
