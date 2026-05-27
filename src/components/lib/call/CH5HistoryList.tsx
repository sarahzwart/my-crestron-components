import { useTheme } from "@/lib/theme";
import { X } from "lucide-react";

export interface HistoryItem {
  value: string;
  timestamp?: Date;
  label?: string;
}

export interface CH5HistoryListProps {
  items: HistoryItem[];
  title?: string;
  subtitle?: string;
  itemIcon: React.ReactNode;
  emptyIcon: React.ReactNode;
  emptyText?: string;
  accentColor?: string;
  formatValue?: (value: string) => string;
  onItemClick?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  actionText?: string;
  className?: string;
}

export function CH5HistoryList({
  items,
  title = "Recent",
  subtitle,
  itemIcon,
  emptyIcon,
  emptyText = "No recent entries",
  accentColor = "bg-purple-500",
  formatValue,
  onItemClick,
  onClear,
  showClearButton = true,
  actionText = "Tap to use",
  className = "",
}: CH5HistoryListProps) {
  const { theme } = useTheme();

  const defaultFormatter = (val: string) => val;
  const formatter = formatValue || defaultFormatter;

  const displaySubtitle = subtitle || `${items.length} ${items.length === 1 ? "entry" : "entries"}`;

  return (
    <div className={`
      ${theme.cardBackground}
      rounded-3xl p-6
      flex-1 min-h-0
      flex flex-col
      ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-7 rounded-full ${accentColor}`} />
          <div>
            <h2 className={`${theme.primaryText} text-lg font-bold leading-tight`}>
              {title}
            </h2>
            <p className={`${theme.secondaryText} text-xs mt-0.5`}>
              {displaySubtitle}
            </p>
          </div>
        </div>

        {showClearButton && items.length > 0 && onClear && (
          <button
            onClick={onClear}
            className={`
              px-3 py-1.5 rounded-full
              ${theme.buttonBackground}
              flex items-center gap-1.5
              active:scale-95 transition-all duration-150
            `}
          >
            <X size={14} className={theme.iconColor} />
            <span className={`${theme.primaryText} text-xs font-medium`}>
              Clear
            </span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <div className={`
              w-16 h-16 rounded-2xl ${theme.iconBackground}
              flex items-center justify-center mb-3 ${theme.iconColor}
            `}>
              {emptyIcon}
            </div>
            <p className={`${theme.secondaryText} text-sm`}>
              {emptyText}
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <button
              key={index}
              onClick={() => onItemClick?.(item.value)}
              className={`
                w-full ${theme.cardBackground}
                ${theme.cardActiveBackground}
                rounded-2xl p-4
                flex items-center justify-between
                active:scale-[0.98] transition-all duration-150
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-xl ${theme.iconBackground}
                  flex items-center justify-center ${theme.iconColor}
                `}>
                  {itemIcon}
                </div>
                <div className="text-left">
                  <span className={`${theme.primaryText} font-mono text-lg font-semibold block`}>
                    {formatter(item.value)}
                  </span>
                  {item.label && (
                    <span className={`${theme.secondaryText} text-xs`}>
                      {item.label}
                    </span>
                  )}
                </div>
              </div>
              {actionText && (
                <span className={`${theme.secondaryText} text-xs`}>
                  {actionText}
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}