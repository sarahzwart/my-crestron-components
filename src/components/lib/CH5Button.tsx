import { useCH5Boolean } from "../../hooks/useCH5Boolean";
import {
  SOLID_COLOR_CLASSES,
  TEXT_COLOR_CLASSES,
  GLOW_CLASSES,
} from "@/lib/colors";
import React from "react";

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
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  textSize?: number;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "top" | "bottom";
  iconSize?: number;
  iconColorClass?: string; // NEW: Direct override for icon/text color
  glow?: boolean;
  glowColor?: string;
  activeClass?: string;
  inactiveClass?: string;
  activeTextClass?: string;
  inactiveTextClass?: string;

  iconOn?: React.ReactNode; // Icon when toggle is ON
  iconOff?: React.ReactNode; // Icon when toggle is OFF

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
  square: "rounded-none",
  pill: "rounded-full",
  circle: "rounded-full",
};

const ICON_POSITION_CLASSES: Record<string, string> = {
  left: "flex-row",
  right: "flex-row-reverse",
  top: "flex-col",
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
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  textSize,
  label,
  onLabel = "ON",
  offLabel = "OFF",
  icon,
  iconPosition = "left",
  iconSize,
  iconColorClass,
  glow = true,
  glowColor = "indigo",
  activeClass = "indigo",
  inactiveClass = "gray",
  activeTextClass = "white",
  inactiveTextClass = "white",
  iconOn,
  iconOff,
  disabled = false,
  className = "",
  style = {},
}: ButtonProps) {
  const [isOn, setIsOn] = useCH5Boolean(
    commandSignal,
    feedbackSignal || commandSignal + ".fb",
    false,
  );

  const handleClick = () => {
    if (disabled) return;
    if (variant === "toggle") {
      setIsOn(!isOn);
    } else if (variant === "momentary" || variant === "glass") {
      setIsOn(true);
      setTimeout(() => setIsOn(false), 200);
    }
  };

  const buttonText = variant === "toggle" ? (isOn ? onLabel : offLabel) : label;

  const customStyle: React.CSSProperties = {
    ...style,
    width: width
      ? typeof width === "number"
        ? `${width}px`
        : width
      : undefined,
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : undefined,
    minWidth: minWidth
      ? typeof minWidth === "number"
        ? `${minWidth}px`
        : minWidth
      : undefined,
    minHeight: minHeight
      ? typeof minHeight === "number"
        ? `${minHeight}px`
        : minHeight
      : undefined,
    maxWidth: maxWidth
      ? typeof maxWidth === "number"
        ? `${maxWidth}px`
        : maxWidth
      : undefined,
    maxHeight: maxHeight
      ? typeof maxHeight === "number"
        ? `${maxHeight}px`
        : maxHeight
      : undefined,
    fontSize: textSize ? `${textSize}px` : undefined,
    padding: width || height ? "0" : undefined,
  };

  const getColorClass = () => {
    if (variant === "glass") {
      return "bg-white/10 hover:bg-white/20 backdrop-blur-md";
    }
    return isOn
      ? SOLID_COLOR_CLASSES[activeClass] || SOLID_COLOR_CLASSES.indigo
      : SOLID_COLOR_CLASSES[inactiveClass] || SOLID_COLOR_CLASSES.gray;
  };

  const colorClass = getColorClass();

  // Use iconColorClass if provided, otherwise fall back to default behavior
  const textColorClass = iconColorClass
    ? iconColorClass
    : isOn
      ? TEXT_COLOR_CLASSES[activeTextClass] || TEXT_COLOR_CLASSES.white
      : TEXT_COLOR_CLASSES[inactiveTextClass] || TEXT_COLOR_CLASSES.white;

  const glowClass =
    glow && isOn && variant !== "glass"
      ? `shadow-lg ${GLOW_CLASSES[glowColor] || GLOW_CLASSES.indigo}`
      : "shadow-md";

  const hasText = Boolean(buttonText);
  const layoutClass = hasText ? ICON_POSITION_CLASSES[iconPosition] : "";

  const getSizeClass = () => {
    if (width || height) {
      return "";
    }
    if (shape === "circle" && !hasText) {
      return "w-12 h-12 p-0";
    }
    if (textSize) {
      return SIZE_CLASSES[size].replace(/text-\w+/, "").trim();
    }
    return SIZE_CLASSES[size];
  };

  const sizeClass = getSizeClass();

  const renderIcon = () => {
    // Choose icon based on state
    let iconToRender = icon;
    if (variant === "toggle" && (iconOn || iconOff)) {
      iconToRender = isOn ? iconOn || icon : iconOff || icon;
    }

    if (!iconToRender) return null;

    if (iconSize && React.isValidElement(iconToRender)) {
      const clonedIcon = React.cloneElement(
        iconToRender as React.ReactElement<any>,
        {
          size: iconSize,
          width: iconSize,
          height: iconSize,
          strokeWidth: 2,
        },
      );

      return (
        <span
          className="inline-flex items-center justify-center shrink-0"
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {clonedIcon}
        </span>
      );
    }

    return iconToRender;
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${sizeClass} 
                  ${SHAPE_CLASSES[shape]} 
                  ${colorClass} ${textColorClass} 
                  ${glowClass} ${className} ${layoutClass}
                  flex items-center justify-center 
                  transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed`}
      style={customStyle}
    >
      {(icon || iconOn || iconOff) ? renderIcon() : null}
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
}
