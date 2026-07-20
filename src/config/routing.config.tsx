import { type RoutingItem } from "../pages/RoutingPage";
import { signals } from "./signals";
import {
  Tv, Gamepad2, Laptop, Smartphone, Disc, MonitorPlay,
  Speaker, Headphones, Radio,
} from "lucide-react";

export const SOURCES: RoutingItem[] = [
  {
    id: "source1",
    label: "Source 1",
    icon: <Tv />,
    description: "4K Streaming",
    commandSignal: signals.routing.source0.cmd,
    feedbackSignal: signals.routing.source0.fb,
  },
  {
    id: "source2",
    label: "Source 2",
    icon: <Gamepad2 />,
    description: "Gaming Console",
    commandSignal: signals.routing.source1.cmd,
    feedbackSignal: signals.routing.source1.fb,
  },
  {
    id: "source3",
    label: "Source 3",
    icon: <Laptop />,
    description: "HDMI Input",
    commandSignal: signals.routing.source2.cmd,
    feedbackSignal: signals.routing.source2.fb,
  },
  {
    id: "source4",
    label: "Source 4",
    icon: <Smartphone />,
    description: "AirPlay",
    commandSignal: signals.routing.source3.cmd,
    feedbackSignal: signals.routing.source3.fb,
  },
  {
    id: "source5",
    label: "Source 5",
    icon: <Disc />,
    description: "Disc Player",
    commandSignal: signals.routing.source4.cmd,
    feedbackSignal: signals.routing.source4.fb,
  },
  {
    id: "source6",
    label: "Source 6",
    icon: <MonitorPlay />,
    description: "TV Channels",
    commandSignal: signals.routing.source5.cmd,
    feedbackSignal: signals.routing.source5.fb,
  },
  {
    id: "source7",
    label: "Source 7",
    icon: <MonitorPlay />,
    description: "TV Channels",
    commandSignal: signals.routing.source6.cmd,
    feedbackSignal: signals.routing.source6.fb,
  },
];

export const DESTINATIONS: RoutingItem[] = [
  {
    id: "dest1",
    label: "Destination 1",
    icon: <Tv />,
    description: "75\" Display",
    commandSignal: signals.routing.destination0.cmd,
    feedbackSignal: signals.routing.destination0.fb,
  },
  {
    id: "dest2",
    label: "Destination 2",
    icon: <Tv />,
    description: "55\" Display",
    commandSignal: signals.routing.destination1.cmd,
    feedbackSignal: signals.routing.destination1.fb,
  },
  {
    id: "dest3",
    label: "Destination 3",
    icon: <Tv />,
    description: "43\" Display",
    commandSignal: signals.routing.destination2.cmd,
    feedbackSignal: signals.routing.destination2.fb,
  },
  {
    id: "dest4",
    label: "Destination 4",
    icon: <Speaker />,
    description: "Audio Only",
    commandSignal: signals.routing.destination3.cmd,
    feedbackSignal: signals.routing.destination3.fb,
  },
  {
    id: "dest5",
    label: "Destination 5",
    icon: <Headphones />,
    description: "Wireless",
    commandSignal: signals.routing.destination4.cmd,
    feedbackSignal: signals.routing.destination4.fb,
  },
  {
    id: "dest6",
    label: "Destination 6",
    icon: <Radio />,
    description: "Outdoor",
    commandSignal: signals.routing.destination5.cmd,
    feedbackSignal: signals.routing.destination5.fb,
  },
];
