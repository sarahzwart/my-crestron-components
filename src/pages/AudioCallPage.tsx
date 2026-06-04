import { useState, useEffect } from "react";
import { useTheme } from "../lib/theme";
import { CH5Keypad } from "@/components/lib/common/CH5Keypad";
import { CH5DisplayScreen } from "@/components/lib/call/CH5DisplayScreen";
import { CH5HistoryList, type HistoryItem } from "@/components/lib/call/CH5HistoryList";
import { CH5CallControls } from "@/components/lib/call/CH5CallControls";
import { Phone } from "lucide-react";

export interface AudioCallPageProps {
  title?: string;
  subtitle?: string;
  commandSignal?: string;
  feedbackSignal?: string;
  hangupCommandSignal?: string;
  hangupFeedbackSignal?: string;
  privacyCommandSignal?: string;
  privacyFeedbackSignal?: string;
  holdCommandSignal?: string;
  holdFeedbackSignal?: string;
  maxDigits?: number;
  showHistory?: boolean;
  onCall?: (number: string) => void;
}

export function AudioCallPage({
  title = "Phone",
  subtitle = "Enter a number to call",
  commandSignal = "phone.keypad",
  feedbackSignal = "phone.keypad.fb",
  hangupCommandSignal = "phone.hangup",
  hangupFeedbackSignal = "phone.hangup.fb",
  privacyCommandSignal = "phone.privacy",
  privacyFeedbackSignal = "phone.privacy.fb",
  holdCommandSignal = "phone.hold",
  holdFeedbackSignal = "phone.hold.fb",
  maxDigits = 15,
  showHistory = true,
  onCall,
}: AudioCallPageProps) {
  const { theme } = useTheme();
  const [displayValue, setDisplayValue] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isInCall, setIsInCall] = useState<boolean>(false);
  const [showKeypadInCall, setShowKeypadInCall] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!isInCall) return;
    const interval = setInterval(() => setCallDuration(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isInCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatNumber = (val: string) => {
    if (!val) return "";
    if (val.length === 10) return val.replace(/(\d{3})(\d{3})(\d+)/, "($1) $2-$3");
    if (val.length > 6) return val.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
    if (val.length > 3) return val.replace(/(\d{3})(\d+)/, "$1 $2");
    return val;
  };

  const handleKeyPress = (key: string) => {
    if (displayValue.length < maxDigits) setDisplayValue(prev => prev + key);
  };

  const handleCall = () => {
    if (displayValue) {
      onCall?.(displayValue);
      setIsInCall(true);
      setCallStartTime(new Date());
      setCallDuration(0);
      setShowKeypadInCall(false);
    }
  };

  const handleHangup = () => {
    setHistory(prev => [{
      value: displayValue,
      timestamp: callStartTime || new Date(),
      label: `Outgoing • ${formatDuration(callDuration)}`,
    }, ...prev].slice(0, 10));
    setIsInCall(false);
    setCallDuration(0);
    setCallStartTime(null);
    setShowKeypadInCall(false);
    setDisplayValue("");
  };

  const handleBackspace = () => setDisplayValue(prev => prev.slice(0, -1));
  const handleHistoryClick = (value: string) => { if (!isInCall) setDisplayValue(value); };
  const clearHistory = () => setHistory([]);

  if (isInCall) {
    return (
      <div className="h-full flex flex-col items-center justify-between overflow-hidden px-6 py-6">

        <div className="flex flex-col items-center gap-1 mt-4">
          <p className={`${theme.primaryText} text-3xl font-light tracking-tight`}>
            {formatNumber(displayValue)}
          </p>
          <p className={`${theme.secondaryText} text-sm`}>
            {formatDuration(callDuration)}
          </p>
        </div>

        <div className="flex items-center justify-center w-full max-w-xs">
          {showKeypadInCall ? (
            <CH5Keypad
              commandSignal={commandSignal}
              feedbackSignal={feedbackSignal}
              onKeyPress={handleKeyPress}
              showCallButton={false}
              showBackspace={false}
              gap={3}
            />
          ) : (
            <div className={`w-24 h-24 rounded-full ${theme.buttonBackground} flex items-center justify-center`}>
              <Phone size={36} className={theme.iconColor} />
            </div>
          )}
        </div>

        <CH5CallControls
          hangupCommandSignal={hangupCommandSignal}
          hangupFeedbackSignal={hangupFeedbackSignal}
          onHangup={handleHangup}
          privacyCommandSignal={privacyCommandSignal}
          privacyFeedbackSignal={privacyFeedbackSignal}
          holdCommandSignal={holdCommandSignal}
          holdFeedbackSignal={holdFeedbackSignal}
          isKeypadVisible={showKeypadInCall}
          onKeypadToggle={() => setShowKeypadInCall(prev => !prev)}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex px-10 py-5 overflow-hidden ">

      <div className="shrink-0 px-1">
        <h1 className={`${theme.primaryText} text-2xl font-bold leading-tight`}>{title}</h1>
        <p className={`${theme.secondaryText} text-sm`}>{subtitle}</p>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_1fr] min-h-0 mt-8">

        <div className="flex flex-col gap-3 min-h-0">
          <div className="shrink-0">
            <CH5DisplayScreen
              value={displayValue}
              placeholder="Enter a number"
            />
          </div>

          {showHistory && (
            <div className="flex-1 min-h-0">
              <CH5HistoryList
                items={history}
                title="Recent Calls"
                itemIcon={<Phone size={16} />}
                emptyIcon={<Phone size={24} />}
                emptyText="No recent calls"
                onItemClick={handleHistoryClick}
                onClear={clearHistory}
                formatValue={(val) => {
                  if (val.length > 6) return val.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
                  if (val.length > 3) return val.replace(/(\d{3})(\d+)/, "$1 $2");
                  return val;
                }}
              />
            </div>
          )}
        </div>

        <div className="w-full max-w-[18rem] flex items-center justify-center min-h-0 p-2 ">
            <CH5Keypad
              commandSignal={commandSignal}
              feedbackSignal={feedbackSignal}
              onKeyPress={handleKeyPress}
              onCall={handleCall}
              onBackspace={handleBackspace}
              callButtonDisabled={displayValue.length === 0}
              gap={3}
            />
        </div>

      </div>
    </div>
  );
}