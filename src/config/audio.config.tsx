import { type CH5VolumeSliderProps } from "@/components/lib/CH5Volume";
import { 
  Volume2, Music, Tv, Mic, Speaker, Headphones, Radio, Gamepad2, Film 
} from "lucide-react";

export const AUDIO_CONTROLS: CH5VolumeSliderProps[] = [
  {
    id: "master",
    label: "Master Volume",
    icon: <Volume2 />,
    description: "Controls all audio output",
    volumeCommandSignal: "audio.master.volume",
    volumeFeedbackSignal: "audio.master.volume.fb",
    muteCommandSignal: "audio.master.mute",
    muteFeedbackSignal: "audio.master.mute.fb",
  },
  {
    id: "tv",
    label: "Television",
    icon: <Tv />,
    volumeCommandSignal: "audio.tv.volume",
    volumeFeedbackSignal: "audio.tv.volume.fb",
    muteCommandSignal: "audio.tv.mute",
    muteFeedbackSignal: "audio.tv.mute.fb",
  },
  {
    id: "music",
    label: "Music",
    icon: <Music />,
    volumeCommandSignal: "audio.music.volume",
    volumeFeedbackSignal: "audio.music.volume.fb",
    muteCommandSignal: "audio.music.mute",
    muteFeedbackSignal: "audio.music.mute.fb",
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Speaker />,
    volumeCommandSignal: "audio.speakers.volume",
    volumeFeedbackSignal: "audio.speakers.volume.fb",
    muteCommandSignal: "audio.speakers.mute",
    muteFeedbackSignal: "audio.speakers.mute.fb",
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: <Headphones />,
    volumeCommandSignal: "audio.headphones.volume",
    volumeFeedbackSignal: "audio.headphones.volume.fb",
    muteCommandSignal: "audio.headphones.mute",
    muteFeedbackSignal: "audio.headphones.mute.fb",
  },
  {
    id: "microphone",
    label: "Microphone",
    icon: <Mic />,
    volumeCommandSignal: "audio.mic.volume",
    volumeFeedbackSignal: "audio.mic.volume.fb",
    muteCommandSignal: "audio.mic.mute",
    muteFeedbackSignal: "audio.mic.mute.fb",
  },
];