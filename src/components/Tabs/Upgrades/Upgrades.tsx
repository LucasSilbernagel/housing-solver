import { CheckIcon } from '@radix-ui/react-icons'
import { Button, Card, Text, Tooltip } from '@radix-ui/themes'
import clsx from 'clsx'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'

const Upgrades = () => {
  const { upgrades, availablePoints } = useGameStore(
    useShallow((state) => ({
      upgrades: state.upgrades,
      availablePoints: state.availablePoints,
    }))
  )

  return (
    <ul className="max-w-[600px] space-y-4">
      {upgrades
        .sort(
          (a, b) =>
            Number(a.oneTimePurchase?.purchased) -
            Number(b.oneTimePurchase?.purchased)
        )
        .map((upgrade) => {
          return (
            <li
              key={upgrade.title}
              className={clsx(upgrade.visible ? 'visible' : 'hidden')}
            >
              <Card className="shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div>
                      <Text
                        wrap="pretty"
                        className={clsx(
                          'font-bold',
                          upgrade.oneTimePurchase?.purchased
                            ? 'line-through'
                            : 'line-none'
                        )}
                      >
                        {upgrade.title}{' '}
                        {upgrade.oneTimePurchase?.purchased ? undefined : (
                          <Text color="green">
                            - {upgrade.cost.toLocaleString()} points
                          </Text>
                        )}
                      </Text>
                    </div>
                    <div>
                      <Text wrap="pretty" size="2">
                        {upgrade.description}
                      </Text>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    {upgrade.oneTimePurchase ||
                    upgrade.quantity === 0 ? undefined : (
                      <Text className="font-semibold">
                        {upgrade.quantity.toLocaleString()}
                      </Text>
                    )}
                    <div>
                      {upgrade.oneTimePurchase?.purchased ? (
                        <Tooltip content="Purchased">
                          <button>
                            <CheckIcon
                              width="25"
                              height="25"
                              color="green"
                              aria-label="purchased"
                            />
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          content={
                            upgrade.cost <= availablePoints
                              ? 'Purchase'
                              : 'Not enough points'
                          }
                        >
                          <Button disabled={upgrade.cost > availablePoints}>
                            Purchase
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          )
        })}
    </ul>
  )
}

export default Upgrades
