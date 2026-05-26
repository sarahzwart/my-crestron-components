import { CH5Provider } from "./contexts/CH5Context";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";
import { CH5Button } from "./components/lib/CH5Button";
import { LightsPage } from "./pages/LightsPage";
import { Home, Lightbulb, Settings, Volume2, VolumeX, Wifi, Power } from "lucide-react";

function App() {
  return (
    <CH5Provider>
      <div className="flex flex-col h-screen bg-linear-to-br from-slate-700 via-slate-800 to-slate-700">
        <CH5Header
          leftButtons={
            <>
              <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white">
                <Home size={20} />
              </button>
              <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white">
                <Wifi size={20} />
              </button>
              <button className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all flex items-center justify-center text-white">
                <Settings size={20} />
              </button>
            </>
          }
          backgroundColor="bg-black/20"
          textColor="text-white"
          className="backdrop-blur-xl border-b border-white/10"
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <LightsPage />
        </main>

        <CH5Footer
          volumeWidth={500}
          volumePosition="center"
          volumeColor="blue"
          backgroundColor="bg-slate-900/50"
          bubbleBackground="bg-transparent"
          muteButton={
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white">
              <VolumeX size={24} />
            </button>
          }
          mutePosition="left" 
          leftButtons={
            <>
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white">
                <Power size={20} />
              </button>
            </>
          }
          rightButtons={
            <>
              <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white">
                <Home size={20} />
              </button>
            </>
          }
        />
      </div>
    </CH5Provider>
  );
}

export default App;
