import { Volume2, VolumeX } from "lucide-react";
import { CH5Button } from "../common/CH5Button";
import { useTheme } from "../../../lib/theme";

export interface CH5MuteButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  width?: number;
  height?: number;
  iconSize?: number;
}

export function CH5MuteButton({
  commandSignal,
  feedbackSignal,
  width = 40,
  height = 40,
  iconSize = 20,
}: CH5MuteButtonProps) {
  const { theme } = useTheme();

  return (
    <CH5Button
      commandSignal={commandSignal}
      feedbackSignal={feedbackSignal}
      variant="toggle"
      shape="circle"
      width={width}
      height={height}
      iconOn={<VolumeX />}      // Show X when muted (ON state)
      iconOff={<Volume2 />}     // Show regular when not muted (OFF state)
      iconSize={iconSize}
      onLabel=""
      offLabel=""
      className={theme.buttonBackground}
      iconColorClass={theme.iconColor}
      glow={false}
    />
  );
}