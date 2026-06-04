import { createContext, useContext, useState, createElement, type ReactNode, useEffect } from "react";

export interface AppFont {
  name: string;
  label: string;
  variable: string;
}

export const APP_FONTS: Record<string, AppFont> = {
  quicksand: {
    name: "Quicksand",
    label: "Quicksand",
    variable: "var(--font-quicksand)",
  },
  roboto: {
    name: "Roboto Flex",
    label: "Roboto Flex",
    variable: "var(--font-roboto)",
  },
  system: {
    name: "system-ui",
    label: "System Default",
    variable: "system-ui, sans-serif",
  },
};

export type FontName = keyof typeof APP_FONTS;

export interface AppTheme {
  // Page
  pageBackground: string;

  // Header / Footer chrome
  headerBackground: string;
  headerBorder: string;
  footerBubbleBackground: string;

  // Cards
  cardBackground: string;
  cardActiveBackground: string;
  cardHighlightBackground: string;

  // Text
  primaryText: string;
  secondaryText: string;

  // Buttons
  buttonBackground: string;
  buttonActiveBackground: string;
  buttonText: string;
  buttonActiveText: string;

  // Icons
  iconColor: string;
  iconBackground: string;

  // Slider
  sliderTrackColor: string;
  sliderColorSettings: "gradient" | "solid";
  sliderThumbType: "circle" | "square" | "diamond";
  sliderSize: "sm" | "md" | "lg" | "xl";

  // Accent
  accentColor: string;

  // OK button (AppleTV page)
  okBackground: string;
  okBackgroundActive: string;
}

export const APP_THEMES = {
  glassDark: {
    pageBackground:          "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
    headerBackground:        "bg-black/20",
    headerBorder:            "border-white/10",
    footerBubbleBackground:  "bg-white/10",
    cardBackground:          "bg-white/5 backdrop-blur-xl border border-white/10",
    cardActiveBackground:    "active:bg-white/15",
    cardHighlightBackground: "bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20",
    primaryText:             "text-white",
    secondaryText:           "text-white/60",
    buttonBackground:        "bg-white/10",
    buttonActiveBackground:  "bg-white/30",
    buttonText:              "text-white/80",
    buttonActiveText:        "text-white",
    iconColor:               "text-white/80",
    iconBackground:          "bg-white/10",
    sliderTrackColor:        "blue",
    sliderColorSettings:     "gradient",
    sliderThumbType:         "circle",
    sliderSize:              "md",
    accentColor:             "blue",
    okBackground:            "bg-slate-800",
    okBackgroundActive:      "bg-white/30",
  },

  neonPurple: {
    pageBackground:          "bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950",
    headerBackground:        "bg-purple-950/40",
    headerBorder:            "border-purple-500/20",
    footerBubbleBackground:  "bg-purple-500/20",
    cardBackground:          "bg-purple-900/30 backdrop-blur-xl border border-purple-500/20",
    cardActiveBackground:    "active:bg-purple-800/50",
    cardHighlightBackground: "bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-xl border border-pink-500/30",
    primaryText:             "text-white",
    secondaryText:           "text-purple-200/70",
    buttonBackground:        "bg-purple-500/20",
    buttonActiveBackground:  "bg-purple-400/50",
    buttonText:              "text-purple-100",
    buttonActiveText:        "text-white",
    iconColor:               "text-purple-100",
    iconBackground:          "bg-purple-500/20",
    sliderTrackColor:        "purple",
    sliderColorSettings:     "gradient",
    sliderThumbType:         "circle",
    sliderSize:              "md",
    accentColor:             "purple",
    okBackground:            "bg-purple-900",
    okBackgroundActive:      "bg-purple-400/50",
  },

  minimal: {
    pageBackground:          "bg-gradient-to-br from-slate-50 to-slate-200",
    headerBackground:        "bg-white/80",
    headerBorder:            "border-slate-200",
    footerBubbleBackground:  "bg-slate-100",
    cardBackground:          "bg-white border border-slate-200 shadow-sm",
    cardActiveBackground:    "active:bg-slate-100",
    cardHighlightBackground: "bg-white border border-slate-300 shadow-md",
    primaryText:             "text-slate-900",
    secondaryText:           "text-slate-500",
    buttonBackground:        "bg-slate-200",
    buttonActiveBackground:  "bg-slate-800",
    buttonText:              "text-slate-700",
    buttonActiveText:        "text-white",
    iconColor:               "text-slate-600",
    iconBackground:          "bg-slate-100",
    sliderTrackColor:        "slate",
    sliderColorSettings:     "solid",
    sliderThumbType:         "circle",
    sliderSize:              "md",
    accentColor:             "blue",
    okBackground:            "bg-slate-300",
    okBackgroundActive:      "bg-slate-600",
  },

  oceanBlue: {
    pageBackground:          "bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-900",
    headerBackground:        "bg-cyan-950/40",
    headerBorder:            "border-cyan-500/20",
    footerBubbleBackground:  "bg-cyan-500/20",
    cardBackground:          "bg-cyan-900/20 backdrop-blur-xl border border-cyan-500/20",
    cardActiveBackground:    "active:bg-cyan-800/40",
    cardHighlightBackground: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30",
    primaryText:             "text-white",
    secondaryText:           "text-cyan-200/70",
    buttonBackground:        "bg-cyan-500/20",
    buttonActiveBackground:  "bg-cyan-400/50",
    buttonText:              "text-cyan-100",
    buttonActiveText:        "text-white",
    iconColor:               "text-cyan-100",
    iconBackground:          "bg-cyan-500/20",
    sliderTrackColor:        "cyan",
    sliderColorSettings:     "gradient",
    sliderThumbType:         "circle",
    sliderSize:              "md",
    accentColor:             "cyan",
    okBackground:            "bg-cyan-700",
    okBackgroundActive:      "bg-cyan-400/60",
  },

  sunset: {
    pageBackground:          "bg-gradient-to-br from-orange-950 via-red-950 to-purple-950",
    headerBackground:        "bg-orange-950/40",
    headerBorder:            "border-orange-500/20",
    footerBubbleBackground:  "bg-orange-500/20",
    cardBackground:          "bg-orange-900/20 backdrop-blur-xl border border-orange-500/20",
    cardActiveBackground:    "active:bg-orange-800/40",
    cardHighlightBackground: "bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-400/30",
    primaryText:             "text-white",
    secondaryText:           "text-orange-200/70",
    buttonBackground:        "bg-orange-500/20",
    buttonActiveBackground:  "bg-orange-400/50",
    buttonText:              "text-orange-100",
    buttonActiveText:        "text-white",
    iconColor:               "text-orange-100",
    iconBackground:          "bg-orange-500/20",
    sliderTrackColor:        "orange",
    sliderColorSettings:     "gradient",
    sliderThumbType:         "circle",
    sliderSize:              "md",
    accentColor:             "orange",
    okBackground:            "bg-red-950",
    okBackgroundActive:      "bg-orange-400/50",
  },

  charcoal: {
    pageBackground:          "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900",
    headerBackground:        "bg-zinc-900/40",
    headerBorder:            "border-zinc-700/30",
    footerBubbleBackground:  "bg-zinc-700/30",
    cardBackground:          "bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/30",
    cardActiveBackground:    "active:bg-zinc-700/50",
    cardHighlightBackground: "bg-gradient-to-br from-zinc-700/40 to-zinc-600/40 backdrop-blur-xl border border-zinc-600/30",
    primaryText:             "text-zinc-100",
    secondaryText:           "text-zinc-400",
    buttonBackground:        "bg-zinc-700/40",
    buttonActiveBackground:  "bg-zinc-500/60",
    buttonText:              "text-zinc-100",
    buttonActiveText:        "text-white",
    iconColor:               "text-zinc-300",
    iconBackground:          "bg-zinc-700/40",
    sliderTrackColor:        "zinc",
    sliderColorSettings:     "gradient",
    sliderThumbType:         "circle",
    sliderSize:              "md",
    accentColor:             "zinc",
    okBackground:            "bg-zinc-700",
    okBackgroundActive:      "bg-zinc-500/60",
  },
} satisfies Record<string, AppTheme>;

export type ThemeName = keyof typeof APP_THEMES;

interface ThemeContextValue {
  theme: AppTheme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  setCustomTheme: (theme: AppTheme) => void;
  font: AppFont;
  fontName: FontName;
  setFont: (fontName: FontName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  defaultFont?: FontName;
}

export function ThemeProvider({
  children,
  defaultTheme = "glassDark",
  defaultFont = "quicksand",
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [customTheme, setCustomThemeState] = useState<AppTheme | null>(null);
  const [fontName, setFontName] = useState<FontName>(defaultFont);

  const theme = customTheme || APP_THEMES[themeName];
  const font = APP_FONTS[fontName];

  const setTheme = (newThemeName: ThemeName) => {
    setThemeName(newThemeName);
    setCustomThemeState(null);
  };

  const setCustomTheme = (newTheme: AppTheme) => {
    setCustomThemeState(newTheme);
  };

  const setFont = (newFontName: FontName) => {
    setFontName(newFontName);
    document.body.style.fontFamily = APP_FONTS[newFontName].variable;
  };

  useEffect(() => {
    document.body.style.fontFamily = font.variable;
  }, []);

  return createElement(
    ThemeContext.Provider,
    { value: { theme, themeName, setTheme, setCustomTheme, font, fontName, setFont } },
    children
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}