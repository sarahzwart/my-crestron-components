export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;

  orientation?: "horizontal" | "vertical";

  size?: "sm" | "md" | "lg" | "xl";
  showValue?: boolean;
  valuePosition?: "inside" | "outside";

  trackColor?: string;
  trackGradient?: string;
  fillColor?: string;
  fillGradient?: string;

  handleColor?: string;
  handleSize?: "sm" | "md" | "lg" | "xl";
  handleShape?: "circle" | "square" | "diamond";
  handleGlow?: boolean;
  handleGlowColor?: string;

  label?: string;
  unit?: string;
  formaValue?: (value: number) => string;

  commandSignal?: string;
  feedbackSignal?: string;

  onChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,

}: SliderProps) => {
  return (
    
  );
};
