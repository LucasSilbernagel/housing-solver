import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Callout, Card, Text } from '@radix-ui/themes'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Announcements = () => {
  const { announcements } = useGameStore(
    useShallow((state) => ({
      announcements: state.announcements,
    }))
  )
  return (
    <ul className="space-y-4 max-h-none md:max-h-[450px] overflow-y-auto">
      {announcements.length > 0 ? (
        announcements
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((announcement) => {
            return (
              <li key={`${announcement.title}-${announcement.timestamp}`}>
                <Card className="shadow-sm">
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <div>
                        <Text wrap="pretty" className="font-bold">
                          {announcement.title}
                        </Text>
                      </div>
                      {announcement.description ? (
                        <div>
                          <Text wrap="pretty" size="2">
                            {announcement.description}
                          </Text>
                        </div>
                      ) : undefined}
                    </div>
                    <div>
                      <Text size="1" wrap="pretty" className="text-gray-600">
                        30 minutes ago
                      </Text>
                    </div>
                  </div>
                </Card>
              </li>
            )
          })
      ) : (
        <li>
          <Callout.Root size="3">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              There are no announcements at this time, check back later.
            </Callout.Text>
          </Callout.Root>
        </li>
      )}
    </ul>
  )
}

export default Announcements
