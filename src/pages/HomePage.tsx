import { useTheme } from "../lib/theme";

export interface AppItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

export interface HomePageProps {
  apps: AppItem[];
  onNavigate: (id: string) => void;
  title?: string;
}

export function HomePage({ apps, onNavigate, title = "Home" }: HomePageProps) {
  const { theme } = useTheme();

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden">
      <div className="mb-8 px-2 shrink-0">
        <h1 className={`${theme.primaryText} text-4xl font-bold mb-2`}>{title}</h1>
        <p className={`${theme.secondaryText} text-base`}>Select an app to get started</p>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr min-h-0">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onNavigate(app.id)}
            className={`
              ${theme.cardBackground}
              ${theme.cardActiveBackground}
              rounded-3xl p-6
              flex flex-col items-center justify-center gap-4
              transition-all duration-200 active:scale-[0.95]
            `}
          >
            <div className={`
              w-20 h-20 rounded-2xl flex items-center justify-center
              ${theme.iconBackground} ${theme.iconColor}
            `}>
              <div className="scale-150">{app.icon}</div>
            </div>

            <div className="text-center">
              <h3 className={`${theme.primaryText} font-semibold text-lg`}>{app.label}</h3>
              {app.description && (
                <p className={`${theme.secondaryText} text-sm mt-1`}>{app.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}