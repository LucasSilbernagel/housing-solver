import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button, Card, IconButton, Popover, Separator } from '@radix-ui/themes'
import clsx from 'clsx'
import SlotCounter from 'react-slot-counter'
import { useShallow } from 'zustand/shallow'
import { MAXIMUM_SUPPORT_POINTS } from '../../constants/stats'
import { useGameStore } from '../../hooks/use-game-store'
import FloatingTextButton from '../FloatingTextButton/FloatingTextButton'

const Stats = () => {
  const {
    unaffordabilityScore,
    manualIncrementAmount,
    availablePoints,
    manuallyIncrementPoints,
    showAnimations,
  } = useGameStore(
    useShallow((state) => ({
      unaffordabilityScore: state.score,
      manualIncrementAmount: state.manualIncrementAmount,
      availablePoints: state.availablePoints,
      manuallyIncrementPoints: state.manuallyIncrementPoints,
      showAnimations: state.showAnimations,
    }))
  )
  return (
    <Card size="4" className="w-full max-w-max shadow-lg">
      <div className="relative">
        <h2 className="mb-1 text-center text-2xl">Housing Unaffordability:</h2>
        <div
          className={clsx(
            'mx-auto flex h-36 w-36 items-center justify-center rounded-[50%] border-12 text-3xl font-bold',
            {
              'animate-pulse': unaffordabilityScore >= 40,
              'border-green-500': unaffordabilityScore <= 15,
              'border-yellow-500':
                unaffordabilityScore < 25 && unaffordabilityScore > 15,
              'border-red-500': unaffordabilityScore >= 25,
            }
          )}
        >
          <div>
            <h3>
              <span>
                {Math.round((unaffordabilityScore + Number.EPSILON) * 100) /
                  100}
              </span>
              %
            </h3>
          </div>
        </div>
        <div className="absolute right-0 bottom-0">
          <Popover.Root>
            <Popover.Trigger>
              <IconButton variant="ghost">
                <InfoCircledIcon width="25" height="25" />
              </IconButton>
            </Popover.Trigger>
            <Popover.Content width="360px">
              <div>
                <p>
                  The housing unaffordability score represents the percentage of
                  households that spends more than 30% of their income on
                  shelter.
                </p>
                <ul className="list-disc pl-4">
                  <li>30% or higher is considered to be a serious concern.</li>
                  <li>
                    At 40% or higher, a significant portion of the population is
                    housing cost-burdened.
                  </li>
                  <li>
                    50% or higher indicates an extreme crisis, with widespread
                    financial strain and likely systemic issues in housing
                    supply, wages, or policy.
                  </li>
                </ul>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
      <Separator size="4" className="my-12" />
      <div className="relative">
        <h2 className="text-center text-2xl">Support Points:</h2>
        <div className="my-4">
          <h3 className="text-center text-xl font-bold">
            {showAnimations ? (
              <SlotCounter
                value={Math.floor(availablePoints)}
                autoAnimationStart={false}
                sequentialAnimationMode={true}
                useMonospaceWidth={true}
              />
            ) : (
              Math.floor(availablePoints).toLocaleString()
            )}
          </h3>
        </div>
        <div className="flex w-full justify-center">
          {showAnimations ? (
            <FloatingTextButton
              size="4"
              onClick={() => manuallyIncrementPoints(manualIncrementAmount)}
              disabled={availablePoints >= MAXIMUM_SUPPORT_POINTS}
              floatingText={`+ ${manualIncrementAmount.toLocaleString()}`}
            >
              Generate Support Points
            </FloatingTextButton>
          ) : (
            <Button
              size="4"
              onClick={() => manuallyIncrementPoints(manualIncrementAmount)}
              disabled={availablePoints >= MAXIMUM_SUPPORT_POINTS}
            >
              Generate Support Points
            </Button>
          )}
        </div>
        <div className="absolute top-[5px] right-0">
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
    </Card>
  )
}

export default Stats
