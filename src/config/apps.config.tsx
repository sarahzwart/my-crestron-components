import { type AppItem } from "../pages/HomePage";
import { signals } from "./signals";
import {
  Music,
  Phone,
  Shuffle,
  Lightbulb,
  Camera,
  Apple,
  LayoutGrid,
  Disc3,
  Loader
} from "lucide-react";

export const APPS: AppItem[] = [
  {
    id: "audio",
    label: "Audio",
    icon: <Music />,
    description: "Volume & controls",
    commandSignal: signals.navigation.page0.cmd,
    feedbackSignal: signals.navigation.page0.fb,
  },
  {
    id: "call",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
    commandSignal: signals.navigation.page1.cmd,
    feedbackSignal: signals.navigation.page1.fb,
  },
  {
    id: "routing",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
    commandSignal: signals.navigation.page2.cmd,
    feedbackSignal: signals.navigation.page2.fb,
  },
  {
    id: "lights",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
    commandSignal: signals.navigation.page3.cmd,
    feedbackSignal: signals.navigation.page3.fb,
  },
  {
    id: "camera",
    label: "Camera",
    icon: <Camera />,
    description: "Camera control",
    commandSignal: signals.navigation.page4.cmd,
    feedbackSignal: signals.navigation.page4.fb,
  },
  {
    id: "appleTV",
    label: "Apple TV",
    icon: <Apple />,
    description: "Apple TV control",
    commandSignal: signals.navigation.page5.cmd,
    feedbackSignal: signals.navigation.page5.fb,
  },
  {
    id: "music",
    label: "Music",
    icon: <Disc3 />,
    description: "Music Player",
    commandSignal: signals.navigation.page6.cmd,
    feedbackSignal: signals.navigation.page6.fb,
  },
  {
    id: "overview",
    label: "Overview",
    icon: <LayoutGrid />,
    description: "All pages",
    commandSignal: signals.navigation.page7.cmd,
    feedbackSignal: signals.navigation.page7.fb,
  },
];
