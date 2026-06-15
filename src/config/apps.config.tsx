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
    commandSignal: "Navpage.Audio",
    feedbackSignal: "Navpage.Audio_FB",
  },
  {
    id: "call",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
    commandSignal: "Navpage.Call",
    feedbackSignal: "Navpage.Call_FB",
  },
  {
    id: "routing",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
    commandSignal: "Navpage.Routing",
    feedbackSignal: "Navpage.Routing_FB",
  },
  {
    id: "lights",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
    commandSignal: "Navpage.Lights",
    feedbackSignal: "Navpage.Lights_FB",
  },
  {
    id: "camera",
    label: "Camera",
    icon: <Camera />,
    description: "Camera control",
    commandSignal: "Navpage.Camera",
    feedbackSignal: "Navpage.Camera_FB",
  },
  {
    id: "appleTV",
    label: "Apple TV",
    icon: <Apple />,
    description: "Apple TV control",
    commandSignal: "Navpage.AppleTV",
    feedbackSignal: "Navpage.AppleTV_FB",
  },
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutGrid />,
    description: "All pages",
    commandSignal: "Navpage.Overview",
    feedbackSignal: "Navpage.Overview_FB",
  },
];
