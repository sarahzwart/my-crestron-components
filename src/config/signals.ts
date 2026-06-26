// Single source of truth for all Crestron CH5 signal names.
// Each entry is { cmd, fb } where cmd is the command signal and fb is the feedback signal.
// PTZ and one-way signals have fb: undefined — this is intentional, not an omission.

// NAVPAGE
export const SIGNALS_NAVPAGE = {
  home:     { cmd: "Navpage.Home",     fb: "Navpage.Home_FB"     },
  audio:    { cmd: "Navpage.Audio",    fb: "Navpage.Audio_FB"    },
  call:     { cmd: "Navpage.Call",     fb: "Navpage.Call_FB"     },
  routing:  { cmd: "Navpage.Routing",  fb: "Navpage.Routing_FB"  },
  settings: { cmd: "Navpage.Settings", fb: "Navpage.Settings_FB" },
  lights:   { cmd: "Navpage.Lights",   fb: "Navpage.Lights_FB"   },
  camera:   { cmd: "Navpage.Camera",   fb: "Navpage.Camera_FB"   },
  appleTV:  { cmd: "Navpage.AppleTV",  fb: "Navpage.AppleTV_FB"  },
  overview: { cmd: "Navpage.Overview", fb: "Navpage.Overview_FB" },
  music:    { cmd: "Navpage.Music",    fb: "Navpage.Music_FB"    }
} as const;

// Flat map of page key → feedback signal (used in App.tsx for subscription loop)
export const NAVPAGE_FEEDBACK: Record<keyof typeof SIGNALS_NAVPAGE, string> = {
  home:     SIGNALS_NAVPAGE.home.fb,
  audio:    SIGNALS_NAVPAGE.audio.fb,
  call:     SIGNALS_NAVPAGE.call.fb,
  routing:  SIGNALS_NAVPAGE.routing.fb,
  settings: SIGNALS_NAVPAGE.settings.fb,
  lights:   SIGNALS_NAVPAGE.lights.fb,
  camera:   SIGNALS_NAVPAGE.camera.fb,
  appleTV:  SIGNALS_NAVPAGE.appleTV.fb,
  overview: SIGNALS_NAVPAGE.overview.fb,
  music:    SIGNALS_NAVPAGE.music.fb,
};

// Press signals used for the header/footer nav buttons (carry _Press suffix, distinct from navpage cmd)
export const SIGNALS_NAV_PRESS = {
  home:     "Navpage.Home_Press",
  settings: "Navpage.Settings_Press",
} as const;

// AUDIO
export const SIGNALS_AUDIO = {
  footerVolume: { cmd: "Audio.Footer_Volume",     fb: "Audio.Footer_Volume_FB"   },
  footerMute:   { cmd: "Audio.Footer_Mute_Press",  fb: "Audio.Footer_Mute_FB"    },
  master:       { cmd: "Audio.Master_Volume",      fb: "Audio.Master_Volume_FB"  },
  masterMute:   { cmd: "Audio.Master_Mute",        fb: "Audio.Master_Mute_FB"    },
  zone1:        { cmd: "Audio.Volume_1",           fb: "Audio.Volume_1_FB"       },
  zone1Mute:    { cmd: "Audio.Volume_1_Mute",      fb: "Audio.Volume_1_Mute_FB"  },
  zone2:        { cmd: "Audio.Volume_2",           fb: "Audio.Volume_2_FB"       },
  zone2Mute:    { cmd: "Audio.Volume_2_Mute",      fb: "Audio.Volume_2_Mute_FB"  },
  zone3:        { cmd: "Audio.Volume_3",           fb: "Audio.Volume_3_FB"       },
  zone3Mute:    { cmd: "Audio.Volume_3_Mute",      fb: "Audio.Volume_3_Mute_FB"  },
  zone4:        { cmd: "Audio.Volume_4",           fb: "Audio.Volume_4_FB"       },
  zone4Mute:    { cmd: "Audio.Volume_4_Mute",      fb: "Audio.Volume_4_Mute_FB"  },
  zone5:        { cmd: "Audio.Volume_5",           fb: "Audio.Volume_5_FB"       },
  zone5Mute:    { cmd: "Audio.Volume_5_Mute",      fb: "Audio.Volume_5_Mute_FB"  },
  zone6:        { cmd: "Audio.Volume_6",           fb: "Audio.Volume_6_FB"       },
  zone6Mute:    { cmd: "Audio.Volume_6_Mute",      fb: "Audio.Volume_6_Mute_FB"  },
} as const;

// ROUTING
export const SIGNALS_ROUTING = {
  source1: { cmd: "Routing.Source_1", fb: "Routing.Source_1_FB" },
  source2: { cmd: "Routing.Source_2", fb: "Routing.Source_2_FB" },
  source3: { cmd: "Routing.Source_3", fb: "Routing.Source_3_FB" },
  source4: { cmd: "Routing.Source_4", fb: "Routing.Source_4_FB" },
  source5: { cmd: "Routing.Source_5", fb: "Routing.Source_5_FB" },
  source6: { cmd: "Routing.Source_6", fb: "Routing.Source_6_FB" },
  source7: { cmd: "Routing.Source_7", fb: "Routing.Source_7_FB" },
  dest1:   { cmd: "Routing.Dest_1",   fb: "Routing.Dest_1_FB"   },
  dest2:   { cmd: "Routing.Dest_2",   fb: "Routing.Dest_2_FB"   },
  dest3:   { cmd: "Routing.Dest_3",   fb: "Routing.Dest_3_FB"   },
  dest4:   { cmd: "Routing.Dest_4",   fb: "Routing.Dest_4_FB"   },
  dest5:   { cmd: "Routing.Dest_5",   fb: "Routing.Dest_5_FB"   },
  dest6:   { cmd: "Routing.Dest_6",   fb: "Routing.Dest_6_FB"   },
  route:   { cmd: "Routing.Route",    fb: "Routing.Route_FB"    },
} as const;


// CAMERA
export const SIGNALS_CAMERA = {
  zoomIn:    { cmd: "Camera.Zoom_In_Press",   fb: undefined },
  zoomOut:   { cmd: "Camera.Zoom_Out_Press",  fb: undefined },
  panLeft:   { cmd: "Camera.Pan_Left_Press",  fb: undefined },
  panRight:  { cmd: "Camera.Pan_Right_Press", fb: undefined },
  tiltUp:    { cmd: "Camera.Tilt_Up_Press",   fb: undefined },
  tiltDown:  { cmd: "Camera.Tilt_Down_Press", fb: undefined },
  home:      { cmd: "Camera.Home_Press",      fb: undefined },
  autoFocus: { cmd: "Camera.AutoFocus_Press", fb: "Camera.AutoFocus_FB" },
  selected:  { cmd: "Camera.Selected",        fb: "Camera.Selected_FB"  },
  preset1:   { cmd: "Camera.Preset_1",        fb: "Camera.Preset_1_FB"  },
  preset2:   { cmd: "Camera.Preset_2",        fb: "Camera.Preset_2_FB"  },
  preset3:   { cmd: "Camera.Preset_3",        fb: "Camera.Preset_3_FB"  },
} as const;

export function getCameraPreset(n: number): { cmd: string; fb: string } {
  return { cmd: `Camera.Preset_${n}`, fb: `Camera.Preset_${n}_FB` };
}

// PHONE
export const SIGNALS_PHONE = {
  keypad:       { cmd: "Phone.Keypad",        fb: "Phone.Keypad_FB"        },
  hangup:       { cmd: "Phone.Hangup",        fb: "Phone.Hangup_FB"        },
  privacy:      { cmd: "Phone.Privacy",       fb: "Phone.Privacy_FB"       },
  hold:         { cmd: "Phone.Hold",          fb: "Phone.Hold_FB"          },
  keypadToggle: { cmd: "Phone.Keypad_Toggle", fb: "Phone.Keypad_Toggle_FB" },
} as const;


// MUSIC
export const SIGNALS_MUSIC = {
  // digital
  previous:  { cmd: "Music.Previous_Press",   fb: undefined },
  playPause: { cmd: "Music.PlayPause_Press",  fb: "Music.PlayPause_FB" },
  next:      { cmd: "Music.Next_Press",       fb: undefined },

  playing: {},
  paused: {},
  nextTrackAvailable: {},
  previousTrackAvailable: {},
  shuffleAvailable: {},
  repeatAllAvailable: {},
  repeatOneAvailable: {},

  // analog
  shuffle:   { cmd: "Music.Shuffle",          fb: "Music.Shuffle_FB"},
  repeat:    { cmd: "Music.Repeat",           fb: "Music.Repeat_FB"},
  nowPlayingLengthSeconds: {},
  nowPlayingPositionSeconds: {},
  nowPlayingPositionGauge: {},
  numberOfFavorites: {},

  // serial
  trackName: { cmd: "Music.Track_Name",        fb: "Music.Track_Name_FB"},
  artistName:{ cmd: "Music.Artist_Name",       fb: "Music.Artist_Name_FB"},
  albumName: { cmd: "Music.Album_Name",        fb: "Music.Album_Name_FB"},
  imageUrl:  { cmd: "Music.Image_URL",         fb: "Music.Image_URL_FB"},
  providerName:     { cmd: "Music.Provider_Name",  fb: "Music.Provider_Name_FB"},
  providerImageUrl: { cmd: "Music.Provider_Image_URL", fb: "Music.Provider_Image_URL_FB"}

} as const;

// APPLE TV
export const SIGNALS_APPLETV = {
  up:        { cmd: "AppleTV.Up",        fb: undefined },
  down:      { cmd: "AppleTV.Down",      fb: undefined },
  left:      { cmd: "AppleTV.Left",      fb: undefined },
  right:     { cmd: "AppleTV.Right",     fb: undefined },
  enter:     { cmd: "AppleTV.Enter",     fb: undefined },
  menu:      { cmd: "AppleTV.Menu",      fb: undefined },
  home:      { cmd: "AppleTV.Home",      fb: undefined },
  back:      { cmd: "AppleTV.Back",      fb: undefined },
  playPause: { cmd: "AppleTV.PlayPause", fb: undefined },
} as const;

// SETTINGS
export const SIGNALS_SETTINGS = {
  tabTheme:    { cmd: "Settings_Tab.Theme", fb: "Settings_Tab.Theme_FB" },
  tabFont:     { cmd: "Settings_Tab.Font",  fb: "Settings_Tab.Font_FB"  },
  themeSelect: { cmd: "Theme.Select",       fb: "Theme.Select_FB"       },
  fontSelect:  { cmd: "Font.Select",        fb: "Font.Select_FB"        },
} as const;


// SYSTEM
export const SIGNALS_SYSTEM = {
  power: { cmd: "System.Power", fb: "System.Power_FB" },
} as const;
