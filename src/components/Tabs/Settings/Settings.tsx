import {
  AlertDialog,
  Button,
  Flex,
  Switch,
  Text,
  TextArea,
} from '@radix-ui/themes'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'
import { deserializeStore, serializeStore } from '../../../utils/backup-store'

const Settings = () => {
  const { shouldUseDarkTheme, toggleDarkTheme, resetGame } = useGameStore(
    useShallow((state) => ({
      shouldUseDarkTheme: state.shouldUseDarkTheme,
      toggleDarkTheme: state.toggleTheme,
      resetGame: state.resetGame,
    }))
  )

  const [backup, setBackup] = useState('')

  const handleDarkThemeToggle = () => {
    toggleDarkTheme()
  }

  const handleResetGame = () => {
    setBackup('')
    resetGame()
  }

  const createBackup = () => {
    const serializedBackup = serializeStore()
    setBackup(serializedBackup)
  }

  const loadBackup = () => {
    try {
      deserializeStore(backup)
      setBackup('')
      toast.success('Backup loaded successfully')
    } catch (error) {
      console.error('Failed to load backup:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex sm:flex-row flex-col gap-12">
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
                  <Button variant="solid" color="red" onClick={handleResetGame}>
                    Reset game
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </div>
      </div>
      <div>
        <Text as="label" size="4">
          <Flex gap="2" direction="column" className="max-w-[600px]">
            Backup
            <TextArea
              placeholder="Backup code goes here..."
              onChange={(event) => setBackup(event.target.value)}
              value={backup}
            />
          </Flex>
        </Text>
        <div className="flex gap-2 mt-2">
          <Button onClick={createBackup}>Create backup</Button>
          <Button onClick={loadBackup} disabled={backup.length === 0}>
            Import backup
          </Button>
        </div>
      </div>
      <p>
        Developer:{' '}
        <a
          href="https://lucassilbernagel.com/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:underline-offset-0 focus-visible:underline-offset-0 transition-all duration-300 ease-in-out"
        >
          Lucas Silbernagel
        </a>{' '}
      </p>
    </div>
  )
}

export default Settings
