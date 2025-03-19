import { CopyIcon } from '@radix-ui/react-icons'
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  Separator,
  Switch,
  Text,
  TextArea,
  Tooltip,
} from '@radix-ui/themes'
import copy from 'clipboard-copy'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { useBackupStore } from '../../../hooks/use-backup-store'
import { useGameStore } from '../../../hooks/use-game-store'

const Settings = () => {
  const {
    shouldUseDarkTheme,
    toggleDarkTheme,
    resetGame,
    allTimePoints,
    showAnimations,
    toggleShowAnimations,
    shouldOverrideBrowserReducedMotion,
    updateShouldOverrideBrowserReducedMotion,
  } = useGameStore(
    useShallow((state) => ({
      shouldUseDarkTheme: state.shouldUseDarkTheme,
      toggleDarkTheme: state.toggleTheme,
      resetGame: state.resetGame,
      allTimePoints: state.allTimePoints,
      showAnimations: state.showAnimations,
      toggleShowAnimations: state.toggleShowAnimations,
      shouldOverrideBrowserReducedMotion:
        state.shouldOverrideBrowserReducedMotion,
      updateShouldOverrideBrowserReducedMotion:
        state.updateShouldOverrideBrowserReducedMotion,
    }))
  )

  const { serializeStore, deserializeStore } = useBackupStore()

  const [backup, setBackup] = useState('')

  const handleDarkThemeToggle = () => {
    toggleDarkTheme()
  }

  const handleAnimationsToggle = () => {
    toggleShowAnimations()
    if (!shouldOverrideBrowserReducedMotion) {
      updateShouldOverrideBrowserReducedMotion()
    }
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
      toast.success('Backup loaded successfully', {
        ariaProps: {
          role: 'alert',
          'aria-live': 'assertive',
        },
      })
    } catch (error) {
      console.error('Failed to load backup:', error)
      if (error instanceof Error) {
        toast.error(`Failed to load backup: ${error.message}`, {
          ariaProps: {
            role: 'alert',
            'aria-live': 'assertive',
          },
        })
      }
    }
  }

  const handleCopyBackup = async () => {
    try {
      await copy(backup).catch((error) => {
        if (error instanceof Error) {
          toast.error(
            `There was an error copying the backup code: ${error.message}`,
            {
              ariaProps: {
                role: 'alert',
                'aria-live': 'assertive',
              },
            }
          )
        }
        console.error(error)
      })
      toast.success('Backup code copied to clipboard!', {
        ariaProps: {
          role: 'alert',
          'aria-live': 'assertive',
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          `There was an error copying the backup code: ${error.message}`,
          {
            ariaProps: {
              role: 'alert',
              'aria-live': 'assertive',
            },
          }
        )
      }
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-12">
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
        <Text as="label" size="4">
          <Flex gap="2">
            <Switch
              size="3"
              checked={showAnimations}
              onClick={handleAnimationsToggle}
            />{' '}
            Animations
          </Flex>
        </Text>
      </div>
      <div>
        <Text as="label" size="4">
          <Flex gap="2" direction="column" style={{ position: 'relative' }}>
            Backup
            {backup.length > 0 ? (
              <Tooltip content="Copy backup code">
                <IconButton
                  onClick={() => {
                    void handleCopyBackup()
                  }}
                  variant="ghost"
                  style={{ position: 'absolute', top: 40, left: 7 }}
                >
                  <CopyIcon width="18" height="18" />
                </IconButton>
              </Tooltip>
            ) : undefined}
            <TextArea
              placeholder="Backup code goes here..."
              onChange={(event) => setBackup(event.target.value)}
              value={backup}
              style={{ paddingLeft: '30px' }}
            />
          </Flex>
        </Text>
        <div className="flex gap-2 mt-2">
          <Button onClick={createBackup} disabled={allTimePoints === 0}>
            Create backup
          </Button>
          <Button onClick={loadBackup} disabled={backup.length === 0}>
            Import backup
          </Button>
        </div>
      </div>
      <div>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button disabled={allTimePoints === 0} color="red">
              Reset game
            </Button>
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
      <Separator size="4" />
      <p>
        Developer:{' '}
        <a
          href="https://lucassilbernagel.com/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:underline-offset-4 focus-visible:underline-offset-4 transition-all duration-300 ease-in-out"
        >
          Lucas Silbernagel
        </a>{' '}
      </p>
    </div>
  )
}

export default Settings
