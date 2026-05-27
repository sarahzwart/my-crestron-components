import { useState } from "react";
import { useTheme } from "../lib/theme";
import { CH5Keypad } from "@/components/lib/common/CH5Keypad";
import { CH5Button } from "@/components/lib/CH5Button";
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  Delete, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  User,
} from "lucide-react";

export interface AudioCallPageProps {
  title?: string;
  subtitle?: string;
  commandSignal?: string;
  feedbackSignal?: string;
}

type CallState = "idle" | "dialing" | "in-call";

export function AudioCallPage({
  title = "Audio Call",
  subtitle = "Enter a number to dial",
  commandSignal = "phone",
  feedbackSignal = "phone.fb",
}: AudioCallPageProps) {
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const [, area, prefix, line] = match;
      if (line) return `(${area}) ${prefix}-${line}`;
      if (prefix) return `(${area}) ${prefix}`;
      if (area) return `(${area}`;
    }
    return value;
  };

  // Format call duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCall = () => {
    if (phoneNumber.length > 0) {
      setCallState("dialing");
      // Simulate call connection
      setTimeout(() => setCallState("in-call"), 2000);
    }
  };

  const handleEndCall = () => {
    setCallState("idle");
    setCallDuration(0);
    setIsMuted(false);
    setIsSpeakerOn(false);
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-md flex flex-col items-center gap-6 h-full justify-between py-4">
        
        {/* Header / Display */}
        <CallDisplay 
          phoneNumber={phoneNumber}
          formattedNumber={formatPhoneNumber(phoneNumber)}
          callState={callState}
          callDuration={callDuration}
          formattedDuration={formatDuration(callDuration)}
          title={title}
          subtitle={subtitle}
        />

        {/* Keypad or Active Call Controls */}
        {callState === "idle" ? (
          <KeypadView
            commandSignal={commandSignal}
            feedbackSignal={feedbackSignal}
            phoneNumber={phoneNumber}
            onCall={handleCall}
            onBackspace={handleBackspace}
          />
        ) : (
          <InCallControls
            isMuted={isMuted}
            isSpeakerOn={isSpeakerOn}
            onMuteToggle={() => setIsMuted(!isMuted)}
            onSpeakerToggle={() => setIsSpeakerOn(!isSpeakerOn)}
            onEndCall={handleEndCall}
          />
        )}
      </div>
    </div>
  );
}

// ============================================
// CALL DISPLAY COMPONENT
// ============================================
interface CallDisplayProps {
  phoneNumber: string;
  formattedNumber: string;
  callState: CallState;
  callDuration: number;
  formattedDuration: string;
  title: string;
  subtitle: string;
}

function CallDisplay({
  phoneNumber,
  formattedNumber,
  callState,
  formattedDuration,
  title,
  subtitle,
}: CallDisplayProps) {
  const { theme } = useTheme();

  // In-call display
  if (callState !== "idle") {
    return (
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Avatar */}
        <div className={`
          w-28 h-28 rounded-full
          ${theme.masterCardBackground}
          flex items-center justify-center
          ${callState === "dialing" ? "animate-pulse" : ""}
        `}>
          <User size={56} className={theme.iconColor} />
        </div>

        {/* Phone Number */}
        <div className="text-center">
          <p className={`${theme.primaryText} text-2xl font-bold tracking-wide`}>
            {formattedNumber || "Unknown"}
          </p>
          <p className={`${theme.secondaryText} text-sm mt-2 uppercase tracking-wider`}>
            {callState === "dialing" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Calling...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {formattedDuration}
              </span>
            )}
          </p>
        </div>
      </div>
    );
  }

  // Idle display - shows entered number
  return (
    <div className="w-full text-center">
      <h1 className={`${theme.primaryText} text-2xl font-bold mb-1`}>
        {title}
      </h1>
      <p className={`${theme.secondaryText} text-sm mb-6`}>
        {subtitle}
      </p>
      
      {/* Number Display */}
      <div className={`
        ${theme.cardBackground}
        rounded-3xl px-6 py-6
        min-h-[100px]
        flex items-center justify-center
      `}>
        <p className={`
          ${theme.primaryText} 
          ${phoneNumber ? "text-4xl" : "text-2xl"} 
          font-light tracking-wider
          ${phoneNumber ? "opacity-100" : "opacity-30"}
          transition-all duration-200
        `}>
          {phoneNumber ? formattedNumber : "Enter number"}
        </p>
      </div>
    </div>
  );
}

// ============================================
// KEYPAD VIEW
// ============================================
interface KeypadViewProps {
  commandSignal: string;
  feedbackSignal: string;
  phoneNumber: string;
  onCall: () => void;
  onBackspace: () => void;
}

function KeypadView({
  commandSignal,
  feedbackSignal,
  phoneNumber,
  onCall,
  onBackspace,
}: KeypadViewProps) {
  const { theme } = useTheme();
  const canCall = phoneNumber.length > 0;

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Keypad */}
      <CH5Keypad
        commandSignal={commandSignal}
        feedbackSignal={feedbackSignal}
        buttonShape="circle"
        buttonColor="gray"
        showClear={false}
        showEnter={false}
        glow={false}
        gap={4}
        textSize={28}
      />

      {/* Bottom Action Row */}
      <div className="grid grid-cols-3 gap-4 items-center mt-2">
        {/* Spacer */}
        <div />

        {/* Call Button */}
        <button
          onClick={onCall}
          disabled={!canCall}
          className={`
            w-20 h-20 rounded-full mx-auto
            flex items-center justify-center
            transition-all duration-200
            active:scale-90
            ${canCall 
              ? "bg-green-500 shadow-lg shadow-green-500/40" 
              : "bg-gray-500/30 cursor-not-allowed"
            }
          `}
        >
          <PhoneCall 
            size={32} 
            className="text-white" 
            strokeWidth={2}
          />
        </button>

        {/* Backspace Button */}
        <button
          onClick={onBackspace}
          disabled={!canCall}
          className={`
            w-14 h-14 rounded-full mx-auto
            flex items-center justify-center
            transition-all duration-200
            active:scale-90
            ${canCall 
              ? `${theme.iconBackground} ${theme.iconColor}` 
              : "opacity-30 cursor-not-allowed"
            }
          `}
        >
          <Delete size={24} />
        </button>
      </div>
    </div>
  );
}

// ============================================
// IN-CALL CONTROLS
// ============================================
interface InCallControlsProps {
  isMuted: boolean;
  isSpeakerOn: boolean;
  onMuteToggle: () => void;
  onSpeakerToggle: () => void;