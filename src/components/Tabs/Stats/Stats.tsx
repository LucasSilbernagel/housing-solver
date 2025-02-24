import { Card, Text } from '@radix-ui/themes'
import { formatDuration, intervalToDuration } from 'date-fns'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Stats = () => {
  const {
    allTimePoints,
    automaticIncrementAmount,
    manualIncrementAmount,
    totalPointsSpent,
    totalUpgradesPurchased,
    totalAchievementsEarned,
    totalPlayTime,
  } = useGameStore(
    useShallow((state) => ({
      allTimePoints: state.allTimePoints,
      automaticIncrementAmount: state.automaticIncrementAmount,
      manualIncrementAmount: state.manualIncrementAmount,
      totalPointsSpent: state.totalPointsSpent,
      totalUpgradesPurchased: state.totalUpgradesPurchased,
      totalAchievementsEarned: state.totalAchievementsEarned,
      totalPlayTime: state.totalPlayTime,
    }))
  )

  const formatLiveDuration = (seconds: number) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 }) // Convert seconds to milliseconds for date-fns
    if ((duration.years ?? 0) > 0) {
      return formatDuration(duration, {
        format: [
          'years',
          'months',
          'weeks',
          'days',
          'hours',
          'minutes',
          'seconds',
        ],
        delimiter: ', ',
      })
    } else if ((duration.months ?? 0) > 0) {
      return formatDuration(duration, {
        format: ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
    } else if ((duration.weeks ?? 0) > 0) {
      return formatDuration(duration, {
        format: ['weeks', 'days', 'hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
    } else if ((duration.days ?? 0) > 0) {
      return formatDuration(duration, {
        format: ['days', 'hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
    } else if ((duration.hours ?? 0) > 0) {
      return formatDuration(duration, {
        format: ['hours', 'minutes', 'seconds'],
        delimiter: ', ',
      })
    } else if ((duration.minutes ?? 0) > 0) {
      return formatDuration(duration, {
        format: ['minutes', 'seconds'],
        delimiter: ', ',
      })
    } else {
      return formatDuration(duration, {
        format: ['seconds'],
      })
    }
  }

  return (
    <ul className="space-y-4 max-h-none md:max-h-[450px] overflow-y-auto">
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Total support points generated:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">{allTimePoints.toLocaleString()}</Text>
          </div>
        </Card>
      </li>
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Total support points spent:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">{totalPointsSpent.toLocaleString()}</Text>
          </div>
        </Card>
      </li>
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Support points earned per click:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">{manualIncrementAmount.toLocaleString()}</Text>
          </div>
        </Card>
      </li>
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Support points automatically earned per second:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">
              {automaticIncrementAmount.toLocaleString()}
            </Text>
          </div>
        </Card>
      </li>
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Total upgrades purchased:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">{totalUpgradesPurchased.toLocaleString()}</Text>
          </div>
        </Card>
      </li>
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Total achievements earned:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">
              {totalAchievementsEarned.toLocaleString()}
            </Text>
          </div>
        </Card>
      </li>
      <li>
        <Card className="shadow-sm">
          <div className="mb-2">
            <Text size="4" wrap="pretty" className="font-bold">
              Total play time:{' '}
            </Text>
          </div>
          <div>
            <Text wrap="pretty">
              {totalPlayTime === 0
                ? '0 seconds'
                : formatLiveDuration(totalPlayTime)}
            </Text>
          </div>
        </Card>
      </li>
    </ul>
  )
}

export default Stats
