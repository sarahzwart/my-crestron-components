import { Volume2, VolumeX } from "lucide-react";
import { CH5Button } from "../common/CH5Button";
import { useTheme } from "../../../lib/theme";

export interface CH5MuteButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  width?: number;
  height?: number;
  iconSize?: number;
  onClick?: () => void;
}

export function CH5MuteButton({
  commandSignal,
  feedbackSignal,
  width = 40,
  height = 40,
  iconSize = 20,
  onClick,
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
      iconOn={<VolumeX />}
      iconOff={<Volume2 />}
      iconSize={iconSize}
      onLabel=""
      offLabel=""
      activeClassName={`${theme.buttonActiveBg} ${theme.buttonActiveText}`}
      inactiveClassName={`${theme.buttonBackground} ${theme.iconColor}`}
      glow={false}
      onClick={onClick}
    />
  );
}