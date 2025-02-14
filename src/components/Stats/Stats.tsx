import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Button, Card, IconButton, Popover, Separator } from '@radix-ui/themes'
import { useShallow } from 'zustand/shallow'
import { MAXIMUM_SUPPORT_POINTS } from '../../constants'
import { useGameStore } from '../../hooks/use-game-store'

const Stats = () => {
  const {
    unaffordabilityScore,
    manualIncrementAmount,
    supportPoints,
    generateSupportPoints,
  } = useGameStore(
    useShallow((state) => ({
      unaffordabilityScore: state.housingUnaffordabilityScore,
      manualIncrementAmount: state.manualIncrementAmount,
      supportPoints: state.supportPoints,
      generateSupportPoints: state.generateSupportPoints,
    }))
  )
  return (
    <Card size="4" className="shadow-lg w-full max-w-max">
      <div className="relative">
        <h2 className="mb-1 text-2xl text-center">Housing Unaffordability:</h2>
        <div className="flex justify-center items-center mx-auto border-12 border-red-500 rounded-[50%] w-25 h-25 font-bold text-3xl">
          <div>
            <h3>
              <span>{unaffordabilityScore}</span>%
            </h3>
          </div>
        </div>
        <div className="right-0 bottom-0 absolute">
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
                <ul className="pl-4 list-disc">
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
        <h2 className="text-2xl text-center">Support Points:</h2>
        <div className="my-4">
          <h3 className="font-bold text-xl text-center">
            {supportPoints.toLocaleString()}
          </h3>
        </div>
        <div className="flex justify-center w-full">
          <Button
            size="4"
            onClick={() => generateSupportPoints(manualIncrementAmount)}
            disabled={supportPoints >= MAXIMUM_SUPPORT_POINTS}
          >
            Generate Support Points
          </Button>
        </div>
        <div className="top-[5px] right-0 absolute">
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
