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
import { AUDIO_CONTROLS } from "./config/audio.config";
import { SOURCES, DESTINATIONS } from "./config/routing.config";
import { APPS } from "./config/apps.config";
import { Home, Settings, Power } from "lucide-react";
import { LightsPage } from "./pages/LightsPage";

type Page = "home" | "audio" | "call" | "routing" | "settings" | "lights";

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
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.pageBackground}`}>
      {/* Header - Home button top left only */}
      <CH5Header
        leftButtons={
          <button
            onClick={() => setCurrentPage("home")}
            className={`
              w-13.5 h-13.5 rounded-full
              ${currentPage === "home" 
                ? theme.masterCardBackground 
                : theme.buttonBackground}
              ${theme.iconColor}
              flex items-center justify-center
              active:scale-90 transition-all duration-150
            `}
          >
            <Home size={24} />
          </button>
        }
        backgroundColor={theme.headerBackground}
        textColor={theme.primaryText}
        className={`backdrop-blur-xl border-b ${theme.headerBorder}`}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>

      {/* Footer - Volume center, Power & Settings bottom right */}
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
            width={40}
            height={40}
            iconSize={20}
          />
        }
        mutePosition="left"
        rightButtons={
          <div className="flex items-center gap-3">
            {/* Power Button */}
            <CH5Button
              commandSignal="system.power"
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Power />}
              iconSize={20}
              className={theme.buttonBackground}
              iconColorClass={theme.iconColor}
              glow={false}
            />

            {/* Settings Button */}
            <button
              onClick={() => setCurrentPage(
                currentPage === "settings" ? "home" : "settings"
              )}
              className={`
                w-12 h-12 rounded-full
                ${currentPage === "settings"
                  ? theme.masterCardBackground
                  : theme.buttonBackground}
                ${theme.iconColor}
                flex items-center justify-center
                active:scale-90 transition-all duration-150
              `}
            >
              <Settings size={20} />
            </button>
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