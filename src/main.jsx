import React from 'react'
import { Buffer } from 'buffer'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Provide Buffer in browser for libraries expecting Node Buffer
if (!window.Buffer) window.Buffer = Buffer
