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
  type 
}: CH5RoutingButtonProps) {
  const { theme } = useTheme();
  
  const selectedStyles = type === "source"
    ? "ring-2 ring-blue-400"
    : "ring-2 ring-green-400";

  const selectionBadgeColor = type === "source" ? "bg-blue-500" : "bg-green-500";

  return (
    <button
      onClick={onClick}
      className={`
        ${isSelected ? theme.masterCardBackground : theme.cardBackground}
        ${theme.cardActiveBackground}
        ${isSelected ? selectedStyles : ""}
        rounded-3xl p-6
        flex flex-col items-center justify-center gap-4
        transition-all duration-200
        active:scale-[0.95]
        relative
        overflow-hidden
        aspect-square
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className={`
          absolute top-3 right-3 
          w-7 h-7 rounded-full 
          flex items-center justify-center
          ${selectionBadgeColor}
        `}>
          <Check size={16} className="text-white" strokeWidth={3} />
        </div>
      )}

      {/* Icon */}
      <div className={`
        w-16 h-16 rounded-2xl
        flex items-center justify-center
        ${theme.iconBackground} ${theme.iconColor}
        transition-transform duration-200
        ${isSelected ? "scale-110" : ""}
      `}>
        <div className="scale-125">
          {item.icon}
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <h3 className={`${theme.primaryText} font-semibold text-base leading-tight`}>
          {item.label}
        </h3>
        {item.description && (
          <p className={`${theme.secondaryText} text-xs mt-1 leading-tight`}>
            {item.description}
          </p>
        )}
      </div>
    </button>
  );
}