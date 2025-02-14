import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useAchievements = () => {
  const { achievements, updateAchievement, supportPoints } = useGameStore(
    useShallow((state) => ({
      achievements: state.achievements,
      updateAchievement: state.updateAchievement,
      supportPoints: state.supportPoints,
    }))
  )

  useEffect(() => {
    const isAchievementAchieved = (achievementText: string) => {
      return achievements.find(
        (achievement) => achievement.text === achievementText
      )?.achieved
    }

    if (
      supportPoints >= 100 &&
      !isAchievementAchieved('Generate 100 support points')
    ) {
      updateAchievement('Generate 100 support points', 'achieved', true)
      toast.success('Generated 100 support points!')
      updateAchievement('Generate 1,000 support points', 'visible', true)
    }
    if (
      supportPoints >= 1000 &&
      !isAchievementAchieved('Generate 1,000 support points')
    ) {
      updateAchievement('Generate 1,000 support points', 'achieved', true)
      toast.success('Generated 1,000 support points!')
      updateAchievement('Generate 10,000 support points', 'visible', true)
    }
  }, [supportPoints, updateAchievement, achievements])
}
