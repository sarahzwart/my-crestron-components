import { useEffect, useState } from "react";
import { CH5Provider } from "./contexts/CH5Context";
import { ThemeProvider, useTheme } from "./lib/theme";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";
import { CH5Button } from "./components/lib/common/CH5Button";
import { CH5MuteButton } from "./components/lib/volume/CH5MuteButton";
import { HomePage } from "./pages/HomePage";
import { AudioPage } from "./pages/AudioPage";
import { AudioCallPage } from "./pages/AudioCallPage";
import { RoutingPage } from "./pages/RoutingPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LightsPage } from "./pages/LightsPage";
import { CameraPage } from "./pages/CameraPage";
import { AppleTVPage } from "./pages/AppleTVPage";
import { AUDIO_CONTROLS } from "./config/audio.config";
import { SOURCES, DESTINATIONS } from "./config/routing.config";
import { APPS } from "./config/apps.config";
import { Home, Settings, Power } from "lucide-react";
import ch5Service from "./services/ch5Service";

type Page = "home" | "audio" | "call" | "routing" | "settings" | "lights" | "camera" | "appleTV";

// One feedback signal per page — processor sets exactly one true at a time
const PAGE_FEEDBACK_SIGNALS: Record<Page, string> = {
  home:     "nav.page.home.fb",
  audio:    "nav.page.audio.fb",
  call:     "nav.page.call.fb",
  routing:  "nav.page.routing.fb",
  settings: "nav.page.settings.fb",
  lights:   "nav.page.lights.fb",
  camera:   "nav.page.camera.fb",
  appleTV:  "nav.page.appleTV.fb",
};

function useActivePage(): Page {
  const [activePage, setActivePage] = useState<Page>("home");

  useEffect(() => {
    const pages = Object.keys(PAGE_FEEDBACK_SIGNALS) as Page[];

    pages.forEach((page) => {
      ch5Service.subscribeBool(PAGE_FEEDBACK_SIGNALS[page], (isActive: boolean) => {
        if (isActive) setActivePage(page);
      });
    });

    return () => {
      pages.forEach((page) => {
        ch5Service.unsubscribe(PAGE_FEEDBACK_SIGNALS[page]);
      });
    };
  }, []);

  return activePage;
}

function AppContent() {
  const { theme } = useTheme();
  const currentPage = useActivePage();

  const renderPage = () => {
    switch (currentPage) {
      case "home":     return <HomePage apps={APPS} onNavigate={() => {}} />;
      case "audio":    return <AudioPage volumeControls={AUDIO_CONTROLS} />;
      case "call":     return <AudioCallPage />;
      case "routing":  return <RoutingPage sources={SOURCES} destinations={DESTINATIONS} />;
      case "settings": return <SettingsPage />;
      case "lights":   return <LightsPage />;
      case "camera":   return <CameraPage />;
      case "appleTV":  return <AppleTVPage />;
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.pageBackground}`}>
      <CH5Header
        leftButtons={
          <CH5Button
            commandSignal="nav.home"
            feedbackSignal="nav.page.home.fb"
            variant="momentary"
            shape="circle"
            width={48}
            height={48}
            icon={<Home />}
            iconSize={20}
          />
        }
        backgroundColor={theme.headerBackground}
        textColor={theme.primaryText}
        className={`backdrop-blur-xl border-b ${theme.headerBorder}`}
      />

      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>

      <CH5Footer
        volumeWidth={500}
        volumePosition="left"
        volumeColor={theme.sliderTrackColor}
        backgroundColor="bg-transparent"
        bubbleBackground={theme.footerBubbleBackground}
        height={90}
        muteButton={
          <CH5MuteButton
            commandSignal="audio.mute"
            feedbackSignal="audio.mute.fb"
            width={48}
            height={48}
            iconSize={20}
          />
        }
        mutePosition="left"
        rightButtons={
          <div className="flex items-center gap-3">
            <CH5Button
              commandSignal="system.power"
              feedbackSignal="system.power.fb"
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Power />}
              iconSize={20}
            />
            <CH5Button
              commandSignal="nav.settings"
              feedbackSignal="nav.page.settings.fb"
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Settings />}
              iconSize={20}
            />
          </div>
        }
        className="backdrop-blur-xl"
      />
    </div>
  );
}

function App() {
  return (
    <CH5Provider>
      <ThemeProvider defaultTheme="glassDark" defaultFont="quicksand">
        <AppContent />
      </ThemeProvider>
    </CH5Provider>
  );
}

export default App;