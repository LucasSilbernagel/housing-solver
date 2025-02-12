import { AlertDialog, Button, Flex, Switch, Text } from '@radix-ui/themes'
import { useThemeStore } from '../../../hooks/use-theme-store'

const Settings = () => {
  const shouldUseDarkTheme = useThemeStore((state) => state.shouldUseDarkTheme)
  const toggleDarkTheme = useThemeStore((state) => state.toggleTheme)

  const handleDarkThemeToggle = () => {
    toggleDarkTheme()
  }

  return (
    <div className="flex flex-col gap-4">
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
                <Button variant="solid" color="red">
                  Revoke access
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>
  )
}

export default Settings
