import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { ACHIEVEMENTS } from '../constants/achievements'
import { GameState, useGameStore } from '../hooks/use-game-store'

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
    !Number.isNaN(candidate.totalTrainingProgramsFunded) &&
    Number.isFinite(candidate.totalTrainingProgramsFunded) &&
    !Number.isNaN(candidate.totalNimbyProtests) &&
    Number.isFinite(candidate.totalNimbyProtests) &&
    typeof candidate.electedToLocalOffice === 'boolean' &&
    typeof candidate.electedToRegionalOffice === 'boolean' &&
    typeof candidate.electedToNationalOffice === 'boolean' &&
    typeof candidate.achievements === typeof ACHIEVEMENTS
  )
}

export const serializeStore = () => {
  const state = useGameStore.getState()
  const jsonState = JSON.stringify(state)
  const compressedState = compressToEncodedURIComponent(jsonState)
  return compressedState
}

export const deserializeStore = (compressedData: string) => {
  if (compressedData.length > 10_000) {
    throw new Error('Backup data too large')
  }
  const jsonData = decompressFromEncodedURIComponent(compressedData)
  if (!jsonData) {
    throw new Error('There was an error parsing the provided backup data')
  }

  try {
    const parsedData = JSON.parse(jsonData) as unknown
    if (!isGameState(parsedData)) {
      throw new Error('Invalid game backup data')
    }

    useGameStore.setState(parsedData)
  } catch (error) {
    console.error('Failed to parse game backup:', error)
    throw new Error('Failed to parse game backup')
  }
}
