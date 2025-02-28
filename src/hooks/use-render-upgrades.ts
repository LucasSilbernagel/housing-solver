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
    totalCorruptionScandals,
  } = useGameStore(
    useShallow((state) => ({
      upgrades: state.upgrades,
      electedToLocalOffice: state.electedToLocalOffice,
      electedToRegionalOffice: state.electedToRegionalOffice,
      electedToNationalOffice: state.electedToNationalOffice,
      totalNimbyProtests: state.totalNimbyProtests,
      totalCorruptionScandals: state.totalCorruptionScandals,
    }))
  )

  const { makeNextUpgradeVisible } = useProcessUpgrade()

  useEffect(() => {
    const isUpgradeVisible = (upgradeTitle: string) => {
      const upgrade = upgrades.find((upgrade) => upgrade.title === upgradeTitle)
      return upgrade?.visible
    }

    if (
      electedToLocalOffice &&
      isUpgradeVisible(
        'Run a regional ad campaign about the affordable housing crisis'
      )
    ) {
      makeNextUpgradeVisible('Run for regional office')
    }

    if (
      electedToRegionalOffice &&
      isUpgradeVisible(
        'Run a national ad campaign about the affordable housing crisis'
      )
    ) {
      makeNextUpgradeVisible('Run for national office')
    }

    if (
      electedToRegionalOffice &&
      isUpgradeVisible('Fund a local research project')
    ) {
      makeNextUpgradeVisible('Fund a regional research project')
    }

    if (
      electedToNationalOffice &&
      isUpgradeVisible('Fund a regional research project')
    ) {
      makeNextUpgradeVisible('Fund a national research project')
    }

    if (
      totalNimbyProtests > 0 &&
      !isUpgradeVisible(
        'Run a community festival to promote affordable housing discussions'
      )
    ) {
      makeNextUpgradeVisible(
        'Run a community festival to promote affordable housing discussions'
      )
    }

    if (
      totalCorruptionScandals > 0 &&
      !isUpgradeVisible('Pass an anti-corruption law')
    ) {
      makeNextUpgradeVisible('Pass an anti-corruption law')
    }

    if (isUpgradeVisible('Increase taxes on billionaires')) {
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
