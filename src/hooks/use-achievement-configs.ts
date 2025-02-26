import { useShallow } from 'zustand/shallow'
import { createAchievementConfigs } from '../utils/create-achievement-configs'
import { useGameStore } from './use-game-store'

export const useAchievementConfigs = () => {
  const state = useGameStore(
    useShallow((state) => ({
      allTimePoints: state.allTimePoints,
      score: state.score,
      electedToLocalOffice: state.electedToLocalOffice,
      electedToRegionalOffice: state.electedToRegionalOffice,
      electedToNationalOffice: state.electedToNationalOffice,
      volunteersRecruited: state.volunteersRecruited,
      volunteerRecruitersRecruited: state.volunteerRecruitersRecruited,
      campaignManagersRecruited: state.campaignManagersRecruited,
      totalAdCampaigns: state.totalAdCampaigns,
      totalTrainingPrograms: state.totalTrainingPrograms,
      nimbyProtestsPrevented: state.nimbyProtestsPrevented,
    }))
  )

  return createAchievementConfigs(state)
}
