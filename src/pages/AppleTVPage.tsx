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
  signalUp?:        string;
  signalDown?:      string;
  signalLeft?:      string;
  signalRight?:     string;
  signalEnter?:     string;
  signalMenu?:      string;
  signalPlayPause?: string;
}

export function AppleTVPage({
  signalUp        = "appletv.up",
  signalDown      = "appletv.down",
  signalLeft      = "appletv.left",
  signalRight     = "appletv.right",
  signalEnter     = "appletv.enter",
  signalMenu      = "appletv.menu",
  signalPlayPause = "appletv.playpause",
}: AppleTVPageProps) {
  const { theme } = useTheme();

  const PlayPauseIcon = (
    <span className="flex items-center gap-1.5">
      <Play  size={20} />
      <Pause size={20} />
    </span>
  );

  const navClass    = `w-full h-full ${theme.buttonBackground} ${theme.buttonText} ${theme.buttonActiveBackground}`;
  const enterClass  = `w-full h-full ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground} tracking-widest font-mono`;
  const actionClass = `w-full h-full ${theme.buttonBackground} ${theme.buttonText} ${theme.buttonActiveBackground} tracking-widest font-mono gap-1.5`;

  return (
    <div className={`h-full w-full flex items-center justify-center overflow-hidden ${theme.pageBackground}`}>
      <div className="flex flex-col gap-3 min-h-9/12 min-w-5/12" >
        <div className="flex-3 grid grid-cols-3 grid-rows-3 gap-2">
          <span />
          <CH5Button variant="momentary" shape="rounded" icon={<ChevronUp />}    iconSize={24} commandSignal={signalUp}    className={navClass} />
          <span />

          <CH5Button variant="momentary" shape="rounded" icon={<ChevronLeft />}  iconSize={24} commandSignal={signalLeft}  className={navClass} />
          <CH5Button variant="momentary" shape="circle"  label="OK" textSize={32} commandSignal={signalEnter} className={enterClass} />
          <CH5Button variant="momentary" shape="rounded" icon={<ChevronRight />} iconSize={24} commandSignal={signalRight} className={navClass} />

          <span />
          <CH5Button variant="momentary" shape="rounded" icon={<ChevronDown />}  iconSize={24} commandSignal={signalDown}  className={navClass} />
          <span />
        </div>

        <div className={`w-full h-px opacity-10 ${theme.secondaryText}`} />

        <div className="flex-1 grid grid-cols-2 gap-2">
          <CH5Button
            variant="momentary" shape="rounded"
            icon={<Menu />} iconSize={20}
            iconPosition="top" label="MENU" textSize={9}
            commandSignal={signalMenu}
            className={actionClass}
          />
          <CH5Button
            variant="momentary" shape="rounded"
            icon={PlayPauseIcon}
            iconPosition="top" label="PLAY / PAUSE" textSize={9}
            commandSignal={signalPlayPause}
            className={actionClass}
          />
        </div>

      </div>
    </div>
  );
}