import { useTheme } from "../lib/theme";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUDIO_CONTROLS } from "../config/audio.config";
import { SOURCES, DESTINATIONS } from "../config/routing.config";
import { CH5Slider } from "@/components/lib/common/CH5Slider";
import { CH5MuteButton } from "@/components/lib/volume/CH5MuteButton";

export function OverviewPage() {
    const { theme } = useTheme();
    return (
        <div className={`h-full w-full grid grid-cols-3 grid-rows-[3fr_1fr] overflow-hidden gap-4 p-4 ${theme.pageBackground}`}>
            <Card className={`${theme.cardBackground} col-span-2 row-span-1 min-h-0 flex flex-col`}>
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Volume Controls</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 grid grid-cols-1 gap-3 min-h-0 overflow-auto">
                    {AUDIO_CONTROLS.map((control) => (
                        <Card className={`${theme.cardBackground} w-full h-24 flex flex-col px-4 py-2`} key={control.id}>
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
        <CH5Slider commandSignal={control.volumeCommandSignal} feedbackSignal={control.volumeFeedbackSignal} />
    </div>
</Card>
                    ))}
                </CardContent>
            </Card>

            <Card className={`${theme.cardBackground} col-span-1 row-span-1`}>
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Camera Controls</CardTitle>
                </CardHeader>
            </Card>

            <Card className={`${theme.cardBackground} col-span-1 row-span-1`}>
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Music Controls</CardTitle>
                </CardHeader>
            </Card>

            <Card className={`${theme.cardBackground} col-span-2 row-span-1`}>
                <CardHeader>
                    <CardTitle className={theme.primaryText}>Routing Controls</CardTitle>
                </CardHeader>
            </Card>

        </div>
    );
}
