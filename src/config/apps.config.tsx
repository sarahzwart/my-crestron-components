import { type AppItem } from "../pages/HomePage";
import { SIGNALS_NAVPAGE } from "./signals";
import {
  Music,
  Phone,
  Shuffle,
  Lightbulb,
  Camera,
  Apple,
  LayoutGrid,
  Disc3
} from "lucide-react";

export const APPS: AppItem[] = [
  {
    id: "audio",
    label: "Audio",
    icon: <Music />,
    description: "Volume & controls",
    commandSignal: SIGNALS_NAVPAGE.audio.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.audio.fb,
  },
  {
    id: "call",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
    commandSignal: SIGNALS_NAVPAGE.call.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.call.fb,
  },
  {
    id: "routing",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
    commandSignal: SIGNALS_NAVPAGE.routing.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.routing.fb,
  },
  {
    id: "lights",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
    commandSignal: SIGNALS_NAVPAGE.lights.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.lights.fb,
  },
  {
    id: "camera",
    label: "Camera",
    icon: <Camera />,
    description: "Camera control",
    commandSignal: SIGNALS_NAVPAGE.camera.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.camera.fb,
  },
  {
    id: "appleTV",
    label: "Apple TV",
    icon: <Apple />,
    description: "Apple TV control",
    commandSignal: SIGNALS_NAVPAGE.appleTV.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.appleTV.fb,
  },
  {
    id: "music",
    label: "Music",
    icon: <Disc3 />,
    description: "Music Player",
    commandSignal: SIGNALS_NAVPAGE.music.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.music.fb,
  },
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutGrid />,
    description: "All pages",
    commandSignal: SIGNALS_NAVPAGE.overview.cmd,
    feedbackSignal: SIGNALS_NAVPAGE.overview.fb,
  },
];
