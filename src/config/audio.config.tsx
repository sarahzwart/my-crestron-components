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
    volumeCommandSignal: "audio.masterVolume",
    volumeFeedbackSignal: "audio.masterVolume_fb",
    muteCommandSignal: "audio.masterMute",
    muteFeedbackSignal: "audio.masterMute_fb",
  },
  {
    id: "tv",
    label: "Television",
    icon: <Tv />,
    volumeCommandSignal: "audio.tvVolume",
    volumeFeedbackSignal: "audio.tvVolume_fb",
    muteCommandSignal: "audio.tvMute",
    muteFeedbackSignal: "audio.tvMute_fb",
  },
  {
    id: "music",
    label: "Music",
    icon: <Music />,
    volumeCommandSignal: "audio.musicVolume",
    volumeFeedbackSignal: "audio.musicVolume_fb",
    muteCommandSignal: "audio.musicMute",
    muteFeedbackSignal: "audio.musicMute_fb",
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Speaker />,
    volumeCommandSignal: "audio.speakersVolume",
    volumeFeedbackSignal: "audio.speakersVolume_fb",
    muteCommandSignal: "audio.speakersMute",
    muteFeedbackSignal: "audio.speakersMute_fb",
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: <Headphones />,
    volumeCommandSignal: "audio.headphonesVolume",
    volumeFeedbackSignal: "audio.headphonesVolume_fb",
    muteCommandSignal: "audio.headphonesMute",
    muteFeedbackSignal: "audio.headphonesMute_fb",
  },
  {
    id: "microphone",
    label: "Microphone",
    icon: <Mic />,
    volumeCommandSignal: "audio.micVolume",
    volumeFeedbackSignal: "audio.micVolume_fb",
    muteCommandSignal: "audio.micMute",
    muteFeedbackSignal: "audio.micMute_fb",
  },
];