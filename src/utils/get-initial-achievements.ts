import { ACHIEVEMENT_DEFINITIONS } from '../constants/achievement-definitions'

export interface Achievement {
  text: string
  visible: boolean
  achieved: boolean
}

export const getInitialAchievements = (): Achievement[] => {
  const allAchievements = Object.values(ACHIEVEMENT_DEFINITIONS).flat()
  return allAchievements.map((achievement) => ({
    text: achievement.text,
    visible:
      achievement.text === 'Generate 100 support points' ||
      achievement.text === 'Recruit a volunteer',
    achieved: false,
  }))
}
