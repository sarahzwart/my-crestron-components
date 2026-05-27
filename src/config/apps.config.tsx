import { type AppItem } from "../pages/HomePage";
import { Music, Phone, Shuffle, Lightbulb } from "lucide-react";

export const APPS: AppItem[] = [
  {
    id: "audio",
    label: "Audio",
    icon: <Music />,
    description: "Volume & controls",
  },
  {
    id: "call",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
  },
  {
    id: "routing",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
  },
  {
    id: "lights",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
  },
];