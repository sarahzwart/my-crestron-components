import { useCH5Boolean } from "@/hooks/useCH5Boolean";
import { useTheme } from "@/lib/theme";
import { Delete, Phone } from "lucide-react";

export interface KeypadKey {
  number: string;
  letters?: string;
}

export interface CH5KeypadProps {
  commandSignal: string;
  feedbackSignal: string;
  onKeyPress?: (key: string) => void;
  onCall?: () => void;
  onBackspace?: () => void;
  showCallButton?: boolean;
  showBackspace?: boolean;
  callButtonDisabled?: boolean;
  gap?: number;
  className?: string;
}

const KEYS: KeypadKey[] = [
  { number: "1", letters: "" },
  { number: "2", letters: "A B C" },
  { number: "3", letters: "D E F" },
  { number: "4", letters: "G H I" },
  { number: "5", letters: "J K L" },
  { number: "6", letters: "M N O" },
  { number: "7", letters: "P Q R S" },
  { number: "8", letters: "T U V" },
  { number: "9", letters: "W X Y Z" },
  { number: "*", letters: "" },
  { number: "0", letters: "+" },
  { number: "#", letters: "" },
];

interface KeypadKeyButtonProps {
  number: string;
  letters?: string;
  commandSignal: string;
  feedbackSignal: string;
  onPress: () => void;
}

function KeypadKeyButton({ number, letters, commandSignal, feedbackSignal, onPress }: KeypadKeyButtonProps) {
  const { theme } = useTheme();
  const [, setIsPressed] = useCH5Boolean(commandSignal, feedbackSignal, false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    onPress();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${theme.buttonBackground} ${theme.buttonText}
        rounded-full aspect-square
        flex flex-col items-center justify-center
        active:scale-90 active:${theme.buttonActiveBackground}
        transition-all duration-100 select-none
      `}
    >
      <span className={`${theme.primaryText} text-4xl font-light leading-none`}>{number}</span>
      {letters && (
        <span className={`${theme.secondaryText} text-[9px] font-bold tracking-[0.15em] mt-1.5 leading-none`}>
          {letters}
        </span>
      )}
    </button>
  );
}

export function CH5Keypad({
  commandSignal,
  feedbackSignal,
  onKeyPress,
  onCall,
  onBackspace,
  showCallButton = true,
  showBackspace = true,
  callButtonDisabled = false,
  gap = 4,
  className = "",
}: CH5KeypadProps) {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center gap-5 w-full ${className}`}>
      <div className="grid grid-cols-3 w-full max-w-xs" style={{ gap: `${gap * 4}px` }}>
        {KEYS.map((key) => (
          <KeypadKeyButton
            key={key.number}
            number={key.number}
            letters={key.letters}
            commandSignal={`${commandSignal}.${key.number}`}
            feedbackSignal={`${feedbackSignal}.${key.number}`}
            onPress={() => onKeyPress?.(key.number)}
          />
        ))}
      </div>

      {(showCallButton || showBackspace) && (
        <div className="grid grid-cols-3 w-full max-w-xs items-center" style={{ gap: `${gap * 4}px` }}>
          <div />

          {showCallButton ? (
            <button
              onClick={onCall}
              disabled={callButtonDisabled}
              className={`
                aspect-square rounded-full flex items-center justify-center
                transition-all duration-200 active:scale-90
                ${callButtonDisabled
                  ? "bg-green-500/30 cursor-not-allowed"
                  : "bg-green-500 active:bg-green-600 shadow-lg shadow-green-500/30"}
              `}
            >
              <Phone size={32} className={callButtonDisabled ? "text-white/40" : "text-white"} fill="currentColor" />
            </button>
          ) : <div />}

          {showBackspace ? (
            <button
              onClick={onBackspace}
              className="flex items-center justify-center w-full aspect-square transition-all duration-200 active:scale-90 active:opacity-50"
            >
              <Delete size={32} className={`${theme.iconColor} opacity-60`} />
            </button>
          ) : <div />}
        </div>
      )}
    </div>
  );
}