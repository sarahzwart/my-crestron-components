import { CH5Button } from "./CH5Button";
import type { ButtonShape } from "./CH5Button";

export interface KeypadProps {
  commandSignal: string;
  feedbackSignal: string;
  showClear?: boolean;
  showEnter?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  buttonColor?: string;
  buttonShape?: ButtonShape;
  width?: number | string;
  height?: number | string;
  textSize?: number;
  gap?: number;
  glow?: boolean;
  glowColor?: string;
  activeTextClass?: string;
  inactiveTextClass?: string;
  clearLabel?: string;
  enterLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  onKeyPress?: (key: string) => void;
}

export function CH5Keypad({
  commandSignal,
  feedbackSignal,
  showClear = true,
  showEnter = true,
  size = "md",
  buttonColor = "blue",
  buttonShape = "rounded",
  width,
  height,
  textSize,
  gap = 2,
  glow = true,
  glowColor = "blue",
  activeTextClass = "white",
  inactiveTextClass = "white",
  clearLabel = "C",
  enterLabel = "✓",
  className = "",
  style = {},
  onKeyPress,
}: KeypadProps) {
  const keys = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    showClear ? clearLabel : "", "0", showEnter ? enterLabel : ""
  ];

  const keypadStyle: React.CSSProperties = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
  };

  return (
    <div 
      className={`grid grid-cols-3 grid-rows-4 gap-${gap} w-full h-full ${className}`} 
      style={keypadStyle}
    >
      {keys.map((key, index) => (
        key ? (
          <div key={index} onClick={() => onKeyPress?.(key)} className="w-full h-full">
            <CH5Button
              commandSignal={`${commandSignal}.${key}`}
              feedbackSignal={`${feedbackSignal}.${key}`}
              label={key}
              variant="momentary"
              size={size}
              shape={buttonShape}
              width="100%"
              height="100%"
              textSize={textSize}
              inactiveClass={buttonColor}
              activeClass={buttonColor}
              activeTextClass={activeTextClass}
              inactiveTextClass={inactiveTextClass}
              glow={glow}
              glowColor={glowColor}
            />
          </div>
        ) : (
          <div key={index} />
        )
      ))}
    </div>
  );
}