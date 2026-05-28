import { useTheme } from "@/lib/theme";
import { CH5RoutingButton, type RoutingItem } from "./CH5RoutingButton";

export interface CH5RoutingSectionProps {
  label: string;
  items: RoutingItem[];
  selectedIds: string[];
  onItemClick: (id: string) => void;
  type: "source" | "destination";
  columns?: 2 | 3 | 4;
  accentColor?: string;
}

export function CH5RoutingSection({
  label,
  items,
  selectedIds,
  onItemClick,
  type,
  columns = 3,
  accentColor,
}: CH5RoutingSectionProps) {
  const { theme } = useTheme();

  const defaultAccent = type === "source" ? "bg-blue-500" : "bg-green-500";
  const defaultAccentMuted = type === "source" ? "bg-blue-500/20" : "bg-green-500/20";
  const sectionAccent = accentColor || defaultAccent;
  const selectedCount = selectedIds.length;
  const rows = Math.ceil(items.length / columns);

  const gridColumns = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" } as const;

  return (
    <section className="flex flex-col min-h-0">

      <div className="flex items-center justify-between mb-5 px-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-10 rounded-full ${sectionAccent}`} />
          <div>
            <h2 className={`${theme.primaryText} text-2xl font-bold leading-tight`}>
              {label}
            </h2>
            <p className={`${theme.secondaryText} text-sm mt-0.5`}>
              {items.length} available
            </p>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className={`px-4 py-2 rounded-full ${defaultAccentMuted} flex items-center gap-2`}>
            <div className={`w-2 h-2 rounded-full ${sectionAccent} animate-pulse`} />
            <span className={`${theme.primaryText} text-sm font-medium`}>
              {selectedCount} selected
            </span>
          </div>
        )}
      </div>

      <div className={`flex-1 min-h-0 ${theme.cardBackground} rounded-3xl p-6 flex`}>
        <div
          className={`grid gap-4 ${gridColumns[columns]} w-full h-full`}
          style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
        >
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
      </div>
    </section>
  );
}