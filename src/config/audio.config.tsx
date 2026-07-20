import { type CH5VolumeSliderProps } from "@/components/ch5/volume/CH5Volume";
import { SIGNALS_AUDIO } from "./signals";
import {
  Volume2, Music, Tv, Mic, Speaker, Headphones,
} from "lucide-react";

export const AUDIO_CONTROLS: CH5VolumeSliderProps[] = [
  {
    id: "master",
    label: "Master Volume",
    icon: <Volume2 />,
    description: "Controls all audio output",
    volumeCommandSignal: SIGNALS_AUDIO.master.cmd,
    volumeFeedbackSignal: SIGNALS_AUDIO.master.fb,
    muteCommandSignal: SIGNALS_AUDIO.masterMute.cmd,
    muteFeedbackSignal: SIGNALS_AUDIO.masterMute.fb,
  },
  {
    id: "tv",
    label: "Television",
    icon: <Tv />,
    volumeCommandSignal: SIGNALS_AUDIO.zone1.cmd,
    volumeFeedbackSignal: SIGNALS_AUDIO.zone1.fb,
    muteCommandSignal: SIGNALS_AUDIO.zone1Mute.cmd,
    muteFeedbackSignal: SIGNALS_AUDIO.zone1Mute.fb,
  },
  {
    id: "music",
    label: "Music",
    icon: <Music />,
    volumeCommandSignal: SIGNALS_AUDIO.zone2.cmd,
    volumeFeedbackSignal: SIGNALS_AUDIO.zone2.fb,
    muteCommandSignal: SIGNALS_AUDIO.zone2Mute.cmd,
    muteFeedbackSignal: SIGNALS_AUDIO.zone2Mute.fb,
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Speaker />,
    volumeCommandSignal: SIGNALS_AUDIO.zone3.cmd,
    volumeFeedbackSignal: SIGNALS_AUDIO.zone3.fb,
    muteCommandSignal: SIGNALS_AUDIO.zone3Mute.cmd,
    muteFeedbackSignal: SIGNALS_AUDIO.zone3Mute.fb,
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: <Headphones />,
    volumeCommandSignal: SIGNALS_AUDIO.zone4.cmd,
    volumeFeedbackSignal: SIGNALS_AUDIO.zone4.fb,
    muteCommandSignal: SIGNALS_AUDIO.zone4Mute.cmd,
    muteFeedbackSignal: SIGNALS_AUDIO.zone4Mute.fb,
  },
  {
    id: "microphone",
    label: "Microphone",
    icon: <Mic />,
    volumeCommandSignal: SIGNALS_AUDIO.zone5.cmd,
    volumeFeedbackSignal: SIGNALS_AUDIO.zone5.fb,
    muteCommandSignal: SIGNALS_AUDIO.zone5Mute.cmd,
    muteFeedbackSignal: SIGNALS_AUDIO.zone5Mute.fb,
  }
];
