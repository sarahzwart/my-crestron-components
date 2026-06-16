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
        <div
            className={`h-full w-full flex flex-col justify-start overflow-hidden gap-4 p-4 ${theme.pageBackground}`}
        >
            <Card className={`${theme.cardBackground} w-1/2 h-3/4`}>
                <CardHeader>
                    <CardTitle className={`${theme.primaryText}`}>
                        Volume Controls
                    </CardTitle>
                </CardHeader>
                <CardContent
                    className={`flex-1 grid grid-cols-1 gap-3 min-h-0 overflow-auto`}
                >
                    {AUDIO_CONTROLS.map((control) => (
                        <Card className={`${theme.cardBackground} w-full h-16 flex px-4`} key={control.id}>
                            <CardHeader>
                                <CardTitle className={`${theme.primaryText} `}>
                                    {control.label}
                                </CardTitle>
                            </CardHeader>
                            <CH5Slider commandSignal={control.volumeCommandSignal} feedbackSignal={control.volumeFeedbackSignal} />
                            <CH5MuteButton
                                commandSignal={control.muteCommandSignal}
                                feedbackSignal={control.muteFeedbackSignal}
                                width={48}
                                height={48}
                                iconSize={20}
                            />
                        </Card>
                    ))}
                </CardContent>
            </Card>

            <Card className={`${theme.cardBackground} w-full h-48`}>
                <CardHeader>
                    <CardTitle>Camera Controls</CardTitle>
                </CardHeader>
            </Card>

            <Card className={`${theme.cardBackground} w-full h-48`}>
                <CardHeader>
                    <CardTitle>Music Controls</CardTitle>
                </CardHeader>
            </Card>

            <Card className={`${theme.cardBackground} w-full h-48`}>
                <CardHeader>
                    <CardTitle>Routing Controls</CardTitle>
                </CardHeader>
            </Card>

        </div>
    );
}
