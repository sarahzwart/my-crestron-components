import { useEffect, useState } from "react";
import { CH5Provider } from "./contexts/CH5Context";
import { ThemeProvider, useTheme } from "./lib/theme";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";
import { CH5Button } from "./components/ch5/common/CH5Button";
import { CH5MuteButton } from "./components/ch5/volume/CH5MuteButton";
import { HomePage } from "./pages/HomePage";
import { AudioPage } from "./pages/AudioPage";
import { AudioCallPage } from "./pages/AudioCallPage";
import { RoutingPage } from "./pages/RoutingPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LightsPage } from "./pages/LightsPage";
import { AppleTVPage } from "./pages/AppleTVPage";
import { AUDIO_CONTROLS } from "./config/audio.config";
import { SOURCES, DESTINATIONS } from "./config/routing.config";
import { APPS } from "./config/apps.config";
import {signals} from "./config/signals";
import { Home, Settings, Power } from "lucide-react";
import ch5Service from "./services/ch5Service";
import { OverviewPage } from "./pages/OverviewPage";
import { MusicPlayerPage } from "./pages/MusicPlayerPage";
import { LoadingPage } from "./pages/LoadingPage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";

type Page = "page0"
  | "page1"
  | "page2"
  | "page3"
  | "page4"
  | "page5"
  | "page6"
  | "page7"
  | "page8"
  | "page9"
  | "tab0"
  | "tab1"
  | "tab2";

function useActivePage(): [Page, (page: Page) => void] {
  const [activePage, setActivePage] = useState<Page>("page0");

  useEffect(() => {
    const pages = Object.keys(
      signals.navigation,
    ) as (keyof typeof signals.navigation)[];

    const subscriptionIds = pages.map((page) =>
      ch5Service.subscribeBool(
        NAVPAGE_FEEDBACK[page],
        (isActive: boolean) => {
          if (isActive) setActivePage(page);
        },
      ),
    );

    return () => {
      pages.forEach((page, i) => {
        ch5Service.unsubscribe(NAVPAGE_FEEDBACK[page], subscriptionIds[i]);
      });
    };
  }, []);

  return [activePage, setActivePage];
}

const AppContent = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useActivePage();
  const [showPowerDialog, setShowPowerDialog] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    if (page !== "page9")
      ch5Service.publishBool(signals.navigation[page].cmd, true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "page0":
        return (
          <HomePage apps={APPS} onNavigate={(id) => navigate(id as Page)} />
        );
      case "page1":
        return <AudioPage volumeControls={AUDIO_CONTROLS} />;
      case "page2":
        return <AudioCallPage />;
      case "page3":
        return <RoutingPage sources={SOURCES} destinations={DESTINATIONS} />;
      case "page4":
        return <LightsPage />;
      case "page5":
        return <AppleTVPage />;
      case "page6":
        return <OverviewPage />;
      case "page7":
        return <SettingsPage />;
      case "page8":
        return (
          <MusicPlayerPage
            idle={false}
            trackName={""}
            artistName={""}
            albumName={""}
          />
        );
      case "page9":
        return (
          <LoadingPage
            commandSignal={false}
            feedbackSignal={false}
            loadingType="tailChase"
            loadingComponentFillColor="white"
            textUnderLoadingComponent="Starting Up"
          />
        );
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme.pageBackground}`}>
      <CH5Header
        leftButtons={
          <CH5Button
            commandSignal={signals.navigation.page0.cmd}
            feedbackSignal={signals.navigation.page0.fb}
            variant="momentary"
            shape="circle"
            width={48}
            height={48}
            icon={<Home />}
            iconSize={20}
            onClick={() => navigate("page0")}
          />
        }
        backgroundColor={theme.headerBackground}
        textColor={theme.primaryText}
        className={`backdrop-blur-xl border-b ${theme.headerBorder}`}
      />

      <main className="flex-1 overflow-hidden">{renderPage()}</main>

      <Dialog open={showPowerDialog} onOpenChange={setShowPowerDialog}>
        <DialogContent
          showCloseButton={false}
          className={`${theme.cardBackground} ${theme.primaryText} sm:max-w-md p-6`}
        >
          <DialogHeader>
            <DialogTitle className={`${theme.primaryText} text-lg`}>
              Shut Down
            </DialogTitle>
            <DialogDescription className={`${theme.secondaryText} text-base`}>
              Are you sure you want to shut down the system?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                size="lg"
                className={`${theme.buttonBackground} ${theme.primaryText}`}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              size="lg"
              onClick={() => {
                ch5Service.publishBool(signals.system.power.cmd, true);
                setShowPowerDialog(false);
              }}
            >
              Shut Down
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            commandSignal={signals.audio.volume0.mute.cmd}
            feedbackSignal={signals.audio.volume0.mute.fb}
            width={48}
            height={48}
            iconSize={20}
          />
        }
        mutePosition="left"
        rightButtons={
          <div className="flex items-center gap-3">
            <CH5Button
              commandSignal={signals.system.power.cmd}
              feedbackSignal={signals.system.power.fb}
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Power />}
              iconSize={20}
              onClick={() => setShowPowerDialog(true)}
            />
            <CH5Button
              commandSignal={signals.navigation.page8.cmd}
              feedbackSignal={signals.navigation.page8.fb}
              variant="momentary"
              shape="circle"
              width={48}
              height={48}
              icon={<Settings />}
              iconSize={20}
              onClick={() => navigate("page7")}
            />
          </div>
        }
        className="backdrop-blur-xl"
      />
    </div>
  );
};

const App = () => {
  return (
    <CH5Provider>
      <ThemeProvider defaultTheme="glassDark" defaultFont="quicksand">
        <AppContent />
      </ThemeProvider>
    </CH5Provider>
  );
};

export default App;
