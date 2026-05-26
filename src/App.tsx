import { CH5Provider } from "./contexts/CH5Context";
import { ThemeProvider, useTheme } from "./lib/theme";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";
import { CH5Button } from "./components/lib/CH5Button";
import { CH5MuteButton } from "./components/lib/CH5MuteButton";
import { AudioPage } from "./pages/AudioPage";
import { AUDIO_CONTROLS } from "./config/audio.config";
import { Home, Settings, Power } from "lucide-react";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col h-screen ${theme.pageBackground}`}>
      <CH5Header
        leftButtons={
          <CH5Button
            commandSignal="nav.settings"
            variant="momentary"
            shape="circle"
            width={54}
            height={54}
            icon={<Settings size={24} />}
            className={theme.buttonBackground}
            iconColorClass={theme.iconColor}
            glow={false}
          />
        }
        backgroundColor={theme.headerBackground}
        textColor={theme.primaryText}
        className={`backdrop-blur-xl border-b ${theme.headerBorder}`}
      />

      <main className="flex-1 overflow-auto">
        <AudioPage volumeControls={AUDIO_CONTROLS} />
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
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </CH5Provider>
  );
}

export default App;