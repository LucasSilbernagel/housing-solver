import { InfoCircledIcon } from '@radix-ui/react-icons'
import {
  AlertDialog,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Popover,
  Separator,
  Switch,
  Tabs,
  Text,
} from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'
import { useThemeStore } from '../hooks/use-theme-store'
import { useEffect } from 'react'
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../utils/localstorage-helpers'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const shouldUseDarkTheme = useThemeStore((state) => state.shouldUseDarkTheme)
  const toggleDarkTheme = useThemeStore((state) => state.toggleTheme)

  const handleDarkThemeToggle = () => {
    toggleDarkTheme()
  }

  useEffect(() => {
    setToLocalStorage('housing-solver-dark-theme', shouldUseDarkTheme)
  }, [shouldUseDarkTheme])

  useEffect(() => {
    const darkTheme = getFromLocalStorage('housing-solver-dark-theme')
    if (darkTheme) {
      toggleDarkTheme()
    }
  }, [toggleDarkTheme])

  return (
    <div className="p-4">
      <h1 className="sr-only">Housing Solver</h1>
      <div className="flex xl:flex-row flex-col gap-4">
        <Card size="4" className="shadow-lg max-w-max">
          <div className="relative">
            <h2 className="mb-1 text-2xl text-center">
              Housing Unaffordability:
            </h2>
            <div className="flex justify-center items-center border-12 mx-auto border-red-500 rounded-[50%] w-25 h-25 font-bold text-3xl">
              <div>
                <h3>35%</h3>
              </div>
            </div>
            <div className="right-0 bottom-0 absolute">
              <Popover.Root>
                <Popover.Trigger>
                  <IconButton variant="ghost">
                    <InfoCircledIcon width="25" height="25" />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content width="360px">
                  <div>
                    <p>
                      The housing unaffordability score represents the
                      percentage of households that spends more than 30% of
                      their income on shelter.
                    </p>
                    <ul className="pl-4 list-disc">
                      <li>
                        30% or higher is considered to be a serious concern.
                      </li>
                      <li>
                        At 40% or higher, a significant portion of the
                        population is housing cost-burdened.
                      </li>
                      <li>
                        50% or higher indicates an extreme crisis, with
                        widespread financial strain and likely systemic issues
                        in housing supply, wages, or policy.
                      </li>
                    </ul>
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
          <Separator size="4" className="my-6" />
          <div className="relative">
            <h2 className="text-2xl text-center">Support Points:</h2>
            <div className="my-4">
              <h3 className="font-bold text-center text-xl">
                100,000,000,000,000,000
              </h3>
            </div>
            <div className="flex justify-center w-full">
              <Button size="4">Generate Support Points</Button>
            </div>
            <div className="top-[5px] right-0 absolute">
              <Popover.Root>
                <Popover.Trigger>
                  <IconButton variant="ghost">
                    <InfoCircledIcon width="25" height="25" />
                  </IconButton>
                </Popover.Trigger>
                <Popover.Content width="360px">
                  <div>
                    <p>
                      Support points represent your ability to fight the housing
                      affordability crisis by spreading awareness, recruiting
                      supporters, running for office, and implementing policy
                      changes of your own. The more support points you have, the
                      greater the impact you can have!
                    </p>
                  </div>
                </Popover.Content>
              </Popover.Root>
            </div>
          </div>
          <Separator size="4" className="my-6" />
          <div>
            <p className="text-center">Game saved 30 seconds ago</p>
          </div>
        </Card>
        <div>
          <Card size="4" className="shadow-lg max-w-max">
            <Tabs.Root defaultValue="upgrades">
              <Tabs.List wrap="wrap">
                <Tabs.Trigger value="upgrades">Upgrades</Tabs.Trigger>
                <Tabs.Trigger value="achievements">Achievements</Tabs.Trigger>
                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
              </Tabs.List>

              <Box pt="3">
                <Tabs.Content value="upgrades">
                  <p>Upgrades go here</p>
                </Tabs.Content>

                <Tabs.Content value="achievements">
                  <p>Achievements go here</p>
                </Tabs.Content>

                <Tabs.Content value="settings">
                  <div className="flex flex-col gap-4 pt-4">
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
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Card>
        </div>
      </div>
    </div>
  )
}
