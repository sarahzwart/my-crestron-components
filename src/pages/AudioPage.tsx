import { CH5VolumeSlider, type CH5VolumeSliderProps } from "@/components/lib/volume/CH5Volume";
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
  title = "Audio",
  subtitle = "Adjust volume levels for each zone",
  columns = 3,
}: AudioPageProps) {
  const { theme } = useTheme();

  const masterControl = showMaster ? volumeControls[0] : null;
  const otherControls = showMaster ? volumeControls.slice(1) : volumeControls;

  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className="h-full flex flex-col p-4 overflow-hidden gap-3">

      <div className="shrink-0 px-1">
        <h1 className={`${theme.primaryText} text-2xl font-bold leading-tight`}>{title}</h1>
        <p className={`${theme.secondaryText} text-sm`}>{subtitle}</p>
      </div>
      {masterControl && (
        <div className="shrink-0">
          <CH5VolumeSlider {...masterControl} isMaster={true} />
        </div>
      )}

      <div className={`flex-1 grid ${gridColumns[columns]} gap-3 min-h-0 overflow-auto`}>
        {otherControls.map((control) => (
          <CH5VolumeSlider key={control.id} {...control} />
        ))}
      </div>

    </div>
  );
}