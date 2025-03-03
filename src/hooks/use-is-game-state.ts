import { UPGRADES } from '../constants/upgrades'
import { getInitialAchievements } from '../utils/get-initial-achievements'
import { Announcement, GameState } from './use-game-store'

const useIsGameState = () => {
  const initialAchievements = getInitialAchievements()
  function isGameState(object: unknown): object is GameState {
    const candidate = object as Partial<GameState>
    return (
      typeof candidate === 'object' &&
      candidate !== null &&
      typeof candidate.shouldUseDarkTheme === 'boolean' &&
      typeof candidate.showAnimations === 'boolean' &&
      typeof candidate.shouldOverrideBrowserReducedMotion === 'boolean' &&
      typeof candidate.hasWonGame === 'boolean' &&
      typeof candidate.hasCompletedWinFlow === 'boolean' &&
      typeof candidate.hasGameStarted === 'boolean' &&
      typeof candidate.hasLostGame === 'boolean' &&
      typeof candidate.isGameOver === 'boolean' &&
      typeof candidate.score === 'number' &&
      !Number.isNaN(candidate.score) &&
      Number.isFinite(candidate.score) &&
      !Number.isNaN(candidate.corruptionScandalsPrevented) &&
      Number.isFinite(candidate.corruptionScandalsPrevented) &&
      !Number.isNaN(candidate.totalCorruptionScandals) &&
      Number.isFinite(candidate.totalCorruptionScandals) &&
      !Number.isNaN(candidate.antiCorruptionLaws) &&
      Number.isFinite(candidate.antiCorruptionLaws) &&
      !Number.isNaN(candidate.immigrationWavesPrevented) &&
      Number.isFinite(candidate.immigrationWavesPrevented) &&
      !Number.isNaN(candidate.totalImmigrationWaves) &&
      Number.isFinite(candidate.totalImmigrationWaves) &&
      !Number.isNaN(candidate.immigrationCaps) &&
      Number.isFinite(candidate.immigrationCaps) &&
      !Number.isNaN(candidate.totalPointsSpent) &&
      Number.isFinite(candidate.totalPointsSpent) &&
      !Number.isNaN(candidate.totalUpgradesPurchased) &&
      Number.isFinite(candidate.totalUpgradesPurchased) &&
      !Number.isNaN(candidate.totalAchievementsEarned) &&
      Number.isFinite(candidate.totalAchievementsEarned) &&
      !Number.isNaN(candidate.totalPlayTime) &&
      Number.isFinite(candidate.totalPlayTime) &&
      typeof candidate.manualIncrementAmount === 'number' &&
      !Number.isNaN(candidate.manualIncrementAmount) &&
      typeof candidate.automaticIncrementAmount === 'number' &&
      !Number.isNaN(candidate.automaticIncrementAmount) &&
      Number.isFinite(candidate.manualIncrementAmount) &&
      typeof candidate.allTimePoints === 'number' &&
      !Number.isNaN(candidate.allTimePoints) &&
      Number.isFinite(candidate.allTimePoints) &&
      !Number.isNaN(candidate.availablePoints) &&
      Number.isFinite(candidate.availablePoints) &&
      !Number.isNaN(candidate.nimbyProtestsPrevented) &&
      Number.isFinite(candidate.nimbyProtestsPrevented) &&
      !Number.isNaN(candidate.volunteersRecruited) &&
      Number.isFinite(candidate.volunteersRecruited) &&
      !Number.isNaN(candidate.volunteerRecruitersRecruited) &&
      Number.isFinite(candidate.volunteerRecruitersRecruited) &&
      !Number.isNaN(candidate.campaignManagersRecruited) &&
      Number.isFinite(candidate.campaignManagersRecruited) &&
      !Number.isNaN(candidate.totalAdCampaigns) &&
      Number.isFinite(candidate.totalAdCampaigns) &&
      !Number.isNaN(candidate.totalTrainingPrograms) &&
      Number.isFinite(candidate.totalTrainingPrograms) &&
      !Number.isNaN(candidate.totalNimbyProtests) &&
      Number.isFinite(candidate.totalNimbyProtests) &&
      typeof candidate.electedToLocalOffice === 'boolean' &&
      typeof candidate.electedToRegionalOffice === 'boolean' &&
      typeof candidate.electedToNationalOffice === 'boolean' &&
      typeof candidate.achievements === typeof initialAchievements &&
      typeof candidate.upgrades === typeof UPGRADES &&
      !Number.isNaN(candidate.communityFestivals) &&
      Number.isFinite(candidate.communityFestivals) &&
      Array.isArray(candidate.announcements) &&
      candidate.announcements.every(
        (announcement): announcement is Announcement =>
          typeof announcement === 'object'
      )
    )
  }
  return isGameState
}

export default useIsGameState
