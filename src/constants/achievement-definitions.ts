import { MAXIMUM_SUPPORT_POINTS } from './stats'

export const SUPPORT_POINTS_AMOUNTS = [
  100,
  1000,
  10_000,
  100_000,
  500_000,
  1_000_000,
  10_000_000,
  100_000_000,
  1_000_000_000,
  10_000_000_000,
  100_000_000_000,
  1_000_000_000_000,
  10_000_000_000_000,
  MAXIMUM_SUPPORT_POINTS,
]

export const HOUSING_AFFORDABILITY_THRESHOLDS = [30, 25, 20, 15, 10, 5, 0]

export const VOLUNTEER_THRESHOLDS = [
  1, 10, 100, 500, 1000, 10_000, 100_000, 1_000_000,
]

export const AD_CAMPAIGN_THRESHOLDS = [1, 10, 100, 500, 1000]

export const TRAINING_PROGRAM_THRESHOLDS = [1, 5, 10]

export const NIMBY_PROTEST_THRESHOLDS = [1, 2, 5, 10, 20, 50, 100, 500, 1000]

export const ACHIEVEMENT_DEFINITIONS = {
  supportPoints: SUPPORT_POINTS_AMOUNTS.map((points, index) => ({
    text: `Generate ${points.toLocaleString()} support points`,
    threshold: points,
    next:
      points < MAXIMUM_SUPPORT_POINTS
        ? `Generate ${SUPPORT_POINTS_AMOUNTS[index + 1].toLocaleString()} support points`
        : undefined,
  })),

  housingAffordability: HOUSING_AFFORDABILITY_THRESHOLDS.map((percentage) => ({
    text:
      percentage === 0
        ? 'Completely eliminate housing unaffordability'
        : `Reduce housing unaffordability to ${percentage}%`,
    threshold: percentage,
  })),

  volunteers: VOLUNTEER_THRESHOLDS.map((count, index) => ({
    text:
      count === 1
        ? 'Recruit a volunteer'
        : `Recruit ${count.toLocaleString()} volunteers`,
    threshold: count,
    next:
      count < (VOLUNTEER_THRESHOLDS.at(-1) ?? Infinity)
        ? `Recruit ${VOLUNTEER_THRESHOLDS[index + 1].toLocaleString()} volunteers`
        : undefined,
  })),

  adCampaigns: AD_CAMPAIGN_THRESHOLDS.map((count, index) => ({
    text:
      count === 1
        ? 'Run an ad campaign about the affordable housing crisis'
        : `Run ${count.toLocaleString()} ad campaigns about the affordable housing crisis`,
    threshold: count,
    next:
      count < (AD_CAMPAIGN_THRESHOLDS.at(-1) ?? Infinity)
        ? `Run ${AD_CAMPAIGN_THRESHOLDS[index + 1].toLocaleString()} ad campaigns about the affordable housing crisis`
        : undefined,
  })),

  trainingPrograms: TRAINING_PROGRAM_THRESHOLDS.map((count, index) => ({
    text:
      count === 1
        ? 'Fund a job training program'
        : `Fund ${count} job training programs`,
    threshold: count,
    next:
      count < (TRAINING_PROGRAM_THRESHOLDS.at(-1) ?? Infinity)
        ? `Fund ${TRAINING_PROGRAM_THRESHOLDS[index + 1]} job training programs`
        : undefined,
  })),

  elections: [
    {
      text: 'Get elected to local office',
      threshold: 1,
      next: 'Get elected to regional office',
    },
    {
      text: 'Get elected to regional office',
      threshold: 2,
      next: 'Get elected to national office',
    },
    {
      text: 'Get elected to national office',
      threshold: 3,
    },
  ],

  nimbyProtestsPrevented: NIMBY_PROTEST_THRESHOLDS.map((count, index) => ({
    text:
      count === 1
        ? 'Prevent a NIMBY protest'
        : `Prevent ${count} NIMBY protests`,
    threshold: count,
    next:
      count < (NIMBY_PROTEST_THRESHOLDS.at(-1) ?? Infinity)
        ? `Prevent ${NIMBY_PROTEST_THRESHOLDS[index + 1]} NIMBY protests`
        : undefined,
  })),
}
