import { useTheme } from "@/lib/theme";
import { Delete, Phone } from "lucide-react";
import { CH5Button } from "./CH5Button";

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

  const keyContent = (
    <span className="flex flex-col items-center justify-center leading-none select-none">
      <span className={`${theme.primaryText} text-4xl font-light leading-none`}>{number}</span>
      {letters && (
        <span className={`${theme.secondaryText} text-[9px] font-bold tracking-[0.15em] mt-1.5 leading-none`}>
          {letters}
        </span>
      )}
    </span>
  );

  return (
    <CH5Button
      commandSignal={commandSignal}
      feedbackSignal={feedbackSignal}
      variant="momentary"
      shape="circle"
      icon={keyContent}
      onClick={onPress}
      offClassName={`${theme.buttonBackground} ${theme.buttonText}`}
      onClassName={`${theme.buttonActiveBackground} ${theme.buttonActiveText}`}
      className="aspect-square w-full transition-all duration-100"
    />
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
            commandSignal={`${commandSignal}_${key.number}`}
            feedbackSignal={`${feedbackSignal}_${key.number}`}
            onPress={() => onKeyPress?.(key.number)}
          />
        ))}
      </div>

      {(showCallButton || showBackspace) && (
        <div className="grid grid-cols-3 w-full max-w-xs items-center" style={{ gap: `${gap * 4}px` }}>
          <div />

          {showCallButton ? (
            <CH5Button
              commandSignal={`${commandSignal}_Dial`}
              feedbackSignal={`${feedbackSignal}_Dial`}
              variant="momentary"
              shape="circle"
              icon={<Phone size={32} fill="currentColor" />}
              iconSize={32}
              onClick={onCall}
              disabled={callButtonDisabled}
              offClassName={callButtonDisabled
                ? "bg-green-500/30 text-white/40 cursor-not-allowed"
                : "bg-green-500 text-white shadow-lg shadow-green-500/30"}
              onClassName="bg-green-600 text-white"
              className="aspect-square w-full"
            />
          ) : <div />}

          {showBackspace ? (
            <CH5Button
              commandSignal={`${commandSignal}_Backspace`}
              feedbackSignal={`${feedbackSignal}_Backspace`}
              variant="momentary"
              shape="circle"
              icon={<Delete size={32} className={`${theme.iconColor} opacity-60`} />}
              onClick={onBackspace}
              offClassName="bg-transparent"
              onClassName="bg-transparent opacity-50"
              className="aspect-square w-full"
            />
          ) : <div />}
        </div>
      )}
    </div>
  );
}