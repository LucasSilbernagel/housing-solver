import { CheckIcon } from '@radix-ui/react-icons'
import { Card, Text } from '@radix-ui/themes'
import clsx from 'clsx'

const Achievements = () => {
  const achievements = [
    { text: 'Generate 100 support points', achieved: true },
    { text: 'Generate 1,000 support points', achieved: false },
  ]
  return (
    <ul className="space-y-4">
      {achievements.map((achievement) => {
        return (
          <li key={achievement.text}>
            <Card className="shadow-sm">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <Text
                    wrap="pretty"
                    className={clsx(
                      achievement.achieved ? 'line-through' : 'line-none'
                    )}
                  >
                    {achievement.text}
                  </Text>
                </div>
                <div>
                  <CheckIcon
                    width="25"
                    height="25"
                    color="green"
                    className={clsx(
                      achievement.achieved ? 'visible' : 'invisible'
                    )}
                  />
                </div>
              </div>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

export default Achievements
