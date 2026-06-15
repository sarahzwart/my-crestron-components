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
import { useState, useEffect } from "react";
import ch5Service from "@/services/ch5Service";

export interface CameraPageProps {
  cameraCount?: number;
  presetCount?: number;
}

export function CameraPage({
  cameraCount = 3,
  presetCount = 3,
}: CameraPageProps) {
  const { theme } = useTheme();
  const [activeCamera, setActiveCamera] = useState(1);
  const [autoFocus, setAutoFocus] = useState(true);

  useEffect(() => {
    ch5Service.subscribeNumeric("Camera.Selected_FB", (value: number) => {
      if (value >= 1) setActiveCamera(value);
    });

    return () => {
      ch5Service.unsubscribe("Camera.Selected_FB");
    };
  }, []);

  const selectCamera = (cam: number) => {
    setActiveCamera(cam);
    ch5Service.publishNumeric("Camera.Selected", cam);
  };

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
            className={`text-xl font-mono font-bold uppercase tracking-widest mr-1 ${theme.secondaryText}`}
          >
            Cam
          </span>
          {Array.from({ length: cameraCount }, (_, i) => i + 1).map((cam) => (
            <button
              key={cam}
              onClick={() => selectCamera(cam)}
              className={`
                w-20 h-12 rounded-lg text-base font-mono font-semibold transition-all duration-150
                ${
                  activeCamera === cam
                    ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
                    : `${theme.buttonBackground} ${theme.buttonText} opacity-60 hover:opacity-100`
                }
              `}
            >
              {pad(cam)}
            </button>
          ))}
        </div>

        <CH5Button
          variant="toggle"
          commandSignal="Camera.Autofocus_Press"
          feedbackSignal="Camera.Autofocus_FB"
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
          <CH5Button variant="momentary" icon={<ZoomIn />}      iconSize={32} commandSignal="Camera.Zoom_In_Press"   className={cell} />
          <CH5Button variant="momentary" icon={<ChevronUp />}   iconSize={32} commandSignal="Camera.Tilt_Up_Press"   className={cell} />
          <CH5Button variant="momentary" icon={<ZoomOut />}     iconSize={32} commandSignal="Camera.ZoomOut_Press"  className={cell} />

          <CH5Button variant="momentary" icon={<ChevronLeft />}  iconSize={32} commandSignal="Camera.Pan_Left_Press"  className={cell} />
          <CH5Button variant="momentary" icon={<House />}         iconSize={32} commandSignal="Camera.Home_Press"     className={cell} />
          <CH5Button variant="momentary" icon={<ChevronRight />}  iconSize={32} commandSignal="Camera.Pan_Right_Press" className={cell} />

          <span />
          <CH5Button variant="momentary" icon={<ChevronDown />}  iconSize={32} commandSignal="Camera.Tilt_Down_Press" className={cell} />
          <span />
        </div>

        <div className="grid grid-cols-3 gap-3 flex-1 min-h-0">
          {Array.from({ length: presetCount }, (_, i) => i + 1).map((p) => (
            <CH5Button
              key={p}
              variant="toggle"
              label={`PRESET ${p}`}
              commandSignal={`Camera.Preset_${p}`}
              feedbackSignal={`Camera.Preset_${p}_FB`}
              textSize={22}
              className={cell}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
