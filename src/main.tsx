import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { store } from './store'
import ThemeWrapper from './ThemeWrapper'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <CssBaseline />
        <App />
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>,
) 