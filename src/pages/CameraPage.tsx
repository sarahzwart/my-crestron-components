import { CH5Button } from "@/components/lib/common/CH5Button";
import { useTheme } from "../lib/theme";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  House,
  ZoomOut,
  ZoomIn,
  Focus,
} from "lucide-react";
import { useState } from "react";

export interface CameraPageProps {
  cameraCount?: number;
}

export function CameraPage({ cameraCount = 2 }: CameraPageProps) {
  const { theme } = useTheme();
  const [activeCamera, setActiveCamera] = useState(1);
  const [autoFocus, setAutoFocus] = useState(true);

  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center gap-6 p-8 overflow-hidden ${theme.pageBackground}`}
    >
      {/* Camera selector */}
      <div className="flex items-center gap-3">
        {Array.from({ length: cameraCount }, (_, i) => i + 1).map((cam) => (
          <button
            key={cam}
            onClick={() => setActiveCamera(cam)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all
              ${
                activeCamera === cam
                  ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
                  : `${theme.buttonBackground} ${theme.buttonText}`
              }
            `}
          >
            Cam {cam}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-5 grid-rows-3 gap-4 w-[min(80%,80vh)] h-[min(50%,50vw)] max-w-[min(80vw,80vh)] max-h-[min(50vw,50vh)]">
        {/* Row 1 */}
        <CH5Button variant="momentary" icon={<ZoomIn />}      commandSignal={`camera.${activeCamera}.zoom.in`}    className="w-full h-full" />
        <span />
        <CH5Button variant="momentary" icon={<ChevronUp />}   commandSignal={`camera.${activeCamera}.tilt.up`}    className="w-full h-full" />
        <span />
        <CH5Button variant="momentary" icon={<ZoomOut />}     commandSignal={`camera.${activeCamera}.zoom.out`}   className="w-full h-full" />

        {/* Row 2 */}
        <span />
        <CH5Button variant="momentary" icon={<ChevronLeft />} commandSignal={`camera.${activeCamera}.pan.left`}   className="w-full h-full" />
        <CH5Button variant="momentary" icon={<House />}       commandSignal={`camera.${activeCamera}.home`}       className="w-full h-full" />
        <CH5Button variant="momentary" icon={<ChevronRight />}commandSignal={`camera.${activeCamera}.pan.right`}  className="w-full h-full" />
        <span />

        {/* Row 3 */}
        <span />
        <span />
        <CH5Button variant="momentary" icon={<ChevronDown />} commandSignal={`camera.${activeCamera}.tilt.down`}  className="w-full h-full" />
        <span />
        <span />
      </div>

      {/* Autofocus toggle */}
      <button
        onClick={() => setAutoFocus((v) => !v)}
        className={`
          flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all
          ${autoFocus
            ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
            : `${theme.buttonBackground} ${theme.buttonText}`
          }
        `}
      >
        <Focus size={16} />
        Autofocus {autoFocus ? "on" : "off"}
      </button>
    </div>
  );
}