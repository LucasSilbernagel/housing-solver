import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Achievement, ACHIEVEMENTS } from '../constants/achievements'

export interface GameState {
  shouldUseDarkTheme: boolean
  toggleTheme: () => void
  housingUnaffordabilityScore: number
  setHousingUnaffordabilityScore: (score: number) => void
  manualIncrementAmount: number
  updateManualIncrementAmount: (amount: number) => void
  supportPoints: number
  generateSupportPoints: (manualIncrementAmount: number) => void
  nimbyProtestsPrevented: number
  incrementNimbyProtestsPrevented: () => void
  volunteersRecruited: number
  incrementVolunteersRecruited: () => void
  electedToLocalOffice: boolean
  electToLocalOffice: () => void
  electedToRegionalOffice: boolean
  electToRegionalOffice: () => void
  electedToNationalOffice: boolean
  electToNationalOffice: () => void
  achievements: Achievement[]
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
        nimbyProtestsPrevented: 0,
        incrementNimbyProtestsPrevented: () =>
          set((state) => ({
            nimbyProtestsPrevented: state.nimbyProtestsPrevented + 1,
          })),
        volunteersRecruited: 0,
        incrementVolunteersRecruited: () =>
          set((state) => ({
            nimbyProtestsPrevented: state.nimbyProtestsPrevented + 1,
          })),
        electedToLocalOffice: false,
        electToLocalOffice: () =>
          set(() => ({
            electedToLocalOffice: true,
          })),
        electedToRegionalOffice: false,
        electToRegionalOffice: () =>
          set(() => ({
            electedToRegionalOffice: true,
          })),
        electedToNationalOffice: false,
        electToNationalOffice: () =>
          set(() => ({
            electedToNationalOffice: true,
          })),
        achievements: ACHIEVEMENTS,
        resetGame: () =>
          set(() => ({
            supportPoints: 0,
            housingUnaffordabilityScore: 35,
            manualIncrementAmount: 1,
            nimbyProtestsPrevented: 0,
            volunteersRecruited: 0,
            electedToLocalOffice: false,
            electedToRegionalOffice: false,
            electedToNationalOffice: false,
            achievements: ACHIEVEMENTS,
          })),
      }),
      {
        name: 'housing-solver-storage',
      }
    )
  )
)
