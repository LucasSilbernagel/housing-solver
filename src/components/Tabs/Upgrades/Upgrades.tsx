import { CheckIcon } from '@radix-ui/react-icons'
import { Button, Card, Text, Tooltip } from '@radix-ui/themes'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { Upgrade } from '../../../constants/upgrades'
import { useGameStore } from '../../../hooks/use-game-store'
import { useProcessUpgrade } from '../../../hooks/use-process-upgrade'

const Upgrades = () => {
  const { upgrades, updateUpgrade, availablePoints, updateAvailablePoints } =
    useGameStore(
      useShallow((state) => ({
        upgrades: state.upgrades,
        updateUpgrade: state.updateUpgrade,
        availablePoints: state.availablePoints,
        updateAvailablePoints: state.updateAvailablePoints,
      }))
    )

  const { processUpgrade } = useProcessUpgrade()

  const handlePurchase = (upgrade: Upgrade) => {
    const clonedUpgrade = { ...upgrade }

    if (clonedUpgrade.cost > availablePoints) return

    if (clonedUpgrade.oneTimePurchase) {
      updateUpgrade(clonedUpgrade.title, {
        ...clonedUpgrade,
        quantity: clonedUpgrade.quantity + 1,
        oneTimePurchase: { purchased: true },
      })
    } else {
      updateUpgrade(clonedUpgrade.title, {
        ...clonedUpgrade,
        quantity: clonedUpgrade.quantity + 1,
        cost: clonedUpgrade.cost * 2,
      })
    }

    updateAvailablePoints(availablePoints - clonedUpgrade.cost)
    toast.success(`Purchased ${clonedUpgrade.title}`)
    processUpgrade(clonedUpgrade.title)
  }

  return (
    <ul className="space-y-4 max-w-[600px]">
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
                <div className="flex justify-between items-center gap-4">
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
                  <div className="flex flex-col justify-center items-center gap-1">
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
                          <Button
                            disabled={upgrade.cost > availablePoints}
                            onClick={() => handlePurchase(upgrade)}
                          >
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
