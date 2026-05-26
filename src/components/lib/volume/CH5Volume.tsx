import { CH5Slider } from "../common/CH5Slider";
import { CH5MuteButton } from "./CH5MuteButton";
import { useTheme } from "../../../lib/theme";

export interface CH5VolumeSliderProps {
  id?: string;
  label: string;
  icon: React.ReactNode;
  volumeCommandSignal: string;
  volumeFeedbackSignal: string;
  muteCommandSignal: string;
  muteFeedbackSignal: string;
  isMaster?: boolean;
  showLevelIndicators?: boolean;
  description?: string;
  trackColor?: string;
  customClassName?: string;
}

export function CH5VolumeSlider({
  label,
  icon,
  volumeCommandSignal,
  volumeFeedbackSignal,
  muteCommandSignal,
  muteFeedbackSignal,
  isMaster = false,
  showLevelIndicators = true,
  description,
  trackColor,
  customClassName = "",
}: CH5VolumeSliderProps) {
  const { theme } = useTheme();

  const cardBg = isMaster ? theme.masterCardBackground : theme.cardBackground;
  const sliderColor = trackColor || theme.sliderTrackColor;

  return (
    <div
      className={`
        ${cardBg} 
        ${theme.cardActiveBackground}
        ${customClassName}
        rounded-2xl p-6 transition-all duration-150
        active:scale-[0.99]
        ${isMaster ? "col-span-full" : ""}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`
              ${isMaster ? "w-14 h-14" : "w-12 h-12"} 
              rounded-xl ${theme.iconBackground} 
              flex items-center justify-center
              ${theme.iconColor}
            `}
          >
            <div className={isMaster ? "scale-125" : ""}>
              {icon}
            </div>
          </div>

          <div>
            <h3
              className={`
                ${theme.primaryText} font-semibold
                ${isMaster ? "text-xl" : "text-base"}
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

        {/* Use the new CH5MuteButton */}
        <CH5MuteButton
          commandSignal={muteCommandSignal}
          feedbackSignal={muteFeedbackSignal}
          width={isMaster ? 56 : 48}
          height={isMaster ? 56 : 48}
          iconSize={isMaster ? 24 : 20}
        />
      </div>

      <div className="px-2">
        <CH5Slider
          commandSignal={volumeCommandSignal}
          feedbackSignal={volumeFeedbackSignal}
          trackColor={sliderColor}
          colorSettings={theme.sliderColorSettings}
          size={isMaster ? "lg" : theme.sliderSize}
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
}