import { Box, Card, Tabs } from '@radix-ui/themes'
import { useState } from 'react'
import useScreenWidth from '../../../hooks/use-screen-width'
import Achievements from '../Achievements/Achievements'
import Announcements from '../Announcements/Announcements'
import Settings from '../Settings/Settings'
import Stats from '../Stats/Stats'
import Upgrades from '../Upgrades/Upgrades'

const TabsCard = () => {
  const [isMinWidth, setIsMinWidth] = useState(false)

  useScreenWidth(setIsMinWidth)

  return (
    <Card
      size={isMinWidth ? '4' : '2'}
      className="shadow-lg w-full min-h-[481px]"
    >
      <Tabs.Root defaultValue="upgrades">
        <Tabs.List wrap="wrap">
          <Tabs.Trigger
            value="upgrades"
            aria-label="Upgrades. Press the tab key to enter the tab panel"
          >
            Upgrades
          </Tabs.Trigger>
          <Tabs.Trigger
            value="achievements"
            aria-label="Achievements. Press the tab key to enter the tab panel"
          >
            Achievements
          </Tabs.Trigger>
          <Tabs.Trigger
            value="announcements"
            aria-label="Announcements. Press the tab key to enter the tab panel"
          >
            Announcements
          </Tabs.Trigger>
          <Tabs.Trigger
            value="stats"
            aria-label="Stats. Press the tab key to enter the tab panel"
          >
            Stats
          </Tabs.Trigger>
          <Tabs.Trigger
            value="settings"
            aria-label="Settings. Press the tab key to enter the tab panel"
          >
            Settings
          </Tabs.Trigger>
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
