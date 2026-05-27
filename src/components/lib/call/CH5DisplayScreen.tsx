import { useTheme } from "@/lib/theme";

export interface CH5DisplayScreenProps {
  value: string;
  placeholder?: string;
  formatValue?: (value: string) => string;
  className?: string;
}

export function CH5DisplayScreen({
  value,
  placeholder = "Enter a number",
  formatValue,
  className = "",
}: CH5DisplayScreenProps) {
  const { theme } = useTheme();

  // Default phone-style formatter
  const defaultFormatter = (val: string) => {
    if (!val) return "";
    // International format
    if (val.length > 10) {
      return val.replace(/(\d{1,3})(\d{3})(\d{3})(\d+)/, "+$1 $2 $3 $4");
    }
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

  // Dynamically size the text based on length
  const getTextSize = () => {
    if (!value) return "text-4xl";
    if (value.length > 14) return "text-3xl";
    if (value.length > 11) return "text-4xl";
    if (value.length > 8) return "text-5xl";
    return "text-6xl";
  };

  return (
    <div className={`
      flex items-center justify-center
      min-h-30
      px-6
      ${className}
    `}>
      {value ? (
        <span className={`
          ${theme.primaryText} 
          font-light tracking-tight
          ${getTextSize()}
          transition-all duration-200
          text-center
        `}>
          {formatter(value)}
        </span>
      ) : (
        <span className={`
          ${theme.secondaryText} 
          text-2xl font-light
          opacity-40
        `}>
          {placeholder}
        </span>
      )}
    </div>
  );
}