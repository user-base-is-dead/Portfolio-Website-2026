import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault())

// Block dragging images, videos, links, and buttons
document.addEventListener('dragstart', (e) => {
  if (['IMG', 'VIDEO', 'A', 'BUTTON'].includes(e.target.tagName)) e.preventDefault()
})

// Block common DevTools keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // F12
  if (e.key === 'F12') e.preventDefault()
  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) e.preventDefault()
  // Ctrl+U (view source)
  if (e.ctrlKey && e.key.toUpperCase() === 'U') e.preventDefault()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

