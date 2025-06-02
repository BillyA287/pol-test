import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WebSocketProvider } from './context/WebsocketContext';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </StrictMode>,
)
