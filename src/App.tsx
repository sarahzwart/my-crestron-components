import { useState } from "react";
import { CH5Provider } from "./contexts/CH5Context";
import { ThemeProvider, useTheme } from "./lib/theme";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";
import { CH5Button } from "./components/lib/common/CH5Button";
import { CH5MuteButton } from "./components/lib/volume/CH5MuteButton";
import { AudioPage } from "./pages/AudioPage";
import { AudioCallPage } from "./pages/AudioCallPage";
import { RoutingPage } from "./pages/RoutingPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AUDIO_CONTROLS } from "./config/audio.config";
import { SOURCES, DESTINATIONS } from "./config/routing.config";
import { Home, Settings, VolumeX, Power, Music, Phone, Shuffle } from "lucide-react";
import { useCH5Boolean } from "./hooks/useCH5Boolean";

// ============================================
// PAGE TYPES
// ============================================
type Page = "audio" | "call" | "routing" | "settings";

// ============================================
// NAV BUTTON - sends signal AND switches page
// ============================================
interface NavButtonProps {
  commandSignal: string;
  feedbackSignal: string;
  icon: React.ReactNode;
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function NavButton({ 
  commandSignal, 
  feedbackSignal, 
  icon, 
  page, 
  currentPage, 
  onNavigate 
}: NavButtonProps) {
  const { theme } = useTheme();
  const isActive = currentPage === page;

  return (
    <CH5Button
      commandSignal={commandSignal}
      feedbackSignal={feedbackSignal}
      variant="momentary"
      shape="circle"
      width={54}
      height={54}
      icon={icon}
      iconSize={22}
      className={isActive ? theme.masterCardBackground : theme.buttonBackground}
      iconColorClass={theme.iconColor}
      glow={false}
      onClick={() => onNavigate(page)}
    />
  );
}

// ============================================
// APP CONTENT
// ============================================
function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>("audio");

  // Listen to feedback signals from the control system
  // These let the control system push page changes to the UI
  const [audioPageFb] = useCH5Boolean("nav.page.audio.fb", "nav.page.audio.fb", false);
  const [callPageFb] = useCH5Boolean("nav.page.call.fb", "nav.page.call.fb", false);
  const [routingPageFb] = useCH5Boolean("nav.page.routing.fb", "nav.page.routing.fb", false);
  const [settingsPageFb] = useCH5Boolean("nav.page.settings.fb", "nav.page.settings.fb", false);

  // Control system can push page changes via feedback
  if (audioPageFb && currentPage !== "audio") setCurrentPage("audio");
  if (callPageFb && currentPage !== "call") setCurrentPage("call");
  if (routingPageFb && currentPage !== "routing") setCurrentPage("routing");
  if (settingsPageFb && currentPage !== "settings") setCurrentPage("settings");

  const renderPage = () => {
    switch (currentPage) {
      case "audio":
        return <AudioPage volumeControls={AUDIO_CONTROLS} />;
      case "call":
        return <AudioCallPage />;
      case "routing":
        return <RoutingPage sources={SOURCES} destinations={DESTINATIONS} />;
      case "settings":
        return <SettingsPage />;
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.pageBackground}`}>
      <CH5Header
        leftButtons={
          <div className="flex items-center gap-2">
            <NavButton
              commandSignal="nav.page.audio"
              feedbackSignal="nav.page.audio.fb"
              icon={<Music />}
              page="audio"
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
            <NavButton
              commandSignal="nav.page.call"
              feedbackSignal="nav.page.call.fb"
              icon={<Phone />}
              page="call"
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
            <NavButton
              commandSignal="nav.page.routing"
              feedbackSignal="nav.page.routing.fb"
              icon={<Shuffle />}
              page="routing"
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
            <NavButton
              commandSignal="nav.page.settings"
              feedbackSignal="nav.page.settings.fb"
              icon={<Settings />}
              page="settings"
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
          </div>
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
        volumePosition="center"
        volumeColor={theme.sliderTrackColor}
        backgroundColor={theme.footerBackground}
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
        leftButtons={
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
        }
        rightButtons={
          <CH5Button
            commandSignal="nav.home"
            variant="momentary"
            shape="circle"
            width={56}
            height={56}
            icon={<Home />}
            iconSize={32}
            className={theme.buttonBackground}
            iconColorClass={theme.iconColor}
            glow={false}
            onClick={() => setCurrentPage("audio")}
          />
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