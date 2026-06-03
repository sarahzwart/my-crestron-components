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
      {children}
    </div>
  );
}
