import { CheckIcon } from '@radix-ui/react-icons'
import { Button, Card, Text, Tooltip } from '@radix-ui/themes'
import clsx from 'clsx'
import { useShallow } from 'zustand/shallow'
import { Upgrade, UPGRADES } from '../../../constants/upgrades'
import { useCustomToast } from '../../../hooks/use-custom-toast'
import { useGameStore } from '../../../hooks/use-game-store'
import { useProcessUpgrade } from '../../../hooks/use-process-upgrade'
import FloatingTextButton from '../../FloatingTextButton/FloatingTextButton'

const Upgrades = () => {
  const {
    upgrades,
    updateUpgrade,
    availablePoints,
    updateAvailablePoints,
    totalPointsSpent,
    updateTotalPointsSpent,
    incrementTotalUpgradesPurchased,
    showAnimations,
  } = useGameStore(
    useShallow((state) => ({
      upgrades: state.upgrades,
      updateUpgrade: state.updateUpgrade,
      availablePoints: state.availablePoints,
      updateAvailablePoints: state.updateAvailablePoints,
      totalPointsSpent: state.totalPointsSpent,
      updateTotalPointsSpent: state.updateTotalPointsSpent,
      incrementTotalUpgradesPurchased: state.incrementTotalUpgradesPurchased,
      showAnimations: state.showAnimations,
    }))
  )

  const customToast = useCustomToast()

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
        cost: Math.round(clonedUpgrade.cost * 1.1),
      })
    }

    updateAvailablePoints(availablePoints - clonedUpgrade.cost)
    updateTotalPointsSpent(totalPointsSpent + clonedUpgrade.cost)
    incrementTotalUpgradesPurchased()
    customToast({
      type: 'success',
      content: `Purchased ${clonedUpgrade.title}`,
    })
    processUpgrade(clonedUpgrade.title)
  }

  return (
    <ul className="max-h-none space-y-4 overflow-y-auto md:max-h-[450px]">
      {upgrades
        // Sort by initial cost
        .sort((a, b) => {
          const costA =
            UPGRADES.find((upgrade) => upgrade.title === a.title)?.cost ?? 0
          const costB =
            UPGRADES.find((upgrade) => upgrade.title === b.title)?.cost ?? 0
          if (costA > costB) {
            return -1
          } else if (costA < costB) {
            return 1
          } else {
            return 0
          }
        })
        .sort((a, b) => {
          // Unaffordable upgrades appear at the top
          if (a.cost > availablePoints && b.cost <= availablePoints) return -1
          if (a.cost <= availablePoints && b.cost > availablePoints) return 1

          // Purchased oneTimePurchase items should come last
          if (a.oneTimePurchase?.purchased && !b.oneTimePurchase?.purchased)
            return 1
          if (!a.oneTimePurchase?.purchased && b.oneTimePurchase?.purchased)
            return -1

          return 0
        })
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
                        className={clsx('font-bold', {
                          'line-through': upgrade.oneTimePurchase?.purchased,
                        })}
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
                          {showAnimations ? (
                            <FloatingTextButton
                              disabled={upgrade.cost > availablePoints}
                              onClick={() => handlePurchase(upgrade)}
                              floatingText={`$ ${upgrade.cost.toLocaleString()}`}
                            >
                              Purchase
                            </FloatingTextButton>
                          ) : (
                            <Button
                              disabled={upgrade.cost > availablePoints}
                              onClick={() => handlePurchase(upgrade)}
                            >
                              Purchase
                            </Button>
                          )}
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
