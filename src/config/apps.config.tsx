import { type AppItem } from "../pages/HomePage";
import {
  Music,
  Phone,
  Shuffle,
  Lightbulb,
  Camera,
  Apple,
  LayoutGrid,
} from "lucide-react";

export const APPS: AppItem[] = [
  {
    id: "audio",
    label: "Audio",
    icon: <Music />,
    description: "Volume & controls",
    commandSignal: "nav.audio",
    feedbackSignal: "nav.audio_fb",
  },
  {
    id: "call",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
    commandSignal: "nav.call",
    feedbackSignal: "nav.call_fb",
  },
  {
    id: "routing",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
    commandSignal: "nav.routing",
    feedbackSignal: "nav.routing_fb",
  },
  {
    id: "lights",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
    commandSignal: "nav.lights",
    feedbackSignal: "nav.lights_fb",
  },
  {
    id: "camera",
    label: "Camera",
    icon: <Camera />,
    description: "Camera control",
    commandSignal: "nav.camera",
    feedbackSignal: "nav.camera_fb",
  },
  {
    id: "appleTV",
    label: "Apple TV",
    icon: <Apple />,
    description: "Apple TV control",
    commandSignal: "nav.appleTV",
    feedbackSignal: "nav.appleTV_fb",
  },
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutGrid />,
    description: "All pages",
    commandSignal: "nav.overview",
    feedbackSignal: "nav.overview_fb",
  },
];
