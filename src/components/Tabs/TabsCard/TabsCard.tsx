import { Box, Card, Tabs } from '@radix-ui/themes'
import Achievements from '../Achievements/Achievements'
import Announcements from '../Announcements/Announcements'
import Settings from '../Settings/Settings'
import Stats from '../Stats/Stats'
import Upgrades from '../Upgrades/Upgrades'

const TabsCard = () => {
  return (
    <Card size="4" className="shadow-lg w-full max-w-[800px] min-h-[481px]">
      <Tabs.Root defaultValue="upgrades">
        <Tabs.List wrap="wrap">
          <Tabs.Trigger value="upgrades">Upgrades</Tabs.Trigger>
          <Tabs.Trigger value="achievements">Achievements</Tabs.Trigger>
          <Tabs.Trigger value="announcements">Announcements</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
        </Tabs.List>
        <Box pt="3">
          <Tabs.Content value="upgrades" className="pt-4">
            <Upgrades />
          </Tabs.Content>
          <Tabs.Content value="achievements" className="pt-4">
            <Achievements />
          </Tabs.Content>
          <Tabs.Content value="announcements" className="pt-4">
            <Announcements />
          </Tabs.Content>
          <Tabs.Content value="stats" className="pt-4">
            <Stats />
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
