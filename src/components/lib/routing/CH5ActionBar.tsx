import { useTheme } from "@/lib/theme";
import { ArrowRight, Cast } from "lucide-react";

export interface CH5RoutingActionBarProps {
  canRoute: boolean;
  destinationCount: number;
  onRoute: () => void;
  routeLabel?: string;
  emptyLabel?: string;
}

export function CH5RoutingActionBar({
  canRoute,
  destinationCount,
  onRoute,
  routeLabel = "Route Signal",
  emptyLabel = "Select source & destination",
}: CH5RoutingActionBarProps) {
  const { theme } = useTheme();

  return (
    <div className={`
      mt-6 shrink-0
      ${canRoute ? "opacity-100" : "opacity-50 pointer-events-none"}
      transition-opacity duration-300
    `}>
      <button
        onClick={onRoute}
        disabled={!canRoute}
        className={`
          w-full ${canRoute ? theme.masterCardBackground : theme.cardBackground}
          rounded-3xl p-5
          flex items-center justify-between
          active:scale-[0.99] transition-all duration-150
        `}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className={`
            w-14 h-14 rounded-2xl 
            ${canRoute ? "bg-green-500/30" : theme.iconBackground} 
            flex items-center justify-center
          `}>
            <Cast 
              size={24} 
              className={canRoute ? "text-green-300" : theme.iconColor} 
            />
          </div>
          
          {/* Text */}
          <div className="text-left">
            <p className={`${theme.primaryText} font-semibold text-lg`}>
              {canRoute ? routeLabel : emptyLabel}
            </p>
            <p className={`${theme.secondaryText} text-sm mt-0.5`}>
              {canRoute 
                ? `To ${destinationCount} destination${destinationCount !== 1 ? "s" : ""}`
                : "Make selections to route"}
            </p>
          </div>
        </div>
        
        {/* Arrow */}
        {canRoute && <ArrowRight className={theme.primaryText} size={28} />}
      </button>
    </div>
  );
}