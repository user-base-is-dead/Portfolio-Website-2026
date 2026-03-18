import { useState, useCallback } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import { TransitionProvider, TransitionRoutes } from './components/PageTransition/PageTransition'
import Preloader from './components/Preloader/Preloader'
import AudioToggle from './components/AudioToggle/AudioToggle'
import LandingPage from './pages/LandingPage/LandingPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ContactPage from './pages/ContactPage/ContactPage'

function App() {
  const [siteReady, setSiteReady] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const handleReady = useCallback((withSound) => {
    setSoundEnabled(withSound)
    setSiteReady(true)
  }, [])

  return (
    <>
      {!siteReady && <Preloader onReady={handleReady} />}
      <BrowserRouter>
        <SmoothScroll />
        <TransitionProvider>
          <TransitionRoutes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </TransitionRoutes>
        </TransitionProvider>
      </BrowserRouter>
      {siteReady && <AudioToggle shouldPlay={soundEnabled} />}
    </>
  )
}

export default App
