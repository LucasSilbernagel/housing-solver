import { Upgrade } from '../constants/upgrades'

interface ProcessUpgradeParameters {
  automaticIncrementAmount: number
  updateAutomaticIncrementAmount: (amount: number) => void
  incrementVolunteersRecruited: () => void
  updateUpgrade: (title: string, upgrade: Upgrade) => void
}

export const processUpgrade = (
  title: string,
  upgrades: Upgrade[],
  {
    automaticIncrementAmount,
    updateAutomaticIncrementAmount,
    incrementVolunteersRecruited,
    updateUpgrade,
  }: ProcessUpgradeParameters
) => {
  const makeNextUpgradeVisible = (upgradeTitle: string) => {
    const upgrade = upgrades.find((upgrade) => upgrade.title === upgradeTitle)
    if (upgrade?.visible) return
    if (upgrade && !upgrade.visible) {
      updateUpgrade(upgradeTitle, {
        ...upgrade,
        visible: true,
      })
    }
  }

  if (title === 'Recruit a volunteer') {
    incrementVolunteersRecruited()
    updateAutomaticIncrementAmount(automaticIncrementAmount + 0.5)
    makeNextUpgradeVisible('Recruit a volunteer recruiter')
  }
}
