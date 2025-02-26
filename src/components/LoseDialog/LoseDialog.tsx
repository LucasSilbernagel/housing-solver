import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../hooks/use-game-store'

const LoseDialog = () => {
  const { resetGame, hasLostGame } = useGameStore(
    useShallow((state) => ({
      resetGame: state.resetGame,
      hasLostGame: state.hasLostGame,
    }))
  )

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen || !hasLostGame) return
    setIsOpen(true)
  }, [hasLostGame, isOpen])

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>You lose!</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Unfortunately, housing unaffordability is now much worse than when you
          started playing. Hopefully you learned from your mistakes!
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="blue"
              onClick={() => {
                resetGame()
              }}
            >
              Try again
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default LoseDialog
