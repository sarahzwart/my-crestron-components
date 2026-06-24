import React from "react";
import { useCH5Numeric } from "../../../hooks/useCH5Numeric";
import { useTheme } from "@/lib/theme";

export interface ModeEntry {
  icon: React.ReactNode;
  label?: string;
}

export interface CH5MultiModeButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  modes: [ModeEntry, ModeEntry, ModeEntry, ModeEntry, ModeEntry];
  width?: number | string;
  height?: number | string;
  iconSize?: number;
  showLabel?: boolean;
  className?: string;
  onClassName?: string;
  style?: React.CSSProperties;
}

export function CH5MultiModeButton({
  commandSignal,
  feedbackSignal,
  modes,
  width,
  height,
  iconSize = 24,
  showLabel = false,
  className = "",
  onClassName,
  style = {},
}: CH5MultiModeButtonProps) {
  const { theme } = useTheme();

  const [modeValue, setModeValue] = useCH5Numeric(commandSignal, feedbackSignal, 1);

  // Clamp to 1–5; values outside that range fall back to mode 1
  const clampedIndex = modeValue >= 1 && modeValue <= 5 ? modeValue - 1 : 0;
  const activeMode = modes[clampedIndex];

  const handleClick = () => {
    const next = modeValue >= 5 ? 1 : modeValue + 1;
    setModeValue(next);
  };

  const customStyle: React.CSSProperties = {
    ...style,
    width:  width  ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    padding: (width || height) ? "0" : undefined,
  };

  const renderIcon = () => {
    const el = activeMode.icon;
    if (!el || !React.isValidElement(el)) return el;
    const cloned = React.cloneElement(
      el as React.ReactElement<{ size?: number; width?: number; height?: number; strokeWidth?: number }>,
      { size: iconSize, width: iconSize, height: iconSize, strokeWidth: 2 },
    );
    return (
      <span
        className="inline-flex items-center justify-center shrink-0"
        style={{ width: `${iconSize}px`, height: `${iconSize}px`, overflow: "hidden" }}
      >
        {cloned}
      </span>
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        rounded-full
        transition-all duration-200
        active:scale-95
        ${onClassName ?? `${theme.buttonBackground} ${theme.buttonText}`}
        ${className}
      `}
      style={customStyle}
    >
      {renderIcon()}
      {showLabel && activeMode.label && (
        <span className="text-sm font-medium">{activeMode.label}</span>
      )}
    </button>
  );
}
