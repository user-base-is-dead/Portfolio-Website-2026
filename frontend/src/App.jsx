import { useState, useCallback, useRef } from 'react'
import { HashRouter, Route } from 'react-router-dom'
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
  const [iframeReady, setIframeReady] = useState(false)
  const iframeSignalledRef = useRef(false)

  const signalIframeReady = useCallback(() => {
    if (iframeSignalledRef.current) return
    iframeSignalledRef.current = true
    setIframeReady(true)
  }, [])

  const handleReady = useCallback((withSound) => {
    setSoundEnabled(withSound)
    setSiteReady(true)
  }, [])

  return (
    <>
      {!siteReady && <Preloader onReady={handleReady} iframeReady={iframeReady} />}
      <HashRouter>
        <SmoothScroll />
        <TransitionProvider>
          <TransitionRoutes>
            <Route path="/" element={<LandingPage onIframeLoad={signalIframeReady} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </TransitionRoutes>
        </TransitionProvider>
      </HashRouter>
      {siteReady && <AudioToggle shouldPlay={soundEnabled} />}
    </>
  )
}

export default App

