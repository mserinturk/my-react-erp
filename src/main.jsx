import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.jsx'
import { MobileMenuProvider } from './contexts/MobileMenuContext'
import { CustomThemeProvider } from './contexts/CustomThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'
import './utils/i18n.js'
import './assets/css/style.css'
import './assets/css/fontawesome.all.min.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MobileMenuProvider>
        <CustomThemeProvider>
          <CssBaseline />
          <App />
        </CustomThemeProvider>
      </MobileMenuProvider>
    </Provider>
  </React.StrictMode>
)