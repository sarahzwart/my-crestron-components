import React from "react";
import { useCH5Numeric } from "../../../hooks/useCH5Numeric";
import { useTheme } from "@/lib/theme";

export interface ModeEntry {
  icon: React.ReactNode;
  label?: string;
  className?: string;
}

export interface CH5MultiModeButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  modes: ModeEntry[];
  width?: number | string;
  height?: number | string;
  iconSize?: number;
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CH5MultiModeButton = ({
  commandSignal,
  feedbackSignal,
  modes,
  width,
  height,
  iconSize = 24,
  showLabel = false,
  className = "",
  style = {},
}: CH5MultiModeButtonProps) => {
  const { theme } = useTheme();
  const modeCount = modes.length;

  const [modeValue, setModeValue] = useCH5Numeric(commandSignal, feedbackSignal, 1);
  const clampedIndex =
    modeCount > 0 && modeValue >= 1 && modeValue <= modeCount ? modeValue - 1 : 0;
  const activeMode = modes[clampedIndex];

  const handleClick = () => {
    if (modeCount === 0) return;
    const next = modeValue >= modeCount ? 1 : modeValue + 1;
    setModeValue(next);
  };

  const customStyle: React.CSSProperties = {
    ...style,
    width:  width  ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    padding: (width || height) ? "0" : undefined,
  };

  const renderIcon = () => {
    const el = activeMode?.icon;
    if (!el || !React.isValidElement(el)) return el ?? null;
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

  if (modeCount === 0) return null;

  const buttonClasses = activeMode?.className
    ? `${activeMode.className} ${className}`
    : `${theme.buttonBackground} ${theme.buttonText} ${className}`;

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2
        rounded-full
        transition-all duration-200
        active:scale-95
        ${buttonClasses}
      `}
      style={customStyle}
    >
      {renderIcon()}
      {showLabel && activeMode?.label && (
        <span className="text-sm font-medium">{activeMode.label}</span>
      )}
    </button>
  );
};