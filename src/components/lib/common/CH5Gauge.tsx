import { useCH5Numeric } from "../../../hooks/useCH5Numeric";
import * as Progress from "@radix-ui/react-progress";
import { SOLID_COLOR_CLASSES, GRADIENT_COLOR_CLASSES } from "@/lib/colors";

export type GaugeOrientation = "circular" | "linear";
export type GaugeSize = "sm" | "md" | "lg" | "xl";
export type GaugeColorSettings = "gradient" | "solid";

export interface GaugeProps {
  commandSignal: string;
  feedbackSignal: string;

  orientation?: GaugeOrientation;
  min?: number;
  max?: number;
  size?: GaugeSize;

  colorSettings?: GaugeColorSettings;
  gaugeColor?: string;

  showValue?: boolean;
  valuePosition?: "start" | "end" | "center";
  formatValue?: (value: number) => string;
  unit?: string;

  thickness?: number;
  width?: number | string;

  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<
  GaugeSize,
  { linear: string; text: string }
> = {
  sm: {
    linear: "h-2",
    text: "text-xs",
  },
  md: {
    linear: "h-3",
    text: "text-sm",
  },
  lg: {
    linear: "h-4",
    text: "text-base",
  },
  xl: {
    linear: "h-6",
    text: "text-lg",
  },
};

export function CH5Gauge({
  commandSignal,
  feedbackSignal,
  min = 0,
  max = 100,
  size = "md",
  width,
  thickness,
  colorSettings = "gradient",
  gaugeColor = "blue",
  showValue = false,
  valuePosition = "center",
  formatValue = (value: number) => value.toString(),
  unit = "",
  className = "",
  style = {},
}: GaugeProps) {
  const [value] = useCH5Numeric(commandSignal, feedbackSignal, min);

  const percentage = ((value - min) / (max - min)) * 100;
  const sizeConfig = SIZE_CLASSES[size];

  const colorClass =
    colorSettings === "solid"
      ? SOLID_COLOR_CLASSES[gaugeColor] || SOLID_COLOR_CLASSES.blue
      : GRADIENT_COLOR_CLASSES[gaugeColor] || GRADIENT_COLOR_CLASSES.blue;

  const displayValue = formatValue(value);

  const linearWidth = width
    ? typeof width === "number"
      ? `${width}px`
      : width
    : "w-full";
  const containerSize = "w-full";

  const trackStyle = thickness ? { height: `${thickness}px` } : undefined;

  return (
    <div
      className={`relative flex items-center ${containerSize} ${className}`}
      style={style}
    >
      {showValue && valuePosition === "start" && (
        <div className={`text-center ${sizeConfig.text} mb-2`}>
          <span className="font-bold">
            {displayValue}
            {unit && <span className="ml-1">{unit}</span>}
          </span>
        </div>
      )}

      <div className="relative w-full" style={{ width: linearWidth }}>
        <Progress.Root
          value={percentage}
          className={`relative overflow-hidden rounded-full bg-secondary w-full ${
            thickness ? "" : sizeConfig.linear
          }`}
          style={trackStyle}
        >
          <Progress.Indicator
            className={`h-full transition-all duration-500 ${colorClass}`}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </Progress.Root>

        {showValue && valuePosition === "center" && (
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none ${sizeConfig.text}`}
          >
            <span className="font-bold text-white drop-shadow-lg">
              {displayValue}
              {unit && <span className="ml-1">{unit}</span>}
            </span>
          </div>
        )}
      </div>

      {showValue && valuePosition === "end" && (
        <div className={`text-center ${sizeConfig.text} mt-2`}>
          <span className="font-bold">
            {displayValue}
            {unit && <span className="ml-1">{unit}</span>}
          </span>
        </div>
      )}
    </div>
  );
}