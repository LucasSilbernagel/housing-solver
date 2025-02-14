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
    Number.isFinite(candidate.manualIncrementAmount) &&
    typeof candidate.supportPoints === 'number' &&
    !Number.isNaN(candidate.supportPoints) &&
    Number.isFinite(candidate.supportPoints) &&
    !Number.isNaN(candidate.nimbyProtestsPrevented) &&
    Number.isFinite(candidate.nimbyProtestsPrevented) &&
    !Number.isNaN(candidate.volunteersRecruited) &&
    Number.isFinite(candidate.volunteersRecruited) &&
    typeof candidate.electToLocalOffice === 'boolean' &&
    typeof candidate.electToRegionalOffice === 'boolean' &&
    typeof candidate.electToNationalOffice === 'boolean' &&
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
  if (compressedData.length > 50_000) {
    throw new Error('Backup data too large')
  }
  const jsonData = decompressFromEncodedURIComponent(compressedData)
  if (!jsonData) {
    throw new Error('Invalid game backup data')
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
