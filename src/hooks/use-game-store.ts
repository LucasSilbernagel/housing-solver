import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { DEFAULT_SCORE } from '../constants/defaults'
import { Upgrade, UPGRADES } from '../constants/upgrades'
import {
  Achievement,
  getInitialAchievements,
} from '../utils/get-initial-achievements'

export interface Announcement {
  title: string
  description?: string
  timestamp: number
}

export interface GameState {
  shouldUseDarkTheme: boolean
  toggleTheme: () => void
  showAnimations: boolean
  toggleShowAnimations: () => void
  score: number
  updateScore: (score: number) => void
  manualIncrementAmount: number
  updateManualIncrementAmount: (amount: number) => void
  automaticIncrementAmount: number
  updateAutomaticIncrementAmount: (amount: number) => void
  allTimePoints: number
  updateAllPoints: (amount: number) => void
  manuallyIncrementPoints: (manualIncrementAmount: number) => void
  availablePoints: number
  updateAvailablePoints: (amount: number) => void
  totalPointsSpent: number
  updateTotalPointsSpent: (amount: number) => void
  automaticallyIncrementPoints: () => void
  nimbyProtestsPrevented: number
  incrementNimbyProtestsPrevented: () => void
  totalNimbyProtests: number
  incrementTotalNimbyProtests: () => void
  corruptionScandalsPrevented: number
  incrementCorruptionScandalsPrevented: () => void
  totalCorruptionScandals: number
  incrementTotalCorruptionScandals: () => void
  immigrationWavesPrevented: number
  incrementImmigrationWavesPrevented: () => void
  totalImmigrationWaves: number
  incrementTotalImmigrationWaves: () => void
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
  communityFestivals: number
  incrementCommunityFestivals: () => void
  decrementCommunityFestivals: () => void
  antiCorruptionLaws: number
  incrementAntiCorruptionLaws: () => void
  decrementAntiCorruptionLaws: () => void
  immigrationCaps: number
  incrementImmigrationCaps: () => void
  decrementImmigrationCaps: () => void
  announcements: Announcement[]
  addToAnnouncements: (announcement: {
    title: string
    description?: string
    timestamp: number
  }) => void
  totalUpgradesPurchased: number
  incrementTotalUpgradesPurchased: () => void
  totalAchievementsEarned: number
  calculateTotalAchievements: () => number
  totalPlayTime: number
  incrementPlayTime: () => void
  hasWonGame: boolean
  winGame: () => void
  hasCompletedWinFlow: boolean
  completeWinFlow: () => void
  hasLostGame: boolean
  loseGame: () => void
  isGameOver: boolean
  endGame: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        shouldUseDarkTheme: false,
        toggleTheme: () =>
          set((state) => ({ shouldUseDarkTheme: !state.shouldUseDarkTheme })),
        showAnimations: true,
        toggleShowAnimations: () =>
          set((state) => ({ showAnimations: !state.showAnimations })),
        score: DEFAULT_SCORE,
        updateScore: (score) => set(() => ({ score: score })),
        manualIncrementAmount: 1,
        updateManualIncrementAmount: (amount) =>
          set(() => ({ manualIncrementAmount: amount })),
        automaticIncrementAmount: 0,
        updateAutomaticIncrementAmount: (amount) =>
          set(() => ({ automaticIncrementAmount: amount })),
        allTimePoints: 0,
        updateAllPoints: (amount) =>
          set(() => ({
            allTimePoints: amount,
            availablePoints: amount,
          })),
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
        totalPointsSpent: 0,
        updateTotalPointsSpent: (amount) =>
          set(() => ({
            totalPointsSpent: amount,
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
        corruptionScandalsPrevented: 0,
        incrementCorruptionScandalsPrevented: () =>
          set((state) => ({
            corruptionScandalsPrevented: state.corruptionScandalsPrevented + 1,
          })),
        totalCorruptionScandals: 0,
        incrementTotalCorruptionScandals: () =>
          set((state) => ({
            totalCorruptionScandals: state.totalCorruptionScandals + 1,
          })),
        immigrationWavesPrevented: 0,
        incrementImmigrationWavesPrevented: () =>
          set((state) => ({
            immigrationWavesPrevented: state.immigrationWavesPrevented + 1,
          })),
        totalImmigrationWaves: 0,
        incrementTotalImmigrationWaves: () =>
          set((state) => ({
            totalImmigrationWaves: state.totalImmigrationWaves + 1,
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
          set((state) => {
            const updatedAchievements = state.achievements.map((achievement) =>
              achievement.text === achievementText
                ? { ...achievement, [property]: true }
                : achievement
            )
            const updatedTotal = updatedAchievements.filter(
              (achievement) => achievement.achieved
            ).length
            return {
              achievements: updatedAchievements,
              totalAchievementsEarned: updatedTotal,
            }
          }),
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
            upgrades: state.upgrades.map((upgrade) => ({
              ...upgrade,
              cost:
                upgrade.visible && !upgrade.oneTimePurchase
                  ? Math.round(upgrade.cost * (1 - percentage / 100))
                  : upgrade.cost,
            })),
          }))
        },
        communityFestivals: 0,
        incrementCommunityFestivals: () =>
          set((state) => ({
            communityFestivals: state.communityFestivals + 1,
          })),
        decrementCommunityFestivals: () =>
          set((state) => ({
            communityFestivals: state.communityFestivals - 1,
          })),
        antiCorruptionLaws: 0,
        incrementAntiCorruptionLaws: () =>
          set((state) => ({
            antiCorruptionLaws: state.antiCorruptionLaws + 1,
          })),
        decrementAntiCorruptionLaws: () =>
          set((state) => ({
            antiCorruptionLaws: state.antiCorruptionLaws - 1,
          })),
        immigrationCaps: 0,
        incrementImmigrationCaps: () =>
          set((state) => ({
            immigrationCaps: state.immigrationCaps + 1,
          })),
        decrementImmigrationCaps: () =>
          set((state) => ({
            immigrationCaps: state.immigrationCaps - 1,
          })),
        announcements: [],
        addToAnnouncements: (announcement) =>
          set((state) => ({
            announcements: [...state.announcements, announcement].slice(-20),
          })),
        totalUpgradesPurchased: 0,
        incrementTotalUpgradesPurchased: () =>
          set((state) => ({
            totalUpgradesPurchased: state.totalUpgradesPurchased + 1,
          })),
        totalAchievementsEarned: 0,
        calculateTotalAchievements: () => {
          const state = get()
          return state.achievements.filter(
            (achievement) => achievement.achieved
          ).length
        },
        totalPlayTime: 0,
        incrementPlayTime: () => {
          set((state) => ({
            totalPlayTime: state.totalPlayTime + 1,
          }))
        },
        hasWonGame: false,
        winGame: () => {
          set(() => ({
            hasWonGame: true,
          }))
        },
        hasCompletedWinFlow: false,
        completeWinFlow: () => {
          set(() => ({
            hasCompletedWinFlow: true,
          }))
        },
        hasLostGame: false,
        loseGame: () => {
          set(() => ({
            hasLostGame: true,
          }))
        },
        isGameOver: false,
        endGame: () => {
          set(() => ({
            isGameOver: true,
          }))
        },
        resetGame: () =>
          set(() => ({
            allTimePoints: 0,
            availablePoints: 0,
            score: DEFAULT_SCORE,
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
            communityFestivals: 0,
            announcements: [],
            totalPointsSpent: 0,
            totalUpgradesPurchased: 0,
            totalAchievementsEarned: 0,
            totalPlayTime: 0,
            hasWonGame: false,
            hasCompletedWinFlow: false,
            hasLostGame: false,
            isGameOver: false,
            corruptionScandalsPrevented: 0,
            totalCorruptionScandals: 0,
            antiCorruptionLaws: 0,
            immigrationWavesPrevented: 0,
            totalImmmigrationWaves: 0,
            immigrationCaps: 0,
          })),
      }),
      {
        name: 'housing-solver-storage',
      }
    )
  )
)
