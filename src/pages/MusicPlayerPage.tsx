export interface MusicPlayerPageProps {
  idle: boolean;

  playing?: boolean;
  paused?: boolean;
  trackName: string;
  artistName: string;
  albumName: string;
  imageUrl?: string;

  providerName?: string;
  providerImageUrl?: string;

  nextTrackAvailable?: boolean;
  previousTrackAvailable?: boolean;

  shuffleOn?: boolean;
  shuffleAvailable?: boolean;

  repeatMode?: "off" | "one" | "all";
  repeatAllAvailable?: boolean;
  repeatOneAvailable?: boolean;

  nowPlayingLengthSeconds?: number;
  nowPlayingPositionSeconds?: number;
  nowPlayingPositionGauge?: number;

  numberOfFavorites?: number;

  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MusicPlayerPage({
  className = "",
  style = {},
}: MusicPlayerPageProps) {
  return (
    <div className={`p-8 ${className}`} style={style}>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Music Player</h1>
    </div>
  );
}
