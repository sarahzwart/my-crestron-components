import { type RoutingItem } from "../pages/RoutingPage";
import { 
  Tv, Gamepad2, Laptop, Smartphone, Disc, MonitorPlay,
  Speaker, Headphones, Radio, Cast
} from "lucide-react";

export const SOURCES: RoutingItem[] = [
  {
    id: "appletv",
    label: "Apple TV",
    icon: <Tv />,
    description: "4K Streaming",
    commandSignal: "routing.source.appletv",
    feedbackSignal: "routing.source.appletv.fb",
  },
  {
    id: "xbox",
    label: "Xbox",
    icon: <Gamepad2 />,
    description: "Gaming Console",
    commandSignal: "routing.source.xbox",
    feedbackSignal: "routing.source.xbox.fb",
  },
  {
    id: "laptop",
    label: "Laptop",
    icon: <Laptop />,
    description: "HDMI Input",
    commandSignal: "routing.source.laptop",
    feedbackSignal: "routing.source.laptop.fb",
  },
  {
    id: "phone",
    label: "Phone",
    icon: <Smartphone />,
    description: "AirPlay",
    commandSignal: "routing.source.phone",
    feedbackSignal: "routing.source.phone.fb",
  },
  {
    id: "bluray",
    label: "Blu-ray",
    icon: <Disc />,
    description: "Disc Player",
    commandSignal: "routing.source.bluray",
    feedbackSignal: "routing.source.bluray.fb",
  },
  {
    id: "cable",
    label: "Cable Box",
    icon: <MonitorPlay />,
    description: "TV Channels",
    commandSignal: "routing.source.cable",
    feedbackSignal: "routing.source.cable.fb",
  },
];

export const DESTINATIONS: RoutingItem[] = [
  {
    id: "livingroom",
    label: "Living Room",
    icon: <Tv />,
    description: "75\" Display",
    commandSignal: "routing.dest.livingroom",
    feedbackSignal: "routing.dest.livingroom.fb",
  },
  {
    id: "bedroom",
    label: "Bedroom",
    icon: <Tv />,
    description: "55\" Display",
    commandSignal: "routing.dest.bedroom",
    feedbackSignal: "routing.dest.bedroom.fb",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    icon: <Tv />,
    description: "43\" Display",
    commandSignal: "routing.dest.kitchen",
    feedbackSignal: "routing.dest.kitchen.fb",
  },
  {
    id: "speakers",
    label: "Speakers",
    icon: <Speaker />,
    description: "Audio Only",
    commandSignal: "routing.dest.speakers",
    feedbackSignal: "routing.dest.speakers.fb",
  },
  {
    id: "headphones",
    label: "Headphones",
    icon: <Headphones />,
    description: "Wireless",
    commandSignal: "routing.dest.headphones",
    feedbackSignal: "routing.dest.headphones.fb",
  },
  {
    id: "patio",
    label: "Patio",
    icon: <Radio />,
    description: "Outdoor",
    commandSignal: "routing.dest.patio",
    feedbackSignal: "routing.dest.patio.fb",
  },
];