import { NextUIProvider } from "@nextui-org/react"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


console.log('main');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>

  </React.StrictMode>
)
