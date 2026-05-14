import "./App.css";
import { CH5Button } from "./components/lib/CH5Button";
import { CH5Provider } from "./contexts/CH5Context";
import { CH5Slider } from "./components/lib/CH5Slider";
import { CH5Gauge } from "./components/lib/CH5Gauge";

function App() {
  return (
    <CH5Provider>
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
          min={60}
          max={85}
          formatValue={(pct) => {
            const temp = 60 + (pct / 100) * 25; // Convert back to temp
            return Math.round(temp) + "°F";
          }}
          gaugeColor="red"
          orientation="linear"
        />
      </div>
    </CH5Provider>
  );
}

export default App;
