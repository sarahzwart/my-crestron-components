import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'

export interface LoadingPageProps {
    commandSignal: boolean;
    feedbackSignal: boolean;
    loadingType: string;
    loadingComponentFillColor: string;
    loadingComponentBGColor: string;
    textUnderLoadingComponent:string;

}
export function LoadingPage({}: LoadingPageProps) {

// Default values shown
return (
    <Orbit
  size="35"
  speed="1.5"
  color="black" 
/>
)

}