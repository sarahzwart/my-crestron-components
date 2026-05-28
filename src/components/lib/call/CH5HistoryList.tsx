import { useTheme } from "@/lib/theme";
import { ChevronRight } from "lucide-react";

export interface HistoryItem {
  value: string;
  timestamp?: Date;
  label?: string;
}

export interface CH5HistoryListProps {
  items: HistoryItem[];
  title?: string;
  itemIcon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  emptyText?: string;
  formatValue?: (value: string) => string;
  onItemClick?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  className?: string;
}

export function CH5HistoryList({
  items,
  title = "Recents",
  itemIcon,
  emptyIcon,
  emptyText = "No recent calls",
  formatValue,
  onItemClick,
  onClear,
  showClearButton = true,
  className = "",
}: CH5HistoryListProps) {
  const { theme } = useTheme();

  const defaultFormatter = (val: string) => {
    if (!val) return "";
    if (val.length === 10) {
      return val.replace(/(\d{3})(\d{3})(\d+)/, "($1) $2-$3");
    }
    if (val.length > 6) {
      return val.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
    } else if (val.length > 3) {
      return val.replace(/(\d{3})(\d+)/, "$1 $2");
    }
    return val;
  };

  const formatter = formatValue || defaultFormatter;

  const formatTime = (date?: Date) => {
    if (!date) return "";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`flex flex-col min-h-0 ${className}`}>
      <div className="flex items-center justify-between px-2 mb-3 shrink-0">
        <h2 className={`${theme.primaryText} text-xl font-semibold`}>
          {title}
        </h2>
        
        {showClearButton && items.length > 0 && onClear && (
          <button
            onClick={onClear}
            className={`
              ${theme.secondaryText} text-sm font-medium
              active:opacity-50 transition-opacity duration-150
            `}
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 opacity-30">
            {emptyIcon && (
              <div className={`${theme.iconColor} mb-4`}>
                {emptyIcon}
              </div>
            )}
            <p className={`${theme.secondaryText} text-base`}>
              {emptyText}
            </p>
          </div>
        ) : (
          <div className="px-2">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => onItemClick?.(item.value)}
                className={`
                  w-full
                  flex items-center justify-between
                  py-4 px-2
                  active:opacity-50 transition-opacity duration-150
                  ${index !== items.length - 1 ? `border-b ${theme.headerBorder}` : ""}
                `}
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {itemIcon && (
                    <div className={`
                      ${theme.iconColor} 
                      shrink-0
                      ${item.label === "Missed" ? "text-red-400" : ""}
                    `}>
                      {itemIcon}
                    </div>
                  )}
                  
                  <div className="text-left min-w-0 flex-1">
                    <p className={`
                      ${theme.primaryText} 
                      font-medium text-base
                      truncate
                    `}>
                      {formatter(item.value)}
                    </p>
                    {item.label && (
                      <p className={`${theme.secondaryText} text-sm mt-0.5`}>
                        {item.label}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.timestamp && (
                    <span className={`${theme.secondaryText} text-sm`}>
                      {formatTime(item.timestamp)}
                    </span>
                  )}
                  <ChevronRight 
                    size={18} 
                    className={`${theme.secondaryText} opacity-50`} 
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}