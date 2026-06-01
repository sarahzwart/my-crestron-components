import { useTheme } from "@/lib/theme";
import { CH5Button } from "@/components/lib/common/CH5Button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Menu,
} from "lucide-react";

export interface AppleTVPageProps {
  signalUp?: string;
  signalDown?: string;
  signalLeft?: string;
  signalRight?: string;
  signalEnter?: string;
  signalMenu?: string;
  signalPlay?: string;
  signalPause?: string;
}

export function AppleTVPage({
    signalUp    = "appletv.up",
    signalDown  = "appletv.down",
    signalLeft  = "appletv.left",
    signalRight = "appletv.right",
    signalEnter = "appletv.enter",
    signalMenu  = "appletv.menu",
    signalPlay  = "appletv.play",
    signalPause = "appletv.pause",
}: AppleTVPageProps) {
  return (
    <div>
      <h1>Apple TV Page</h1>
    </div>
  );
}
