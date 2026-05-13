import { useCH5Numeric } from "../../hooks/useCH5Numeric";
import {
  COLOR_CLASSES,
  GRADIENT_COLOR_CLASSES,
  SOLID_COLOR_CLASSES,
} from "@/lib/colors";

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

  showTicks?: boolean;
  tickCount?: number;
  startAngle?: number;
  endAngle?: number;
  thickness?: number;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}


const SIZE_CLASSES: Record<GaugeSize, { circular: string; linear: string; text: string }> = {
  sm: {
    circular: "w-24 h-24",
    linear: "h-2",
    text: "text-xs"
  },
  md: {
    circular: "w-32 h-32",
    linear: "h-3",
    text: "text-sm"
  },
  lg: {
    circular: "w-48 h-48",
    linear: "h-4",
    text: "text-base"
  },
  xl: {
    circular: "w-64 h-64",
    linear: "h-6",
    text: "text-lg"
  }
};

export function CH5Gauge({ commandSignal, feedbackSignal }: GaugeProps) {

}
