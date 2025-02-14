import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { GameState, useGameStore } from '../hooks/use-game-store'

function isGameState(object: unknown): object is GameState {
  const candidate = object as Partial<GameState>
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    typeof candidate.shouldUseDarkTheme === 'boolean' &&
    typeof candidate.housingUnaffordabilityScore === 'number' &&
    typeof candidate.manualIncrementAmount === 'number' &&
    typeof candidate.supportPoints === 'number'
  )
}

export const serializeStore = () => {
  const state = useGameStore.getState()
  const jsonState = JSON.stringify(state)
  const compressedState = compressToEncodedURIComponent(jsonState)
  return compressedState
}

export const deserializeStore = (compressedData: string) => {
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
