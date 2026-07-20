export const signals = {
  
  navigation: {
    // Digital Values
    page0: { cmd: "Page[0].Press", fb: "Page[0].FB" },
    page1: { cmd: "Page[1].Press", fb: "Page[1].FB" },
    page2: { cmd: "Page[2].Press", fb: "Page[2].FB" },
    page3: { cmd: "Page[3].Press", fb: "Page[3].FB" },
    page4: { cmd: "Page[4].Press", fb: "Page[4].FB" },
    page5: { cmd: "Page[5].Press", fb: "Page[5].FB" },
    page6: { cmd: "Page[6].Press", fb: "Page[6].FB" },
    page7: { cmd: "Page[7].Press", fb: "Page[7].FB" },
    page8: { cmd: "Page[8].Press", fb: "Page[8].FB" },
    page9: { cmd: "Page[9].Press", fb: "Page[9].FB" },
    tab0: { cmd: "Tab[0].Press", fb: "Tab[0].FB" },
    tab1: { cmd: "Tab[1].Press", fb: "Tab[1].FB" },
    tab2: { cmd: "Tab[2].Press", fb: "Tab[2].FB" },
  },

  audio: {
    
    volume0: {
      // Analog Values
      volume: { cmd: "Audio[0].Volume", fb: "Audio[0].Volume_FB" },
      // Digital Values
      mute:   { cmd: "Audio[0].Mute_Press", fb: "Audio[0].Mute_FB" },
      volumeUp:   { cmd: "Audio[0].Volume_Up_Press", fb: "Audio[0].Volume_Up_FB" },
      volumeDown: { cmd: "Audio[0].Volume_Down_Press", fb: "Audio[0].Volume_Down_FB" },
    },

    volume1: {
      volume: { cmd: "Audio[1].Volume", fb: "Audio[1].Volume_FB" },
      mute:   { cmd: "Audio[1].Mute_Press", fb: "Audio[1].Mute_FB" },
      volumeUp:   { cmd: "Audio[1].Volume_Up_Press", fb: "Audio[1].Volume_Up_FB" },
      volumeDown: { cmd: "Audio[1].Volume_Down_Press", fb: "Audio[1].Volume_Down_FB" },
    },

    volume2: {
      volume: { cmd: "Audio[2].Volume", fb: "Audio[2].Volume_FB" },
      mute:   { cmd: "Audio[2].Mute_Press", fb: "Audio[2].Mute_FB" },   
      volumeUp:   { cmd: "Audio[2].Volume_Up_Press", fb: "Audio[2].Volume_Up_FB" }, 
      volumeDown: { cmd: "Audio[2].Volume_Down_Press", fb: "Audio[2].Volume_Down_FB" },
    },

    volume3: {
      volume: { cmd: "Audio[3].Volume", fb: "Audio[3].Volume_FB" },
      mute:   { cmd: "Audio[3].Mute_Press", fb: "Audio[3].Mute_FB" },
      volumeUp:   { cmd: "Audio[3].Volume_Up_Press", fb: "Audio[3].Volume_Up_FB" }, 
      volumeDown: { cmd: "Audio[3].Volume_Down_Press", fb: "Audio[3].Volume_Down_FB" },
    },

    volume4: {
      volume: { cmd: "Audio[4].Volume", fb: "Audio[4].Volume_FB" },
      mute:   { cmd: "Audio[4].Mute_Press", fb: "Audio[4].Mute_FB" },
      volumeUp:   { cmd: "Audio[4].Volume_Up_Press", fb: "Audio[4].Volume_Up_FB" },
      volumeDown: { cmd: "Audio[4].Volume_Down_Press", fb: "Audio[4].Volume_Down_FB" },
    }
   
  },

  routing: {
    // Digital Values
    source0: { cmd: "Routing[0].Source_Press", fb: "Routing[0].Source_FB" },
    source1: { cmd: "Routing[1].Source_Press", fb: "Routing[1].Source_FB" },
    source2: { cmd: "Routing[2].Source_Press", fb: "Routing[2].Source_FB" },
    source3: { cmd: "Routing[3].Source_Press", fb: "Routing[3].Source_FB" },
    source4: { cmd: "Routing[4].Source_Press", fb: "Routing[4].Source_FB" },

    destination0: { cmd: "Routing[0].Destination_Press", fb: "Routing[0].Destination_FB" },
    destination1: { cmd: "Routing[1].Destination_Press", fb: "Routing[1].Destination_FB" },
    destination2: { cmd: "Routing[2].Destination_Press", fb: "Routing[2].Destination_FB" },
    destination3: { cmd: "Routing[3].Destination_Press", fb: "Routing[3].Destination_FB" },
    destination4: { cmd: "Routing[4].Destination_Press", fb: "Routing[4].Destination_FB" }
  },

  camera: {
    zoomIn: { cmd: "Camera.Zoom_In_Press", fb: undefined }, 
    zoomOut: { cmd: "Camera.Zoom_Out_Press", fb: undefined }, 
    panLeft: { cmd: "Camera.Pan_Left_Press", fb: undefined }, 
    panRight: { cmd: "Camera.Pan_Right_Press", fb: undefined }, 
    tiltUp: { cmd: "Camera.Tilt_Up_Press", fb: undefined }, 
    tiltDown: { cmd: "Camera.Tilt_Down_Press", fb: undefined }, 
    home: { cmd: "Camera.Home_Press", fb: undefined }, 
    autoFocus: { cmd: "Camera.AutoFocus_Press", fb: "Camera.AutoFocus_FB" }, 
    selected: { cmd: "Camera.Selected", fb: "Camera.Selected_FB" }, 
    'preset1': { cmd: "Camera.Preset_1", fb: "Camera.Preset_1_FB" }, 
    'preset2': { cmd: "Camera.Preset_2", fb: "Camera.Preset_2_FB" }, 
    'preset3': { cmd: "Camera.Preset_3", fb: "Camera.Preset_3_FB" },
  },

  audioCall: {
    dial: { cmd: "AudioCall.Dial", fb: "AudioCall.Dial_FB" },
    hangup: { cmd: "AudioCall.Hangup", fb: "AudioCall.Hangup_FB" },
    answer: { cmd: "AudioCall.Answer", fb: "AudioCall.Answer_FB" },
    privacy: { cmd: "AudioCall.Privacy", fb: "AudioCall.Privacy_FB" },
  },

  music: {
    // digital - command + feedback 
    previous: { cmd: "Music.Previous_Press", fb: undefined }, 
    playPause: { cmd: "Music.PlayPause_Press", fb: "Music.PlayPause_FB" }, 
    next: { cmd: "Music.Next_Press", fb: undefined }, 
    // digital — feedback only 
    playing: { cmd: undefined, fb: "Music.Playing_FB" }, 
    paused: { cmd: undefined, fb: "Music.Paused_FB" }, 
    nextTrackAvailable: { cmd: undefined, fb: "Music.Next_Available_FB" }, 
    previousTrackAvailable: { cmd: undefined, fb: "Music.Previous_Available_FB" }, 
    shuffleAvailable: { cmd: undefined, fb: "Music.Shuffle_Available_FB" }, 
    repeatAllAvailable: { cmd: undefined, fb: "Music.Repeat_All_Available_FB" }, 
    repeatOneAvailable: { cmd: undefined, fb: "Music.Repeat_One_Available_FB" }, 

    // analog — command + feedback 
    shuffle: { cmd: "Music.Shuffle", fb: "Music.Shuffle_FB" }, 
    repeat: { cmd: "Music.Repeat", fb: "Music.Repeat_FB" }, 
    // analog — feedback only 
    nowPlayingLengthSeconds: { cmd: undefined, fb: "Music.Now_Playing_Length_FB" }, 
    nowPlayingPositionSeconds: { cmd: undefined, fb: "Music.Now_Playing_Position_FB" }, 
    nowPlayingPositionGauge: { cmd: undefined, fb: "Music.Now_Playing_Gauge_FB" }, 
    numberOfFavorites: { cmd: undefined, fb: "Music.Number_Of_Favorites_FB" }, 
    // serial — feedback only 
    trackName: { cmd: undefined, fb: "Music.Track_Name_FB" }, 
    artistName: { cmd: undefined, fb: "Music.Artist_Name_FB" }, 
    albumName: { cmd: undefined, fb: "Music.Album_Name_FB" }, 
    imageUrl: { cmd: undefined, fb: "Music.Image_URL_FB" }, 
    providerName: { cmd: undefined, fb: "Music.Provider_Name_FB" }, 
    providerImageUrl: { cmd: undefined, fb: "Music.Provider_Image_URL_FB" },
  },

  appleTV: {
    up: { cmd: "AppleTV.Up", fb: undefined }, 
    down: { cmd: "AppleTV.Down", fb: undefined }, 
    left: { cmd: "AppleTV.Left", fb: undefined }, 
    right: { cmd: "AppleTV.Right", fb: undefined }, 
    enter: { cmd: "AppleTV.Enter", fb: undefined }, 
    menu: { cmd: "AppleTV.Menu", fb: undefined }, 
    home: { cmd: "AppleTV.Home", fb: undefined }, 
    back: { cmd: "AppleTV.Back", fb: undefined }, 
    playPause: { cmd: "AppleTV.PlayPause", fb: undefined },
  },

  settings: {
    // Analog Values
    theme: { cmd: "Settings.Theme", fb: "Settings.Theme_FB" },
    font: { cmd: "Settings.Font", fb: "Settings.Font_FB" },
  },

  system: {
    power: { cmd: "System.Power_Off", fb: "System.Power_Off_FB" },
    cancel: { cmd: "System.Cancel_Power_Off", fb: "System.Cancel_Power_Off_FB" },
  }


}