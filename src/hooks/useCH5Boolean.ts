import { useState, useEffect } from "react";
import { useCH5 } from "../contexts/CH5Context";
import ch5Service from "../services/ch5Service";

export const useCH5Boolean = (
  commandSignal: string,   // Event signal (e.g., "lights.MainLights_On")
  feedbackSignal: string,  // State signal (e.g., "lights.MainLights_Fb")
  initialValue: boolean = false
): [boolean, (value: boolean) => void] => {
  const { isConnected } = useCH5();
  
  const [value, setValue] = useState<boolean>(() => {
    const current = ch5Service.getBoolState(feedbackSignal);
    return current !== null ? current : initialValue;
  });

  useEffect(() => {
    if (!isConnected) return;

    // Get initial state from FEEDBACK signal
    const current = ch5Service.getBoolState(feedbackSignal);
    if (current !== null) {
      setValue(current);
    }

    // Subscribe to FEEDBACK signal
    ch5Service.subscribeBool(feedbackSignal, (newValue: boolean) => {
      setValue(newValue);
    });

    return () => {
      ch5Service.unsubscribe(feedbackSignal);
    };
  }, [commandSignal, feedbackSignal, isConnected]);

  const publish = (newValue: boolean): void => {
    // Publish to COMMAND/EVENT signal
    ch5Service.publishBool(commandSignal, newValue);
    // Optimistically update UI
    setValue(newValue);
  };

  return [value, publish];
};