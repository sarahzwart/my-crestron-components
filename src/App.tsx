import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from './components/lib/Button'

function App() {


  return (
    <div>
      <Button label="Click me" onClick={() => setCount(count + 1)} />
    </div>
  )
}

export default App
