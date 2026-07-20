import { useTheme } from "../lib/theme";
import { CH5Button } from "@/components/ch5/common/CH5Button";

export interface AppItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  commandSignal: string;
  feedbackSignal: string;
}

export interface HomePageProps {
  apps: AppItem[];
  onNavigate: (id: string) => void;
  title?: string;
}

export const HomePage = ({ apps, onNavigate, title = "Home" }: HomePageProps) => {
  const { theme } = useTheme();

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden">
      <div className="mb-8 px-2 shrink-0">
        <h1 className={`${theme.primaryText} text-4xl font-bold mb-2`}>{title}</h1>
        <p className={`${theme.secondaryText} text-base`}>Select an app to get started</p>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr min-h-0">
        {apps.map((app) => (
          <CH5Button
            key={app.id}
            commandSignal={app.commandSignal}
            feedbackSignal={app.feedbackSignal}
            variant="momentary"
            shape="rounded"
            onClick={() => onNavigate(app.id)}
            offClassName={`${theme.cardBackground} ${theme.cardActiveBackground}`}
            onClassName={`${theme.cardHighlightBackground}`}
            className="rounded-3xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-200 active:scale-[0.95] h-full w-full"
            icon={
              <div className="flex flex-col items-center gap-4">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${theme.iconBackground} ${theme.iconColor}`}>
                  <div className="scale-150">{app.icon}</div>
                </div>
                <div className="text-center">
                  <h3 className={`${theme.primaryText} font-semibold text-lg`}>{app.label}</h3>
                  {app.description && (
                    <p className={`${theme.secondaryText} text-sm mt-1`}>{app.description}</p>
                  )}
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};