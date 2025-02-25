import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useWinGame = () => {
  const { hasWonGame, winGame, housingUnaffordabilityScore } = useGameStore(
    useShallow((state) => ({
      hasWonGame: state.hasWonGame,
      winGame: state.winGame,
      housingUnaffordabilityScore: state.housingUnaffordabilityScore,
    }))
  )

  useEffect(() => {
    if (hasWonGame || housingUnaffordabilityScore > 10) return
    winGame()
  }, [hasWonGame, housingUnaffordabilityScore, winGame])
}
