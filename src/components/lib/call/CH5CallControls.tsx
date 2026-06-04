import { useTheme } from "@/lib/theme";
import { CH5Button } from "@/components/lib/common/CH5Button";
import {
  PhoneOff,
  MicOff,
  Mic,
  Pause,
  Play,
  Grid3x3,
} from "lucide-react";

export interface CH5CallControlsProps {
  hangupCommandSignal: string;
  hangupFeedbackSignal: string;
  onHangup?: () => void;

  privacyCommandSignal: string;
  privacyFeedbackSignal: string;

  holdCommandSignal?: string;
  holdFeedbackSignal?: string;
  showHold?: boolean;

  showKeypadButton?: boolean;
  onKeypadToggle?: () => void;
  isKeypadVisible?: boolean;
  className?: string;
}

interface ControlButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  iconOff: React.ReactNode;
  iconOn?: React.ReactNode;
  label: string;
  variant?: "toggle" | "momentary";
  onClick?: () => void;
  dangerStyle?: boolean;
}

function ControlButton({
  commandSignal,
  feedbackSignal,
  iconOff,
  iconOn,
  label,
  variant = "toggle",
  onClick,
}: ControlButtonProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-2">
      <CH5Button
        commandSignal={commandSignal}
        feedbackSignal={feedbackSignal}
        variant={variant}
        shape="circle"
        width={80}
        height={80}
        icon={iconOff}
        iconOn={iconOn}
        iconOff={iconOff}
        iconSize={28}
        onClick={onClick}
        offClassName={`${theme.buttonBackground} ${theme.iconColor}`}
        onClassName="bg-white text-black"
      />
      <span className={`${theme.primaryText} text-xs font-medium`}>{label}</span>
    </div>
  );
}

export function CH5CallControls({
  hangupCommandSignal,
  hangupFeedbackSignal,
  onHangup,
  privacyCommandSignal,
  privacyFeedbackSignal,
  holdCommandSignal = "phone.hold",
  holdFeedbackSignal = "phone.hold.fb",
  showHold = true,
  showKeypadButton = true,
  onKeypadToggle,
  isKeypadVisible = false,
  className = "",
}: CH5CallControlsProps) {
  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
        <ControlButton
          commandSignal={privacyCommandSignal}
          feedbackSignal={privacyFeedbackSignal}
          iconOff={<Mic size={28} />}
          iconOn={<MicOff size={28} />}
          label="mute"
        />

        {showKeypadButton && onKeypadToggle ? (
          <ControlButton
            commandSignal="phone.keypad.toggle"
            feedbackSignal="phone.keypad.toggle.fb"
            iconOff={<Grid3x3 size={28} />}
            label="keypad"
            onClick={onKeypadToggle}
          />
        ) : <div />}

        {showHold ? (
          <ControlButton
            commandSignal={holdCommandSignal}
            feedbackSignal={holdFeedbackSignal}
            iconOff={<Pause size={28} fill="currentColor" />}
            iconOn={<Play size={28} fill="currentColor" />}
            label="hold"
          />
        ) : <div />}
      </div>

      <CH5Button
        commandSignal={hangupCommandSignal}
        feedbackSignal={hangupFeedbackSignal}
        variant="momentary"
        shape="circle"
        width={80}
        height={80}
        icon={<PhoneOff size={32} fill="currentColor" />}
        iconSize={32}
        onClick={onHangup}
        offClassName="bg-red-500 text-white shadow-lg shadow-red-500/30"
        onClassName="bg-red-600 text-white"
      />
    </div>
  );
}