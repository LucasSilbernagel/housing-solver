import { useEffect } from 'react'
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../utils/localstorage-helpers'
import { useGameStore } from './use-game-store'

export const useLocalStorage = () => {
  const shouldUseDarkTheme = useGameStore((state) => state.shouldUseDarkTheme)
  const toggleDarkTheme = useGameStore((state) => state.toggleTheme)

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
