import { useState } from "react";
import { useTheme } from "../lib/theme";
import { CH5RoutingSection } from "@/components/lib/routing/CH5RoutingSection";
import { CH5RoutingFlow } from "@/components/lib/routing/CH5RoutingFlow";
import { CH5RoutingActionBar } from "@/components/lib/routing/CH5ActionBar";
import { type RoutingItem } from "@/components/lib/routing/CH5RoutingButton";

export interface RoutingPageProps {
  sources: RoutingItem[];
  destinations: RoutingItem[];
  title?: string;
  subtitle?: string;
  sourceColumns?: 2 | 3 | 4;
  destinationColumns?: 2 | 3 | 4;
}

export function RoutingPage({
  sources,
  destinations,
  title = "Routing",
  subtitle = "Select a source and choose where to send it",
  sourceColumns = 3,
  destinationColumns = 3,
}: RoutingPageProps) {
  const { theme } = useTheme();
  
  // State
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  // Handlers
  const handleSourceSelect = (id: string) => {
    setSelectedSource(selectedSource === id ? null : id);
  };

  const handleDestinationToggle = (id: string) => {
    setSelectedDestinations(prev =>
      prev.includes(id)
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  const handleRoute = () => {
    if (selectedSource && selectedDestinations.length > 0) {
      console.log(`Routing ${selectedSource} to:`, selectedDestinations);
      // TODO: Trigger CH5 routing signals here
    }
  };

  const canRoute = selectedSource !== null && selectedDestinations.length > 0;

  return (
    <div className="h-full flex flex-col p-8 overflow-hidden">
      <div className="mb-8 px-2 shrink-0">
        <h1 className={`${theme.primaryText} text-4xl font-bold mb-2`}>
          {title}
        </h1>
        <p className={`${theme.secondaryText} text-base`}>
          {subtitle}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-8 min-h-0">
        <CH5RoutingSection
          label="Sources"
          items={sources}
          selectedIds={selectedSource ? [selectedSource] : []}
          onItemClick={handleSourceSelect}
          type="source"
          columns={sourceColumns}
        />

        <CH5RoutingFlow isActive={canRoute} />

        <CH5RoutingSection
          label="Destinations"
          items={destinations}
          selectedIds={selectedDestinations}
          onItemClick={handleDestinationToggle}
          type="destination"
          columns={destinationColumns}
        />
      </div>

      <CH5RoutingActionBar
        canRoute={canRoute}
        destinationCount={selectedDestinations.length}
        onRoute={handleRoute}
      />
    </div>
  );
}

export type { RoutingItem };