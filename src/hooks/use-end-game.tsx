import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useEndGame = () => {
  const {
    hasWonGame,
    winGame,
    score,
    hasLostGame,
    loseGame,
    hasCompletedWinFlow,
    isGameOver,
    endGame,
  } = useGameStore(
    useShallow((state) => ({
      hasWonGame: state.hasWonGame,
      winGame: state.winGame,
      score: state.score,
      hasLostGame: state.hasLostGame,
      loseGame: state.loseGame,
      hasCompletedWinFlow: state.hasCompletedWinFlow,
      isGameOver: state.isGameOver,
      endGame: state.endGame,
    }))
  )

  useEffect(() => {
    if (hasWonGame || score > 10) return
    winGame()
  }, [hasWonGame, score, winGame])

  useEffect(() => {
    if (hasLostGame || score < 50) return
    loseGame()
  }, [hasLostGame, loseGame, score])

  useEffect(() => {
    if (!hasCompletedWinFlow || score > 0 || isGameOver) return
    endGame()
  }, [endGame, hasCompletedWinFlow, isGameOver, score])
}
