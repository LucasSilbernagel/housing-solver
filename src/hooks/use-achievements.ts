import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { AchievementConfig } from '../utils/create-achievement-configs'
import { useAchievementConfigs } from './use-achievement-configs'
import { useCustomToast } from './use-custom-toast'
import { useGameStore } from './use-game-store'

export const useAchievements = () => {
  const {
    achievements,
    updateAchievement,
    allTimePoints,
    housingUnaffordabilityScore,
    electedToLocalOffice,
    volunteersRecruited,
    volunteerRecruitersRecruited,
    campaignManagersRecruited,
    totalAdCampaigns,
    totalTrainingPrograms,
    electedToRegionalOffice,
    electedToNationalOffice,
    nimbyProtestsPrevented,
    totalNimbyProtests,
  } = useGameStore(
    useShallow((state) => ({
      achievements: state.achievements,
      updateAchievement: state.updateAchievement,
      allTimePoints: state.allTimePoints,
      housingUnaffordabilityScore: state.housingUnaffordabilityScore,
      electedToLocalOffice: state.electedToLocalOffice,
      volunteersRecruited: state.volunteersRecruited,
      volunteerRecruitersRecruited: state.volunteerRecruitersRecruited,
      campaignManagersRecruited: state.campaignManagersRecruited,
      totalAdCampaigns: state.totalAdCampaigns,
      totalTrainingPrograms: state.totalTrainingPrograms,
      electedToRegionalOffice: state.electedToRegionalOffice,
      electedToNationalOffice: state.electedToNationalOffice,
      nimbyProtestsPrevented: state.nimbyProtestsPrevented,
      totalNimbyProtests: state.totalNimbyProtests,
    }))
  )

  const achievementConfigs = useAchievementConfigs()

  const customToast = useCustomToast()

  const totalVolunteers =
    volunteersRecruited +
    volunteerRecruitersRecruited +
    campaignManagersRecruited

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
          toast.success(achievement.message)
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

    for (const achievement of Object.values(achievementConfigs).flat()) {
      processAchievement(achievement)
    }
  }, [
    achievementConfigs,
    achievements,
    allTimePoints,
    campaignManagersRecruited,
    customToast,
    electedToLocalOffice,
    electedToNationalOffice,
    electedToRegionalOffice,
    housingUnaffordabilityScore,
    nimbyProtestsPrevented,
    totalAdCampaigns,
    totalNimbyProtests,
    totalTrainingPrograms,
    totalVolunteers,
    updateAchievement,
  ])
}
