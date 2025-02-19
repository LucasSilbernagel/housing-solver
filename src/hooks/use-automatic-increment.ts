import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useAutomaticIncrement = () => {
  const { automaticIncrementAmount, automaticallyIncrementPoints } =
    useGameStore(
      useShallow((state) => ({
        automaticIncrementAmount: state.automaticIncrementAmount,
        automaticallyIncrementPoints: state.automaticallyIncrementPoints,
      }))
    )

  useEffect(() => {
    if (automaticIncrementAmount === 0) return
    const interval = setInterval(() => {
      automaticallyIncrementPoints()
    }, 1000)
    return () => clearInterval(interval)
  }, [automaticIncrementAmount, automaticallyIncrementPoints])
}
