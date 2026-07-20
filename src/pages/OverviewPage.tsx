import { useTheme } from "../lib/theme";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUDIO_CONTROLS } from "../config/audio.config";
import { SOURCES, DESTINATIONS } from "../config/routing.config";
import { CH5Slider } from "@/components/ch5/common/CH5Slider";
import { CH5MuteButton } from "@/components/ch5/volume/CH5MuteButton";
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
  Repeat,
  SkipForwardIcon,
  Repeat1,
  SkipBackIcon,
  Shuffle,
} from "lucide-react";
import { CH5Button } from "@/components/ch5/common/CH5Button";
import {
  signals
} from "@/config/signals";
import ch5Service from "@/services/ch5Service";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CH5MultiModeButton } from "@/components/ch5/common/CH5MultiModeButton";

const PAGE_COUNT = 2; // update if you add or remove pages

export const OverviewPage = () => {
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
    ch5Service.publishNumeric(signals.camera.selected.cmd, cam);
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
    const subscriptionId = ch5Service.subscribeNumeric("Camera.Selected_FB", (value: number) => {
      if (value >= 1) setActiveCamera(value);
    });
    return () => ch5Service.unsubscribe("Camera.Selected_FB", subscriptionId);
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
                        commandSignal={signals.camera.zoomIn.cmd}
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronUp />}
                        iconSize={28}
                        commandSignal={signals.camera.tiltUp.cmd}
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ZoomOut />}
                        iconSize={28}
                        commandSignal={signals.camera.zoomOut.cmd}
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronLeft />}
                        iconSize={28}
                        commandSignal={signals.camera.panLeft.cmd}
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<House />}
                        iconSize={28}
                        commandSignal={signals.camera.home.cmd}
                        className={cell}
                      />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronRight />}
                        iconSize={28}
                        commandSignal={signals.camera.panRight.cmd}
                        className={cell}
                      />
                      <span />
                      <CH5Button
                        variant="momentary"
                        icon={<ChevronDown />}
                        iconSize={28}
                        commandSignal={signals.camera.tiltDown.cmd}
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
                      commandSignal={signals.camera[`preset${p}` as CameraPresetKey].cmd}
                      feedbackSignal={signals.camera[`preset${p}` as CameraPresetKey].fb}
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
              <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
                {/* Sources */}
                <div className="flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <p
                      className={`${theme.secondaryText} text-xs font-semibold uppercase tracking-wider`}
                    >
                      Source
                    </p>
                    {selectedSource && (
                      <span className={`${theme.secondaryText} text-xs`}>
                        1 selected
                      </span>
                    )}
                  </div>
                  <ScrollArea
                    className={`min-h-0 flex-1 rounded-lg ${theme.cardBackground}`}
                  >
                    <div className="flex flex-col gap-1 p-1">
                      {SOURCES.map((source) => {
                        const isSelected = selectedSource === source.id;
                        return (
                          <button
                            key={source.id}
                            onClick={() => handleSourceSelect(source.id)}
                            className={`
                  w-full text-left px-3 py-2 rounded-md text-sm font-medium
                  transition-all duration-150 active:scale-[0.98]
                  ${
                    isSelected
                      ? `${theme.cardHighlightBackground} ${theme.primaryText} ring-1 ${theme.headerBorder}`
                      : `${theme.buttonBackground} ${theme.buttonText} opacity-60 hover:opacity-90`
                  }
                `}
                          >
                            {source.label}
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>

                {/* Destinations */}
                <div className="flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <p
                      className={`${theme.secondaryText} text-xs font-semibold uppercase tracking-wider`}
                    >
                      Destination
                    </p>
                    {selectedDestinations.length > 0 && (
                      <span className={`${theme.secondaryText} text-xs`}>
                        {selectedDestinations.length} selected
                      </span>
                    )}
                  </div>
                  <ScrollArea
                    className={`min-h-0 flex-1 rounded-lg ${theme.cardBackground}`}
                  >
                    <div className="flex flex-col gap-1 p-1">
                      {DESTINATIONS.map((destination) => {
                        const isSelected = selectedDestinations.includes(
                          destination.id,
                        );
                        return (
                          <button
                            key={destination.id}
                            onClick={() =>
                              handleDestinationToggle(destination.id)
                            }
                            className={`
                  w-full text-left px-3 py-2 rounded-md text-sm font-medium
                  transition-all duration-150 active:scale-[0.98]
                  ${
                    isSelected
                      ? `${theme.cardHighlightBackground} ${theme.primaryText} ring-1 ${theme.headerBorder}`
                      : `${theme.buttonBackground} ${theme.buttonText} opacity-60 hover:opacity-90`
                  }
                `}
                          >
                            {destination.label}
                          </button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* Route button */}
              <button
                disabled={!canRoute}
                onClick={() => {
                  /* your route handler */
                }}
                className={`
      w-full rounded-lg px-3 py-2.5 shrink-0 flex items-center justify-center gap-2
      text-sm font-semibold transition-all duration-200
      ${
        canRoute
          ? `${theme.buttonActiveBackground} ${theme.buttonActiveText} active:scale-[0.99]`
          : `${theme.buttonBackground} ${theme.secondaryText} opacity-40 cursor-not-allowed`
      }
    `}
              >
                {canRoute
                  ? `Route to ${selectedDestinations.length} destination${selectedDestinations.length !== 1 ? "s" : ""}`
                  : "Select source & destination"}
                {canRoute && <ArrowRight size={14} />}
              </button>
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
              <div className="flex items-center justify-between w-full px-2">
                <CH5MultiModeButton
                  commandSignal={signals.music.shuffle.cmd}
                  feedbackSignal={signals.music.shuffle.fb}
                  modes={[
                    {
                      icon: <Shuffle size={24} className="opacity-50" />,
                      label: "Off",
                      className: `opacity-80 ${theme.buttonBackground} ${theme.buttonText}`,
                    },
                    {
                      icon: <Shuffle size={24} />,
                      label: "Shuffle",
                      className: `opacity-80 ${theme.buttonActiveBackground} ${theme.buttonActiveText}`,
                    },
                  ]}
                  className={`w-10 h-10 ${theme.buttonBackground}`}
                />
                <CH5Button
                  shape="circle"
                  variant="momentary"
                  icon={<SkipBackIcon />}
                  iconSize={20}
                  commandSignal={signals.music.previous.cmd}
                  className={`w-12 h-12 ${theme.buttonBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                />
                <CH5Button
                  shape="circle"
                  variant="toggle"
                  iconOn={<Play />}
                  iconOff={<Pause />}
                  iconSize={22}
                  commandSignal={signals.music.playPause.cmd}
                  feedbackSignal={signals.music.playPause.fb}
                  width={56}
                  height={56}
                  onClassName={`rounded-full ${theme.buttonActiveBackground} ${theme.buttonActiveText}`}
                  offClassName={`rounded-full ${theme.buttonBackground} ${theme.primaryText}`}
                />
                <CH5Button
                  shape="circle"
                  variant="momentary"
                  icon={<SkipForwardIcon />}
                  iconSize={20}
                  commandSignal={signals.music.next.cmd}
                  className={`w-12 h-12 ${theme.buttonBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                />
                <CH5MultiModeButton
                  commandSignal={signals.music.repeat.cmd}
                  feedbackSignal={signals.music.repeat.fb}
                  modes={[
                    {
                      icon: <Repeat size={24} className="opacity-50" />,
                      label: "Off",
                      className: `${theme.buttonBackground} ${theme.buttonText}`,
                    },
                    {
                      icon: <Repeat size={24} />,
                      label: "Repeat",
                      className: `opacity-80 ${theme.buttonActiveBackground} ${theme.buttonActiveText}`,
                    },
                    {
                      icon: <Repeat1 size={24} />,
                      label: "Repeat 1",
                      className: `opacity-80 ${theme.buttonActiveBackground} ${theme.buttonActiveText}`,
                    },
                  ]}
                  className={`w-10 h-10 ${theme.buttonBackground}`}
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
                  : `w-2 ${theme.buttonActiveBackground} opacity-50`
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
