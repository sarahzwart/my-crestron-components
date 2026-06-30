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
import {
  NAVPAGE_FEEDBACK,
  SIGNALS_NAVPAGE,
  SIGNALS_NAV_PRESS,
  SIGNALS_AUDIO,
  SIGNALS_SYSTEM,
} from "./config/signals";
import { Home, Settings, Power } from "lucide-react";
import ch5Service from "./services/ch5Service";
import { OverviewPage } from "./pages/OverviewPage";
import { MusicPlayerPage } from "./pages/MusicPlayerPage";

type Page =
  | "home"
  | "overview"
  | "audio"
  | "call"
  | "routing"
  | "settings"
  | "lights"
  | "camera"
  | "appleTV"
  | "music";

function useActivePage(): [Page, (page: Page) => void] {
  const [activePage, setActivePage] = useState<Page>("home");

  useEffect(() => {
    const pages = Object.keys(NAVPAGE_FEEDBACK) as Page[];

    pages.forEach((page) => {
      ch5Service.subscribeBool(
        NAVPAGE_FEEDBACK[page],
        (isActive: boolean) => {
          if (isActive) setActivePage(page);
        },
      );
    });

    return () => {
      pages.forEach((page) => {
        ch5Service.unsubscribe(NAVPAGE_FEEDBACK[page]);
      });
    };
  }, []);

  return [activePage, setActivePage];
}

function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useActivePage();

  const navigate = (page: Page) => {
    setCurrentPage(page);
    ch5Service.publishBool(SIGNALS_NAVPAGE[page].cmd, true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage apps={APPS} onNavigate={(id) => navigate(id as Page)} />;
      case "audio":
        return <AudioPage volumeControls={AUDIO_CONTROLS} />;
      case "call":
        return <AudioCallPage />;
      case "routing":
        return <RoutingPage sources={SOURCES} destinations={DESTINATIONS} />;
      case "lights":
        return <LightsPage />;
      case "camera":
        return <CameraPage />;
      case "appleTV":
        return <AppleTVPage />;
      case "overview":
        return <OverviewPage/>;
      case "settings":
        return <SettingsPage />;
      case "music":
        return <MusicPlayerPage idle={false} trackName={""} artistName={""} albumName={""}/>
      
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.pageBackground}`}>
      <CH5Header
        leftButtons={
          <CH5Button
            commandSignal={SIGNALS_NAV_PRESS.home}
            feedbackSignal={SIGNALS_NAVPAGE.home.fb}
            variant="momentary"
            shape="circle"
            width={48}
            height={48}
            icon={<Home />}
            iconSize={20}
            onClick={() => navigate("home")}
          />
        }
        backgroundColor={theme.headerBackground}
        textColor={theme.primaryText}
        className={`backdrop-blur-xl border-b ${theme.headerBorder}`}
      />

      <main className="flex-1 overflow-hidden">{renderPage()}</main>

      <CH5Footer
        volumeWidth={500}
        volumePosition="left"
        volumeColor={theme.sliderTrackColor}
        backgroundColor="bg-transparent"
        bubbleBackground={theme.footerBubbleBackground}
        height={90}
        page={currentPage}
        muteButton={
          <CH5MuteButton
            commandSignal={SIGNALS_AUDIO.footerMute.cmd}
            feedbackSignal={SIGNALS_AUDIO.footerMute.fb}
            width={48}
            height={48}
            iconSize={20}
          />
        }
        mutePosition="left"
        rightButtons={
          <div className="flex items-center gap-3">
            <CH5Button
              commandSignal={SIGNALS_SYSTEM.power.cmd}
              feedbackSignal={SIGNALS_SYSTEM.power.fb}
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Power />}
              iconSize={20}
              onClick={() => navigate("loading")}
            />
            <CH5Button
              commandSignal={SIGNALS_NAV_PRESS.settings}
              feedbackSignal={SIGNALS_NAVPAGE.settings.fb}
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Settings />}
              iconSize={20}
              onClick={() => navigate("settings")}
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
