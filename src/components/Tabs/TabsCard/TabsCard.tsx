import { Box, Card, Tabs } from '@radix-ui/themes'
import Achievements from '../Achievements/Achievements'
import Settings from '../Settings/Settings'
import Upgrades from '../Upgrades/Upgrades'

const TabsCard = () => {
  return (
    <Card size="4" className="w-full max-w-[800px] shadow-lg">
      <Tabs.Root defaultValue="upgrades">
        <Tabs.List wrap="wrap">
          <Tabs.Trigger value="upgrades">Upgrades</Tabs.Trigger>
          <Tabs.Trigger value="achievements">Achievements</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Box pt="3">
          <Tabs.Content value="upgrades" className="pt-4">
            <Upgrades />
          </Tabs.Content>
          <Tabs.Content value="achievements" className="pt-4">
            <Achievements />
          </Tabs.Content>
          <Tabs.Content value="settings" className="pt-4">
            <Settings />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  )
}

export default TabsCard
