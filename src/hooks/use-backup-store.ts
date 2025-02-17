import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { useGameStore } from './use-game-store'
import useIsGameState from './use-is-game-state'

export const useBackupStore = () => {
  const isGameState = useIsGameState()

  const serializeStore = () => {
    const state = useGameStore.getState()
    const jsonState = JSON.stringify(state)
    const compressedState = compressToEncodedURIComponent(jsonState)
    return compressedState
  }

  const deserializeStore = (compressedData: string) => {
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

  return { serializeStore, deserializeStore }
}
