import { type RoutingItem } from "../pages/RoutingPage";
import { SIGNALS_ROUTING } from "./signals";
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
    commandSignal: SIGNALS_ROUTING.source1.cmd,
    feedbackSignal: SIGNALS_ROUTING.source1.fb,
  },
  {
    id: "source2",
    label: "Source 2",
    icon: <Gamepad2 />,
    description: "Gaming Console",
    commandSignal: SIGNALS_ROUTING.source2.cmd,
    feedbackSignal: SIGNALS_ROUTING.source2.fb,
  },
  {
    id: "source3",
    label: "Source 3",
    icon: <Laptop />,
    description: "HDMI Input",
    commandSignal: SIGNALS_ROUTING.source3.cmd,
    feedbackSignal: SIGNALS_ROUTING.source3.fb,
  },
  {
    id: "source4",
    label: "Source 4",
    icon: <Smartphone />,
    description: "AirPlay",
    commandSignal: SIGNALS_ROUTING.source4.cmd,
    feedbackSignal: SIGNALS_ROUTING.source4.fb,
  },
  {
    id: "source5",
    label: "Source 5",
    icon: <Disc />,
    description: "Disc Player",
    commandSignal: SIGNALS_ROUTING.source5.cmd,
    feedbackSignal: SIGNALS_ROUTING.source5.fb,
  },
  {
    id: "source6",
    label: "Source 6",
    icon: <MonitorPlay />,
    description: "TV Channels",
    commandSignal: SIGNALS_ROUTING.source6.cmd,
    feedbackSignal: SIGNALS_ROUTING.source6.fb,
  },
  {
    id: "source7",
    label: "Source 7",
    icon: <MonitorPlay />,
    description: "TV Channels",
    commandSignal: SIGNALS_ROUTING.source7.cmd,
    feedbackSignal: SIGNALS_ROUTING.source7.fb,
  },
];

export const DESTINATIONS: RoutingItem[] = [
  {
    id: "dest1",
    label: "Destination 1",
    icon: <Tv />,
    description: "75\" Display",
    commandSignal: SIGNALS_ROUTING.dest1.cmd,
    feedbackSignal: SIGNALS_ROUTING.dest1.fb,
  },
  {
    id: "dest2",
    label: "Destination 2",
    icon: <Tv />,
    description: "55\" Display",
    commandSignal: SIGNALS_ROUTING.dest2.cmd,
    feedbackSignal: SIGNALS_ROUTING.dest2.fb,
  },
  {
    id: "dest3",
    label: "Destination 3",
    icon: <Tv />,
    description: "43\" Display",
    commandSignal: SIGNALS_ROUTING.dest3.cmd,
    feedbackSignal: SIGNALS_ROUTING.dest3.fb,
  },
  {
    id: "dest4",
    label: "Destination 4",
    icon: <Speaker />,
    description: "Audio Only",
    commandSignal: SIGNALS_ROUTING.dest4.cmd,
    feedbackSignal: SIGNALS_ROUTING.dest4.fb,
  },
  {
    id: "dest5",
    label: "Destination 5",
    icon: <Headphones />,
    description: "Wireless",
    commandSignal: SIGNALS_ROUTING.dest5.cmd,
    feedbackSignal: SIGNALS_ROUTING.dest5.fb,
  },
  {
    id: "dest6",
    label: "Destination 6",
    icon: <Radio />,
    description: "Outdoor",
    commandSignal: SIGNALS_ROUTING.dest6.cmd,
    feedbackSignal: SIGNALS_ROUTING.dest6.fb,
  },
];
