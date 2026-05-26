import React from "react";
import { CH5Button } from "../lib/common/CH5Button";

export interface HeaderProps {
  // Logo
  logo?: string;
  logoCommandSignal?: string;
  logoFeedbackSignal?: string;
  
  // Left buttons
  leftButtons?: React.ReactNode;
  
  // Styling
  backgroundColor?: string;
  textColor?: string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function CH5Header({
  logo,
  logoCommandSignal = "nav.logo",
  logoFeedbackSignal = "nav.logo.fb",
  leftButtons,
  backgroundColor = "bg-slate-800",
  textColor = "text-white",
  height = 80,
  className = "",
  style = {},
}: HeaderProps) {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const headerStyle: React.CSSProperties = {
    ...style,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <header 
      className={`flex items-center justify-between px-6 ${backgroundColor} ${textColor} shadow-lg ${className}`}
      style={headerStyle}
    >
      <div className="flex items-center gap-3">
        {leftButtons}
      </div>

      <div className="flex items-center justify-center">
        {logo && (
          <CH5Button
            commandSignal={logoCommandSignal}
            feedbackSignal={logoFeedbackSignal}
            icon={logo}
            iconSize={32}
            variant="momentary"
            size="md"
            shape="pill"
            inactiveClass="slate"
            activeClass="blue"
            glow={false}
            width={70}
            height={70}
          />
        )}
      </div>

      <div className="flex flex-col items-end">
        <div className="text-xl font-semibold">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm opacity-75">
          {formatDate(currentTime)}
        </div>
      </div>
    </header>
  );
}