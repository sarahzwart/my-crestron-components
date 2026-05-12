import { useCH5Boolean } from "../../hooks/useCH5Boolean";

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rounded' | 'square' | 'pill';
export type ButtonVariant = 'toggle' | 'momentary';

export interface ButtonProps {
  // Sends the command
  commandSignal: string;
  // Gets the current state for feedback
  feedbackSignal: string;

  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;

  // Optional Label for the Button
  label?: string;
  onLabel?: string;
  offLabel?: string;

  // Icon Settings
  icon?: string;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom'| 'center';
  iconSize?: number;

  // Colored ring around the button when active
  glow?: boolean;
  glowColor?: string;

  // Custom CSS classes for active/inactive states
  activeClass?: string;
  inactiveClass?: string;
  activeTextClass?: string;
  inactiveTextClass?: string;

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
  onLabel="ON",
  offLabel="OFF",
  icon,
  iconPosition='center',
  iconSize,
  glow=true,
  glowColor,
  activeClass = 'bg-indigo-600',
  inactiveClass = 'bg-gray-600',
  activeTextClass = 'text-white',
  inactiveTextClass = 'text-gray-200',
  disabled = false,
}: ButtonProps) {
  const [isOn, setIsOn] = useCH5Boolean(commandSignal, feedbackSignal, false);
  
  const handleClick = () => {
    if (disabled) return;
    if (variant === 'toggle') {
      setIsOn(!isOn);
    } else if (variant === 'momentary') {
      setIsOn(true);
      setTimeout(() => setIsOn(false), 200); 
    }
  };

  const colorClass = isOn ? activeClass : inactiveClass;
  const textColorClass = isOn ? activeTextClass : inactiveTextClass;
  const glowClass = glow && isOn ? 'shadow-lg shadow-indigo-500/40' : 'shadow-md';

  return (
    <div>
      <button
      className={`w-full ${SIZE_CLASSES[size]} ${SHAPE_CLASSES[shape]} ${colorClass} ${textColorClass} ${glowClass}`}>
         <span className="flex items-center justify-center gap-2">
          {icon && <span className="shrink-0">{icon}</span>}
          {isOn ? onLabel : offLabel}
        </span>
      </button>
    </div>
  );
}