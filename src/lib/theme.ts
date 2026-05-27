import { createContext, useContext, useState, createElement, type ReactNode } from "react";

// ============================================
// GLOBAL THEME INTERFACE
// ============================================
export interface AppTheme {
  // Page styling
  pageBackground: string;
  
  // Header styling
  headerBackground: string;
  headerBorder: string;
  
  // Footer styling
  footerBackground: string;
  footerBubbleBackground: string;
  
  // Card styling
  cardBackground: string;
  cardActiveBackground: string;
  masterCardBackground: string;
  
  // Text colors
  primaryText: string;
  secondaryText: string;
  
  // Slider styling
  sliderTrackColor: string;
  sliderBackgroundColor: string;
  sliderColorSettings: "gradient" | "solid";
  sliderThumbType: "circle" | "square" | "diamond";
  sliderSize: "sm" | "md" | "lg" | "xl";
  
  // Button styling
  buttonBackground: string;
  buttonActiveColor: string;
  
  // Icon styling
  iconBackground: string;
  iconColor: string;
  
  // Accent colors
  accentColor: string;
}


export const APP_THEMES = {
  glassDark: {
    pageBackground: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
    headerBackground: "bg-black/20",
    headerBorder: "border-white/10",
    footerBackground: "bg-slate-900/50",
    footerBubbleBackground: "bg-white/10",
    cardBackground: "bg-white/5 backdrop-blur-xl border border-white/10",
    cardActiveBackground: "active:bg-white/15",
    masterCardBackground: "bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20",
    primaryText: "text-white",
    secondaryText: "text-white/60",
    sliderTrackColor: "blue",
    sliderBackgroundColor: "rgba(255,255,255,0.12)",
    sliderColorSettings: "gradient",
    sliderThumbType: "circle",
    sliderSize: "md",
    buttonBackground: "bg-white/10",
    buttonActiveColor: "indigo",
    iconBackground: "bg-white/10",
    iconColor: "text-white",
    accentColor: "blue",
  },
  neonPurple: {
    pageBackground: "bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950",
    headerBackground: "bg-purple-950/40",
    headerBorder: "border-purple-500/20",
    footerBackground: "bg-purple-950/50",
    footerBubbleBackground: "bg-purple-500/20",
    cardBackground: "bg-purple-900/30 backdrop-blur-xl border border-purple-500/20",
    cardActiveBackground: "active:bg-purple-800/50",
    masterCardBackground: "bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-xl border border-pink-500/30",
    primaryText: "text-white",
    secondaryText: "text-purple-200/70",
    sliderTrackColor: "purple",
    sliderBackgroundColor: "rgba(168,85,247,0.18)",
    sliderColorSettings: "gradient",
    sliderThumbType: "circle",
    sliderSize: "md",
    buttonBackground: "bg-purple-500/20",
    buttonActiveColor: "purple",
    iconBackground: "bg-purple-500/20",
    iconColor: "text-purple-200",
    accentColor: "purple",
  },
  minimal: {
    pageBackground: "bg-gradient-to-br from-slate-50 to-slate-200",
    headerBackground: "bg-white/80",
    headerBorder: "border-slate-200",
    footerBackground: "bg-white/80",
    footerBubbleBackground: "bg-slate-100",
    cardBackground: "bg-white border border-slate-200 shadow-sm",
    cardActiveBackground: "active:bg-slate-100",
    masterCardBackground: "bg-white border border-slate-300 shadow-md",
    primaryText: "text-slate-900",
    secondaryText: "text-slate-500",
    sliderTrackColor: "slate",
    sliderBackgroundColor: "#ffffff",
    sliderColorSettings: "solid",
    sliderThumbType: "circle",
    sliderSize: "md",
    buttonBackground: "bg-slate-200",
    buttonActiveColor: "blue",
    iconBackground: "bg-slate-300",
    iconColor: "text-slate-700",
    accentColor: "blue",
  },
  oceanBlue: {
    pageBackground: "bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-900",
    headerBackground: "bg-cyan-950/40",
    headerBorder: "border-cyan-500/20",
    footerBackground: "bg-blue-950/50",
    footerBubbleBackground: "bg-cyan-500/20",
    cardBackground: "bg-cyan-900/20 backdrop-blur-xl border border-cyan-500/20",
    cardActiveBackground: "active:bg-cyan-800/40",
    masterCardBackground: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/30",
    primaryText: "text-white",
    secondaryText: "text-cyan-200/70",
    sliderTrackColor: "cyan",
    sliderBackgroundColor: "rgba(34,211,238,0.16)",
    sliderColorSettings: "gradient",
    sliderThumbType: "circle",
    sliderSize: "md",
    buttonBackground: "bg-cyan-500/20",
    buttonActiveColor: "cyan",
    iconBackground: "bg-cyan-500/20",
    iconColor: "text-cyan-200",
    accentColor: "cyan",
  },
  sunset: {
    pageBackground: "bg-gradient-to-br from-orange-950 via-red-950 to-purple-950",
    headerBackground: "bg-orange-950/40",
    headerBorder: "border-orange-500/20",
    footerBackground: "bg-red-950/50",
    footerBubbleBackground: "bg-orange-500/20",
    cardBackground: "bg-orange-900/20 backdrop-blur-xl border border-orange-500/20",
    cardActiveBackground: "active:bg-orange-800/40",
    masterCardBackground: "bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-400/30",
    primaryText: "text-white",
    secondaryText: "text-orange-200/70",
    sliderTrackColor: "orange",
    sliderBackgroundColor: "rgba(249,115,22,0.18)",
    sliderColorSettings: "gradient",
    sliderThumbType: "circle",
    sliderSize: "md",
    buttonBackground: "bg-orange-500/20",
    buttonActiveColor: "orange",
    iconBackground: "bg-orange-500/20",
    iconColor: "text-orange-200",
    accentColor: "orange",
  },
  forestGreen: {
    pageBackground: "bg-gradient-to-br from-emerald-950 via-green-950 to-slate-900",
    headerBackground: "bg-emerald-950/40",
    headerBorder: "border-emerald-500/20",
    footerBackground: "bg-green-950/50",
    footerBubbleBackground: "bg-emerald-500/20",
    cardBackground: "bg-emerald-900/20 backdrop-blur-xl border border-emerald-500/20",
    cardActiveBackground: "active:bg-emerald-800/40",
    masterCardBackground: "bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-xl border border-emerald-400/30",
    primaryText: "text-white",
    secondaryText: "text-emerald-200/70",
    sliderTrackColor: "emerald",
    sliderBackgroundColor: "rgba(16,185,129,0.18)",
    sliderColorSettings: "gradient",
    sliderThumbType: "circle",
    sliderSize: "md",
    buttonBackground: "bg-emerald-500/20",
    buttonActiveColor: "emerald",
    iconBackground: "bg-emerald-500/20",
    iconColor: "text-emerald-200",
    accentColor: "emerald",
  },
} satisfies Record<string, AppTheme>;

export type ThemeName = keyof typeof APP_THEMES;

// ============================================
// CONTEXT
// ============================================
interface ThemeContextValue {
  theme: AppTheme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  setCustomTheme: (theme: AppTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({
  children,
  defaultTheme = "minimal",
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [customTheme, setCustomThemeState] = useState<AppTheme | null>(null);

  const theme = customTheme || APP_THEMES[themeName];

  const setTheme = (newThemeName: ThemeName) => {
    setThemeName(newThemeName);
    setCustomThemeState(null);
  };

  const setCustomTheme = (newTheme: AppTheme) => {
    setCustomThemeState(newTheme);
  };

  return createElement(
    ThemeContext.Provider,
    { value: { theme, themeName, setTheme, setCustomTheme } },
    children
  );
}

// ============================================
// HOOK
// ============================================
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}