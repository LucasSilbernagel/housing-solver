import { useEffect } from 'react'
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../utils/localstorage-helpers'
import { useThemeStore } from './use-theme-store'

export const useLocalStorage = () => {
  const shouldUseDarkTheme = useThemeStore((state) => state.shouldUseDarkTheme)
  const toggleDarkTheme = useThemeStore((state) => state.toggleTheme)

  useEffect(() => {
    setToLocalStorage('housing-solver-dark-theme', shouldUseDarkTheme)
  }, [shouldUseDarkTheme])

  useEffect(() => {
    const darkTheme = getFromLocalStorage('housing-solver-dark-theme')
    if (darkTheme) {
      toggleDarkTheme()
    }
  }, [toggleDarkTheme])
}
