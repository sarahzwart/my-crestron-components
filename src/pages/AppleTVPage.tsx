import { useTheme } from "@/lib/theme";
import { CH5Button } from "@/components/lib/common/CH5Button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Play,
} from "lucide-react";

export interface AppleTVPageProps {
  signalUp?: string;
  signalDown?: string;
  signalLeft?: string;
  signalRight?: string;
  signalEnter?: string;
  signalMenu?: string;
  signalHome?: string;
  signalBack?: string;
  signalPlayPause?: string;
}

export function AppleTVPage({
  signalUp = "appletv.up",
  signalDown = "appletv.down",
  signalLeft = "appletv.left",
  signalRight = "appletv.right",
  signalEnter = "appletv.enter",
  signalMenu = "appletv.menu",
  signalHome = "appletv.home",
  signalBack = "appletv.back",
  signalPlayPause = "appletv.playpause",
}: AppleTVPageProps) {
  const { theme } = useTheme();

  const ringDir = `w-full h-full !p-0 bg-transparent ${theme.primaryText}`;
  const roundBtn = `w-full h-full ${theme.buttonBackground} ${theme.buttonText} ${theme.buttonActiveBackground}`;

  return (
    <div className={`h-full w-full flex items-center justify-center overflow-hidden ${theme.pageBackground}`}>

      <div
        className={`flex flex-col items-center gap-6 px-6 py-7 rounded-[40px] ${theme.cardBackground} w-[60%] max-w-90`}
      >

        <div className={`relative w-full aspect-square rounded-full ${theme.buttonBackground}`}>

          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-12 h-12">
            <CH5Button variant="momentary" shape="circle" icon={<ChevronUp />}    iconSize={40} commandSignal={signalUp}    className={ringDir} />
          </div>
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-12 h-12">
            <CH5Button variant="momentary" shape="circle" icon={<ChevronDown />}  iconSize={40} commandSignal={signalDown}  className={ringDir} />
          </div>
          <div className="absolute left-0.5 top-1/2 -translate-y-1/2 w-12 h-12">
            <CH5Button variant="momentary" shape="circle" icon={<ChevronLeft />}  iconSize={40} commandSignal={signalLeft}  className={ringDir} />
          </div>
          <div className="absolute right-0.5 top-1/2 -translate-y-1/2 w-12 h-12">
            <CH5Button variant="momentary" shape="circle" icon={<ChevronRight />} iconSize={40} commandSignal={signalRight} className={ringDir} />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%]">
            <CH5Button
              variant="momentary"
              shape="circle"
              label="OK"
              textSize={40}
              commandSignal={signalEnter}
              className={`w-full h-full p-0! ${theme.cardActiveBackground} ${theme.primaryText} tracking-widest font-mono ${theme.buttonActiveBackground}`}
            />
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" icon={<ChevronLeft />} iconSize={40} commandSignal={signalBack} className={roundBtn} />
          </div>
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" icon={<Home />}        iconSize={40} commandSignal={signalHome} className={roundBtn} />
          </div>
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" icon={<Menu />}        iconSize={40} commandSignal={signalMenu} className={roundBtn} />
          </div>
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" icon={<Play />}        iconSize={40} commandSignal={signalPlayPause} className={roundBtn} />
          </div>
        </div>
      </div>
    </div>
  );
}