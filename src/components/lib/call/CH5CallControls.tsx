import { useTheme } from "@/lib/theme";
import { useCH5Boolean } from "@/hooks/useCH5Boolean";
import { 
  PhoneOff, 
  MicOff, 
  Mic, 
  Pause,
  Play,
  Grid3x3,
} from "lucide-react";

export interface CH5CallControlsProps {
  // Hangup
  hangupCommandSignal: string;
  hangupFeedbackSignal: string;
  onHangup?: () => void;
  
  // Privacy (Mute)
  privacyCommandSignal: string;
  privacyFeedbackSignal: string;
  
  // Hold
  holdCommandSignal?: string;
  holdFeedbackSignal?: string;
  showHold?: boolean;
  
  // Keypad toggle
  showKeypadButton?: boolean;
  onKeypadToggle?: () => void;
  isKeypadVisible?: boolean;
  
  className?: string;
}

// ============================================
// INDIVIDUAL CONTROL BUTTON
// ============================================
interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  variant?: "default" | "danger";
}

function ControlButton({ 
  icon, 
  label, 
  isActive = false, 
  onClick, 
  variant = "default" 
}: ControlButtonProps) {
  const { theme } = useTheme();

  const getButtonStyles = () => {
    if (variant === "danger") {
      return "bg-red-500 active:bg-red-600 shadow-lg shadow-red-500/30";
    }
    if (isActive) {
      return "bg-white text-black";
    }
    return theme.buttonBackground;
  };

  const getIconColor = () => {
    if (variant === "danger") return "text-white";
    if (isActive) return "text-black";
    return theme.iconColor;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className={`
          w-20 h-20 rounded-full
          flex items-center justify-center
          transition-all duration-200
          active:scale-90
          ${getButtonStyles()}
        `}
      >
        <div className={getIconColor()}>
          {icon}
        </div>
      </button>
      <span className={`${theme.primaryText} text-xs font-medium`}>
        {label}
      </span>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function CH5CallControls({
  hangupCommandSignal,
  hangupFeedbackSignal,
  onHangup,
  privacyCommandSignal,
  privacyFeedbackSignal,
  holdCommandSignal,
  holdFeedbackSignal,
  showHold = true,
  showKeypadButton = true,
  onKeypadToggle,
  isKeypadVisible = false,
  className = "",
}: CH5CallControlsProps) {
  // Privacy/Mute state via CH5
  const [isPrivacyOn, setPrivacyOn] = useCH5Boolean(
    privacyCommandSignal,
    privacyFeedbackSignal,
    false
  );

  // Hold state via CH5
  const [isOnHold, setOnHold] = useCH5Boolean(
    holdCommandSignal || "",
    holdFeedbackSignal || "",
    false
  );

  // Hangup signal
  const [, sendHangup] = useCH5Boolean(
    hangupCommandSignal,
    hangupFeedbackSignal,
    false
  );

  const handleHangup = () => {
    sendHangup(true);
    setTimeout(() => sendHangup(false), 200);
    if (onHangup) onHangup();
  };

  const togglePrivacy = () => setPrivacyOn(!isPrivacyOn);
  const toggleHold = () => setOnHold(!isOnHold);

  return (
    <div className={`flex flex-col items-center gap-8 ${className}`}>
      {/* Row of Controls */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
        {/* Mute / Privacy */}
        <ControlButton
          icon={isPrivacyOn ? <MicOff size={28} /> : <Mic size={28} />}
          label="mute"
          isActive={isPrivacyOn}
          onClick={togglePrivacy}
        />

        {/* Keypad Toggle */}
        {showKeypadButton && onKeypadToggle && (
          <ControlButton
            icon={<Grid3x3 size={28} />}
            label="keypad"
            isActive={isKeypadVisible}
            onClick={onKeypadToggle}
          />
        )}

        {/* Hold */}
        {showHold && (
          <ControlButton
            icon={isOnHold ? <Play size={28} fill="currentColor" /> : <Pause size={28} fill="currentColor" />}
            label={isOnHold ? "resume" : "hold"}
            isActive={isOnHold}
            onClick={toggleHold}
          />
        )}
      </div>

      {/* Hangup Button */}
      <button
        onClick={handleHangup}
        className={`
          w-20 h-20 rounded-full
          bg-red-500 active:bg-red-600
          flex items-center justify-center
          transition-all duration-200
          active:scale-90
          shadow-lg shadow-red-500/30
        `}
      >
        <PhoneOff size={32} className="text-white" fill="currentColor" />
      </button>
    </div>
  );
}