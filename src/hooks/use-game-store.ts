import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface GameState {
  shouldUseDarkTheme: boolean
  toggleTheme: () => void
  housingUnaffordabilityScore: number
  setHousingUnaffordabilityScore: (score: number) => void
  manualIncrementAmount: number
  updateManualIncrementAmount: (amount: number) => void
  supportPoints: number
  generateSupportPoints: (manualIncrementAmount: number) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        shouldUseDarkTheme: false,
        toggleTheme: () =>
          set((state) => ({ shouldUseDarkTheme: !state.shouldUseDarkTheme })),
        housingUnaffordabilityScore: 35,
        setHousingUnaffordabilityScore: (score) =>
          set(() => ({ housingUnaffordabilityScore: score })),
        manualIncrementAmount: 1,
        updateManualIncrementAmount: (amount) =>
          set(() => ({ housingUnaffordabilityScore: amount })),
        supportPoints: 0,
        generateSupportPoints: () =>
          set((state) => ({
            supportPoints: state.supportPoints + state.manualIncrementAmount,
          })),
        resetGame: () =>
          set(() => ({
            supportPoints: 0,
            housingUnaffordabilityScore: 35,
            manualIncrementAmount: 1,
          })),
      }),
      {
        name: 'housing-solver-store',
      }
    )
  )
)
