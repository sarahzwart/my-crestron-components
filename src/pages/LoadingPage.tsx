import { Orbit, TailChase, LineSpinner, DotPulse } from 'ldrs/react'
import 'ldrs/react/Orbit.css'
import 'ldrs/react/TailChase.css'
import 'ldrs/react/LineSpinner.css'
import 'ldrs/react/DotPulse.css'
import { useTheme } from '@/lib/theme'

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
  textUnderLoadingComponent = "Loading...",
}: LoadingPageProps) {
  const { theme } = useTheme();

  const renderSpinner = () => {
    switch (loadingType) {
      case "tailChase":
        return <TailChase size="50" speed="2" color={loadingComponentFillColor} />;
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
    <div className={`w-full h-full flex flex-col items-center justify-center gap-6 ${theme.pageBackground}`}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className={`text-2xl font-bold tracking-widest uppercase ${theme.primaryText}`}>
            LOGO
          </h1>
          <p className={`text-xs tracking-widest uppercase ${theme.secondaryText}`}>
            Touch Panel
          </p>
        </div>

        <div className={`w-px h-8 ${theme.headerBorder} bg-current opacity-20`} />

        <div className="flex flex-col items-center gap-4">
          {renderSpinner()}
          {textUnderLoadingComponent && (
            <p className={`text-xs tracking-widest uppercase ${theme.secondaryText}`}>
              {textUnderLoadingComponent}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}