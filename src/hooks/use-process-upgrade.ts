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
    incrementVolunteerRecruitersRecruited,
    incrementCampaignManagersRecruited,
    reduceUpgradeCosts,
    updateManualIncrementAmount,
    manualIncrementAmount,
    score,
    updateScore,
    incrementCommunityFestivals,
    incrementTotalAdCampaigns,
    electToLocalOffice,
    electToRegionalOffice,
    electToNationalOffice,
    incrementTotalTrainingPrograms,
    incrementAntiCorruptionLaws,
    incrementImmigrationCaps,
  } = useGameStore(
    useShallow((state) => ({
      upgrades: state.upgrades,
      updateUpgrade: state.updateUpgrade,
      automaticIncrementAmount: state.automaticIncrementAmount,
      updateAutomaticIncrementAmount: state.updateAutomaticIncrementAmount,
      incrementVolunteersRecruited: state.incrementVolunteersRecruited,
      incrementVolunteerRecruitersRecruited:
        state.incrementVolunteerRecruitersRecruited,
      incrementCampaignManagersRecruited:
        state.incrementCampaignManagersRecruited,
      reduceUpgradeCosts: state.reduceUpgradeCosts,
      updateManualIncrementAmount: state.updateManualIncrementAmount,
      manualIncrementAmount: state.manualIncrementAmount,
      score: state.score,
      updateScore: state.updateScore,
      incrementCommunityFestivals: state.incrementCommunityFestivals,
      incrementTotalAdCampaigns: state.incrementTotalAdCampaigns,
      electToLocalOffice: state.electToLocalOffice,
      electToRegionalOffice: state.electToRegionalOffice,
      electToNationalOffice: state.electToNationalOffice,
      incrementTotalTrainingPrograms: state.incrementTotalTrainingPrograms,
      incrementAntiCorruptionLaws: state.incrementAntiCorruptionLaws,
      incrementImmigrationCaps: state.incrementImmigrationCaps,
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

      if (title === 'Recruit a volunteer recruiter') {
        incrementVolunteerRecruitersRecruited()
        updateAutomaticIncrementAmount(automaticIncrementAmount + 1)
        makeNextUpgradeVisible('Recruit a campaign manager')
      }

      if (title === 'Recruit a campaign manager') {
        incrementCampaignManagersRecruited()
        updateAutomaticIncrementAmount(automaticIncrementAmount + 2)
        makeNextUpgradeVisible(
          'Run a local ad campaign about the affordable housing crisis'
        )
      }

      if (
        title === 'Run a local ad campaign about the affordable housing crisis'
      ) {
        incrementTotalAdCampaigns()
        updateAutomaticIncrementAmount(automaticIncrementAmount + 4)
        makeNextUpgradeVisible(
          'Run a regional ad campaign about the affordable housing crisis'
        )
        makeNextUpgradeVisible('Run for local office')
      }

      if (
        title ===
        'Run a regional ad campaign about the affordable housing crisis'
      ) {
        incrementTotalAdCampaigns()
        updateAutomaticIncrementAmount(automaticIncrementAmount + 8)
        makeNextUpgradeVisible(
          'Run a national ad campaign about the affordable housing crisis'
        )
      }

      if (
        title ===
        'Run a national ad campaign about the affordable housing crisis'
      ) {
        incrementTotalAdCampaigns()
        updateAutomaticIncrementAmount(automaticIncrementAmount + 20)
      }

      if (title === 'Run for local office') {
        electToLocalOffice()
        reduceUpgradeCosts(20)
        makeNextUpgradeVisible('Fund a local research project')
        makeNextUpgradeVisible('Fund a job training program')
        makeNextUpgradeVisible('Tax vacant homes')
        makeNextUpgradeVisible(
          'Support remote work policies to reduce demand for housing in expensive city centers'
        )
        makeNextUpgradeVisible(
          'Implement zoning reforms to increase housing density'
        )
      }

      if (title === 'Run for regional office') {
        electToRegionalOffice()
        reduceUpgradeCosts(30)
        makeNextUpgradeVisible('Fund new home construction subsidies')
        makeNextUpgradeVisible('Legislate rent control')
        makeNextUpgradeVisible(
          'Tax breaks for developers who build affordable housing'
        )
        makeNextUpgradeVisible('Invest in public transportation')
        makeNextUpgradeVisible(
          'Legislate rent subsidies for low-income residents'
        )
        makeNextUpgradeVisible('Build a public housing project')
      }

      if (title === 'Run for national office') {
        electToNationalOffice()
        reduceUpgradeCosts(50)
        makeNextUpgradeVisible(
          'Legislate a government-funded affordable daycare plan'
        )
        makeNextUpgradeVisible('Increase the minimum wage')
        makeNextUpgradeVisible(
          'Restrict corporation ownership of residential properties to specific types'
        )
        makeNextUpgradeVisible('Increase taxes on large corporations')
        makeNextUpgradeVisible('Increase taxes on billionaires')
      }

      if (title === 'Fund a local research project') {
        updateManualIncrementAmount(manualIncrementAmount + 5)
      }

      if (title === 'Fund a regional research project') {
        updateManualIncrementAmount(manualIncrementAmount + 10)
      }

      if (title === 'Fund a national research project') {
        updateManualIncrementAmount(manualIncrementAmount + 25)
      }

      if (title === 'Fund a job training program') {
        incrementTotalTrainingPrograms()
        updateScore(score - 0.2)
      }

      if (title === 'Tax vacant homes') {
        updateScore(score - 0.2)
      }

      if (
        title ===
        'Run a community festival to promote affordable housing discussions'
      ) {
        incrementCommunityFestivals()
      }

      if (title === 'Pass an anti-corruption law') {
        incrementAntiCorruptionLaws()
      }

      if (title === 'Put an annual cap on immigration') {
        incrementImmigrationCaps()
      }

      if (
        title ===
        'Support remote work policies to reduce demand for housing in expensive city centers'
      ) {
        updateScore(score - 0.1)
      }

      if (title === 'Implement zoning reforms to increase housing density') {
        updateScore(score - 0.5)
      }

      if (title === 'Fund new home construction subsidies') {
        updateScore(score - 0.5)
      }

      if (title === 'Legislate rent control') {
        updateScore(score - 0.5)
      }

      if (title === 'Tax breaks for developers who build affordable housing') {
        updateScore(score - 0.5)
      }

      if (title === 'Invest in public transportation') {
        updateScore(score - 0.5)
      }

      if (title === 'Legislate rent subsidies for low-income residents') {
        updateScore(score - 0.5)
      }

      if (title === 'Build a public housing project') {
        updateScore(score - 0.5)
      }

      if (title === 'Legislate a government-funded affordable daycare plan') {
        updateScore(score - 0.5)
      }

      if (title === 'Increase the minimum wage') {
        updateScore(score - 1)
      }

      if (
        title ===
        'Restrict corporation ownership of residential properties to specific types'
      ) {
        updateScore(score - 1)
      }

      if (title === 'Increase taxes on large corporations') {
        updateScore(score - 1)
      }

      if (title === 'Increase taxes on billionaires') {
        updateScore(score - 2)
      }

      if (
        title === 'Make it illegal for individuals to own more than two homes'
      ) {
        updateScore(score - 4)
      }
    },
    [
      incrementVolunteersRecruited,
      updateAutomaticIncrementAmount,
      automaticIncrementAmount,
      makeNextUpgradeVisible,
      incrementVolunteerRecruitersRecruited,
      incrementCampaignManagersRecruited,
      incrementTotalAdCampaigns,
      electToLocalOffice,
      reduceUpgradeCosts,
      electToRegionalOffice,
      electToNationalOffice,
      updateManualIncrementAmount,
      manualIncrementAmount,
      incrementTotalTrainingPrograms,
      updateScore,
      score,
      incrementCommunityFestivals,
      incrementAntiCorruptionLaws,
      incrementImmigrationCaps,
    ]
  )

  return { processUpgrade, makeNextUpgradeVisible }
}
