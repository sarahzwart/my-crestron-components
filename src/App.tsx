import { useState } from "react";
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
import { AUDIO_CONTROLS } from "./config/audio.config";
import { SOURCES, DESTINATIONS } from "./config/routing.config";
import { APPS } from "./config/apps.config";
import { Home, Settings, Power } from "lucide-react";
import { CameraPage } from "./pages/CameraPage";
import { AppleTVPage } from "./pages/AppleTVPage";

type Page = "home" | "audio" | "call" | "routing" | "settings" | "lights" | "camera" | "appleTV";

function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            apps={APPS}
            onNavigate={(id) => setCurrentPage(id as Page)}
          />
        );
      case "audio":
        return <AudioPage volumeControls={AUDIO_CONTROLS} />;
      case "call":
        return <AudioCallPage />;
      case "routing":
        return (
          <RoutingPage
            sources={SOURCES}
            destinations={DESTINATIONS}
          />
        );
      case "settings":
        return <SettingsPage />;
      case "lights":
        return <LightsPage />;
      case "camera":
        return <CameraPage />;
      case "appleTV":
        return <AppleTVPage />;
    }
  };

  return (
    // w-screen h-screen overflow-hidden — fills the panel exactly, no scrollbars
    <div className={`flex flex-col w-screen h-screen overflow-hidden ${theme.pageBackground}`}>
      {/* Header */}
      <CH5Header
        leftButtons={
          <CH5Button
            commandSignal="nav.home"
            feedbackSignal="nav.home.fb"
            variant="momentary"
            shape="circle"
            // rem strings scale with the fluid root font-size
            width="3rem"
            height="3rem"
            icon={<Home />}
            iconSize={20}
            onClick={() => setCurrentPage("home")}
          />
        }
        backgroundColor={theme.headerBackground}
        textColor={theme.primaryText}
        className={`backdrop-blur-xl border-b ${theme.headerBorder}`}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden min-h-0">
        {renderPage()}
      </main>

      {/* Footer */}
      <CH5Footer
        volumeWidth={500}
        volumePosition="left"
        volumeColor={theme.sliderTrackColor}
        backgroundColor="bg-transparent"
        bubbleBackground={theme.footerBubbleBackground}
        // rem string so footer height scales with the panel
        height="5.625rem"
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
              width="3rem"
              height="3rem"
              icon={<Power />}
              iconSize={20}
            />
            <CH5Button
              commandSignal="nav.settings"
              feedbackSignal="nav.settings.fb"
              variant="momentary"
              shape="circle"
              width="3rem"
              height="3rem"
              icon={<Settings />}
              iconSize={20}
              onClick={() => setCurrentPage(
                currentPage === "settings" ? "home" : "settings"
              )}
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