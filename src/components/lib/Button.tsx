export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rounded' | 'square' | 'pill';
export type ButtonVariant = 'toggle' | 'momentary';

interface ButtonProps {
  // Sends the command
  commandSignal: string;
  // Gets the current state for feedback
  feedbackSignal: string;

  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;

  // Optional Label for the Button
  label?: string;

  // Icon Settings
  icon?: string;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  iconSize?: number;

  // Colored ring around the button when active
  glow?: boolean;
  glowColor?: string;

  disabled?: boolean;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  rounded: 'rounded-lg',
  square: 'rounded-none',
  pill: 'rounded-full'
};

export function Button({
  commandSignal,
  feedbackSignal,
  variant='toggle',
  size='md',
  shape='rounded',
  label,
  icon,
  iconPosition,
  iconSize,
  glow=true,
  glowColor,
  disabled = false
}: ButtonProps) {
  return (
 
  );
}