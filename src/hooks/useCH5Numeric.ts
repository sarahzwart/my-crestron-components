import { useState, useEffect } from "react";
import { useCH5 } from "../contexts/CH5Context";
import ch5Service from "../services/ch5Service";

export const useCH5Numeric = (
  commandSignal: string,   // Event signal (e.g., "audio.Volume")
  feedbackSignal: string,  // State signal (e.g., "audio.Volume_Fb")
  initialValue: number = 0
): [number, (value: number) => void] => {
  const { isConnected } = useCH5();
  
  const [value, setValue] = useState<number>(() => {
    const current = ch5Service.getNumericState(feedbackSignal);
    return current !== null ? current : initialValue;
  });

  useEffect(() => {
    if (!isConnected) return;

    const current = ch5Service.getNumericState(feedbackSignal);
    if (current !== null) {
      setValue(current);
    }

    ch5Service.subscribeNumeric(feedbackSignal, (newValue: number) => {
      setValue(newValue);
    });

    return () => {
      ch5Service.unsubscribe(feedbackSignal);
    };
  }, [commandSignal, feedbackSignal, isConnected]);

  const publish = (newValue: number): void => {
    ch5Service.publishNumeric(commandSignal, newValue);
    setValue(newValue);
  };

  return [value, publish];
};