import { useCH5Boolean } from "../hooks/useCH5Boolean";

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonShape = 'rectangle' | 'rounded-rectangle' | 'square' | 'rounded-square' | 'pill' | 'circle';
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

// Size classes for rectangular buttons (width auto, padding based)
const RECT_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-w-[80px]',
  md: 'px-6 py-3 text-base min-w-[120px]',
  lg: 'px-8 py-4 text-lg min-w-[160px]',
  xl: 'px-10 py-5 text-xl min-w-[200px]'
};

// Size classes for square buttons (equal width and height)
const SQUARE_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'w-16 h-16 text-sm',
  md: 'w-20 h-20 text-base',
  lg: 'w-24 h-24 text-lg',
  xl: 'w-32 h-32 text-xl'
};

// Size classes for circle buttons (equal width and height, rounded-full)
const CIRCLE_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'w-16 h-16 text-sm',
  md: 'w-20 h-20 text-base',
  lg: 'w-24 h-24 text-lg',
  xl: 'w-32 h-32 text-xl'
};

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  'rectangle': 'rounded-none',
  'rounded-rectangle': 'rounded-lg',
  'square': 'rounded-none',
  'rounded-square': 'rounded-lg',
  'pill': 'rounded-full',
  'circle': 'rounded-full'
};

// Helper to check if a color is a hex code
const isHexColor = (color: string) => color.startsWith('#');

export const Button = ({
  commandSignal,
  feedbackSignal,
  variant='toggle',
  size='md',
  shape='rounded-rectangle',
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

  const bgColor = isOn ? activeClass : inactiveClass;
  const textColor = isOn ? activeTextClass : inactiveTextClass;
  
  // Build inline styles for all hex colors
  const buttonStyle: React.CSSProperties = {};
  
  // Background color
  if (isHexColor(bgColor)) {
    buttonStyle.backgroundColor = bgColor;
  }
  
  // Text color
  if (isHexColor(textColor)) {
    buttonStyle.color = textColor;
  }
  
  // Glow/shadow
  if (glow && isOn) {
    if (glowColor && isHexColor(glowColor)) {
      // Custom hex glow color
      buttonStyle.boxShadow = `0 10px 15px -3px ${glowColor}66, 0 4px 6px -2px ${glowColor}66`;
    } else if (glowColor && !isHexColor(glowColor)) {
      // Glowcolor is a CSS color name or rgb/rgba
      buttonStyle.boxShadow = `0 10px 15px -3px ${glowColor}, 0 4px 6px -2px ${glowColor}`;
    }
    // else: use Tailwind shadow class below
  }

  // Determine which size classes to use based on shape
  const getSizeClasses = () => {
    if (shape === 'circle') {
      return CIRCLE_SIZE_CLASSES[size];
    } else if (shape === 'square' || shape === 'rounded-square') {
      return SQUARE_SIZE_CLASSES[size];
    } else {
      // rectangle, rounded-rectangle, pill
      return RECT_SIZE_CLASSES[size];
    }
  };

  // Build className with only non-hex Tailwind classes
  const glowClass = glow && isOn 
    ? (glowColor ? 'shadow-lg' : 'shadow-lg shadow-indigo-500/40')
    : 'shadow-md';

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

    // For circle and square, prefer vertical or center layout
    const isCompact = shape === 'circle' || shape === 'square' || shape === 'rounded-square';

    switch (iconPosition) {
      case 'left':
        return (
          <span className="flex items-center justify-center gap-2">
            {iconElement}
            {!isCompact && displayText}
          </span>
        );
      case 'right':
        return (
          <span className="flex items-center justify-center gap-2">
            {!isCompact && displayText}
            {iconElement}
          </span>
        );
      case 'top':
        return (
          <span className="flex flex-col items-center justify-center gap-1">
            {iconElement}
            <span className="text-xs leading-tight">{displayText}</span>
          </span>
        );
      case 'bottom':
        return (
          <span className="flex flex-col items-center justify-center gap-1">
            <span className="text-xs leading-tight">{displayText}</span>
            {iconElement}
          </span>
        );
      case 'center':
      default:
        if (isCompact && icon && !displayText) {
          // Icon only for compact shapes
          return iconElement;
        }
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
      style={buttonStyle}
      className={`
        ${getSizeClasses()}
        ${SHAPE_CLASSES[shape]} 
        ${!isHexColor(bgColor) ? bgColor : ''}
        ${!isHexColor(textColor) ? textColor : ''}
        ${!glowColor || !isHexColor(glowColor) ? glowClass : ''}
        transition-all 
        duration-200
        flex
        items-center
        justify-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
      `}
    >
      {getIconLayout()}
    </button>
  );
}