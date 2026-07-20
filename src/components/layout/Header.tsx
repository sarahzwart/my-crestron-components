import React from "react";

export interface HeaderProps {
  logo?: string;
  leftButtons?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const CH5Header = ({
  leftButtons,
  backgroundColor = "bg-slate-800",
  textColor = "text-white",
  height = 80,
  className = "",
  style = {},
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const headerStyle: React.CSSProperties = {
    ...style,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <header
      className={`flex items-center justify-between px-6 ${backgroundColor} ${textColor} shadow-lg ${className}`}
      style={headerStyle}
    >
      <div className="flex items-center gap-3">{leftButtons}</div>

      <div />

      <div className="flex flex-col items-end">
        <div className="text-xl font-semibold">{formatTime(currentTime)}</div>
        <div className="text-sm opacity-75">{formatDate(currentTime)}</div>
      </div>
    </header>
  );
};
