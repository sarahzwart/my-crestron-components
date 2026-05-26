import { CH5VolumeSlider, type CH5VolumeSliderProps } from "@/components/lib/CH5Volume";
import { useTheme } from "../lib/theme";

export interface AudioPageProps {
  volumeControls: CH5VolumeSliderProps[];
  showMaster?: boolean;
  title?: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function AudioPage({
  volumeControls,
  showMaster = true,
  title = "Audio Page",
  subtitle = "Adjust volume levels for each zone",
  columns = 2,
}: AudioPageProps) {
  const { theme } = useTheme();

  const masterControl = showMaster ? volumeControls[0] : null;
  const otherControls = showMaster ? volumeControls.slice(1) : volumeControls;

  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="min-h-full p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`${theme.primaryText} text-3xl lg:text-4xl font-bold mb-2`}>
            {title}
          </h1>
          <p className={`${theme.secondaryText} text-base lg:text-lg`}>
            {subtitle}
          </p>
        </div>

        {/* Master Volume */}
        {masterControl && (
          <div className="mb-6">
            <CH5VolumeSlider {...masterControl} isMaster={true} />
          </div>
        )}

        {/* Other Volume Controls */}
        <div className={`grid gap-4 lg:gap-6 ${gridColumns[columns]}`}>
          {otherControls.map((control) => (
            <CH5VolumeSlider key={control.id} {...control} />
          ))}
        </div>
      </div>
    </div>
  );
}