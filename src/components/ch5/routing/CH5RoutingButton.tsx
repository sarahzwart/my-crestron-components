import { useTheme } from "@/lib/theme";
import { Check } from "lucide-react";
import { CH5Button } from "@/components/ch5/common/CH5Button";

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

export const CH5RoutingButton = ({ item, isSelected, onClick, type }: CH5RoutingButtonProps) => {
  const { theme } = useTheme();

  const ringColor  = type === "source" ? "ring-blue-400" : "ring-green-400";
  const badgeColor = type === "source" ? "bg-blue-500"   : "bg-green-500";

  return (
    <CH5Button
      commandSignal={item.commandSignal}
      feedbackSignal={item.feedbackSignal}
      variant="momentary"
      shape="rounded"
      onClick={onClick}
      offClassName={`${isSelected ? theme.cardHighlightBackground : theme.cardBackground} ${isSelected ? `ring-2 ${ringColor}` : ""}`}
      onClassName={`${theme.cardHighlightBackground} ring-2 ${ringColor}`}
      className="rounded-2xl h-41 w-full flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-[0.95] relative overflow-hidden"
      icon={
        <div className="flex flex-col items-center gap-2 w-full">
          {isSelected && (
            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${badgeColor}`}>
              <Check size={11} className="text-white" strokeWidth={3} />
            </div>
          )}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBackground} ${theme.iconColor} ${isSelected ? "scale-110" : ""} transition-transform duration-200`}>
            {item.icon}
          </div>
          <p className={`${theme.primaryText} font-semibold text-xs leading-tight truncate w-full text-center`}>
            {item.label}
          </p>
        </div>
      }
    />
  );
};