import { cn } from "@/lib/utils";
import { useCH5Numeric } from "../../hooks/useCH5Numeric";
import * as SliderPrimitive from "@radix-ui/react-slider";

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
    icon?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const SIZE_CLASSES: Record<SliderSize, { track: string; thumb: string; container: string }> = {
    sm: { 
        track: 'h-1 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1', 
        thumb: 'h-3 w-3',
        container: 'h-32'
    },
    md: { 
        track: 'h-2 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2', 
        thumb: 'h-4 w-4',
        container: 'h-48'
    },
    lg: { 
        track: 'h-3 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3', 
        thumb: 'h-5 w-5',
        container: 'h-64'
    },
    xl: { 
        track: 'h-4 w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4', 
        thumb: 'h-6 w-6',
        container: 'h-80'
    }
};

const BUTTON_SHAPE_CLASSES: Record<SliderButtonType, string> = {
    circle: "rounded-full",
    square: "rounded-none",
    diamond: "rounded-none rotate-45",
    icon: "rounded-full"
};

const SOLID_COLOR_CLASSES: Record<string, string> = {
    black: "bg-black",
    white: "bg-white",
    slate: "bg-slate-500",
    gray: "bg-gray-500",
    zinc: "bg-zinc-500",
    neutral: "bg-neutral-500",
    stone: "bg-stone-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    amber: "bg-amber-500",
    yellow: "bg-yellow-500",
    lime: "bg-lime-500",
    green: "bg-green-500",
    emerald: "bg-emerald-500",
    teal: "bg-teal-500",
    cyan: "bg-cyan-500",
    sky: "bg-sky-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    violet: "bg-violet-500",
    purple: "bg-purple-500",
    fuchsia: "bg-fuchsia-500",
    pink: "bg-pink-500",
    rose: "bg-rose-500",
};

const GRADIENT_COLOR_CLASSES: Record<string, string> = {
    black: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
    white: "bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500",
    slate: "bg-gradient-to-r from-slate-300 via-slate-500 to-slate-700",
    gray: "bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700",
    zinc: "bg-gradient-to-r from-zinc-300 via-zinc-500 to-zinc-700",
    neutral: "bg-gradient-to-r from-neutral-300 via-neutral-500 to-neutral-700",
    stone: "bg-gradient-to-r from-stone-300 via-stone-500 to-stone-700",
    red: "bg-gradient-to-r from-red-300 via-red-500 to-red-700",
    orange: "bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700",
    amber: "bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700",
    yellow: "bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700",
    lime: "bg-gradient-to-r from-lime-300 via-lime-500 to-lime-700",
    green: "bg-gradient-to-r from-green-300 via-green-500 to-green-700",
    emerald: "bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-700",
    teal: "bg-gradient-to-r from-teal-300 via-teal-500 to-teal-700",
    cyan: "bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-700",
    sky: "bg-gradient-to-r from-sky-300 via-sky-500 to-sky-700",
    blue: "bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700",
    indigo: "bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-700",
    violet: "bg-gradient-to-r from-violet-300 via-violet-500 to-violet-700",
    purple: "bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700",
    fuchsia: "bg-gradient-to-r from-fuchsia-300 via-fuchsia-500 to-fuchsia-700",
    pink: "bg-gradient-to-r from-pink-300 via-pink-500 to-pink-700",
    rose: "bg-gradient-to-r from-rose-300 via-rose-500 to-rose-700",
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
    icon,
    disabled = false,
    className = '',
    style = {}
}: SliderProps) {
    const [value, setValue] = useCH5Numeric(commandSignal, feedbackSignal, min);

    const handleChange = (newValue: number[]) => {
        if (!touchSettable || disabled) return;
        setValue(newValue[0]);
    }

    const sizeConfig = SIZE_CLASSES[size];
    const containerSize = orientation === 'vertical' ? sizeConfig.container : 'w-full';
    
    const colorClass = colorSettings === 'solid'
        ? SOLID_COLOR_CLASSES[trackColor] || SOLID_COLOR_CLASSES.blue
        : GRADIENT_COLOR_CLASSES[trackColor] || GRADIENT_COLOR_CLASSES.blue;
    
    const trackStyle = thickness ? (
        orientation === 'horizontal' 
            ? { height: `${thickness}px` } 
            : { width: `${thickness}px` }
    ) : undefined;

    const thumbStyle = thumbSize ? {
        width: `${thumbSize}px`,
        height: `${thumbSize}px`
    } : undefined;
    
    return (
        <div 
            className={cn(
                "relative flex items-center",
                containerSize,
                className
            )}
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
                    "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
                    orientation === "vertical" && "h-full flex-col"
                )}
            >
                <SliderPrimitive.Track 
                    className={cn(
                        "relative grow overflow-hidden rounded-full bg-secondary",
                        thickness ? "" : sizeConfig.track
                    )}
                    style={trackStyle}
                >
                    <SliderPrimitive.Range 
                        className={cn(
                            "absolute",
                            orientation === "horizontal" ? "h-full" : "w-full",
                            colorClass
                        )}
                    />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb 
                    className={cn(
                        "block border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                        thumbSize ? "" : sizeConfig.thumb,
                        BUTTON_SHAPE_CLASSES[thumbType],
                        // Hide original thumb when using icon
                        thumbType === 'icon' && "opacity-0"
                    )}
                    style={thumbStyle}
                />
            </SliderPrimitive.Root>
            
            {/* Custom icon thumb overlay */}
            {thumbType === 'icon' && icon && (
                <div 
                    className="absolute pointer-events-none flex items-center justify-center z-10"
                    style={{
                        left: orientation === 'horizontal' ? `${((value - min) / (max - min)) * 100}%` : '50%',
                        top: orientation === 'vertical' ? `${100 - ((value - min) / (max - min)) * 100}%` : '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: thumbSize ? `${thumbSize}px` : undefined
                    }}
                >
                    {icon}
                </div>
            )}
        </div>
    );
}