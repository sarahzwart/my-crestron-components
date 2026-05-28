import { useTheme, APP_THEMES, APP_FONTS, type ThemeName, type FontName } from "../lib/theme";
import { Check } from "lucide-react";

export function SettingsPage() {
  const { theme, themeName, setTheme, fontName, setFont } = useTheme();

  return (
    <div className="h-full flex flex-col p-8 overflow-y-auto">
      <div className="mb-8 px-2 shrink-0">
        <h1 className={`${theme.primaryText} text-4xl font-bold mb-2`}>Settings</h1>
        <p className={`${theme.secondaryText} text-base`}>
          Customize the look and feel of your interface
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-10">
        {/* Theme Selection */}
        <section>
          <SectionHeader color="bg-blue-500" title="Theme" subtitle="Choose a colour scheme" theme={theme} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(APP_THEMES) as ThemeName[]).map((key) => (
              <ThemeCard
                key={key}
                themeName={key}
                isSelected={themeName === key}
                onSelect={() => setTheme(key)}
              />
            ))}
          </div>
        </section>

        {/* Font Selection */}
        <section>
          <SectionHeader color="bg-purple-500" title="Font" subtitle="Choose a typeface" theme={theme} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(APP_FONTS) as FontName[]).map((key) => (
              <FontCard
                key={key}
                fontName={key}
                isSelected={fontName === key}
                onSelect={() => setFont(key)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Shared Section Header ─────────────────────────────────────────────────
function SectionHeader({
  color,
  title,
  subtitle,
  theme,
}: {
  color: string;
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  return (
    <div className="flex items-center gap-3 mb-5 px-1">
      <div className={`w-1.5 h-10 rounded-full ${color}`} />
      <div>
        <h2 className={`${theme.primaryText} text-2xl font-bold`}>{title}</h2>
        <p className={`${theme.secondaryText} text-sm mt-0.5`}>{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Theme Card ────────────────────────────────────────────────────────────
const THEME_LABELS: Record<ThemeName, string> = {
  glassDark:   "Glass Dark",
  neonPurple:  "Neon Purple",
  minimal:     "Minimal",
  oceanBlue:   "Ocean Blue",
  sunset:      "Sunset",
  charcoal:    "Charcoal",
};

const THEME_PREVIEWS: Record<ThemeName, { bg: string; card: string; accent: string }> = {
  glassDark:   { bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", card: "bg-white/10",          accent: "bg-blue-500"   },
  neonPurple:  { bg: "bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950", card: "bg-purple-500/20",     accent: "bg-pink-500"   },
  minimal:     { bg: "bg-gradient-to-br from-slate-50 to-slate-200",                card: "bg-white border border-slate-200", accent: "bg-blue-500" },
  oceanBlue:   { bg: "bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-900",   card: "bg-cyan-500/20",       accent: "bg-cyan-400"   },
  sunset:      { bg: "bg-gradient-to-br from-orange-950 via-red-950 to-purple-950", card: "bg-orange-500/20",     accent: "bg-orange-400" },
  charcoal:    { bg: "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900",    card: "bg-zinc-700/40",       accent: "bg-zinc-500"   },
};

function ThemeCard({ themeName, isSelected, onSelect }: {
  themeName: ThemeName;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { theme } = useTheme();
  const preview = THEME_PREVIEWS[themeName];

  return (
    <button
      onClick={onSelect}
      className={`
        ${theme.cardBackground} ${theme.cardActiveBackground}
        rounded-2xl p-4 flex flex-col gap-3
        transition-all duration-200 active:scale-[0.97]
        relative overflow-hidden
        ${isSelected ? "ring-2 ring-blue-400" : ""}
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}

      {/* Mini preview */}
      <div className={`${preview.bg} rounded-xl h-20 p-3 flex flex-col justify-between`}>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-1.5 rounded-full bg-white/30" />
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>
        <div className="flex gap-1.5">
          <div className={`flex-1 h-6 rounded-lg ${preview.card}`} />
          <div className={`flex-1 h-6 rounded-lg ${preview.card}`} />
        </div>
        <div className={`w-8 h-1.5 rounded-full ${preview.accent}`} />
      </div>

      <p className={`${theme.primaryText} font-semibold text-sm text-left`}>
        {THEME_LABELS[themeName]}
      </p>
    </button>
  );
}

// ─── Font Card ─────────────────────────────────────────────────────────────
function FontCard({ fontName, isSelected, onSelect }: {
  fontName: FontName;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { theme } = useTheme();
  const fontInfo = APP_FONTS[fontName];

  return (
    <button
      onClick={onSelect}
      className={`
        ${theme.cardBackground} ${theme.cardActiveBackground}
        rounded-2xl p-5 flex flex-col gap-3
        transition-all duration-200 active:scale-[0.97]
        relative text-left
        ${isSelected ? "ring-2 ring-purple-400" : ""}
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}

      <p className={`${theme.primaryText} text-4xl font-light`} style={{ fontFamily: fontInfo.variable }}>
        Aa
      </p>
      <div>
        <p className={`${theme.primaryText} font-semibold text-sm`} style={{ fontFamily: fontInfo.variable }}>
          {fontInfo.label}
        </p>
        <p className={`${theme.secondaryText} text-xs mt-0.5`} style={{ fontFamily: fontInfo.variable }}>
          The quick brown fox
        </p>
      </div>
    </button>
  );
}