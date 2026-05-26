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
  return (
    <div className={`p-8 ${className}`} style={style}>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Lighting Control</h1>
      
      {children}
      
    </div>
  );
}