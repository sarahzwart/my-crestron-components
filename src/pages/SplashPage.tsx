import { useCH5Boolean } from '../hooks/useCH5Boolean';
import { useState, useEffect } from 'react';

export interface SplashPageProps {
    commandSignal?:string;
    feedbackSignal?:string;
}

export function SplashPage({
    commandSignal = "system.wake",
    feedbackSignal = "system.wake.fb"
} : SplashPageProps ) {
    const [, setWake] = useCH5Boolean(commandSignal, feedbackSignal, false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
         
    }, []);

    const formatTime = (date: Date) =>  {
        date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    }

    const formatDate = (date: Date) =>  {
        date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    }


    return (
        <div>
        </div>
    )

}