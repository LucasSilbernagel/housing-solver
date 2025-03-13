import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../hooks/use-game-store'

const WinDialog = () => {
  const { hasCompletedWinFlow, completeWinFlow, hasWonGame, resetGame } =
    useGameStore(
      useShallow((state) => ({
        hasCompletedWinFlow: state.hasCompletedWinFlow,
        completeWinFlow: state.completeWinFlow,
        hasWonGame: state.hasWonGame,
        resetGame: state.resetGame,
      }))
    )

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen || hasCompletedWinFlow || !hasWonGame) return
    setIsOpen(true)
  }, [hasCompletedWinFlow, hasWonGame, isOpen])

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Congratulations!</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You have successfully reduced housing unaffordability to 10% or lower.
          Would you like to keep playing, or start over?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="blue"
              onClick={() => {
                setIsOpen(false)
                completeWinFlow()
              }}
            >
              Keep playing
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="green"
              onClick={() => {
                setIsOpen(false)
                resetGame()
              }}
            >
              Start over
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default WinDialog
