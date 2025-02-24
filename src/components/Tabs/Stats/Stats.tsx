import { Card, Text } from '@radix-ui/themes'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Stats = () => {
  const {
    allTimePoints,
    automaticIncrementAmount,
    manualIncrementAmount,
    totalPointsSpent,
  } = useGameStore(
    useShallow((state) => ({
      allTimePoints: state.allTimePoints,
      automaticIncrementAmount: state.automaticIncrementAmount,
      manualIncrementAmount: state.manualIncrementAmount,
      totalPointsSpent: state.totalPointsSpent,
    }))
  )

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
            <Text>{allTimePoints.toLocaleString()}</Text>
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
            <Text>{totalPointsSpent.toLocaleString()}</Text>
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
            <Text>{manualIncrementAmount.toLocaleString()}</Text>
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
            <Text>{automaticIncrementAmount.toLocaleString()}</Text>
          </div>
        </Card>
      </li>
    </ul>
  )
}

export default Stats
