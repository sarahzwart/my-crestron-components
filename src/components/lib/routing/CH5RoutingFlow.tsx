import { useTheme } from "@/lib/theme";
import { ArrowRight, Cast, Speaker } from "lucide-react";

export interface CH5RoutingFlowProps {
  isActive: boolean;
}

export function CH5RoutingFlow({ isActive }: CH5RoutingFlowProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center px-2">
      <div className={`
        ${theme.cardBackground}
        rounded-full p-5
        flex flex-col items-center gap-3
        ${isActive ? "opacity-100" : "opacity-40"}
        transition-opacity duration-300
      `}>
        {/* Source Icon */}
        <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center">
          <Cast size={18} className="text-blue-300" />
        </div>
        
        {/* Animated Arrow */}
        <ArrowRight 
          size={24} 
          className={`${theme.iconColor} ${isActive ? "animate-pulse" : ""}`} 
        />
        
        {/* Destination Icon */}
        <div className="w-10 h-10 rounded-full bg-green-500/30 flex items-center justify-center">
          <Speaker size={18} className="text-green-300" />
        </div>
      </div>
    </div>
  );
}