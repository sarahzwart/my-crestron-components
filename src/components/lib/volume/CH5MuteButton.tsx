import { Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../../../lib/theme";
import { useCH5Boolean } from "../../../hooks/useCH5Boolean";
import React from "react";

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
  const [isMuted, setIsMuted] = useCH5Boolean(commandSignal, feedbackSignal, false);

  const handleClick = () => {
    setIsMuted(!isMuted);
    onClick?.();
  };

  const Icon = isMuted ? VolumeX : Volume2;

  const colorClasses = isMuted
    ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
    : `${theme.buttonBackground} ${theme.buttonText}`;

  const sizeStyle: React.CSSProperties = {
    width:  `${width}px`,
    height: `${height}px`,
    padding: 0,
  };

  return (
    <button
      onClick={handleClick}
      className={`
        rounded-full flex items-center justify-center
        transition-all duration-200 active:scale-95 shrink-0
        ${colorClasses}
      `}
      style={sizeStyle}
    >
      <Icon size={iconSize} strokeWidth={2} />
    </button>
  );
}