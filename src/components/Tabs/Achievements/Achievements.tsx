import { CheckIcon, CountdownTimerIcon } from '@radix-ui/react-icons'
import { Card, Text, Tooltip } from '@radix-ui/themes'
import clsx from 'clsx'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Achievements = () => {
  const { achievements } = useGameStore(
    useShallow((state) => ({
      achievements: state.achievements,
    }))
  )
  return (
    <ul className="space-y-4 max-h-none md:max-h-[450px] overflow-y-auto">
      {achievements
        .sort((a, b) => Number(a.achieved) - Number(b.achieved))
        .map((achievement) => {
          return (
            <li
              key={achievement.text}
              className={clsx(achievement.visible ? 'visible' : 'hidden')}
            >
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
                  <Tooltip
                    content={achievement.achieved ? 'Achieved' : 'In progress'}
                  >
                    <button>
                      {achievement.achieved ? (
                        <CheckIcon
                          width="25"
                          height="25"
                          color="green"
                          aria-label="achieved"
                        />
                      ) : (
                        <CountdownTimerIcon
                          width="25"
                          height="25"
                          aria-label="in progress"
                        />
                      )}
                    </button>
                  </Tooltip>
                </div>
              </Card>
            </li>
          )
        })}
    </ul>
  )
}

export default Achievements
