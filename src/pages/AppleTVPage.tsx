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
  signalUp = "appletv.up",
  signalDown = "appletv.down",
  signalLeft = "appletv.left",
  signalRight = "appletv.right",
  signalEnter = "appletv.enter",
  signalMenu = "appletv.menu",
  signalPlay = "appletv.play",
  signalPause = "appletv.pause",
}: AppleTVPageProps) {
  const { theme } = useTheme();
  const ICON_SIZE = 22;
  const NAV_PX = 64; // px width & height for nav arrow buttons
  const ENTER_PX = 64; // circular OK button
  return (
    <div
      className={`h-full w-full flex items-center justify-center overflow-hidden ${theme.pageBackground}`}
    >
      <div className="flex flex-col gap-4 items-center">
        <div>
          <div
            className="grid grid-cols-3 grid-rows-3 gap-1.5"
            style={{ width: NAV_PX * 3 + 12, height: NAV_PX * 3 + 12 }}
          >
            {/* row 1 */}
            <span />
            <CH5Button
              variant="momentary"
              shape="circle"
              icon={<ChevronUp />}
              iconSize={ICON_SIZE}
              commandSignal={signalUp}
              width={NAV_PX}
              height={NAV_PX}
            />
            <span />

            {/* row 2 */}
            <CH5Button
              variant="momentary"
              shape="circle"
              icon={<ChevronLeft />}
              iconSize={ICON_SIZE}
              commandSignal={signalLeft}
              width={NAV_PX}
              height={NAV_PX}
            />

            {/* Enter — circle, uses cardBackground to stand out */}
            <CH5Button
              variant="momentary"
              shape="circle"
              label="OK"
              commandSignal={signalEnter}
              width={ENTER_PX}
              height={ENTER_PX}
              textSize={10}
              className={`${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground} tracking-widest font-mono`}
            />

            <CH5Button
              variant="momentary"
              shape="circle"
              icon={<ChevronRight />}
              iconSize={ICON_SIZE}
              commandSignal={signalRight}
              width={NAV_PX}
              height={NAV_PX}
            />

            {/* row 3 */}
            <span />
            <CH5Button
              variant="momentary"
              shape="circle"
              icon={<ChevronDown />}
              iconSize={ICON_SIZE}
              commandSignal={signalDown}
              width={NAV_PX}
              height={NAV_PX}
            />
            <span />
          </div>
        </div>

        <div
          className={`w-full h-px opacity-10 ${theme.secondaryText}`}
          style={{ width: NAV_PX * 3 + 12 }}
        />

        <div style={{ width: NAV_PX * 3 + 12 }}>
          <p
            className={`text-[9px] tracking-[.12em] font-mono mb-2 ${theme.secondaryText} opacity-50`}
          >
            CONTROLS
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            <CH5Button
              variant="momentary"
              shape="rounded"
              icon={<Menu />}
              iconSize={20}
              iconPosition="top"
              label="MENU"
              textSize={9}
              commandSignal={signalMenu}
              height={56}
              className={`${theme.buttonBackground} ${theme.buttonText} ${theme.buttonActiveBackground} tracking-widest font-mono gap-1`}
            />

            {/* Play/Pause — toggle variant swaps icon + label via isOn state */}
            <CH5Button
              variant="toggle"
              shape="rounded"
              iconOn={<Pause />}
              iconOff={<Play />}
              iconSize={20}
              iconPosition="top"
              onLabel="PAUSE"
              offLabel="PLAY"
              textSize={9}
              commandSignal={signalPlay}
              feedbackSignal={signalPause}
              height={56}
              className={`${theme.buttonBackground} ${theme.buttonText} ${theme.buttonActiveBackground} tracking-widest font-mono gap-1`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
