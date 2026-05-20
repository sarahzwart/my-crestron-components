import React from "react";
import { CH5Slider } from "../lib/CH5Slider";

export interface FooterProps {
  // Volume
  volumeCommandSignal?: string;
  volumeFeedbackSignal?: string;
  volumeColor?: string;
  
  // Buttons
  leftButtons?: React.ReactNode;
  rightButtons?: React.ReactNode;
  
  // Styling
  backgroundColor?: string;
  bubbleBackground?: string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function CH5Footer({
  volumeCommandSignal = "audio.volume",
  volumeFeedbackSignal = "audio.volume.fb",
  volumeColor = "blue",
  leftButtons,
  rightButtons,
  backgroundColor = "bg-transparent",
  bubbleBackground = "bg-slate-800/90",
  height = 80,
  className = "",
  style = {},
}: FooterProps) {
  const footerStyle: React.CSSProperties = {
    ...style,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <footer 
      className={`flex items-center justify-between px-6 ${backgroundColor} ${className}`}
      style={footerStyle}
    >
      {/* Left Buttons */}
      {leftButtons && (
        <div className="flex items-center gap-3">
          {leftButtons}
        </div>
      )}

      {/* Volume Slider Bubble */}
      <div className={`flex-1 mx-6 ${bubbleBackground} backdrop-blur-sm rounded-full px-6 py-3 shadow-lg`}>
        <CH5Slider
          commandSignal={volumeCommandSignal}
          feedbackSignal={volumeFeedbackSignal}
          trackColor={volumeColor}
          colorSettings="gradient"
          size="md"
          thumbType="circle"
        />
      </div>

      {/* Right Buttons */}
      {rightButtons && (
        <div className="flex items-center gap-3">
          {rightButtons}
        </div>
      )}
    </footer>
  );
}