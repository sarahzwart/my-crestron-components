import { cn } from "@/lib/utils";
import { useCH5Numeric } from "../../hooks/useCH5Numeric";
import { Slider } from "../ui/slider";

export type SliderOrientation = "horizontal" | "vertical";
export type SliderSize = "sm" | "md" | "lg" | "xl";
export type SliderButtonType = "square" | "circle" | "diamond" | "icon";
export type SliderColorSettings = "gradient" | "solid";

export interface SliderProps {
    // Sends the command
    commandSignal: string;
    // Gets the current state for feedback
    feedbackSignal: string;
    // Touch Settable
    touchSettable?: boolean;

    // Orientation of slider
    orientation?: SliderOrientation;

    // Min / Max values of the slider
    min?: number;
    max?: number;

    // Step value for slider increments
    step?: number;

    // Size of Slider
    size?: SliderSize;

    // Button Type
    buttonType?: SliderButtonType;

    // Color settings for the slider track
    colorSettings?: SliderColorSettings;

    // Base color for the slider track (Tailwind color class like 'blue', 'red', 'purple')
    trackColor?: string;

    // Custom icon for button (only used when buttonType is 'icon')
    icon?: string;

    // Disabled state
    disabled?: boolean;

    // Additional styling
    className?: string;
    style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<SliderSize, { track: string; thumb: string; container: string }> = {
    sm: { 
        track: 'h-1', 
        thumb: 'h-3 w-3',
        container: 'h-32'
    },
    md: { 
        track: 'h-2', 
        thumb: 'h-4 w-4',
        container: 'h-48'
    },
    lg: { 
        track: 'h-3', 
        thumb: 'h-5 w-5',
        container: 'h-64'
    },
    xl: { 
        track: 'h-4', 
        thumb: 'h-6 w-6',
        container: 'h-80'
    }
};

// Generate gradient class based on color
const getColorClass = (color: string, colorSettings: SliderColorSettings): string => {
    if (colorSettings === 'solid') {
        return `bg-${color}-500`;
    }
    // Gradient: lighter to darker shade
    return `bg-gradient-to-r from-${color}-300 via-${color}-500 to-${color}-700`;
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
    buttonType = "circle",
    colorSettings = "gradient",
    trackColor = "blue",
    icon,
    disabled = false,
    className = '',
    style = {}
}: SliderProps) {
    const [value, setValue] = useCH5Numeric(commandSignal, feedbackSignal, min);

    // for handling when slider value changes
    const handleChange = (newValue: number[]) => {
        if (!touchSettable || disabled) return;
        setValue(newValue[0]);
    }

    const sizeConfig = SIZE_CLASSES[size];
    const containerSize = orientation === 'vertical' ? sizeConfig.container : 'w-full';
    const colorClass = getColorClass(trackColor, colorSettings);
    
    return (
         <div 
            className={cn(
                "relative flex items-center",
                containerSize,
                className
            )}
            style={style}
        >
            <Slider
                value={[value]}
                onValueChange={handleChange}
                orientation={orientation}
                min={min}
                max={max}
                step={step}
                disabled={disabled || !touchSettable}
                className={cn(
                    "relative flex touch-none select-none items-center",
                    orientation === "vertical" ? "h-full flex-col" : "w-full",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
                data-size={size}
                data-button-type={buttonType}
                data-track-color={colorClass}
            />
            
            {/* Custom thumb rendering if using icon */}
            {buttonType === 'icon' && icon && (
                <div 
                    className="absolute pointer-events-none flex items-center justify-center"
                    style={{
                        left: orientation === 'horizontal' ? `${((value - min) / (max - min)) * 100}%` : '50%',
                        top: orientation === 'vertical' ? `${100 - ((value - min) / (max - min)) * 100}%` : '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <span className={cn(sizeConfig.thumb, "flex items-center justify-center")}>
                        {icon}
                    </span>
                </div>
            )}
        </div>
    );
}
