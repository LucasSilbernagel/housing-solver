import { ACHIEVEMENT_DEFINITIONS } from '../constants/achievement-definitions'

export interface GameStateValues {
  allTimePoints: number
  housingUnaffordabilityScore: number
  electedToLocalOffice: boolean
  electedToRegionalOffice: boolean
  electedToNationalOffice: boolean
  volunteersRecruited: number
  volunteerRecruitersRecruited: number
  campaignManagersRecruited: number
  totalAdCampaigns: number
  totalTrainingPrograms: number
  nimbyProtestsPrevented: number
}

export interface AchievementConfig {
  text: string
  threshold: number
  next?: string
  customCheck?: () => boolean
  message?: string
}

export const createAchievementConfigs = ({
  volunteersRecruited,
  volunteerRecruitersRecruited,
  campaignManagersRecruited,
  allTimePoints,
  housingUnaffordabilityScore,
  totalAdCampaigns,
  totalTrainingPrograms,
  nimbyProtestsPrevented,
  electedToLocalOffice,
  electedToRegionalOffice,
  electedToNationalOffice,
}: GameStateValues) => {
  const getTotalVolunteers = () => {
    return (
      volunteersRecruited +
      volunteerRecruitersRecruited +
      campaignManagersRecruited
    )
  }

  return {
    supportPoints: ACHIEVEMENT_DEFINITIONS.supportPoints.map((definition) => ({
      ...definition,
      customCheck: () => allTimePoints >= definition.threshold,
      message: `Generated ${definition.threshold.toLocaleString()} support points!`,
    })),

    housingAffordability: ACHIEVEMENT_DEFINITIONS.housingAffordability.map(
      (definition) => ({
        ...definition,
        customCheck: () => housingUnaffordabilityScore <= definition.threshold,
        message:
          definition.threshold === 0
            ? 'You have completely eliminated housing unaffordability!'
            : `Reduced housing unaffordability to ${definition.threshold}% or lower!`,
      })
    ),

    volunteers: ACHIEVEMENT_DEFINITIONS.volunteers.map((definition) => ({
      ...definition,
      customCheck: () => getTotalVolunteers() >= definition.threshold,
      message:
        definition.threshold === 1
          ? 'You recruited your first volunteer!'
          : `You recruited ${definition.threshold.toLocaleString()} volunteers!`,
    })),

    adCampaigns: ACHIEVEMENT_DEFINITIONS.adCampaigns.map((definition) => ({
      ...definition,
      customCheck: () => totalAdCampaigns >= definition.threshold,
      message:
        definition.threshold === 1
          ? 'You ran your first ad campaign about the affordable housing crisis!'
          : `You ran ${definition.threshold.toLocaleString()} ad campaigns about the affordable housing crisis!`,
    })),

    trainingPrograms: ACHIEVEMENT_DEFINITIONS.trainingPrograms.map(
      (definition) => ({
        ...definition,
        customCheck: () => totalTrainingPrograms >= definition.threshold,
        message:
          definition.threshold === 1
            ? 'You successfully funded a job training program!'
            : `You funded ${definition.threshold} job training programs!`,
      })
    ),

    elections: ACHIEVEMENT_DEFINITIONS.elections.map((definition, index) => ({
      ...definition,
      customCheck: () => {
        switch (index) {
          case 0: {
            return electedToLocalOffice
          }
          case 1: {
            return electedToRegionalOffice
          }
          case 2: {
            return electedToNationalOffice
          }
          default: {
            return false
          }
        }
      },
      message: `You were elected to ${
        index === 0 ? 'local' : index === 1 ? 'regional' : 'national'
      } office!`,
    })),

    nimbyProtestsPrevented: ACHIEVEMENT_DEFINITIONS.nimbyProtestsPrevented.map(
      (definition) => ({
        ...definition,
        customCheck: () => nimbyProtestsPrevented >= definition.threshold,
        message:
          definition.threshold === 1
            ? 'You were able to prevent a NIMBY protest!'
            : `You prevented ${definition.threshold} NIMBY protests!`,
      })
    ),
  }
}
