import { useCH5Boolean } from "../../hooks/useCH5Boolean";
import { Button } from "../ui/button";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonShape = "rounded" | "square" | "pill";
export type ButtonVariant = "toggle" | "momentary";

export interface ButtonProps {
  // Sends the command
  commandSignal: string;
  // Gets the current state for feedback
  feedbackSignal: string;

  // Disable the button (non-interactive)
  disabled?: boolean;

  // Behaviour - toggle or momentary
  variant?: ButtonVariant;

  // Preset Size (Controls padding + font size)
  size?: ButtonSize;

  // 'Rounded', 'Square', or 'Pill' shape options
  shape?: ButtonShape;

  // Custom dimensions (overrides size presets)
  width?: number | string; // e.g. 200 | '50%' | '8rem'
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;

  // Static Label for Momentary Button
  label?: string;

  // On/Off Labels for Toggle Button
  onLabel?: string;
  offLabel?: string;

  // Icon Settings
  icon?: string;
  iconPosition?: "left" | "right" | "top" | "bottom";
  iconSize?: number;

  // default to true - shadow ring when active
  glow?: boolean;
  // Tailwind Shadow Class
  glowColor?: string;

  // Custom CSS classes for active/inactive states
  activeClass?: string;
  inactiveClass?: string;
  activeTextClass?: string;
  inactiveTextClass?: string;

  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  rounded: "rounded-lg",
  square: "rounded-none",
  pill: "rounded-full",
};

const ICON_POSITION_CLASSES: Record<string, string> = {
  left: "flex-row",
  right: "flex-row-reverse",
  top: "flex-col",
  bottom: "flex-col-reverse",
  center: "flex-row",
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
  label,
  onLabel = "ON",
  offLabel = "OFF",
  icon,
  iconPosition = "left",
  iconSize = 20,
  glow = true,
  glowColor = "shadow-indigo-500/40",
  activeClass = "bg-indigo-600 hover:bg-indigo-700",
  inactiveClass = "bg-gray-600 hover:bg-gray-700",
  activeTextClass = "text-white",
  inactiveTextClass = "text-gray-200",
  disabled = false,
  className = "",
  style = {},
}: ButtonProps) {
  const [isOn, setIsOn] = useCH5Boolean(commandSignal, feedbackSignal, false);

  const handleClick = () => {
    if (disabled) return;
    if (variant === "toggle") {
      setIsOn(!isOn);
    } else if (variant === "momentary") {
      setIsOn(true);
      setTimeout(() => setIsOn(false), 200);
    }
  };

  const buttonText = variant === "toggle" ? (isOn ? onLabel : offLabel) : label;

  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
    ...(minWidth && {
      minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth,
    }),
    ...(minHeight && {
      minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
    }),
    ...(maxWidth && {
      maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    }),
    ...(maxHeight && {
      maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
    }),
  };

  const colorClass = isOn ? activeClass : inactiveClass;
  const textColorClass = isOn ? activeTextClass : inactiveTextClass;
  const glowClass = glow && isOn ? `shadow-lg ${glowColor}` : "shadow-md";

  const hasText = Boolean(buttonText);
  const layoutClass = hasText ? ICON_POSITION_CLASSES[iconPosition] : '';

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`${SIZE_CLASSES[size]} 
                  ${SHAPE_CLASSES[shape]} 
                  ${colorClass} ${textColorClass} 
                  ${glowClass} ${className} ${layoutClass}
                  flex items-center justify-center 
                  gap-2 transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed`
                }
      style={customStyle}
    >
      {icon && (
        <span 
          className="flex-shrink-0"
          style={{ fontSize: iconSize }}
        >
          {icon}
        </span>
      )}
      {buttonText && <span>{buttonText}</span>}
    </Button>
  );
}
