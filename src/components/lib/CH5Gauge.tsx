import { useCH5Numeric } from "../../hooks/useCH5Numeric";
import { Progress } from "radix-ui";
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

  // displaying value
  showValue?: boolean;
  valuePosition?: "start" | "end" | "center";
  formatValue?: (value: number) => string;
  unit?: string;

  showTicks?: boolean;
  tickCount?: number;

  // for circle
  startAngle?: number;
  endAngle?: number;

  //for bar
  thickness?: number;
  width?: number | string;

  // additional styling
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<
  GaugeSize,
  { circular: string; linear: string; text: string }
> = {
  sm: {
    circular: "w-24 h-24",
    linear: "h-2",
    text: "text-xs",
  },
  md: {
    circular: "w-32 h-32",
    linear: "h-3",
    text: "text-sm",
  },
  lg: {
    circular: "w-48 h-48",
    linear: "h-4",
    text: "text-base",
  },
  xl: {
    circular: "w-64 h-64",
    linear: "h-6",
    text: "text-lg",
  },
};

export function CH5Gauge({
  commandSignal,
  feedbackSignal,
  orientation = "circular",
  min = 0,
  max = 100,
  size = "md",
  width,
  thickness,
  colorSettings = "gradient",
  gaugeColor = "blue",
  showValue = true,
  valuePosition = "center",
  formatValue = (value: number) => value.toString(),
  unit = "",
  showTicks = false,
  tickCount = 5,
  startAngle = 135,
  endAngle = 405,
  className = "",
  style = {},
}: GaugeProps) {
  const [value] = useCH5Numeric(commandSignal, feedbackSignal, min);

  const percentage = ((value - min) / (max-min)) * 100;
  const sizeConfig = SIZE_CLASSES[size];

  const colorClass = colorSettings === 'solid'
    ? SOLID_COLOR_CLASSES[gaugeColor] || SOLID_COLOR_CLASSES.blue
    : GRADIENT_COLOR_CLASSES[gaugeColor] || GRADIENT_COLOR_CLASSES.blue;

  const displayValue = formatValue(value);

  if(orientation === "circular"){
    return (
      <div>

      </div>
    )
  }


  // Linear Gauge

  const linearWidth = width ? (typeof width === 'number' ? `${width}px` : width) : undefined;
  const linearHeight = thickness ? `${thickness}px` : undefined;

  return (
    <div className={`flex flex-col gap-2 ${className}`} style={style}>
      {showValue && valuePosition === "start" && (
        <div className={``}>

        </div>
      )}
      {showValue && valuePosition === "end" && (
        <div className={``}>
          
        </div>
      )}
      {showValue && valuePosition === "center" && (
        <div className={``}>
          
        </div>
      )}
    </div>
  )
}
