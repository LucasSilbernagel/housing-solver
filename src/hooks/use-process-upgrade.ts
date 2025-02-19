import { useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useProcessUpgrade = () => {
  const {
    upgrades,
    updateUpgrade,
    automaticIncrementAmount,
    updateAutomaticIncrementAmount,
    incrementVolunteersRecruited,
  } = useGameStore(
    useShallow((state) => ({
      upgrades: state.upgrades,
      updateUpgrade: state.updateUpgrade,
      automaticIncrementAmount: state.automaticIncrementAmount,
      updateAutomaticIncrementAmount: state.updateAutomaticIncrementAmount,
      incrementVolunteersRecruited: state.incrementVolunteersRecruited,
    }))
  )

  const makeNextUpgradeVisible = useCallback(
    (upgradeTitle: string) => {
      const upgrade = upgrades.find((upgrade) => upgrade.title === upgradeTitle)
      if (upgrade?.visible) return
      if (upgrade && !upgrade.visible) {
        updateUpgrade(upgradeTitle, {
          ...upgrade,
          visible: true,
        })
      }
    },
    [updateUpgrade, upgrades]
  )

  const processUpgrade = useCallback(
    (title: string) => {
      if (title === 'Recruit a volunteer') {
        incrementVolunteersRecruited()
        updateAutomaticIncrementAmount(automaticIncrementAmount + 0.5)
        makeNextUpgradeVisible('Recruit a volunteer recruiter')
      }
    },
    [
      automaticIncrementAmount,
      incrementVolunteersRecruited,
      makeNextUpgradeVisible,
      updateAutomaticIncrementAmount,
    ]
  )

  return processUpgrade
}
