import { CH5Provider } from "./contexts/CH5Context";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";
import { CH5Button } from "./components/lib/CH5Button";
import { LightsPage } from "./pages/LightsPage";

function App() {
  return (
    <CH5Provider>
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header - Global */}
        <CH5Header 
          logo="🏢"
          leftButtons={
            <>
              <CH5Button
                commandSignal="nav.home"
                feedbackSignal="nav.home.fb"
                icon="🏠"
                variant="momentary"
                size="md"
                width={60}
                height={60}
                inactiveClass="slate"
                glow={false}
              />
              <CH5Button
                commandSignal="settings"
                feedbackSignal="settings.fb"
                icon="⚙️"
                variant="momentary"
                size="md"
                width={60}
                height={60}
                inactiveClass="slate"
                glow={false}
              />
            </>
          }
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <LightsPage />
        </main>
        
        {/* Footer - Global */}
        <CH5Footer />
      </div>
    </CH5Provider>
  );
}

export default App;