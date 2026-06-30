import { Orbit, TailChase, LineSpinner, DotPulse } from 'ldrs/react'
import 'ldrs/react/Orbit.css'

export interface LoadingPageProps {
  commandSignal: boolean;
  feedbackSignal: boolean;
  loadingType?: "orbit" | "tailChase" | "lineSpinner" | "dotPulse";
  loadingComponentFillColor?: string;
  loadingComponentBGColor?: string;
  textUnderLoadingComponent?: string;
}

export function LoadingPage({
  loadingType = "orbit",
  loadingComponentFillColor = "white",
  loadingComponentBGColor = "transparent",
  textUnderLoadingComponent = "",
}: LoadingPageProps) {
  const renderSpinner = () => {
    switch (loadingType) {
      case "tailChase":
        return <TailChase size="50" speed="1.75" color={loadingComponentFillColor} />;
      case "lineSpinner":
        return <LineSpinner size="50" speed="1" color={loadingComponentFillColor} />;
      case "dotPulse":
        return <DotPulse size="50" speed="1.3" color={loadingComponentFillColor} />;
      case "orbit":
      default:
        return <Orbit size="50" speed="1.5" color={loadingComponentFillColor} />;
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: loadingComponentBGColor === "transparent" ? undefined : loadingComponentBGColor }}
    >
      {renderSpinner()}
      {textUnderLoadingComponent && (
        <p className="text-[2rem] font-medium" style={{ color: loadingComponentFillColor }}>
          {textUnderLoadingComponent}
        </p>
      )}
    </div>
  );
}