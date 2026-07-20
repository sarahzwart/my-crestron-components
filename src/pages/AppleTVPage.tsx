import { useTheme } from "@/lib/theme";
import { CH5Button } from "@/components/ch5/common/CH5Button";
import { signals } from "@/config/signals";
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

export const AppleTVPage = ({
  signalUp       = signals.appleTV.up.cmd,
  signalDown     = signals.appleTV.down.cmd,
  signalLeft     = signals.appleTV.left.cmd,
  signalRight    = signals.appleTV.right.cmd,
  signalEnter    = signals.appleTV.enter.cmd,
  signalMenu     = signals.appleTV.menu.cmd,
  signalHome     = signals.appleTV.home.cmd,
  signalBack     = signals.appleTV.back.cmd,
  signalPlayPause = signals.appleTV.playPause.cmd,
}: AppleTVPageProps) => {
  const { theme } = useTheme();

  const wedgeOff = `bg-transparent ${theme.primaryText}`;
  const wedgeOn = `${theme.buttonActiveBackground} ${theme.buttonActiveText}`;
  const okOff = `${theme.okBackground} ${theme.primaryText}`;
  const okOn = `${theme.okBackgroundActive} ${theme.primaryText}`;
  const roundOff = `${theme.buttonBackground} ${theme.buttonText}`;
  const roundOn = `${theme.buttonActiveBackground} ${theme.buttonActiveText}`;

  return (
    <div
      className={`h-full w-full flex items-center justify-center overflow-hidden ${theme.pageBackground}`}
    >
      <div
        className={`
          flex flex-col items-center gap-[2vh] px-[1.5vw] py-[2vh]
          rounded-[2.5rem] ${theme.cardBackground}
          w-[36vh]
        `}
      >
        <div
          className={`relative w-full aspect-square rounded-full ${theme.buttonBackground}`}
        >
          <CH5Button
            variant="momentary"
            shape="circle"
            offClassName={wedgeOff}
            onClassName={wedgeOn}
            icon={<ChevronUp />}
            iconSize={32}
            commandSignal={signalUp}
            className="absolute inset-0 w-full h-full px-0 pt-[6%] pb-[75%] [clip-path:polygon(50%_50%,0%_0%,100%_0%)] z-0"
          />
          <CH5Button
            variant="momentary"
            shape="circle"
            offClassName={wedgeOff}
            onClassName={wedgeOn}
            icon={<ChevronDown />}
            iconSize={32}
            commandSignal={signalDown}
            className="absolute inset-0 w-full h-full px-0 pb-[6%] pt-[75%] [clip-path:polygon(50%_50%,100%_100%,0%_100%)] z-0"
          />
          <CH5Button
            variant="momentary"
            shape="circle"
            offClassName={wedgeOff}
            onClassName={wedgeOn}
            icon={<ChevronLeft />}
            iconSize={32}
            commandSignal={signalLeft}
            className="absolute inset-0 w-full h-full py-0 pl-[6%] pr-[75%] [clip-path:polygon(50%_50%,0%_0%,0%_100%)] z-0"
          />
          <CH5Button
            variant="momentary"
            shape="circle"
            offClassName={wedgeOff}
            onClassName={wedgeOn}
            icon={<ChevronRight />}
            iconSize={32}
            commandSignal={signalRight}
            className="absolute inset-0 w-full h-full py-0 pr-[6%] pl-[75%] [clip-path:polygon(50%_50%,100%_0%,100%_100%)] z-0"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] z-10">
            <CH5Button
              variant="momentary"
              shape="circle"
              offClassName={okOff}
              onClassName={okOn}
              label="OK"
              textSize={32}
              commandSignal={signalEnter}
              className="w-full h-full p-0 tracking-widest font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[1.5vh] w-full">
          <div className="aspect-square">
            <CH5Button
              variant="momentary"
              shape="circle"
              offClassName={roundOff}
              onClassName={roundOn}
              icon={<ChevronLeft />}
              iconSize={28}
              commandSignal={signalBack}
              className="w-full h-full p-0"
            />
          </div>
          <div className="aspect-square">
            <CH5Button
              variant="momentary"
              shape="circle"
              offClassName={roundOff}
              onClassName={roundOn}
              icon={<Home />}
              iconSize={28}
              commandSignal={signalHome}
              className="w-full h-full p-0"
            />
          </div>
          <div className="aspect-square">
            <CH5Button
              variant="momentary"
              shape="circle"
              offClassName={roundOff}
              onClassName={roundOn}
              icon={<Menu />}
              iconSize={28}
              commandSignal={signalMenu}
              className="w-full h-full p-0"
            />
          </div>
          <div className="aspect-square">
            <CH5Button
              variant="momentary"
              shape="circle"
              offClassName={roundOff}
              onClassName={roundOn}
              icon={<Play />}
              iconSize={28}
              commandSignal={signalPlayPause}
              className="w-full h-full p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
