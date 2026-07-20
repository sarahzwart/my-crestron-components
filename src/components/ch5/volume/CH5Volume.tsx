import { CH5Slider, type SliderSize } from "../common/CH5Slider";
import { CH5MuteButton } from "./CH5MuteButton";
import { useTheme } from "../../../lib/theme";

export type CH5VolumeSliderSize = "sm" | "md" | "lg";

const SIZE_CONFIG: Record<
  CH5VolumeSliderSize,
  {
    iconBox: string;
    iconScale: string;
    titleText: string;
    muteSize: number;
    muteIconSize: number;
    sliderSize: SliderSize;
    padding: string;
  }
> = {
  sm: {
    iconBox: "w-9 h-9",
    iconScale: "scale-90",
    titleText: "text-sm",
    muteSize: 36,
    muteIconSize: 16,
    sliderSize: "sm",
    padding: "p-4",
  },
  md: {
    iconBox: "w-12 h-12",
    iconScale: "",
    titleText: "text-base",
    muteSize: 48,
    muteIconSize: 20,
    sliderSize: "md",
    padding: "p-6",
  },
  lg: {
    iconBox: "w-14 h-14",
    iconScale: "scale-125",
    titleText: "text-xl",
    muteSize: 56,
    muteIconSize: 24,
    sliderSize: "lg",
    padding: "p-6",
  },
};

export interface CH5VolumeSliderProps {
  id?: string;
  label: string;
  icon: React.ReactNode;
  volumeCommandSignal: string;
  volumeFeedbackSignal: string;
  muteCommandSignal: string;
  muteFeedbackSignal: string;
  isMaster?: boolean;
  size?: CH5VolumeSliderSize;
  showLevelIndicators?: boolean;
  description?: string;
  trackColor?: string;
  customClassName?: string;
}

export const CH5VolumeSlider = ({
  label,
  icon,
  volumeCommandSignal,
  volumeFeedbackSignal,
  muteCommandSignal,
  muteFeedbackSignal,
  isMaster = false,
  size = isMaster ? "lg" : "md",
  showLevelIndicators = true,
  description,
  trackColor,
  customClassName = "",
}: CH5VolumeSliderProps) => {
  const { theme } = useTheme();

  const cardBg = isMaster ? theme.cardHighlightBackground : theme.cardBackground;
  const sliderColor = trackColor || theme.sliderTrackColor;
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div
      className={`
        ${cardBg}
        ${theme.cardActiveBackground}
        ${customClassName}
        rounded-2xl ${sizeConfig.padding} transition-all duration-150
        active:scale-[0.99]
        ${isMaster ? "col-span-full" : ""}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`
              ${sizeConfig.iconBox}
              rounded-xl ${theme.iconBackground}
              flex items-center justify-center
              ${theme.iconColor}
            `}
          >
            <div className={sizeConfig.iconScale}>
              {icon}
            </div>
          </div>

          <div>
            <h3
              className={`
                ${theme.primaryText} font-semibold
                ${sizeConfig.titleText}
              `}
            >
              {label}
            </h3>
            {description && (
              <p className={`${theme.secondaryText} text-sm mt-0.5`}>
                {description}
              </p>
            )}
          </div>
        </div>

        <CH5MuteButton
          commandSignal={muteCommandSignal}
          feedbackSignal={muteFeedbackSignal}
          width={sizeConfig.muteSize}
          height={sizeConfig.muteSize}
          iconSize={sizeConfig.muteIconSize}
        />
      </div>

      <div className="px-2">
        <CH5Slider
          commandSignal={volumeCommandSignal}
          feedbackSignal={volumeFeedbackSignal}
          trackColor={sliderColor}
          colorSettings={theme.sliderColorSettings}
          size={sizeConfig.sliderSize}
          thumbType={theme.sliderThumbType}
        />
      </div>

      {showLevelIndicators && (
        <div className="flex items-center justify-between mt-3 px-1">
          <span className={`${theme.secondaryText} text-xs`}>0</span>
          <span className={`${theme.secondaryText} text-xs`}>50</span>
          <span className={`${theme.secondaryText} text-xs`}>100</span>
        </div>
      )}
    </div>
  );
};