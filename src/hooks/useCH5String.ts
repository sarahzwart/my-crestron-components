import { useState, useEffect } from "react";
import { useCH5 } from "../contexts/CH5Context";

export const useCH5String = (
  signalName: string, 
  initialValue: string = ''
): [string, (value: string) => void] => {
  const { ch5Service, isConnected } = useCH5();
  
  const [value, setValue] = useState<string>(() => {
    if (isConnected && ch5Service.getStringState) {
      const current = ch5Service.getStringState(signalName);
      return current !== null ? current : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (!isConnected) return;

    if (ch5Service.getStringState) {
      const current = ch5Service.getStringState(signalName);
      if (current !== null) {
        setValue(current);
      }
    }

    const subscriptionId = ch5Service.subscribeString(signalName, (newValue: string) => {
      setValue(newValue);
    });

    return () => {
      ch5Service.unsubscribe(signalName, subscriptionId);
    };
  }, [signalName, isConnected, ch5Service]);

  const publish = (newValue: string): void => {
    ch5Service.publishString(signalName, newValue);
    setValue(newValue);
  };

  return [value, publish];
};