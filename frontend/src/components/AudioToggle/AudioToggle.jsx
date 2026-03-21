import { useRef, useState, useEffect, useCallback } from 'react'
import './AudioToggle.css'

export default function AudioToggle({ shouldPlay }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Auto-play when shouldPlay is true (user chose "With Sound")
  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }, [shouldPlay])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.volume = 0.4
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [playing])

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="none" />
      <button
        className={`audio-toggle ${playing ? 'is-playing' : 'is-muted'}`}
        onClick={toggle}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute' : 'Play'}
      >
        <div className="audio-toggle__bars">
          <span className="audio-toggle__bar" style={{ height: '8px' }} />
          <span className="audio-toggle__bar" style={{ height: '14px' }} />
          <span className="audio-toggle__bar" style={{ height: '6px' }} />
          <span className="audio-toggle__bar" style={{ height: '11px' }} />
        </div>
      </button>
    </>
  )
}
