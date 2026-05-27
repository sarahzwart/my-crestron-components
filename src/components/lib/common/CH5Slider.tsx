import { cn } from "@/lib/utils";
import { useCH5Numeric } from "../../../hooks/useCH5Numeric";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { SOLID_COLOR_CLASSES, GRADIENT_COLOR_CLASSES } from "@/lib/colors";

export type SliderOrientation = "horizontal" | "vertical";
export type SliderSize = "sm" | "md" | "lg" | "xl";
export type SliderButtonType = "square" | "circle" | "diamond" | "icon";
export type SliderColorSettings = "gradient" | "solid";

export interface SliderProps {
  commandSignal: string;
  feedbackSignal: string;
  touchSettable?: boolean;
  orientation?: SliderOrientation;
  min?: number;
  max?: number;
  step?: number;
  size?: SliderSize;
  thickness?: number;
  thumbSize?: number;
  thumbType?: SliderButtonType;
  colorSettings?: SliderColorSettings;
  trackColor?: string;

  backgroundColor?: string;

  icon?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<
  SliderSize,
  { track: string; thumb: string; container: string }
> = {
  sm: {
    track:
      "h-1 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1",
    thumb: "h-3 w-3",
    container: "h-32",
  },
  md: {
    track:
      "h-2 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
    thumb: "h-4 w-4",
    container: "h-48",
  },
  lg: {
    track:
      "h-3 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3",
    thumb: "h-5 w-5",
    container: "h-64",
  },
  xl: {
    track:
      "h-4 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4",
    thumb: "h-6 w-6",
    container: "h-80",
  },
};

const BUTTON_SHAPE_CLASSES: Record<SliderButtonType, string> = {
  circle: "rounded-full",
  square: "rounded-none",
  diamond: "rounded-none rotate-45",
  icon: "rounded-full",
};

export function CH5Slider({
  commandSignal,
  feedbackSignal,
  touchSettable = true,
  orientation = "horizontal",
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  thickness,
  thumbSize,
  thumbType = "circle",
  colorSettings = "gradient",
  trackColor = "blue",
  backgroundColor = "white",
  icon,
  disabled = false,
  className = "",
  style = {},
}: SliderProps) {
  const [value, setValue] = useCH5Numeric(commandSignal, feedbackSignal, min);

  const handleChange = (newValue: number[]) => {
    if (!touchSettable || disabled) return;
    setValue(newValue[0]);
  };

  const sizeConfig = SIZE_CLASSES[size];
  const containerSize =
    orientation === "vertical" ? sizeConfig.container : "w-full";

  const colorClass =
    colorSettings === "solid"
      ? SOLID_COLOR_CLASSES[trackColor] || SOLID_COLOR_CLASSES.blue
      : GRADIENT_COLOR_CLASSES[trackColor] || GRADIENT_COLOR_CLASSES.blue;

  const trackStyle = thickness
    ? orientation === "horizontal"
      ? { height: `${thickness}px` }
      : { width: `${thickness}px` }
    : undefined;

  const thumbStyle = thumbSize
    ? {
        width: `${thumbSize}px`,
        height: `${thumbSize}px`,
      }
    : undefined;

  return (
    <div
      className={cn("relative flex items-center", containerSize, className)}
      style={style}
    >
      <SliderPrimitive.Root
        value={[value]}
        onValueChange={handleChange}
        orientation={orientation}
        min={min}
        max={max}
        step={step}
        disabled={disabled || !touchSettable}
        className={cn(
          "relative flex w-full touch-none select-none items-center data-disabled:opacity-50",
          orientation === "vertical" && "h-full flex-col",
        )}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative grow overflow-hidden rounded-full",
            thickness ? "" : sizeConfig.track,
          )}
          style={{
            ...trackStyle,
            backgroundColor,
            boxShadow: `
            0 0 8px rgba(255,255,255,0.35),
            0 2px 10px rgba(0,0,0,0.18),
            inset 0 1px 2px rgba(255,255,255,0.25)
        `,
          }}
        >
          <SliderPrimitive.Range
            className={cn(
              "absolute",
              orientation === "horizontal" ? "h-full" : "w-full",
              colorClass,
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            thumbSize ? "" : sizeConfig.thumb,
            BUTTON_SHAPE_CLASSES[thumbType],
            // Hide original thumb when using icon
            thumbType === "icon" && "opacity-0",
          )}
          style={thumbStyle}
        />
      </SliderPrimitive.Root>

      {/* Custom icon thumb overlay */}
      {thumbType === "icon" && icon && (
        <div
          className="absolute pointer-events-none flex items-center justify-center z-10"
          style={{
            left:
              orientation === "horizontal"
                ? `${((value - min) / (max - min)) * 100}%`
                : "50%",
            top:
              orientation === "vertical"
                ? `${100 - ((value - min) / (max - min)) * 100}%`
                : "50%",
            transform: "translate(-50%, -50%)",
            fontSize: thumbSize ? `${thumbSize}px` : undefined,
          }}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
