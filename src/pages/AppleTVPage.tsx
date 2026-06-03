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

  // rest / press color pairs
  const wedgeOff = `bg-transparent ${theme.primaryText}`;
  const wedgeOn = `${theme.buttonActiveBackground} ${theme.buttonActiveText}`;
  const okOff = `${theme.cardBackground} ${theme.primaryText}`;
  const okOn = `${theme.cardActiveBackground} ${theme.primaryText}`;
  const roundOff = `${theme.buttonBackground} ${theme.buttonText}`;
  const roundOn = `${theme.buttonActiveBackground} ${theme.buttonActiveText}`;

  return (
    <div className={`h-full w-full flex items-center justify-center overflow-hidden ${theme.pageBackground}`}>
      <div className={`flex flex-col items-center gap-6 px-6 py-7 rounded-[40px] ${theme.cardBackground} w-[60%] max-w-90`}>
        <div className={`relative w-full aspect-square rounded-full ${theme.buttonBackground}`}>
          <CH5Button
            variant="momentary" shape="circle" offClassName={wedgeOff} onClassName={wedgeOn}
            icon={<ChevronUp />} iconSize={32} commandSignal={signalUp}
            className="absolute inset-0 w-full h-full px-0! pt-4! pb-[75%]! [clip-path:polygon(50%_50%,0%_0%,100%_0%)]"
          />
          <CH5Button
            variant="momentary" shape="circle" offClassName={wedgeOff} onClassName={wedgeOn}
            icon={<ChevronDown />} iconSize={32} commandSignal={signalDown}
            className="absolute inset-0 w-full h-full px-0! pb-4! pt-[75%]! [clip-path:polygon(50%_50%,100%_100%,0%_100%)]"
          />
          <CH5Button
            variant="momentary" shape="circle" offClassName={wedgeOff} onClassName={wedgeOn}
            icon={<ChevronLeft />} iconSize={32} commandSignal={signalLeft}
            className="absolute inset-0 w-full h-full py-0! pl-4! pr-[75%]! [clip-path:polygon(50%_50%,0%_0%,0%_100%)]"
          />
          <CH5Button
            variant="momentary" shape="circle" offClassName={wedgeOff} onClassName={wedgeOn}
            icon={<ChevronRight />} iconSize={32} commandSignal={signalRight}
            className="absolute inset-0 w-full h-full py-0! pr-4! pl-[75%]! [clip-path:polygon(50%_50%,100%_0%,100%_100%)]"
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] z-10">
            <CH5Button
              variant="momentary" shape="circle" offClassName={okOff} onClassName={okOn}
              label="OK" textSize={32} commandSignal={signalEnter}
              className="w-full h-full p-0! tracking-widest font-mono"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" offClassName={roundOff} onClassName={roundOn} icon={<ChevronLeft />} iconSize={40} commandSignal={signalBack} className="w-full h-full p-0!" />
          </div>
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" offClassName={roundOff} onClassName={roundOn} icon={<Home />}        iconSize={40} commandSignal={signalHome} className="w-full h-full p-0!" />
          </div>
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" offClassName={roundOff} onClassName={roundOn} icon={<Menu />}        iconSize={40} commandSignal={signalMenu} className="w-full h-full p-0!" />
          </div>
          <div className="aspect-square">
            <CH5Button variant="momentary" shape="circle" offClassName={roundOff} onClassName={roundOn} icon={<Play />}        iconSize={40} commandSignal={signalPlayPause} className="w-full h-full p-0!" />
          </div>
        </div>
      </div>
    </div>
  );
}