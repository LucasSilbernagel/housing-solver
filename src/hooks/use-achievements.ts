import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useAchievements = () => {
  const {
    achievements,
    updateAchievement,
    allTimePoints,
    housingUnaffordabilityScore,
    electedToLocalOffice,
  } = useGameStore(
    useShallow((state) => ({
      achievements: state.achievements,
      updateAchievement: state.updateAchievement,
      allTimePoints: state.allTimePoints,
      housingUnaffordabilityScore: state.housingUnaffordabilityScore,
      electedToLocalOffice: state.electedToLocalOffice,
    }))
  )

  useEffect(() => {
    const checkAchievement = (
      achievementText: string,
      attribute: 'visible' | 'achieved'
    ) => {
      return achievements.find(
        (achievement) => achievement.text === achievementText
      )?.[attribute]
    }

    if (
      allTimePoints >= 100 &&
      !checkAchievement('Generate 100 support points', 'achieved')
    ) {
      updateAchievement('Generate 100 support points', 'achieved', true)
      toast.success('Generated 100 support points!')
      updateAchievement('Generate 1,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 1000 &&
      !checkAchievement('Generate 1,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 1,000 support points', 'achieved', true)
      toast.success('Generated 1,000 support points!')
      updateAchievement('Generate 10,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 10_000 &&
      !checkAchievement('Generate 10,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 10,000 support points', 'achieved', true)
      toast.success('Generated 10,000 support points!')
      updateAchievement('Generate 100,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 100_000 &&
      !checkAchievement('Generate 100,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 100,000 support points', 'achieved', true)
      toast.success('Generated 100,000 support points!')
      updateAchievement('Generate 500,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 500_000 &&
      !checkAchievement('Generate 500,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 500,000 support points', 'achieved', true)
      toast.success('Generated 500,000 support points!')
      updateAchievement('Generate 1,000,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 1_000_000 &&
      !checkAchievement('Generate 1,000,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 1,000,000 support points', 'achieved', true)
      toast.success('Generated 1,000,000 support points!')
      updateAchievement('Generate 10,000,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 10_000_000 &&
      !checkAchievement('Generate 10,000,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 10,000,000 support points', 'achieved', true)
      toast.success('Generated 10,000,000 support points!')
      updateAchievement('Generate 100,000,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 100_000_000 &&
      !checkAchievement('Generate 100,000,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 100,000,000 support points', 'achieved', true)
      toast.success('Generated 100,000,000 support points!')
      updateAchievement(
        'Generate 1,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 1_000_000_000 &&
      !checkAchievement('Generate 1,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 1,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 1,000,000,000 support points!')
      updateAchievement(
        'Generate 10,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 10_000_000_000 &&
      !checkAchievement('Generate 10,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 10,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 10,000,000,000 support points!')
      updateAchievement(
        'Generate 100,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 100_000_000_000 &&
      !checkAchievement('Generate 100,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 100,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 100,000,000,000 support points!')
      updateAchievement(
        'Generate 1,000,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 1_000_000_000_000 &&
      !checkAchievement('Generate 1,000,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 1,000,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 1,000,000,000,000 support points!')
      updateAchievement(
        'Generate 10,000,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 10_000_000_000_000 &&
      !checkAchievement(
        'Generate 10,000,000,000,000 support points',
        'achieved'
      )
    ) {
      updateAchievement(
        'Generate 10,000,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 10,000,000,000,000 support points!')
      updateAchievement(
        'Generate 100,000,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 100_000_000_000_000 &&
      !checkAchievement(
        'Generate 100,000,000,000,000 support points',
        'achieved'
      )
    ) {
      updateAchievement(
        'Generate 100,000,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 100,000,000,000,000 support points!')
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 30%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 30%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 25%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 25%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 20%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 20%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 15%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 15%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 10%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 10%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 5%', 'visible')
    ) {
      updateAchievement('Reduce housing unaffordability to 5%', 'visible', true)
    }
    if (
      electedToLocalOffice &&
      !checkAchievement(
        'Completely eliminate housing unaffordability',
        'visible'
      )
    ) {
      updateAchievement(
        'Completely eliminate housing unaffordability',
        'visible',
        true
      )
    }
    if (
      housingUnaffordabilityScore <= 30 &&
      !checkAchievement('Reduce housing unaffordability to 30%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 30%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 30% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 25 &&
      !checkAchievement('Reduce housing unaffordability to 25%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 25%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 25% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 20 &&
      !checkAchievement('Reduce housing unaffordability to 20%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 20%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 20% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 15 &&
      !checkAchievement('Reduce housing unaffordability to 15%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 15%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 15% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 10 &&
      !checkAchievement('Reduce housing unaffordability to 10%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 10%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 10% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 5 &&
      !checkAchievement('Reduce housing unaffordability to 5%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 5%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 5% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 0 &&
      !checkAchievement(
        'Completely eliminate housing unaffordability',
        'achieved'
      )
    ) {
      updateAchievement(
        'Completely eliminate housing unaffordability',
        'achieved',
        true
      )
      toast.success('You have completely eliminated housing unaffordability!')
    }
  }, [
    allTimePoints,
    updateAchievement,
    achievements,
    housingUnaffordabilityScore,
    electedToLocalOffice,
  ])
}
