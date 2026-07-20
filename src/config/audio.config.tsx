import { type CH5VolumeSliderProps } from "@/components/ch5/volume/CH5Volume";
import { signals } from "./signals";
import {
  Volume2, Music, Tv, Mic, Speaker, Headphones,
} from "lucide-react";

export const AUDIO_CONTROLS: CH5VolumeSliderProps[] = [
  {
    id: "master",
    label: "Master Volume",
    icon: <Volume2 />,
    description: "Controls all audio output",
    volumeCommandSignal: signals.audio.volume0.volume.cmd,
    volumeFeedbackSignal: signals.audio.volume0.volume.fb,
    muteCommandSignal: signals.audio.volume0.mute.cmd,
    muteFeedbackSignal: signals.audio.volume0.mute.fb,
  },
  {
    id: "tv",
    label: "Television",
    icon: <Tv />,
    volumeCommandSignal: signals.audio.volume1.volume.cmd,
    volumeFeedbackSignal: signals.audio.volume1.volume.fb,
    muteCommandSignal: signals.audio.volume1.mute.cmd,
    muteFeedbackSignal: signals.audio.volume1.mute.fb,
  },
  {
    id: "music",
    label: "Music",
    icon: <Music />,
    volumeCommandSignal: signals.audio.volume2.volume.cmd,
    volumeFeedbackSignal: signals.audio.volume2.volume.fb,
    muteCommandSignal: signals.audio.volume2.mute.cmd,
    muteFeedbackSignal: signals.audio.volume2.mute.fb,
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Speaker />,
    volumeCommandSignal: signals.audio.volume3.volume.cmd,
    volumeFeedbackSignal: signals.audio.volume3.volume.fb,
    muteCommandSignal: signals.audio.volume3.mute.cmd,
    muteFeedbackSignal: signals.audio.volume3.mute.fb,
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: <Headphones />,
    volumeCommandSignal: signals.audio.volume4.volume.cmd,
    volumeFeedbackSignal: signals.audio.volume4.volume.fb,
    muteCommandSignal: signals.audio.volume4.mute.cmd,
    muteFeedbackSignal: signals.audio.volume4.mute.fb,
  },
  {
    id: "microphone",
    label: "Microphone",
    icon: <Mic />,
    volumeCommandSignal: signals.audio.volume5.volume.cmd,
    volumeFeedbackSignal: signals.audio.volume5.volume.fb,
    muteCommandSignal: signals.audio.volume5.mute.cmd,
    muteFeedbackSignal: signals.audio.volume5.mute.fb,
  }
];
