import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { AchievementConfig } from '../utils/create-achievement-configs'
import { useAchievementConfigs } from './use-achievement-configs'
import { useCustomToast } from './use-custom-toast'
import { useGameStore } from './use-game-store'

export const useAchievements = () => {
  const {
    achievements,
    updateAchievement,
    electedToLocalOffice,
    campaignManagersRecruited,
    totalAdCampaigns,
    totalNimbyProtests,
    totalCorruptionScandals,
    totalImmigrationWaves,
  } = useGameStore(
    useShallow((state) => ({
      achievements: state.achievements,
      updateAchievement: state.updateAchievement,
      electedToLocalOffice: state.electedToLocalOffice,
      campaignManagersRecruited: state.campaignManagersRecruited,
      totalAdCampaigns: state.totalAdCampaigns,
      totalNimbyProtests: state.totalNimbyProtests,
      totalCorruptionScandals: state.totalCorruptionScandals,
      totalImmigrationWaves: state.totalImmigrationWaves,
    }))
  )

  const achievementConfigs = useAchievementConfigs()

  const customToast = useCustomToast()

  useEffect(() => {
    const checkAchievement = (
      text: string,
      attribute: 'visible' | 'achieved'
    ) => {
      return achievements.find((achievement) => achievement.text === text)?.[
        attribute
      ]
    }

    const processAchievement = (achievement: AchievementConfig) => {
      if (
        achievement.customCheck?.() &&
        !checkAchievement(achievement.text, 'achieved')
      ) {
        updateAchievement(achievement.text, 'achieved')
        if (achievement.message) {
          customToast({ type: 'success', content: achievement.message })
        }
        if (achievement.next) {
          updateAchievement(achievement.next, 'visible')
        }
      }
    }

    // Special visibility checks for certain achievement types
    if (electedToLocalOffice) {
      for (const achievement of achievementConfigs.housingAffordability) {
        if (!checkAchievement(achievement.text, 'visible')) {
          updateAchievement(achievement.text, 'visible')
        }
      }
    }
    if (campaignManagersRecruited >= 1) {
      const firstAdCampaign = achievementConfigs.adCampaigns[0]
      if (!checkAchievement(firstAdCampaign.text, 'visible')) {
        updateAchievement(firstAdCampaign.text, 'visible')
      }
    }
    if (totalAdCampaigns >= 1) {
      const firstElection = achievementConfigs.elections[0]
      if (!checkAchievement(firstElection.text, 'visible')) {
        updateAchievement(firstElection.text, 'visible')
      }
    }
    if (totalNimbyProtests >= 1) {
      const firstProtestPrevented = achievementConfigs.nimbyProtestsPrevented[0]
      if (!checkAchievement(firstProtestPrevented.text, 'visible')) {
        updateAchievement(firstProtestPrevented.text, 'visible')
      }
    }
    if (totalCorruptionScandals >= 1) {
      const firstCorruptionScandalPrevented =
        achievementConfigs.corruptionScandalsPrevented[0]
      if (!checkAchievement(firstCorruptionScandalPrevented.text, 'visible')) {
        updateAchievement(firstCorruptionScandalPrevented.text, 'visible')
      }
    }
    if (totalImmigrationWaves >= 1) {
      const firstImmigrationWavePrevented =
        achievementConfigs.immigrationWavesPrevented[0]
      if (!checkAchievement(firstImmigrationWavePrevented.text, 'visible')) {
        updateAchievement(firstImmigrationWavePrevented.text, 'visible')
      }
    }

    for (const achievement of Object.values(achievementConfigs).flat()) {
      processAchievement(achievement)
    }
  }, [
    achievementConfigs,
    achievements,
    campaignManagersRecruited,
    customToast,
    electedToLocalOffice,
    totalAdCampaigns,
    totalCorruptionScandals,
    totalImmigrationWaves,
    totalNimbyProtests,
    updateAchievement,
  ])
}
