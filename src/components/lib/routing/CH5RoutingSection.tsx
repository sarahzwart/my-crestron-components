import { useTheme } from "@/lib/theme";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CH5RoutingButton, type RoutingItem } from "./CH5RoutingButton";

export interface CH5RoutingSectionProps {
  label: string;
  items: RoutingItem[];
  selectedIds: string[];
  onItemClick: (id: string) => void;
  type: "source" | "destination";
  accentColor?: string;
}

export function CH5RoutingSection({
  label,
  items,
  selectedIds,
  onItemClick,
  type,
  accentColor,
}: CH5RoutingSectionProps) {
  const { theme } = useTheme();

  const defaultAccent = type === "source" ? "bg-blue-500" : "bg-green-500";
  const defaultAccentMuted =
    type === "source" ? "bg-blue-500/20" : "bg-green-500/20";
  const sectionAccent = accentColor || defaultAccent;
  const selectedCount = selectedIds.length;
  const needsScroll = items.length > 6;

  return (
    <section className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 mt-1 px-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-10 rounded-full ${sectionAccent}`} />
          <div>
            <h2
              className={`${theme.primaryText} text-2xl font-bold leading-tight`}
            >
              {label}
            </h2>
            <p className={`${theme.secondaryText} text-sm mt-0.5`}>
              {items.length} available
            </p>
          </div>
        </div>
        {selectedCount > 0 && (
          <div
            className={`px-4 py-2 rounded-full ${defaultAccentMuted} flex items-center gap-2`}
          >
            <div
              className={`w-2 h-2 rounded-full ${sectionAccent} animate-pulse`}
            />
            <span className={`${theme.primaryText} text-sm font-medium`}>
              {selectedCount} selected
            </span>
          </div>
        )}
      </div>

      {/* Fixed-height card — always shows exactly 2 rows (6 buttons), scrolls beyond */}
      {/* h = 2 rows × 6rem + 1 gap × 1rem + 2 sides padding × 1rem = 16rem */}
      <div className={`h-94 ${theme.cardBackground} rounded-3xl p-4`}>
        <ScrollArea className="h-full">
          <div className="grid grid-cols-3 gap-2 p-1">
            {items.map((item) => (
              <CH5RoutingButton
                key={item.id}
                item={item}
                isSelected={selectedIds.includes(item.id)}
                onClick={() => onItemClick(item.id)}
                type={type}
              />
            ))}
          </div>
          {needsScroll && (
            <ScrollBar
              className={`[&>[data-slot=scroll-area-thumb]]:${theme.buttonBackground} -right-3`}
            />
          )}
        </ScrollArea>
      </div>
    </section>
  );
}
