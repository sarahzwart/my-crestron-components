import { Volume2, VolumeX } from "lucide-react";
import { CH5Button } from "@/components/ch5/common/CH5Button";

export interface CH5MuteButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  width?: number;
  height?: number;
  iconSize?: number;
  onClick?: () => void;
}

export const CH5MuteButton = ({
  commandSignal,
  feedbackSignal,
  width = 40,
  height = 40,
  iconSize = 20,
  onClick,
}: CH5MuteButtonProps) => {
  return (
    <CH5Button
      commandSignal={commandSignal}
      feedbackSignal={feedbackSignal}
      variant="toggle"
      shape="circle"
      width={width}
      height={height}
      iconOff={<Volume2 size={iconSize} strokeWidth={2} />}
      iconOn={<VolumeX size={iconSize} strokeWidth={2} />}
      onClick={onClick}
    />
  );
};