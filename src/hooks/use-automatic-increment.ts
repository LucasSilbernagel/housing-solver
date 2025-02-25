import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { MAXIMUM_SUPPORT_POINTS } from '../constants/stats'
import { useGameStore } from './use-game-store'

export const useAutomaticIncrement = () => {
  const {
    automaticIncrementAmount,
    automaticallyIncrementPoints,
    availablePoints,
  } = useGameStore(
    useShallow((state) => ({
      automaticIncrementAmount: state.automaticIncrementAmount,
      automaticallyIncrementPoints: state.automaticallyIncrementPoints,
      availablePoints: state.availablePoints,
    }))
  )

  useEffect(() => {
    if (
      automaticIncrementAmount === 0 ||
      availablePoints === MAXIMUM_SUPPORT_POINTS
    )
      return
    const interval = setInterval(() => {
      automaticallyIncrementPoints()
    }, 1000)
    return () => clearInterval(interval)
  }, [automaticIncrementAmount, automaticallyIncrementPoints, availablePoints])
}
