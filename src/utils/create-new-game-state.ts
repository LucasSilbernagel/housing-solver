import { DEFAULT_SCORE } from '../constants/defaults'
import { UPGRADES } from '../constants/upgrades'
import { getInitialAchievements } from './get-initial-achievements'

export const createNewGameState = () => ({
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
  upgrades: structuredClone(UPGRADES),
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
  hasGameStarted: false,
})
