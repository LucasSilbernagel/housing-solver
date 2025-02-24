import { Text } from '@radix-ui/themes'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Stats = () => {
  const { allTimePoints, automaticIncrementAmount, manualIncrementAmount } =
    useGameStore(
      useShallow((state) => ({
        allTimePoints: state.allTimePoints,
        automaticIncrementAmount: state.automaticIncrementAmount,
        manualIncrementAmount: state.manualIncrementAmount,
      }))
    )

  return (
    <ul className="space-y-12 max-h-none md:max-h-[450px] overflow-y-auto">
      <li className="flex flex-col gap-2">
        <div>
          <Text size="4" wrap="pretty" className="font-bold">
            Total support points generated:{' '}
          </Text>
        </div>
        <div>
          <Text>{allTimePoints.toLocaleString()}</Text>
        </div>
      </li>
      <li className="flex flex-col gap-2">
        <div>
          <Text size="4" wrap="pretty" className="font-bold">
            Support points automatically earned per second:{' '}
          </Text>
        </div>
        <div>
          <Text>{automaticIncrementAmount.toLocaleString()}</Text>
        </div>
      </li>
      <li className="flex flex-col gap-2">
        <div>
          <Text size="4" wrap="pretty" className="font-bold">
            Support points earned per click:{' '}
          </Text>
        </div>
        <div>
          <Text>{manualIncrementAmount.toLocaleString()}</Text>
        </div>
      </li>
    </ul>
  )
}

export default Stats
