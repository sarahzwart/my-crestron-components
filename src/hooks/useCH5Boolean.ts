import { useState, useEffect } from "react";
import { useCH5 } from "../contexts/CH5Context";
import ch5Service from "../services/ch5Service";

// feedbackSignal is optional (local-only state otherwise). When optimistic
// is false, only the real feedbackSignal flips the value, not the press —
// for controls like mute where the guessed state would be misleading.
export const useCH5Boolean = (
  commandSignal: string,
  feedbackSignal?: string,
  initialValue: boolean = false,
  optimistic: boolean = true
): [boolean, (value: boolean) => void] => {
  const { isConnected } = useCH5();

  const [value, setValue] = useState<boolean>(() => {
    if (!feedbackSignal) return initialValue;
    const current = ch5Service.getBoolState(feedbackSignal);
    return current !== null ? current : initialValue;
  });

  useEffect(() => {
    if (!feedbackSignal || !isConnected) return;

    const current = ch5Service.getBoolState(feedbackSignal);
    if (current !== null) {
      setValue(current);
    }

    const subscriptionId = ch5Service.subscribeBool(feedbackSignal, (newValue: boolean) => {
      setValue(newValue);
    });

    return () => {
      ch5Service.unsubscribe(feedbackSignal, subscriptionId);
    };
  }, [commandSignal, feedbackSignal, isConnected]);

  const publish = (newValue: boolean): void => {
    ch5Service.publishBool(commandSignal, newValue);
    if (optimistic) setValue(newValue);
  };

  return [value, publish];
};