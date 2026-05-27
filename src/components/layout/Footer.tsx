import React from "react";
import { CH5Slider } from "../lib/common/CH5Slider";

export interface FooterProps {
  // Volume
  volumeCommandSignal?: string;
  volumeFeedbackSignal?: string;
  volumeColor?: string;
  volumeBackgroundColor?:string;
  
  // Volume positioning & sizing
  volumeWidth?: string | number; // e.g., "400px", "50%", 400
  volumePosition?: "left" | "center" | "right";
  volumeMarginX?: number; // horizontal margin in pixels
  
  // Mute button
  muteButton?: React.ReactNode;
  mutePosition?: "left" | "right"; // which side of the slider
  
  // Buttons
  leftButtons?: React.ReactNode;
  centerButtons?: React.ReactNode;
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
  volumeBackgroundColor = "white",
  volumeWidth = "auto", // defaults to flex-1 behavior
  volumePosition = "center",
  volumeMarginX = 12, // Reduced default from 24 to 12
  muteButton,
  mutePosition = "left",
  leftButtons,
  centerButtons,
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

  // Convert volumeWidth to CSS value
  const volumeWidthStyle = typeof volumeWidth === "number" 
    ? `${volumeWidth}px` 
    : volumeWidth;

  // Determine flex classes based on position
  const getVolumeContainerClass = () => {
    if (volumeWidth === "auto") {
      return "flex-1"; // Original behavior - fills available space
    }
    
    switch (volumePosition) {
      case "left":
        return "mr-auto";
      case "right":
        return "ml-auto";
      case "center":
      default:
        return "mx-auto";
    }
  };

  // Only apply margin if there are buttons on that side
  const volumeContainerStyle: React.CSSProperties = {
    marginLeft: (leftButtons || centerButtons) && volumePosition !== "right" ? `${volumeMarginX}px` : undefined,
    marginRight: (rightButtons || centerButtons) && volumePosition !== "left" ? `${volumeMarginX}px` : undefined,
    width: volumeWidth !== "auto" ? volumeWidthStyle : undefined,
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

      {/* Center Buttons */}
      {centerButtons && (
        <div className="flex items-center gap-3">
          {centerButtons}
        </div>
      )}

      {/* Volume Slider Bubble with Mute */}
      <div 
        className={`${getVolumeContainerClass()} ${bubbleBackground} backdrop-blur-sm rounded-full px-6 py-3 shadow-lg flex items-center gap-4`}
        style={volumeContainerStyle}
      >
        {/* Mute button on left */}
        {muteButton && mutePosition === "left" && (
          <div className="shrink-0">
            {muteButton}
          </div>
        )}
        
        {/* Slider */}
        <div className="flex-1">
          <CH5Slider
            commandSignal={volumeCommandSignal}
            feedbackSignal={volumeFeedbackSignal}
            trackColor={volumeColor}
            backgroundColor={volumeBackgroundColor}
            colorSettings="gradient"
            size="md"
            thumbType="circle"
          />
        </div>

        {/* Mute button on right */}
        {muteButton && mutePosition === "right" && (
          <div className="shrink-0">
            {muteButton}
          </div>
        )}
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