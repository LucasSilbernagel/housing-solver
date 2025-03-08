import { useShallow } from 'zustand/shallow'
import { useGameStore } from '../../../hooks/use-game-store'
import StatCard from './StatCard/StatCard'

const Stats = () => {
  const {
    allTimePoints,
    automaticIncrementAmount,
    manualIncrementAmount,
    totalPointsSpent,
    totalUpgradesPurchased,
    totalAchievementsEarned,
    totalPlayTime,
    showAnimations,
  } = useGameStore(
    useShallow((state) => ({
      allTimePoints: state.allTimePoints,
      automaticIncrementAmount: state.automaticIncrementAmount,
      manualIncrementAmount: state.manualIncrementAmount,
      totalPointsSpent: state.totalPointsSpent,
      totalUpgradesPurchased: state.totalUpgradesPurchased,
      totalAchievementsEarned: state.totalAchievementsEarned,
      totalPlayTime: state.totalPlayTime,
      showAnimations: state.showAnimations,
    }))
  )

  const formatLiveDuration = (seconds: number) => {
    if (seconds === 0) return '0 seconds'

    const units = [
      { name: 'year', seconds: 31_536_000 },
      { name: 'month', seconds: 2_592_000 },
      { name: 'week', seconds: 604_800 },
      { name: 'day', seconds: 86_400 },
      { name: 'hour', seconds: 3600 },
      { name: 'minute', seconds: 60 },
      { name: 'second', seconds: 1 },
    ]

    let remainingSeconds = seconds
    const parts = []

    for (const unit of units) {
      const value = Math.floor(remainingSeconds / unit.seconds)
      if (value > 0) {
        parts.push(`${value} ${unit.name}${value === 1 ? '' : 's'}`)
        remainingSeconds %= unit.seconds
      }
    }

    return parts.join(', ')
  }

  const stats = [
    {
      label: 'Support points earned per click:',
      value: manualIncrementAmount.toLocaleString(),
    },
    {
      label: 'Support points automatically earned per second:',
      value: automaticIncrementAmount.toLocaleString(),
    },
    {
      label: 'Total support points generated:',
      value: Math.floor(allTimePoints).toLocaleString(),
    },
    {
      label: 'Total support points spent:',
      value: totalPointsSpent.toLocaleString(),
    },
    {
      label: 'Total upgrades purchased:',
      value: totalUpgradesPurchased.toLocaleString(),
    },
    {
      label: 'Total achievements earned:',
      value: totalAchievementsEarned.toLocaleString(),
    },
    {
      label: 'Total play time:',
      value: formatLiveDuration(totalPlayTime),
    },
  ]

  return (
    <ul className="space-y-4">
      {stats.map((stat) => {
        return (
          <StatCard
            key={stat.label.replaceAll(' ', '-')}
            {...stat}
            showAnimations={showAnimations}
          />
        )
      })}
    </ul>
  )
}

export default Stats
