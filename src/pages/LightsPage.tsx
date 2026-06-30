import { useTheme } from "../lib/theme";
export interface LightsPageProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function LightsPage({
  children,
  className = "",
  style = {},
}: LightsPageProps) {
  const { theme } = useTheme();
  return (
    <div className={`p-8 ${className}`} style={style}>
      <h1 className={`${theme.primaryText} text-3xl font-bold mb-6`}>Lighting Control</h1>
      
      {children}
      
    </div>
  );
}