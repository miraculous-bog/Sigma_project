import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { store } from './app/store.js'
import { Provider } from 'react-redux'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ⬇️ додано для MUI
import { StyledEngineProvider, ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme/theme'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
)
