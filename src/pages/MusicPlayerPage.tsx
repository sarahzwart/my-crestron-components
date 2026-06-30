import { useTheme } from "../lib/theme";
import { useEffect, useRef, useState } from "react";
import { CH5Button } from "@/components/lib/common/CH5Button";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBackIcon,
  SkipForwardIcon,
  Music2,
  Heart,
  Star,
} from "lucide-react";
import { SIGNALS_MUSIC } from "@/config/signals";
import { CH5MultiModeButton } from "@/components/lib/common/CH5MultiModeButton";

export interface MusicPlayerPageProps {
  idle?: boolean;
  playing?: boolean;
  paused?: boolean;
  trackName?: string;
  artistName?: string;
  albumName?: string;
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

const FAVORITES = [
  { id: 1, title: "Favorite Station 1", subtitle: "Artist / Genre" },
  { id: 2, title: "Favorite Station 2", subtitle: "Artist / Genre" },
  { id: 3, title: "Favorite Station 3", subtitle: "Artist / Genre" },
  { id: 4, title: "Favorite Station 4", subtitle: "Artist / Genre" },
  { id: 5, title: "Favorite Station 5", subtitle: "Artist / Genre" },
  { id: 6, title: "Favorite Station 6", subtitle: "Artist / Genre" },
  { id: 7, title: "Favorite Station 7", subtitle: "Artist / Genre" },
  { id: 8, title: "Favorite Station 8", subtitle: "Artist / Genre" },
  { id: 9, title: "Favorite Station 9", subtitle: "Artist / Genre" },
  { id: 10, title: "Favorite Station 10", subtitle: "Artist / Genre" },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayerPage({
  trackName = "Nothing Playing",
  artistName = "—",
  albumName = "",
  imageUrl,
  nowPlayingPositionSeconds = 0,
  nowPlayingLengthSeconds = 0,
  nowPlayingPositionGauge = 0,
}: MusicPlayerPageProps) {
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
      setActivePage(Math.round(container.scrollLeft / container.clientWidth));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const progress =
    nowPlayingLengthSeconds > 0
      ? (nowPlayingPositionSeconds / nowPlayingLengthSeconds) * 100
      : nowPlayingPositionGauge;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="h-full w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
      >
        <div className="w-full h-full shrink-0 snap-center flex flex-col items-center justify-between px-8 py-6">
          <div className="flex-1 flex items-center justify-center w-full">
            <div
              className={`
                relative w-84 h-84 rounded-3xl overflow-hidden shadow-2xl
                ${theme.cardBackground}
                ring-1 ring-white/10
              `}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={albumName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center ${theme.iconBackground}`}
                >
                  <Music2
                    size={64}
                    className={`${theme.iconColor} opacity-40`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="w-full text-center mb-4">
            <p
              className={`${theme.primaryText} text-xl font-bold tracking-tight truncate`}
            >
              {trackName}
            </p>
            <p className={`${theme.secondaryText} text-sm mt-1 truncate`}>
              {artistName}
              {albumName ? ` · ${albumName}` : ""}
            </p>
          </div>
          <div className="w-full mb-4">
            <div
              className={`w-full h-1.5 rounded-full ${theme.buttonBackground} overflow-hidden`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  theme.sliderTrackColor === "blue"
                    ? "bg-blue-400"
                    : theme.sliderTrackColor === "purple"
                      ? "bg-purple-400"
                      : theme.sliderTrackColor === "cyan"
                        ? "bg-cyan-400"
                        : theme.sliderTrackColor === "orange"
                          ? "bg-orange-400"
                          : theme.sliderTrackColor === "red"
                            ? "bg-red-400"
                            : "bg-white/60"
                }`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <div
              className={`flex justify-between mt-1.5 ${theme.secondaryText} text-xs`}
            >
              <span>{formatTime(nowPlayingPositionSeconds)}</span>
              <span>{formatTime(nowPlayingLengthSeconds)}</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <CH5MultiModeButton
              commandSignal={SIGNALS_MUSIC.shuffle.cmd}
              feedbackSignal={SIGNALS_MUSIC.shuffle.fb}
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
              className="w-16 h-16"
            />

            <CH5Button
              shape="circle"
              variant="momentary"
              icon={<SkipBackIcon />}
              iconSize={22}
              commandSignal={SIGNALS_MUSIC.previous.cmd}
              className={`w-14 h-14 ${theme.buttonBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
            />
            <CH5Button
              shape="circle"
              variant="toggle"
              iconOn={<Play />}
              iconOff={<Pause />}
              iconSize={26}
              commandSignal={SIGNALS_MUSIC.playPause.cmd}
              feedbackSignal={SIGNALS_MUSIC.playPause.fb}
              width={64}
              height={64}
              onClassName={`rounded-full ${theme.buttonActiveBackground} ${theme.buttonActiveText}`}
              offClassName={`rounded-full ${theme.buttonBackground} ${theme.primaryText}`}
              className="shadow-lg"
            />
            <CH5Button
              shape="circle"
              variant="momentary"
              icon={<SkipForwardIcon />}
              iconSize={22}
              commandSignal={SIGNALS_MUSIC.next.cmd}
              className={`w-14 h-14 ${theme.buttonBackground} ${theme.primaryText} ${theme.cardActiveBackground}`}
            />
            <CH5MultiModeButton
              commandSignal={SIGNALS_MUSIC.repeat.cmd}
              feedbackSignal={SIGNALS_MUSIC.repeat.fb}
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
              className="w-16 h-16"
            />
          </div>
        </div>

        {/* ── PAGE 2: Favorites ── */}
        <div className="w-full h-full shrink-0 snap-center flex flex-col px-4 py-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-5 px-1">
            <Star size={18} className={theme.secondaryText} />
            <span className={`${theme.primaryText} text-lg font-bold`}>
              Favorites
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
            {FAVORITES.map((fav) => (
              <button
                key={fav.id}
                className={`
                  w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left
                  transition-all duration-150 active:scale-[0.98]
                  ${theme.cardBackground} ${theme.cardActiveBackground}
                `}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBackground}`}
                >
                  <Heart size={16} className={theme.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`${theme.primaryText} text-sm font-semibold truncate`}
                  >
                    {fav.title}
                  </p>
                  <p className={`${theme.secondaryText} text-xs truncate`}>
                    {fav.subtitle}
                  </p>
                </div>
                <Play size={14} className={`${theme.secondaryText} shrink-0`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page indicator dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            className="p-2 -m-2"
            aria-label={`Page ${i + 1}`}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                activePage === i
                  ? `w-5 ${theme.buttonActiveBackground}`
                  : `w-1.5 ${theme.buttonBackground} opacity-40`
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
