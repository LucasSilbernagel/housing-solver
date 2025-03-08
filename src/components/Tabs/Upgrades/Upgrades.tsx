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
    <ul className="space-y-4">
      {upgrades
        .sort((a, b) => {
          // Purchased oneTimePurchase items should appear last (first priority)
          if (a.oneTimePurchase?.purchased && !b.oneTimePurchase?.purchased)
            return 1
          if (!a.oneTimePurchase?.purchased && b.oneTimePurchase?.purchased)
            return -1

          // Unaffordable un-purchased upgrades appear at the top (second priority)
          if (
            a.cost > availablePoints &&
            a.quantity === 0 &&
            b.cost <= availablePoints
          )
            return -1
          if (
            a.cost <= availablePoints &&
            b.cost > availablePoints &&
            b.quantity === 0
          )
            return 1

          // Sort by initial cost (lowest priority)
          const costA =
            UPGRADES.find((upgrade) => upgrade.title === a.title)?.cost ?? 0
          const costB =
            UPGRADES.find((upgrade) => upgrade.title === b.title)?.cost ?? 0
          if (costA > costB) {
            return -1
          } else if (costA < costB) {
            return 1
          }

          return 0
        })
        .map((upgrade) => {
          return (
            <li
              key={upgrade.title.replaceAll(' ', '-')}
              className={clsx(upgrade.visible ? 'visible' : 'hidden')}
            >
              <Card className="shadow-sm">
                <div className="flex justify-between items-center gap-4">
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
