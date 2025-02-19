import { UPGRADES } from '../constants/upgrades'
import { getInitialAchievements } from '../utils/get-initial-achievements'
import { GameState } from './use-game-store'

const useIsGameState = () => {
  const initialAchievements = getInitialAchievements()
  function isGameState(object: unknown): object is GameState {
    const candidate = object as Partial<GameState>
    return (
      typeof candidate === 'object' &&
      candidate !== null &&
      typeof candidate.shouldUseDarkTheme === 'boolean' &&
      typeof candidate.housingUnaffordabilityScore === 'number' &&
      !Number.isNaN(candidate.housingUnaffordabilityScore) &&
      Number.isFinite(candidate.housingUnaffordabilityScore) &&
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
      typeof candidate.upgrades === typeof UPGRADES
    )
  }
  return isGameState
}

export default useIsGameState
