import { useTheme } from "@/lib/theme";
import { Delete } from "lucide-react";

export interface CH5DisplayScreenProps {
  value: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  showBackspace?: boolean;
  showDigitIndicators?: boolean;
  onBackspace?: () => void;
  formatValue?: (value: string) => string;
  emptyText?: string;
  className?: string;
}

export function CH5DisplayScreen({
  value,
  placeholder = "Enter value...",
  label = "Value",
  maxLength = 12,
  showBackspace = true,
  showDigitIndicators = true,
  onBackspace,
  formatValue,
  emptyText,
  className = "",
}: CH5DisplayScreenProps) {
  const { theme } = useTheme();

  // Default phone-style formatter
  const defaultFormatter = (val: string) => {
    if (!val) return "";
    if (val.length > 6) {
      return val.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
    } else if (val.length > 3) {
      return val.replace(/(\d{3})(\d+)/, "$1 $2");
    }
    return val;
  };

  const formatter = formatValue || defaultFormatter;

  return (
    <div className={`
      ${theme.masterCardBackground}
      rounded-3xl p-8
      flex flex-col justify-end
      min-h-[200px]
      relative
      overflow-hidden
      ${className}
    `}>
      {/* Backspace button */}
      {showBackspace && value && onBackspace && (
        <button
          onClick={onBackspace}
          className={`
            absolute top-4 right-4
            w-12 h-12 rounded-full
            ${theme.buttonBackground}
            flex items-center justify-center
            active:scale-90 transition-all duration-150
          `}
        >
          <Delete size={20} className={theme.iconColor} />
        </button>
      )}

      {/* Label */}
      <p className={`${theme.secondaryText} text-sm mb-2 font-medium`}>
        {label}
      </p>

      {/* Display Value */}
      <div className="flex items-baseline gap-2 min-h-[60px]">
        {value ? (
          <span className={`
            ${theme.primaryText} 
            font-bold tracking-wide
            ${value.length > 8 ? "text-4xl" : "text-5xl"}
            transition-all duration-150
          `}>
            {formatter(value)}
          </span>
        ) : (
          <span className={`${theme.secondaryText} text-3xl font-light opacity-40`}>
            {emptyText || placeholder}
          </span>
        )}
      </div>

      {/* Digit Counter & Indicators */}
      {value && showDigitIndicators && (
        <div className="flex items-center justify-between mt-4">
          <span className={`${theme.secondaryText} text-xs`}>
            {value.length} / {maxLength} digits
          </span>
          
          <div className="flex gap-1">
            {[...Array(Math.min(maxLength, 12))].map((_, i) => (
              <div
                key={i}
                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-200
                  ${i < value.length 
                    ? "bg-green-400" 
                    : "bg-white/20"}
                `}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}