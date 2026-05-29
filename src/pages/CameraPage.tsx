import { CH5Button } from "@/components/lib/common/CH5Button";
import { useTheme } from "../lib/theme";

export interface CameraPageProps {
  title?: string;
  subtitle?: string;
}

export function CameraPage({
  title = "Camera Page",
  subtitle = "This is a placeholder for camera functionality.",
}: CameraPageProps) {
    const { theme } = useTheme(); 
    return (
        <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <CH5Button icon="arrow-left"onClick={() => alert("Camera functionality is not implemented yet.")} commandSignal={""}/>
            <CH5Button onClick={() => alert("Camera functionality is not implemented yet.")} commandSignal={""}/>
            <CH5Button onClick={() => alert("Camera functionality is not implemented yet.")} commandSignal={""}/>
            <CH5Button onClick={() => alert("Camera functionality is not implemented yet.")} commandSignal={""}/>
            <CH5Button onClick={() => alert("Camera functionality is not implemented yet.")} commandSignal={""}/>   
        </div>
    );
}