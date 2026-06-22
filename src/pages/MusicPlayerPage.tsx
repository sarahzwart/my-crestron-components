import { CH5Button } from "@/components/lib/common/CH5Button";
import { ChevronRight } from "@lucide/react";

export interface MusicPlayerPageProps {
  idle: boolean;

  playing?: boolean;
  paused?: boolean;
  trackName: string;
  artistName: string;
  albumName: string;
  imageUrl?: string;

  NextTrackAvailable?: boolean;
  PreviousTrackAvailable?: boolean;

  shuffleOn?: boolean;
  shuffleAvailable?: boolean;

  repeatMode?: "off" | "one" | "all";
  repeatAllAvailable?: boolean;
  repeatOneAvailable?: boolean;

  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MusicPlayerPage({
  children,
  className = "",
  style = {},
}: MusicPlayerPageProps) {
  return (
    <div className={`p-8 ${className}`} style={style}>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Music Player</h1>
      <div className="grid grid-cols-3 gap-2">
                        <CH5Button shape="circle" variant="momentary" icon={<ChevronLeft />} iconSize={20} commandSignal="Music.Previous_Press" className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`} />
                        <CH5Button shape="circle" variant="toggle" iconOn={<Play />} iconOff={<Pause />} iconSize={20} commandSignal="Music.PlayPause_Press" className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`} />
                        <CH5Button shape="circle" variant="momentary" icon={<ChevronRight />} iconSize={20} commandSignal="Music.Next_Press" className={`w-16 h-16 ${theme.cardBackground} ${theme.primaryText} ${theme.cardActiveBackground}`} />
                    </div>
    </div>
  );
}
