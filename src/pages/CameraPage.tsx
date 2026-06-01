import { CH5Button } from "@/components/lib/common/CH5Button";
import { useTheme } from "../lib/theme";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  House,
  ZoomIn,
  ZoomOut,
  Focus,
} from "lucide-react";
import { useState } from "react";

export interface CameraPageProps {
  cameraCount?: number;
  presetCount?: number;
}

export function CameraPage({
  cameraCount = 2,
  presetCount = 3,
}: CameraPageProps) {
  const { theme } = useTheme();
  const [activeCamera, setActiveCamera] = useState(1);
  const [autoFocus, setAutoFocus] = useState(true);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const cell = `w-full h-full rounded-md ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`;

  return (
    <div
      className={`h-full w-full flex flex-col p-6 overflow-hidden ${theme.pageBackground}`}
    >
      <div
        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl mb-5 ${theme.cardBackground}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-lg font-mono font-bold uppercase tracking-widest mr-1 ${theme.secondaryText}`}
          >
            Cam
          </span>
          {Array.from({ length: cameraCount }, (_, i) => i + 1).map((cam) => (
            <CH5Button
              key={cam}
              variant="toggle"
              commandSignal={`camera.${cam}.select`}
              feedbackSignal={`camera.${cam}.select.fb`}
              label={pad(cam)}
              onClick={() => setActiveCamera(cam)}
              className={`
                w-16 h-10 rounded-lg text-base font-mono font-semibold transition-all duration-150
                ${
                  activeCamera === cam
                    ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
                    : `${theme.buttonBackground} ${theme.buttonText} opacity-60 hover:opacity-100`
                }
              `}
            />
          ))}
        </div>

        <CH5Button
          variant="toggle"
          commandSignal={`camera.${activeCamera}.autofocus`}
          feedbackSignal={`camera.${activeCamera}.autofocus.fb`}
          icon={<Focus size={24} />}
          onLabel="AF On"
          offLabel="AF Off"
          onClick={() => setAutoFocus((v) => !v)}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg text-base font-mono uppercase tracking-widest ${
            autoFocus
              ? `${theme.buttonBackground} ${theme.secondaryText}`
              : `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
          }`}
        />
      </div>

      <div className="flex flex-col items-center mb-5">
        <span
          className={`text-4xl font-light tracking-tight ${theme.primaryText}`}
        >
          Camera {activeCamera}
        </span>
        <span
          className={`text-xs font-mono uppercase tracking-widest ${theme.secondaryText}`}
        >
          PTZ Control
        </span>
      </div>

      <div className="mx-auto w-[50%] h-[70%] flex flex-col gap-6">
        <div className="grid grid-cols-3 grid-rows-3 gap-3 flex-3 min-h-0">
          <CH5Button variant="momentary" icon={<ZoomIn />}    iconSize={32}  commandSignal={`camera.${activeCamera}.zoom.in`}   className={cell} />
          <CH5Button variant="momentary" icon={<ChevronUp />} iconSize={32}   commandSignal={`camera.${activeCamera}.tilt.up`}   className={cell} />
          <CH5Button variant="momentary" icon={<ZoomOut />}   iconSize={32}   commandSignal={`camera.${activeCamera}.zoom.out`}  className={cell} />

          <CH5Button variant="momentary" icon={<ChevronLeft />} iconSize={32}  commandSignal={`camera.${activeCamera}.pan.left`}  className={cell} />
          <CH5Button variant="momentary" icon={<House />}        iconSize={32}  commandSignal={`camera.${activeCamera}.home`}      className={cell} />
          <CH5Button variant="momentary" icon={<ChevronRight />} iconSize={32}  commandSignal={`camera.${activeCamera}.pan.right`} className={cell} />

          <span />
          <CH5Button variant="momentary" icon={<ChevronDown />}  iconSize={32}  commandSignal={`camera.${activeCamera}.tilt.down`} className={cell} />
          <span />
        </div>

        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {Array.from({ length: presetCount }, (_, i) => i + 1).map((p) => (
            <CH5Button
              key={p}
              variant="momentary"
              label={`PRESET ${p}`}
              commandSignal={`camera.${activeCamera}.preset.${p}`}
              textSize={22}
              className={cell}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

