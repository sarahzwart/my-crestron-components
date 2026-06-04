import { useTheme } from "@/lib/theme";
import { Check } from "lucide-react";
import { CH5Button } from "@/components/lib/common/CH5Button";

export interface RoutingItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  commandSignal: string;
  feedbackSignal: string;
  description?: string;
}

export interface CH5RoutingButtonProps {
  item: RoutingItem;
  isSelected: boolean;
  onClick: () => void;
  type: "source" | "destination";
}

export function CH5RoutingButton({ item, isSelected, onClick, type }: CH5RoutingButtonProps) {
  const { theme } = useTheme();

  const ringColor  = type === "source" ? "ring-blue-400"  : "ring-green-400";
  const badgeColor = type === "source" ? "bg-blue-500"    : "bg-green-500";

  return (
    <CH5Button
      commandSignal={item.commandSignal}
      feedbackSignal={item.feedbackSignal}
      variant="momentary"
      shape="rounded"
      onClick={onClick}
      offClassName={`${isSelected ? theme.cardHighlightBackground : theme.cardBackground} ${isSelected ? `ring-2 ${ringColor}` : ""}`}
      onClassName={`${theme.cardHighlightBackground} ring-2 ${ringColor}`}
      className="rounded-2xl p-3 h-20 flex flex-row items-center gap-3 transition-all duration-200 active:scale-[0.95] relative overflow-hidden w-full"
      icon={
        <div className="flex flex-row items-center gap-3 w-full">
          {isSelected && (
            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${badgeColor}`}>
              <Check size={11} className="text-white" strokeWidth={3} />
            </div>
          )}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBackground} ${theme.iconColor} ${isSelected ? "scale-110" : ""} transition-transform duration-200`}>
            {item.icon}
          </div>
          <div className="text-left min-w-0 flex-1">
            <h3 className={`${theme.primaryText} font-semibold text-sm leading-tight truncate`}>{item.label}</h3>
            {item.description && (
              <p className={`${theme.secondaryText} text-xs mt-0.5 leading-tight truncate`}>{item.description}</p>
            )}
          </div>
        </div>
      }
    />
  );
}