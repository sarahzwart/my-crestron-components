import { useTheme } from "../lib/theme";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUDIO_CONTROLS } from "../config/audio.config";
import { SOURCES, DESTINATIONS } from "../config/routing.config";
import { CH5Slider } from "@/components/lib/common/CH5Slider";
import { CH5MuteButton } from "@/components/lib/volume/CH5MuteButton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  House,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";
import { CH5Button } from "@/components/lib/common/CH5Button";
import ch5Service from "@/services/ch5Service";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PAGE_COUNT = 2; // update if you add or remove pages

export function OverviewPage() {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const scrollToPage = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.clientWidth);
      setActivePage(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeCamera, setActiveCamera] = useState(1);

  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    [],
  );

  const selectCamera = (cam: number) => {
    setActiveCamera(cam);
    ch5Service.publishNumeric("Camera.Selected", cam);
  };

  const handleSourceSelect = (id: string) => {
    setSelectedSource((prev) => (prev === id ? null : id));
  };

  const handleDestinationToggle = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const canRoute = selectedSource !== null && selectedDestinations.length > 0;

  useEffect(() => {
    ch5Service.subscribeNumeric("Camera.Selected_FB", (value: number) => {
      if (value >= 1) setActiveCamera(value);
    });
    return () => ch5Service.unsubscribe("Camera.Selected_FB");
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={scrollRef}
        className={`h-full w-full flex overflow-x-auto snap-x snap-mandatory ${theme.pageBackground} no-scrollbar`}
      >
        <div className="w-full h-full shrink-0 snap-center grid grid-cols-3 grid-rows-4 overflow-hidden gap-4 p-4 pb-10">
          <Card
            className={`${theme.cardBackground} col-span-2 row-span-2 min-h-0 flex flex-col`}
          >
            <CardHeader>
              <div className={`text-base ${theme.primaryText} font-bold`}>
                Volume Controls
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 min-h-0">
              <CardContent className="flex-1 grid grid-cols-1 gap-3 min-h-0 overflow-auto">
                {AUDIO_CONTROLS.map((control) => (
                  <Card
                    className={`${theme.cardBackground} w-full h-24 flex flex-col px-4 py-2`}
                    key={control.id}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`${theme.primaryText} text-lg font-medium`}
                      >
                        {control.label}
                      </span>
                      <CH5MuteButton
                        commandSignal={control.muteCommandSignal}
                        feedbackSignal={control.muteFeedbackSignal}
                        width={45}
                        height={45}
                        iconSize={16}
                      />
                    </div>
                    <div className="flex-1 flex items-center">
                      <CH5Slider
                        commandSignal={control.volumeCommandSignal}
                        feedbackSignal={control.volumeFeedbackSignal}
                        trackColor={theme.sliderTrackColor}
                        colorSettings="gradient"
                        thumbType={theme.sliderThumbType}
                        size="md"
                      />
                    </div>
                  </Card>
                ))}
              </CardContent>
              <ScrollBar
                className={`[&>[data-slot=scroll-area-thumb]]:${theme.buttonBackground} -right-1`}
              />
            </ScrollArea>
          </Card>
          <Card className={`${theme.cardBackground} col-span-1 row-span-3`}>
            <CardHeader className="p-0 pb-2">
              <div className="flex items-center justify-between">
                <div className={`${theme.primaryText} text-base font-bold`}>
                  Camera Controls
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }, (_, i) => i + 1).map((cam) => (
                    <button
                      key={cam}
                      onClick={() => selectCamera(cam)}
                      className={`w-16 h-12 rounded text-lg font-mono font-semibold transition-all
                          ${
                            activeCamera === cam
                              ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
                              : `${theme.buttonBackground} ${theme.buttonText} opacity-60`
                          }`}
                    >
                      {cam.toString()}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col gap-2 min-h-0">
              <div className="grid grid-cols-3 grid-rows-3 gap-1 flex-1 min-h-0">
                {(() => {
                  const cell = `w-full rounded-md ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`;
                  return (
                    <>
                      <CH5Button
                        variant="momentary"
                        icon={<ZoomIn />}
                        iconSize={28}
                        commandSignal="Camera.Zoom_In_Press"
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronUp />}
                        iconSize={28}
                        commandSignal="Camera.Tilt_Up_Press"
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ZoomOut />}
                        iconSize={28}
                        commandSignal="Camera.ZoomOut_Press"
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronLeft />}
                        iconSize={28}
                        commandSignal="Camera.Pan_Left_Press"
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<House />}
                        iconSize={28}
                        commandSignal="Camera.Home_Press"
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronRight />}
                        iconSize={28}
                        commandSignal="Camera.Pan_Right_Press"
                        className={cell}
                      />
                      <span />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronDown />}
                        iconSize={28}
                        commandSignal="Camera.Tilt_Down_Press"
                        className={cell}
                      />
                      <span />
                    </>
                  );
                })()}
              </div>

              <div className="flex flex-col gap-1">
                <span
                  className={`${theme.primaryText} text-lg font-mono text-center p-2`}
                >
                  PRESETS
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 3 }, (_, i) => i + 1).map((p) => (
                    <CH5Button
                      key={p}
                      variant="momentary"
                      label={`${p}`}
                      commandSignal={`Camera.Preset_${p}`}
                      feedbackSignal={`Camera.Preset_${p}_FB`}
                      saveSignal={`Camera.Preset_${p}_Save`}
                      textSize={20}
                      className={`w-full rounded-md ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`${theme.cardBackground} col-span-2 row-span-2 min-h-0 flex flex-col gap-2`}
          >
            <CardHeader className="">
              <CardTitle className={` ${theme.primaryText} text-base`}>
                Routing Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 min-h-0">
              <div className="flex-1 grid grid-cols-2 gap-1 min-h-0">
                <div className="flex flex-col min-h-0">
                  <p className={`${theme.secondaryText} text-sm ml-1 mb-1`}>
                    {SOURCES.length} Source{SOURCES.length !== 1 ? "s" : ""}{" "}
                    Available
                  </p>
                  <ScrollArea className="min-h-0 flex-1 border border-white/30 rounded-lg">
                    <div className="flex flex-col gap-2 p-1 ">
                      {SOURCES.map((source) => (
                        <CH5Button
                          key={source.id}
                          commandSignal={source.commandSignal}
                          feedbackSignal={source.feedbackSignal}
                          variant="momentary"
                          shape="rounded"
                          label={source.label}
                          textSize={16}
                          onClick={() => handleSourceSelect(source.id)}
                          offClassName={`${selectedSource === source.id ? theme.cardHighlightBackground : theme.cardBackground} ${selectedSource === source.id ? "ring-2 ring-blue-400" : ""}`}
                          onClassName={`${theme.cardHighlightBackground} ring-2 ring-blue-400`}
                          className={`w-full rounded-lg shrink-0 text-left ${theme.primaryText}`}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="flex flex-col min-h-0">
                  <p className={`${theme.secondaryText} text-sm ml-1 mb-1`}>
                    {DESTINATIONS.length} Destination
                    {DESTINATIONS.length !== 1 ? "s" : ""} Available
                  </p>
                  <ScrollArea className="min-h-0 flex-1 border border-white/30 rounded-lg">
                    <div className="flex flex-col gap-2 p-1">
                      {DESTINATIONS.map((destination) => (
                        <CH5Button
                          key={destination.id}
                          commandSignal={destination.commandSignal}
                          feedbackSignal={destination.feedbackSignal}
                          variant="momentary"
                          shape="rounded"
                          label={destination.label}
                          textSize={16}
                          onClick={() =>
                            handleDestinationToggle(destination.id)
                          }
                          offClassName={`${selectedDestinations.includes(destination.id) ? theme.cardHighlightBackground : theme.cardBackground} ${selectedDestinations.includes(destination.id) ? "ring-2 ring-green-400" : ""}`}
                          onClassName={`${theme.cardHighlightBackground} ring-2 ring-green-400`}
                          className={`w-full rounded-lg shrink-0 text-left ${theme.primaryText}`}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <CH5Button
                commandSignal="Routing.Route"
                feedbackSignal="Routing.Route_FB"
                variant="momentary"
                shape="rounded"
                disabled={!canRoute}
                textSize={16}
                icon={
                  <div className="flex items-center justify-center gap-2 w-full">
                    <span>
                      {canRoute
                        ? `Route to ${selectedDestinations.length} destination${selectedDestinations.length !== 1 ? "s" : ""}`
                        : "Select source & destination"}
                    </span>
                    {canRoute && <ArrowRight size={16} />}
                  </div>
                }
                offClassName={
                  canRoute
                    ? theme.cardHighlightBackground
                    : theme.cardBackground
                }
                onClassName={theme.cardHighlightBackground}
                className={`w-full  rounded-lg px-3 py-2 shrink-0 ${theme.primaryText} ${canRoute ? "opacity-100" : "opacity-50 pointer-events-none"}`}
              />
            </CardContent>
          </Card>

          <Card
            className={`${theme.cardBackground} col-span-1 row-span-1 flex flex-col`}
          >
            <CardHeader>
              <div className={`text-base font-bold ${theme.primaryText}`}>
                Music Controls
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2">
                <CH5Button
                  shape="circle"
                  variant="momentary"
                  icon={<ChevronLeft />}
                  iconSize={20}
                  commandSignal="Music.Previous_Press"
                  className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                />
                <CH5Button
                  shape="circle"
                  variant="toggle"
                  iconOn={<Play />}
                  iconOff={<Pause />}
                  iconSize={20}
                  commandSignal="Music.PlayPause_Press"
                  className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                />
                <CH5Button
                  shape="circle"
                  variant="momentary"
                  icon={<ChevronRight />}
                  iconSize={20}
                  commandSignal="Music.Next_Press"
                  className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-full shrink-0 snap-center grid grid-cols-3 grid-rows-4 overflow-hidden gap-4 p-4 pb-10">
          <Card
            className={`${theme.cardBackground} col-span-3 row-span-2 min-h-0 flex flex-col`}
          >
            <CardHeader>
              <div className={`text-base ${theme.primaryText} font-bold`}>
                New Card
              </div>
            </CardHeader>
            <CardContent>{/* your new content */}</CardContent>
          </Card>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: PAGE_COUNT }, (_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            aria-label={`Go to page ${i + 1}`}
            className="p-2 -m-2"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                activePage === i
                  ? `w-6 ${theme.buttonActiveBackground}`
                  : `w-2 ${theme.buttonBackground} opacity-50`
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
