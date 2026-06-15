import { useState, useEffect } from "react";
import {
  useTheme,
  APP_THEMES,
  APP_FONTS,
  type ThemeName,
  type FontName,
} from "../lib/theme";
import { Check, Palette, Type } from "lucide-react";
import { CH5Button } from "@/components/lib/common/CH5Button";
import ch5Service from "@/services/ch5Service";

type SettingsTab = "theme" | "font";

export function SettingsPage() {
  const { theme, themeName, setTheme, fontName, setFont } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>("theme");

  useEffect(() => {
    ch5Service.subscribeBool("Settings_Tab.Theme_FB", (isActive: boolean) => {
      if (isActive) setActiveTab("theme");
    });
    ch5Service.subscribeBool("Settings_Tab.Font_FB", (isActive: boolean) => {
      if (isActive) setActiveTab("font");
    });

    return () => {
      ch5Service.unsubscribe("Settings_Tab.Theme_FB");
      ch5Service.unsubscribe("Settings_Tab.Font_FB");
    };
  }, []);

  return (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      <div className="mb-6 px-2 shrink-0 flex items-center justify-between">
        <div>
          <h1 className={`${theme.primaryText} text-4xl font-bold mb-1`}>
            Settings
          </h1>
          <p className={`${theme.secondaryText} text-base`}>
            Customize the look and feel of your interface
          </p>
        </div>
        <div className={`flex gap-1 p-1 rounded-2xl ${theme.cardBackground}`}>
          <CH5Button
            commandSignal="Settings_Tab.Theme"
            feedbackSignal="Settings_Tab.Theme_FB"
            variant="momentary"
            shape="rounded"
            onClick={() => setActiveTab("theme")}
            offClassName={
              activeTab === "theme"
                ? theme.buttonActiveBackground
                : "bg-transparent"
            }
            onClassName={theme.buttonActiveBackground}
            className="rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all duration-200"
            icon={
              <div className="flex items-center gap-2">
                <Palette
                  size={16}
                  className={
                    activeTab === "theme"
                      ? theme.buttonActiveText
                      : theme.secondaryText
                  }
                />
                <span
                  className={`text-sm font-semibold ${activeTab === "theme" ? theme.buttonActiveText : theme.secondaryText}`}
                >
                  Theme
                </span>
              </div>
            }
          />
          <CH5Button
            commandSignal="Settings_Tab.Font"
            feedbackSignal="Settings_Tab.Font_FB"
            variant="momentary"
            shape="rounded"
            onClick={() => setActiveTab("font")}
            offClassName={
              activeTab === "font"
                ? theme.buttonActiveBackground
                : "bg-transparent"
            }
            onClassName={theme.buttonActiveBackground}
            className="rounded-xl px-5 py-2.5 flex items-center gap-2 transition-all duration-200"
            icon={
              <div className="flex items-center gap-2">
                <Type
                  size={16}
                  className={
                    activeTab === "font"
                      ? theme.buttonActiveText
                      : theme.secondaryText
                  }
                />
                <span
                  className={`text-sm font-semibold ${activeTab === "font" ? theme.buttonActiveText : theme.secondaryText}`}
                >
                  Font
                </span>
              </div>
            }
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === "theme" && (
          <section>
            <SectionHeader
              color="bg-blue-500"
              title="Theme"
              subtitle="Choose a colour scheme"
              theme={theme}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
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
        )}

        {activeTab === "font" && (
          <section>
            <SectionHeader
              color="bg-purple-500"
              title="Font"
              subtitle="Choose a typeface"
              theme={theme}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
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
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  color,
  title,
  subtitle,
  theme,
}: {
  color: string;
  title: string;
  subtitle: string;
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

const THEME_LABELS: Record<ThemeName, string> = {
  glassDark: "Glass Dark",
  neonPurple: "Neon Purple",
  minimal: "Minimal",
  oceanBlue: "Ocean Blue",
  sunset: "Sunset",
  charcoal: "Charcoal",
  crimsonDark: "Crimson Dark",
  studioLight: "Studio Light",
};

const THEME_PREVIEWS: Record<
  ThemeName,
  { bg: string; card: string; accent: string }
> = {
  glassDark: {
    bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
    card: "bg-white/10",
    accent: "bg-blue-500",
  },
  neonPurple: {
    bg: "bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950",
    card: "bg-purple-500/20",
    accent: "bg-pink-500",
  },
  minimal: {
    bg: "bg-gradient-to-br from-slate-50 to-slate-200",
    card: "bg-white border border-slate-200",
    accent: "bg-blue-500",
  },
  oceanBlue: {
    bg: "bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-900",
    card: "bg-cyan-500/20",
    accent: "bg-cyan-400",
  },
  sunset: {
    bg: "bg-gradient-to-br from-orange-950 via-red-950 to-purple-950",
    card: "bg-orange-500/20",
    accent: "bg-orange-400",
  },
  charcoal: {
    bg: "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900",
    card: "bg-zinc-700/40",
    accent: "bg-zinc-500",
  },
  crimsonDark: {
    bg: "bg-gradient-to-br from-neutral-950 via-red-950 to-neutral-950",
    card: "bg-red-900/40",
    accent: "bg-red-600",
  },
  studioLight: {
    bg: "bg-gradient-to-br from-white via-gray-50 to-red-50",
    card: "bg-white border border-gray-200",
    accent: "bg-red-500",
  },
};

function ThemeCard({
  themeName,
  isSelected,
  onSelect,
}: {
  themeName: ThemeName;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { theme } = useTheme();
  const preview = THEME_PREVIEWS[themeName];

  return (
    <CH5Button
      commandSignal={`Theme.${themeName}`}
      feedbackSignal={`Theme.${themeName}_FB`}
      variant="momentary"
      shape="rounded"
      onClick={onSelect}
      offClassName={`${theme.cardBackground} ${theme.cardActiveBackground} ${isSelected ? "ring-2 ring-blue-400" : ""}`}
      onClassName={`${theme.cardBackground} ring-2 ring-blue-400`}
      className="rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 active:scale-[0.97] relative overflow-hidden w-full text-left"
      icon={
        <div className="flex flex-col gap-3 w-full">
          {isSelected && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
              <Check size={14} className="text-white" strokeWidth={3} />
            </div>
          )}
          <div
            className={`${preview.bg} rounded-xl h-20 p-3 flex flex-col justify-between`}
          >
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
          <p className={`${theme.primaryText} font-semibold text-sm`}>
            {THEME_LABELS[themeName]}
          </p>
        </div>
      }
    />
  );
}

function FontCard({
  fontName,
  isSelected,
  onSelect,
}: {
  fontName: FontName;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { theme } = useTheme();
  const fontInfo = APP_FONTS[fontName];

  return (
    <CH5Button
      commandSignal={`Font.${fontName}`}
      feedbackSignal={`Font.${fontName}_FB`}
      variant="momentary"
      shape="rounded"
      onClick={onSelect}
      offClassName={`${theme.cardBackground} ${theme.cardActiveBackground} ${isSelected ? "ring-2 ring-purple-400" : ""}`}
      onClassName={`${theme.cardBackground} ring-2 ring-purple-400`}
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 active:scale-[0.97] relative text-left w-full"
      icon={
        <div
          className="flex flex-col gap-3 w-full"
          style={{ fontFamily: fontInfo.variable }}
        >
          {isSelected && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
              <Check size={14} className="text-white" strokeWidth={3} />
            </div>
          )}
          <p className={`${theme.primaryText} text-4xl font-light`}>Aa</p>
        </div>
      }
    />
  );
}
