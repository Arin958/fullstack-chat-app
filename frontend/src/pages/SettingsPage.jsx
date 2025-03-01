import React from 'react'
import { useTheme } from '../ThemeContext'

const SettingsPage = () => {
  const {theme, toggleTheme} = useTheme()
  return (
    <div className='bg-red-400 flex min-h-screen items-center justify-center' >
      <p>The current theme is {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default SettingsPage
