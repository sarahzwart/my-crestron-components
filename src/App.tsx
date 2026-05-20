import "./App.css";
import { CH5Button } from "./components/lib/CH5Button";
import { CH5Provider } from "./contexts/CH5Context";
import { CH5Slider } from "./components/lib/CH5Slider";
import { CH5Gauge } from "./components/lib/CH5Gauge";
import { CH5Keypad } from "./components/lib/CH5Keypad";
import { CH5Header } from "./components/layout/Header";
import { CH5Footer } from "./components/layout/Footer";

function App() {
  return (
    <CH5Provider>
      <CH5Header />
      <div className="flex flex-col items-center justify-enter min-h-screen gap-10 mt-10 mx-10">
        <CH5Button
          commandSignal={""}
          feedbackSignal={""}
          width={200}
          height={200}
          inactiveClass="pastel-pink"
          activeClass="pink"
          glowColor="black"
          textSize={30}
        />
        <CH5Slider
          commandSignal="brightness.analog"
          feedbackSignal="brightness.feedback"
          trackColor="pink"
          colorSettings="gradient"
          thickness={20}
          thumbSize={40}
          thumbType="icon"
          icon="🩷"
        />
        {/* Custom format - temperature */}
        <CH5Gauge
          commandSignal="temp.analog"
          feedbackSignal="temp.feedback"
          formatValue={(pct) => {
            const temp = 60 + (pct / 100) * 25;
            return Math.round(temp) + "%";
          }}
          gaugeColor="red"
          size="xl"
        />

        <CH5Keypad
          commandSignal="keypad.command"
          feedbackSignal="keypad.feedback"
          buttonColor="pink"
          glowColor="pastel-pink"
          buttonShape="pill"
          width={300}
          height={300}
          textSize={30}
        />
      </div>
      <CH5Footer/>
    </CH5Provider>
  );
}

export default App;
