import { useCH5Boolean } from "../hooks/useCH5Boolean";

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

export const Button = ({
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
  iconSize = 20,
  glow=true,
  glowColor,
  activeClass = 'bg-indigo-600',
  inactiveClass = 'bg-gray-600',
  activeTextClass = 'text-white',
  inactiveTextClass = 'text-gray-200',
  disabled = false,
}: ButtonProps) => {
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
  
  // Use custom glow color if provided, otherwise default
  const glowClass = glow && isOn 
    ? glowColor 
      ? `shadow-lg` 
      : 'shadow-lg shadow-indigo-500/40' 
    : 'shadow-md';
  
  const glowStyle = glow && isOn && glowColor 
    ? { boxShadow: `0 10px 15px -3px ${glowColor}40, 0 4px 6px -2px ${glowColor}40` }
    : undefined;

  // Determine icon layout based on iconPosition
  const getIconLayout = () => {
    const displayText = isOn ? onLabel : offLabel;
    const iconElement = icon && (
      <span 
        className="shrink-0" 
        style={iconSize ? { fontSize: `${iconSize}px` } : undefined}
      >
        {icon}
      </span>
    );

    switch (iconPosition) {
      case 'left':
        return (
          <span className="flex items-center justify-center gap-2">
            {iconElement}
            {displayText}
          </span>
        );
      case 'right':
        return (
          <span className="flex items-center justify-center gap-2">
            {displayText}
            {iconElement}
          </span>
        );
      case 'top':
        return (
          <span className="flex flex-col items-center justify-center gap-1">
            {iconElement}
            {displayText}
          </span>
        );
      case 'bottom':
        return (
          <span className="flex flex-col items-center justify-center gap-1">
            {displayText}
            {iconElement}
          </span>
        );
      case 'center':
      default:
        return (
          <span className="flex items-center justify-center gap-2">
            {iconElement}
            {displayText}
          </span>
        );
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={glowStyle}
      className={`
        w-full 
        ${SIZE_CLASSES[size]} 
        ${SHAPE_CLASSES[shape]} 
        ${colorClass} 
        ${textColorClass} 
        ${glowClass}
        transition-all 
        duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
      `}
    >
      {getIconLayout()}
    </button>
  );
}