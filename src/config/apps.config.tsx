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
    id: "page0",
    label: "Audio",
    icon: <Music />,
    description: "Volume & controls",
    commandSignal: signals.navigation.page0.cmd,
    feedbackSignal: signals.navigation.page0.fb,
  },
  {
    id: "page1",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
    commandSignal: signals.navigation.page1.cmd,
    feedbackSignal: signals.navigation.page1.fb,
  },
  {
    id: "page2",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
    commandSignal: signals.navigation.page2.cmd,
    feedbackSignal: signals.navigation.page2.fb,
  },
  {
    id: "page3",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
    commandSignal: signals.navigation.page3.cmd,
    feedbackSignal: signals.navigation.page3.fb,
  },
  {
    id: "page4",
    label: "Camera",
    icon: <Camera />,
    description: "Camera control",
    commandSignal: signals.navigation.page4.cmd,
    feedbackSignal: signals.navigation.page4.fb,
  },
  {
    id: "page5",
    label: "Apple TV",
    icon: <Apple />,
    description: "Apple TV control",
    commandSignal: signals.navigation.page5.cmd,
    feedbackSignal: signals.navigation.page5.fb,
  },
  {
    id: "page6",
    label: "Music",
    icon: <Disc3 />,
    description: "Music Player",
    commandSignal: signals.navigation.page6.cmd,
    feedbackSignal: signals.navigation.page6.fb,
  },
  {
    id: "page7",
    label: "Overview",
    icon: <LayoutGrid />,
    description: "All pages",
    commandSignal: signals.navigation.page7.cmd,
    feedbackSignal: signals.navigation.page7.fb,
  },
];
