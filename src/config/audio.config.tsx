import { type CH5VolumeSliderProps } from "@/components/lib/volume/CH5Volume";
import {
  Volume2, Music, Tv, Mic, Speaker, Headphones,
} from "lucide-react";

export const AUDIO_CONTROLS: CH5VolumeSliderProps[] = [
  {
    id: "master",
    label: "Master Volume",
    icon: <Volume2 />,
    description: "Controls all audio output",
    volumeCommandSignal: "Audio.MasterVolume",
    volumeFeedbackSignal: "Audio.MasterVolume_FB",
    muteCommandSignal: "Audio.MasterMute",
    muteFeedbackSignal: "Audio.MasterMute_FB",
  },
  {
    id: "tv",
    label: "Television",
    icon: <Tv />,
    volumeCommandSignal: "Audio.TvVolume",
    volumeFeedbackSignal: "Audio.TvVolume_FB",
    muteCommandSignal: "Audio.TvMute",
    muteFeedbackSignal: "Audio.TvMute_FB",
  },
  {
    id: "music",
    label: "Music",
    icon: <Music />,
    volumeCommandSignal: "Audio.MusicVolume",
    volumeFeedbackSignal: "Audio.MusicVolume_FB",
    muteCommandSignal: "Audio.MusicMute",
    muteFeedbackSignal: "Audio.MusicMute_FB",
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Speaker />,
    volumeCommandSignal: "Audio.SpeakersVolume",
    volumeFeedbackSignal: "Audio.SpeakersVolume_FB",
    muteCommandSignal: "Audio.SpeakersMute",
    muteFeedbackSignal: "Audio.SpeakersMute_FB",
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: <Headphones />,
    volumeCommandSignal: "Audio.HeadphonesVolume",
    volumeFeedbackSignal: "Audio.HeadphonesVolume_FB",
    muteCommandSignal: "Audio.HeadphonesMute",
    muteFeedbackSignal: "Audio.HeadphonesMute_FB",
  },
  {
    id: "microphone",
    label: "Microphone",
    icon: <Mic />,
    volumeCommandSignal: "Audio.MicVolume",
    volumeFeedbackSignal: "Audio.MicVolume_FB",
    muteCommandSignal: "Audio.MicMute",
    muteFeedbackSignal: "Audio.MicMute_FB",
  },
];
