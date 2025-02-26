import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../hooks/use-game-store'

const EndGameDialog = () => {
  const { resetGame, isGameOver } = useGameStore(
    useShallow((state) => ({
      resetGame: state.resetGame,
      isGameOver: state.isGameOver,
    }))
  )

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen || !isGameOver) return
    setIsOpen(true)
  }, [isGameOver, isOpen])

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Congratulations!</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You have completely eliminated housing unaffordability!
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="green"
              onClick={() => {
                resetGame()
              }}
            >
              Play again
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default EndGameDialog
