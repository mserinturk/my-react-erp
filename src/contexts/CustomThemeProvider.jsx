import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'

const ThemeContext = createContext()

export const CustomThemeProvider = ({ children }) => {
  const storedSettings = JSON.parse(localStorage.getItem('settings')) || {}
  const initialTheme = storedSettings.theme === 'dark' ? 'dark' : 'light'
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const updatedSettings = { ...storedSettings, theme }
    localStorage.setItem('settings', JSON.stringify(updatedSettings))

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const muiTheme = createTheme({
    palette: {
      mode: theme
    }
  })

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)