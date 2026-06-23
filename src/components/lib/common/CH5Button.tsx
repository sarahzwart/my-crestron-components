import { useCH5Boolean } from "../../../hooks/useCH5Boolean";
import React, { useRef } from "react";
import { useTheme } from "@/lib/theme";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonShape = "rounded" | "square" | "pill" | "circle";
export type ButtonVariant = "toggle" | "momentary" | "glass";

export interface ButtonProps {
  commandSignal: string;
  feedbackSignal?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  width?: number | string;
  height?: number | string;
  textSize?: number;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  iconSize?: number;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  onClick?: () => void;
  /**
   * Fired when the button is pressed and held for at least `holdTimeMs`.
   * Only applies when variant="momentary" — toggle buttons ignore this prop,
   * since hold semantics don't make sense for an on/off state.
   * When this fires, the normal onClick is suppressed for that press — only
   * one of onClick or onPressAndHold will run per press.
   */
  onPressAndHold?: () => void;
  /** How long the button must be held before onPressAndHold fires. Default 600ms. */
  holdTimeMs?: number;
  onClassName?: string;
  offClassName?: string;
  useThemeColors?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  rounded: "rounded-lg",
  square:  "rounded-none",
  pill:    "rounded-full",
  circle:  "rounded-full",
};

const ICON_POSITION_CLASSES: Record<string, string> = {
  left:   "flex-row",
  right:  "flex-row-reverse",
  top:    "flex-col",
  bottom: "flex-col-reverse",
};

export function CH5Button({
  commandSignal,
  feedbackSignal,
  variant = "toggle",
  size = "md",
  shape = "rounded",
  width,
  height,
  textSize,
  label,
  onLabel,
  offLabel,
  icon,
  iconPosition = "left",
  iconSize,
  iconOn,
  iconOff,
  disabled = false,
  className = "",
  onClick,
  onPressAndHold,
  holdTimeMs = 600,
  style = {},
  onClassName,
  offClassName,
  useThemeColors = false,
}: ButtonProps) {
  const { theme } = useTheme();

  const [isOn, setIsOn] = useCH5Boolean(
    commandSignal,
    feedbackSignal || commandSignal + ".fb",
    false,
  );

  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heldRef = useRef(false);

  const clearHoldTimer = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  const handleClick = () => {
    if (disabled) return;
    // If this press was already consumed by onPressAndHold, skip the
    // normal click behavior entirely.
    if (heldRef.current) {
      heldRef.current = false;
      return;
    }
    if (variant === "toggle") {
      setIsOn(!isOn);
    } else {
      setIsOn(true);
      setTimeout(() => setIsOn(false), 200);
    }
    onClick?.();
  };

  const handlePointerDown = () => {
    if (disabled || !onPressAndHold || variant !== "momentary") return;
    heldRef.current = false;
    clearHoldTimer();
    holdTimerRef.current = setTimeout(() => {
      heldRef.current = true;
      onPressAndHold();
    }, holdTimeMs);
  };

  const handlePointerUp = () => {
    clearHoldTimer();
  };

  const handlePointerLeave = () => {
    // Pointer dragged off the button before release: cancel the hold,
    // and don't treat it as a consumed press either.
    clearHoldTimer();
    heldRef.current = false;
  };

  const buttonText = (onLabel || offLabel)
    ? (variant === "toggle" ? (isOn ? onLabel : offLabel) : label)
    : label;

  const customStyle: React.CSSProperties = {
    ...style,
    width:    width  ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
    height:   height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    fontSize: textSize ? `${textSize}px` : undefined,
    padding:  (width || height) ? "0" : undefined,
  };
  const stateColor =
    variant === "glass"
      ? "bg-white/10 backdrop-blur-md text-white"
      : isOn
        ? (onClassName ?? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`)
        : (offClassName ?? `${theme.buttonBackground} ${theme.buttonText}`);

  const stateDriven =
    useThemeColors || onClassName !== undefined || offClassName !== undefined;

  const colorClasses = stateDriven ? stateColor : (className || stateColor);
  const extraClasses = stateDriven ? className : "";

  const hasText = Boolean(buttonText);
  const layoutClass = hasText ? ICON_POSITION_CLASSES[iconPosition] : "";

  const getSizeClass = () => {
    if (width || height) return "";
    if (shape === "circle" && !hasText) return "";
    return SIZE_CLASSES[size];
  };

  const renderIcon = () => {
    let iconToRender = icon;
    if (variant === "toggle" && (iconOn || iconOff)) {
      iconToRender = isOn ? (iconOn || icon) : (iconOff || icon);
    }
    if (!iconToRender) return null;

    if (iconSize && React.isValidElement(iconToRender)) {
      const cloned = React.cloneElement(
        iconToRender as React.ReactElement<{ size?: number; width?: number; height?: number; strokeWidth?: number }>,
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
    }
    return iconToRender;
  };

  return (
    <button
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      disabled={disabled}
      className={`
        ${getSizeClass()}
        ${SHAPE_CLASSES[shape]}
        ${colorClasses}
        ${extraClasses}
        ${layoutClass}
        flex items-center justify-center
        transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      style={customStyle}
    >
      {(icon || iconOn || iconOff) ? renderIcon() : null}
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
}