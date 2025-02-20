import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'
import { useProcessUpgrade } from './use-process-upgrade'

export const useRenderUpgrades = () => {
  const {
    upgrades,
    electedToLocalOffice,
    electedToRegionalOffice,
    electedToNationalOffice,
    totalNimbyProtests,
  } = useGameStore(
    useShallow((state) => ({
      upgrades: state.upgrades,
      electedToLocalOffice: state.electedToLocalOffice,
      electedToRegionalOffice: state.electedToRegionalOffice,
      electedToNationalOffice: state.electedToNationalOffice,
      totalNimbyProtests: state.totalNimbyProtests,
    }))
  )

  const { makeNextUpgradeVisible } = useProcessUpgrade()

  useEffect(() => {
    const checkIfUpgradeIsIsVisible = (upgradeTitle: string) => {
      const upgrade = upgrades.find((upgrade) => upgrade.title === upgradeTitle)
      return upgrade?.visible
    }

    if (
      electedToLocalOffice &&
      checkIfUpgradeIsIsVisible(
        'Run a regional ad campaign about the affordable housing crisis'
      )
    ) {
      makeNextUpgradeVisible('Run for regional office')
    }

    if (
      electedToRegionalOffice &&
      checkIfUpgradeIsIsVisible(
        'Run a national ad campaign about the affordable housing crisis'
      )
    ) {
      makeNextUpgradeVisible('Run for national office')
    }

    if (
      electedToRegionalOffice &&
      checkIfUpgradeIsIsVisible('Fund a local research project')
    ) {
      makeNextUpgradeVisible('Fund a regional research project')
    }

    if (
      electedToNationalOffice &&
      checkIfUpgradeIsIsVisible('Fund a regional research project')
    ) {
      makeNextUpgradeVisible('Fund a national research project')
    }

    if (
      totalNimbyProtests > 0 &&
      !checkIfUpgradeIsIsVisible(
        'Run a community festival to promote affordable housing discussions'
      )
    ) {
      makeNextUpgradeVisible(
        'Run a community festival to promote affordable housing discussions'
      )
    }

    if (checkIfUpgradeIsIsVisible('Increase taxes on billionaires')) {
      makeNextUpgradeVisible(
        'Make it illegal for individuals to own more than two homes'
      )
    }
  }, [
    electedToLocalOffice,
    electedToNationalOffice,
    electedToRegionalOffice,
    makeNextUpgradeVisible,
    totalNimbyProtests,
    upgrades,
  ])
}
