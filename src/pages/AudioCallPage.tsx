import { useState } from "react";
import { useTheme } from "../lib/theme";
import { CH5Keypad } from "@/components/lib/common/CH5Keypad";
import { CH5DisplayScreen } from "@/components/lib/call/CH5DisplayScreen";
import {
  CH5HistoryList,
  type HistoryItem,
} from "@/components/lib/call/CH5HistoryList";
import { Phone, PhoneCall } from "lucide-react";

export interface AudioCallPageProps {
  title?: string;
  subtitle?: string;
  commandSignal?: string;
  feedbackSignal?: string;
  maxDigits?: number;
  showHistory?: boolean;
  onCall?: (number: string) => void;
}

export function AudioCallPage({
  title = "Audio Call",
  subtitle = "Enter a number to call",
  commandSignal = "phone.keypad",
  feedbackSignal = "phone.keypad.fb",
  maxDigits = 15,
  showHistory = true,
  onCall,
}: AudioCallPageProps) {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleKeyPress = (key: string) => {
    if (displayValue.length < maxDigits) {
      setDisplayValue(prev => prev + key);
    }
  };

  const handleCall = () => {
    if (displayValue) {
      if (onCall) {
        onCall(displayValue);
      }
      setHistory(prev => [
        { value: displayValue, timestamp: new Date(), label: "Outgoing" },
        ...prev
      ].slice(0, 10));
    }
  };

  const handleBackspace = () => {
    setDisplayValue(prev => prev.slice(0, -1));
  };

  const handleHistoryClick = (value: string) => {
    setDisplayValue(value);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden">
      {/* Header */}
      <div className="mb-6 px-2 shrink-0">
        <h1 className={`${theme.primaryText} text-4xl font-bold mb-2`}>
          {title}
        </h1>
        <p className={`${theme.secondaryText} text-base`}>
          {subtitle}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-[1fr_1fr] gap-8 min-h-0 max-w-6xl mx-auto w-full">
        {/* Left Side - Display & History */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Display Screen */}
          <CH5DisplayScreen
            value={displayValue}
            label="Number"
            placeholder="Enter a number"
            maxLength={maxDigits}
            onBackspace={handleBackspace}
            showBackspace={false}
            showDigitIndicators={false}
          />

          {/* History */}
          {showHistory && (
            <CH5HistoryList
              items={history}
              title="Recent Calls"
              itemIcon={<Phone size={18} />}
              emptyIcon={<Phone size={28} />}
              emptyText="No recent calls"
              accentColor="bg-purple-500"
              onItemClick={handleHistoryClick}
              onClear={clearHistory}
              actionText="Tap to redial"
              formatValue={(val) => {
                if (val.length > 6) {
                  return val.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
                } else if (val.length > 3) {
                  return val.replace(/(\d{3})(\d+)/, "$1 $2");
                }
                return val;
              }}
            />
          )}
        </div>

        {/* Right Side - iPhone-style Keypad */}
        <div className="flex flex-col items-center justify-center min-h-0 py-4">
          <CH5Keypad
            commandSignal={commandSignal}
            feedbackSignal={feedbackSignal}
            onKeyPress={handleKeyPress}
            onCall={handleCall}
            onBackspace={handleBackspace}
            callButtonDisabled={displayValue.length === 0}
            gap={4}
          />
        </div>
      </div>
    </div>
  );
}