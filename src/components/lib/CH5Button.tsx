import { useCH5Boolean } from "../../hooks/useCH5Boolean";
import { Button } from "../ui/button";
import { COLOR_CLASSES, TEXT_COLOR_CLASSES, GLOW_CLASSES } from "@/lib/colors";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonShape = "rounded" | "square" | "pill";
export type ButtonVariant = "toggle" | "momentary";

export interface ButtonProps {
  commandSignal: string;
  feedbackSignal: string;
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
  icon?: string;
  iconPosition?: "left" | "right" | "top" | "bottom";
  iconSize?: number;
  glow?: boolean;
  glowColor?: string;
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
  iconSize = 20,
  glow = true,
  glowColor = "indigo",
  activeClass = "indigo",
  inactiveClass = "gray",
  activeTextClass = "white",
  inactiveTextClass = "white",
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
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
    ...(minWidth && { minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth }),
    ...(minHeight && { minHeight: typeof minHeight === "number" ? `${minHeight}px` : minHeight }),
    ...(maxWidth && { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }),
    ...(maxHeight && { maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight }),
    ...(textSize && { fontSize: `${textSize}px` }),
  };

  const colorClass = isOn 
    ? COLOR_CLASSES[activeClass] || COLOR_CLASSES.indigo
    : COLOR_CLASSES[inactiveClass] || COLOR_CLASSES.gray;
  
  const textColorClass = isOn 
    ? TEXT_COLOR_CLASSES[activeTextClass] || TEXT_COLOR_CLASSES.white
    : TEXT_COLOR_CLASSES[inactiveTextClass] || TEXT_COLOR_CLASSES.white;

  const glowClass = glow && isOn 
    ? `shadow-lg ${GLOW_CLASSES[glowColor] || GLOW_CLASSES.indigo}` 
    : "shadow-md";

  const hasText = Boolean(buttonText);
  const layoutClass = hasText ? ICON_POSITION_CLASSES[iconPosition] : '';

  const sizeClass = textSize 
    ? SIZE_CLASSES[size].replace(/text-\w+/, '').trim()
    : SIZE_CLASSES[size];

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`${sizeClass} 
                  ${SHAPE_CLASSES[shape]} 
                  ${colorClass} ${textColorClass} 
                  ${glowClass} ${className} ${layoutClass}
                  flex items-center justify-center 
                  gap-2 transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed`}
      style={customStyle}
    >
      {icon && (
        <span className="flex-shrink-0" style={{ fontSize: iconSize }}>
          {icon}
        </span>
      )}
      {buttonText && <span>{buttonText}</span>}
    </Button>
  );
}