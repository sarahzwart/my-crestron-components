import { useTheme } from "@/lib/theme";
import { Check } from "lucide-react";

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

export function CH5RoutingButton({
  item,
  isSelected,
  onClick,
  type,
}: CH5RoutingButtonProps) {
  const { theme } = useTheme();

  const ringColor = type === "source" ? "ring-blue-400" : "ring-green-400";
  const badgeColor = type === "source" ? "bg-blue-500" : "bg-green-500";

  return (
    <button
      onClick={onClick}
      className={`
        ${isSelected ? theme.cardHighlightBackground : theme.cardBackground}
        ${theme.cardActiveBackground}
        ${isSelected ? `ring-2 ${ringColor}` : ""}
        rounded-2xl p-4
        flex flex-col items-center justify-center gap-3
        transition-all duration-200 active:scale-[0.95]
        relative overflow-hidden w-full h-full
      `}
    >
      {/* Selection badge */}
      {isSelected && (
        <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${badgeColor}`}>
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}

      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-xl flex items-center justify-center
        ${theme.iconBackground} ${theme.iconColor}
        transition-transform duration-200
        ${isSelected ? "scale-110" : ""}
        shrink-0
      `}>
        {item.icon}
      </div>

      {/* Label */}
      <div className="text-center min-w-0">
        <h3 className={`${theme.primaryText} font-semibold text-sm leading-tight truncate`}>
          {item.label}
        </h3>
        {item.description && (
          <p className={`${theme.secondaryText} text-xs mt-0.5 leading-tight truncate`}>
            {item.description}
          </p>
        )}
      </div>
    </button>
  );
}