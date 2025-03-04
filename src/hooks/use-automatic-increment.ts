import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useAutomaticIncrement = () => {
  const { automaticallyIncrementPoints } = useGameStore(
    useShallow((state) => ({
      automaticallyIncrementPoints: state.automaticallyIncrementPoints,
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      automaticallyIncrementPoints()
    }, 1000)
    return () => clearInterval(interval)
  }, [automaticallyIncrementPoints])
}
