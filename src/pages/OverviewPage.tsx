import { useTheme } from "../lib/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUDIO_CONTROLS } from "../config/audio.config";
import { CH5VolumeSlider } from "@/components/lib/volume/CH5Volume";

export function OverviewPage() {
  const { theme } = useTheme();
  return (
    <div
      className={`h-full w-full flex flex-col justify-start overflow-hidden gap-4 p-4 ${theme.pageBackground}`}
    >
      <Card className={`${theme.cardBackground} w-1/2 h-3/4`}>
        <CardHeader>
          <CardTitle className={`${theme.primaryText}`}>
            Volume Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 grid grid-cols-1 gap-3 min-h-0 overflow-auto">
          {AUDIO_CONTROLS.map((control) => (
            <CH5VolumeSlider key={control.id} size="sm" {...control} />
          ))}
        </CardContent>
      </Card>

      <Card className={`${theme.cardBackground} w-full h-48`}>
        <CardHeader>
          <CardTitle className={`${theme.primaryText}`}>Camera Controls</CardTitle>
        </CardHeader>
      </Card>

      <Card className={`${theme.cardBackground} w-full h-48`}>
        <CardHeader>
          <CardTitle className={`${theme.primaryText}`}>Music Controls</CardTitle>
        </CardHeader>
      </Card>

      <Card className={`${theme.cardBackground} w-full h-48`}>
        <CardHeader>
          <CardTitle className={`${theme.primaryText}`}>Routing Controls</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
