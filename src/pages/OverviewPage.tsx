import { useTheme } from "../lib/theme";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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

export function OverviewPage() {
    const { theme } = useTheme();

    const [activeCamera, setActiveCamera] = useState(1);

    const [selectedSource, setSelectedSource] = useState<string | null>(null);
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

    const handleSourceSelect = (id: string) => {
        setSelectedSource((prev) => (prev === id ? null : id));
    };

    const handleDestinationToggle = (id: string) => {
        setSelectedDestinations((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
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
        <div
            className={`h-full w-full grid grid-cols-3 grid-rows-4 overflow-hidden gap-4 p-4 ${theme.pageBackground}`}
        >
            <Card
                className={`${theme.cardBackground} col-span-2 row-span-2 min-h-0 flex flex-col`}
            >
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Volume Controls</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 grid grid-cols-1 gap-3 min-h-0 overflow-auto">
                    {AUDIO_CONTROLS.map((control) => (
                        <Card
                            className={`${theme.cardBackground} w-full h-24 flex flex-col px-4 py-2`}
                            key={control.id}
                        >
                            <div className="flex items-start justify-between">
                                <span className={`${theme.primaryText} text-sm font-medium`}>
                                    {control.label}
                                </span>
                                <CH5MuteButton
                                    commandSignal={control.muteCommandSignal}
                                    feedbackSignal={control.muteFeedbackSignal}
                                    width={32}
                                    height={32}
                                    iconSize={16}
                                />
                            </div>
                            <div className="flex-1 flex items-center">
                                <CH5Slider
                                    commandSignal={control.volumeCommandSignal}
                                    feedbackSignal={control.volumeFeedbackSignal}
                                />
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
            <Card className={`${theme.cardBackground} col-span-1 row-span-3`}>
                <CardHeader className="p-0 pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className={`${theme.primaryText} text-sm`}>
                            Camera Controls
                        </CardTitle>
                        <div className="flex gap-1">
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((cam) => (
                                <button
                                    key={cam}
                                    onClick={() => setActiveCamera(cam)}
                                    className={`w-12 h-12 rounded text-xs font-mono font-semibold transition-all
                        ${activeCamera === cam
                                            ? `${theme.buttonActiveBackground} ${theme.buttonActiveText}`
                                            : `${theme.buttonBackground} ${theme.buttonText} opacity-60`
                                        }`}
                                >
                                    {cam.toString().padStart(2, "0")}
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
                                    <CH5Button variant="momentary" icon={<ZoomIn />} iconSize={20} commandSignal="Camera.Zoom_In_Press" className={cell} />
                                    <CH5Button variant="momentary" icon={<ChevronUp />} iconSize={20} commandSignal="Camera.Tilt_Up_Press" className={cell} />
                                    <CH5Button variant="momentary" icon={<ZoomOut />} iconSize={20} commandSignal="Camera.ZoomOut_Press" className={cell} />
                                    <CH5Button variant="momentary" icon={<ChevronLeft />} iconSize={20} commandSignal="Camera.Pan_Left_Press" className={cell} />
                                    <CH5Button variant="momentary" icon={<House />} iconSize={20} commandSignal="Camera.Home_Press" className={cell} />
                                    <CH5Button variant="momentary" icon={<ChevronRight />} iconSize={20} commandSignal="Camera.Pan_Right_Press" className={cell} />
                                    <span />
                                    <CH5Button variant="momentary" icon={<ChevronDown />} iconSize={20} commandSignal="Camera.Tilt_Down_Press" className={cell} />
                                    <span />
                                </>
                            );
                        })()}
                    </div>

                    {/* Presets — outside the PTZ grid so they span full width */}
                    <div className="flex flex-col gap-1">
                        <span className={`${theme.primaryText} text-sm font-mono text-center p-2`}>PRESETS</span>
                        <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 3 }, (_, i) => i + 1).map((p) => (
                                <CH5Button
                                    key={p}
                                    variant="toggle"
                                    label={`${p}`}
                                    commandSignal={`Camera.Preset_${p}`}
                                    feedbackSignal={`Camera.Preset_${p}_FB`}
                                    textSize={16}
                                    className={`w-full rounded-md ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className={`${theme.cardBackground} col-span-2 row-span-2 min-h-0 flex flex-col`}>
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Routing Controls</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3 min-h-0">
                    <div className="flex-1 grid grid-cols-2 gap-1 min-h-0">
                        <div className="flex flex-col gap-2 min-h-0 overflow-y-auto p-1">
                            {SOURCES.map((source) => (
                                <CH5Button
                                    key={source.id}
                                    commandSignal={source.commandSignal}
                                    feedbackSignal={source.feedbackSignal}
                                    variant="momentary"
                                    shape="rounded"
                                    label={source.label}
                                    textSize={14}
                                    onClick={() => handleSourceSelect(source.id)}
                                    offClassName={`${selectedSource === source.id ? theme.cardHighlightBackground : theme.cardBackground} ${selectedSource === source.id ? "ring-2 ring-blue-400" : ""}`}
                                    onClassName={`${theme.cardHighlightBackground} ring-2 ring-blue-400`}
                                    className="w-full rounded-lg shrink-0 text-left"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 min-h-0 overflow-y-auto p-1">
                            {DESTINATIONS.map((destination) => (
                                <CH5Button
                                    key={destination.id}
                                    commandSignal={destination.commandSignal}
                                    feedbackSignal={destination.feedbackSignal}
                                    variant="momentary"
                                    shape="rounded"
                                    label={destination.label}
                                    textSize={14}
                                    onClick={() => handleDestinationToggle(destination.id)}
                                    offClassName={`${selectedDestinations.includes(destination.id) ? theme.cardHighlightBackground : theme.cardBackground} ${selectedDestinations.includes(destination.id) ? "ring-2 ring-green-400" : ""}`}
                                    onClassName={`${theme.cardHighlightBackground} ring-2 ring-green-400`}
                                    className="w-full rounded-lg shrink-0 text-left"
                                />
                            ))}
                        </div>
                    </div>

                    <CH5Button
                        commandSignal="Routing.Route"
                        feedbackSignal="Routing.Route_FB"
                        variant="momentary"
                        shape="rounded"
                        disabled={!canRoute}
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
                        offClassName={canRoute ? theme.cardHighlightBackground : theme.cardBackground}
                        onClassName={theme.cardHighlightBackground}
                        className={`w-full  rounded-lg px-3 py-2 shrink-0 ${canRoute ? "opacity-100" : "opacity-50 pointer-events-none"}`}
                    />
                </CardContent>
            </Card>

            <Card className={`${theme.cardBackground} col-span-1 row-span-1 flex flex-col`}>
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Music Controls</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2">
                        <CH5Button shape="circle" variant="momentary" icon={<ChevronLeft />} iconSize={20} commandSignal="Music.Previous_Press" className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`} />
                        <CH5Button shape="circle" variant="toggle" iconOn={<Play />} iconOff={<Pause />} iconSize={20} commandSignal="Music.PlayPause_Press" className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`} />
                        <CH5Button shape="circle" variant="momentary" icon={<ChevronRight />} iconSize={20} commandSignal="Music.Next_Press" className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
