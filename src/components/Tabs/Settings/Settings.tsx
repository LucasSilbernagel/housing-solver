import {
  AlertDialog,
  Button,
  Flex,
  Switch,
  Text,
  TextArea,
} from '@radix-ui/themes'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Settings = () => {
  const { shouldUseDarkTheme, toggleDarkTheme, resetGame } = useGameStore(
    useShallow((state) => ({
      shouldUseDarkTheme: state.shouldUseDarkTheme,
      toggleDarkTheme: state.toggleTheme,
      resetGame: state.resetGame,
    }))
  )

  const handleDarkThemeToggle = () => {
    toggleDarkTheme()
  }

  return (
    <div className="flex flex-col gap-10">
      <Text as="label" size="4">
        <Flex gap="2">
          <Switch
            size="3"
            checked={shouldUseDarkTheme}
            onClick={handleDarkThemeToggle}
          />{' '}
          Dark theme
        </Flex>
      </Text>
      <div>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red">Reset game</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Reset game</AlertDialog.Title>
            <AlertDialog.Description size="3">
              Are you sure? You will lose all saved progress.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button variant="solid" color="red" onClick={resetGame}>
                  Reset game
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
      <div>
        <Text as="label" size="4">
          <Flex gap="2" direction="column">
            Backup
            <TextArea placeholder="Backup code goes here..." />
          </Flex>
        </Text>
        <div className="flex gap-2 mt-2">
          <Button>Create backup</Button>
          <Button>Import backup</Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
