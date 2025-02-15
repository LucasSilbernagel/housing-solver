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
  automaticIncrementAmount: number
  updateAutomaticIncrementAmount: (amount: number) => void
  allTimePoints: number
  manuallyIncrementPoints: (manualIncrementAmount: number) => void
  availablePoints: number
  updateAvailablePoints: (amount: number) => void
  automaticallyIncrementPoints: (manualIncrementAmount: number) => void
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
  updateAchievement: (
    achievementText: string,
    property: 'visible' | 'achieved',
    value: boolean
  ) => void
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
          set(() => ({ manualIncrementAmount: amount })),
        automaticIncrementAmount: 0,
        updateAutomaticIncrementAmount: (amount) =>
          set(() => ({ automaticIncrementAmount: amount })),
        allTimePoints: 0,
        manuallyIncrementPoints: () =>
          set((state) => ({
            allTimePoints: state.allTimePoints + state.manualIncrementAmount,
            availablePoints:
              state.availablePoints + state.manualIncrementAmount,
          })),
        availablePoints: 0,
        updateAvailablePoints: (amount) =>
          set((state) => ({
            availablePoints: state.availablePoints + amount,
          })),
        automaticallyIncrementPoints: () =>
          set((state) => ({
            allTimePoints: state.allTimePoints + state.automaticIncrementAmount,
            availablePoints:
              state.availablePoints + state.automaticIncrementAmount,
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
        updateAchievement: (
          achievementText: string,
          property: 'visible' | 'achieved',
          value: boolean
        ) =>
          set((state) => ({
            achievements: state.achievements.map((achievement) =>
              achievement.text === achievementText
                ? { ...achievement, [property]: value }
                : achievement
            ),
          })),
        resetGame: () =>
          set(() => ({
            allTimePoints: 0,
            availablePoints: 0,
            housingUnaffordabilityScore: 35,
            manualIncrementAmount: 1,
            automaticIncrementAmount: 0,
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
