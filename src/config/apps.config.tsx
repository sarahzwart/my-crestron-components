import { type AppItem } from "../pages/HomePage";
import { Music, Phone, Shuffle, Lightbulb, Camera, Apple } from "lucide-react";

export const APPS: AppItem[] = [
  {
    id: "audio",
    label: "Audio",
    icon: <Music />,
    description: "Volume & controls",
    commandSignal: "nav.page.audio",
    feedbackSignal: "nav.page.audio.fb",
  },
  {
    id: "call",
    label: "Phone",
    icon: <Phone />,
    description: "Make a call",
    commandSignal: "nav.page.call",
    feedbackSignal: "nav.page.call.fb",
  },
  {
    id: "routing",
    label: "Routing",
    icon: <Shuffle />,
    description: "Route sources",
    commandSignal: "nav.page.routing",
    feedbackSignal: "nav.page.routing.fb",
  },
  {
    id: "lights",
    label: "Lights",
    icon: <Lightbulb />,
    description: "Lighting control",
    commandSignal: "nav.page.lights",
    feedbackSignal: "nav.page.lights.fb",
  },
  {
    id: "camera",
    label: "Camera",
    icon: <Camera />,
    description: "Camera control",
    commandSignal: "nav.page.camera",
    feedbackSignal: "nav.page.camera.fb",
  },
  {
    id: "appleTV",
    label: "Apple TV",
    icon: <Apple />,
    description: "Apple TV control",
    commandSignal: "nav.page.appleTV",
    feedbackSignal: "nav.page.appleTV.fb",
  },
];