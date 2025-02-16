import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { ThemeProvider } from "@material-tailwind/react";
import { ApiProvider } from './context/apiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApiProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ApiProvider>,
)
