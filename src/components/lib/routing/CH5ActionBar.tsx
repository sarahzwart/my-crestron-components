import { useTheme } from "@/lib/theme";
import { ArrowRight, Cast } from "lucide-react";
import { CH5Button } from "@/components/lib/common/CH5Button";
import { SIGNALS_ROUTING } from "@/config/signals";

export interface CH5RoutingActionBarProps {
  canRoute: boolean;
  destinationCount: number;
  onRoute: () => void;
  commandSignal?: string;
  feedbackSignal?: string;
  routeLabel?: string;
  emptyLabel?: string;
}

export function CH5RoutingActionBar({
  canRoute,
  destinationCount,
  onRoute,
  commandSignal = SIGNALS_ROUTING.route.cmd,
  feedbackSignal = SIGNALS_ROUTING.route.fb,
  routeLabel = "Route Signal",
  emptyLabel = "Select source & destination",
}: CH5RoutingActionBarProps) {
  const { theme } = useTheme();

  const content = (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center
          ${canRoute ? "bg-green-500/30" : theme.iconBackground}
        `}>
          <Cast size={24} className={canRoute ? "text-green-300" : theme.iconColor} />
        </div>
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
      {canRoute && <ArrowRight className={theme.primaryText} size={28} />}
    </div>
  );

  return (
    <div className={`
      mt-6 shrink-0
      ${canRoute ? "opacity-100" : "opacity-50 pointer-events-none"}
      transition-opacity duration-300
    `}>
      <CH5Button
        commandSignal={commandSignal}
        feedbackSignal={feedbackSignal}
        variant="momentary"
        shape="rounded"
        disabled={!canRoute}
        onClick={onRoute}
        offClassName={canRoute ? theme.cardHighlightBackground : theme.cardBackground}
        onClassName={theme.cardHighlightBackground}
        className="w-full rounded-3xl p-5 active:scale-[0.99] transition-all duration-150"
        icon={content}
      />
    </div>
  );
}