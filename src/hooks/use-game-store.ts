import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DEFAULT_SCORE } from '../constants/defaults'
import { Upgrade, UPGRADES } from '../constants/upgrades'
import {
  Achievement,
  getInitialAchievements,
} from '../utils/get-initial-achievements'

export interface GameState {
  shouldUseDarkTheme: boolean
  toggleTheme: () => void
  housingUnaffordabilityScore: number
  updateHousingUnaffordabilityScore: (score: number) => void
  manualIncrementAmount: number
  updateManualIncrementAmount: (amount: number) => void
  automaticIncrementAmount: number
  updateAutomaticIncrementAmount: (amount: number) => void
  allTimePoints: number
  manuallyIncrementPoints: (manualIncrementAmount: number) => void
  availablePoints: number
  updateAvailablePoints: (amount: number) => void
  automaticallyIncrementPoints: () => void
  nimbyProtestsPrevented: number
  incrementNimbyProtestsPrevented: () => void
  totalNimbyProtests: number
  incrementTotalNimbyProtests: () => void
  volunteersRecruited: number
  incrementVolunteersRecruited: () => void
  volunteerRecruitersRecruited: number
  incrementVolunteerRecruitersRecruited: () => void
  campaignManagersRecruited: number
  incrementCampaignManagersRecruited: () => void
  electedToLocalOffice: boolean
  electToLocalOffice: () => void
  electedToRegionalOffice: boolean
  electToRegionalOffice: () => void
  electedToNationalOffice: boolean
  electToNationalOffice: () => void
  achievements: Achievement[]
  updateAchievement: (
    achievementText: string,
    property: 'visible' | 'achieved'
  ) => void
  upgrades: Upgrade[]
  updateUpgrade: (title: string, updatedUpgrade: Upgrade) => void
  totalAdCampaigns: number
  incrementTotalAdCampaigns: () => void
  totalTrainingPrograms: number
  incrementTotalTrainingPrograms: () => void
  reduceUpgradeCosts: (percentage: number) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set) => ({
        shouldUseDarkTheme: false,
        toggleTheme: () =>
          set((state) => ({ shouldUseDarkTheme: !state.shouldUseDarkTheme })),
        housingUnaffordabilityScore: DEFAULT_SCORE,
        updateHousingUnaffordabilityScore: (score) =>
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
          set(() => ({
            availablePoints: amount,
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
        totalNimbyProtests: 0,
        incrementTotalNimbyProtests: () =>
          set((state) => ({
            totalNimbyProtests: state.totalNimbyProtests + 1,
          })),
        volunteersRecruited: 0,
        incrementVolunteersRecruited: () =>
          set((state) => ({
            volunteersRecruited: state.volunteersRecruited + 1,
          })),
        volunteerRecruitersRecruited: 0,
        incrementVolunteerRecruitersRecruited: () =>
          set((state) => ({
            volunteerRecruitersRecruited:
              state.volunteerRecruitersRecruited + 1,
          })),
        campaignManagersRecruited: 0,
        incrementCampaignManagersRecruited: () =>
          set((state) => ({
            campaignManagersRecruited: state.campaignManagersRecruited + 1,
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
        achievements: getInitialAchievements(),
        updateAchievement: (
          achievementText: string,
          property: 'visible' | 'achieved'
        ) =>
          set((state) => ({
            achievements: state.achievements.map((achievement) =>
              achievement.text === achievementText
                ? { ...achievement, [property]: true }
                : achievement
            ),
          })),
        upgrades: UPGRADES,
        updateUpgrade: (title: string, updatedUpgrade: Upgrade) =>
          set((state) => ({
            upgrades: state.upgrades.map((upgrade) =>
              upgrade.title === title ? updatedUpgrade : upgrade
            ),
          })),
        totalAdCampaigns: 0,
        incrementTotalAdCampaigns: () =>
          set((state) => ({
            totalAdCampaigns: state.totalAdCampaigns + 1,
          })),
        totalTrainingPrograms: 0,
        incrementTotalTrainingPrograms: () =>
          set((state) => ({
            totalTrainingPrograms: state.totalTrainingPrograms + 1,
          })),
        reduceUpgradeCosts: (percentage) => {
          set((state) => ({
            upgrades: state.upgrades
              .filter((upgrade) => upgrade.visible && !upgrade.oneTimePurchase)
              .map((upgrade) => ({
                ...upgrade,
                cost: Math.round(upgrade.cost * (1 - percentage / 100)),
              })),
          }))
        },
        resetGame: () =>
          set(() => ({
            allTimePoints: 0,
            availablePoints: 0,
            housingUnaffordabilityScore: DEFAULT_SCORE,
            manualIncrementAmount: 1,
            automaticIncrementAmount: 0,
            nimbyProtestsPrevented: 0,
            totalNimbyProtests: 0,
            volunteersRecruited: 0,
            volunteerRecruitersRecruited: 0,
            campaignManagersRecruited: 0,
            electedToLocalOffice: false,
            electedToRegionalOffice: false,
            electedToNationalOffice: false,
            achievements: getInitialAchievements(),
            upgrades: UPGRADES,
            totalAdCampaigns: 0,
            totalTrainingPrograms: 0,
          })),
      }),
      {
        name: 'housing-solver-storage',
      }
    )
  )
)
