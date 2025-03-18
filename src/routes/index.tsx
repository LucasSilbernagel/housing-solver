import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import EndGameDialog from '../components/EndGameDialog/EndGameDialog'
import LoseDialog from '../components/LoseDialog/LoseDialog'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'
import WinDialog from '../components/WinDialog/WinDialog'
import { useAchievements } from '../hooks/use-achievements'
import { useAutomaticIncrement } from '../hooks/use-automatic-increment'
import { useEndGame } from '../hooks/use-end-game'
import { useGameStore } from '../hooks/use-game-store'
import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion'
import { useRandomEvents } from '../hooks/use-random-events'
import { useRenderUpgrades } from '../hooks/use-render-upgrades'
import { SocialMetaTags, updateMetaTags } from '../utils/seo'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const metaTags: SocialMetaTags = {
      title: 'Housing Solver',
    }
    // Update meta tags when route loads
    updateMetaTags(metaTags)
  },
  component: Index,
})

function Index() {
  const { incrementPlayTime, hasGameStarted } = useGameStore(
    useShallow((state) => ({
      incrementPlayTime: state.incrementPlayTime,
      hasGameStarted: state.hasGameStarted,
    }))
  )

  useAchievements()
  useAutomaticIncrement()
  useRenderUpgrades()
  useRandomEvents()
  useEndGame()
  usePrefersReducedMotion()

  useEffect(() => {
    if (!hasGameStarted) return
    const interval = setInterval(() => {
      incrementPlayTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [incrementPlayTime, hasGameStarted])

  return (
    <div className="mx-auto p-4 max-w-screen-2xl">
      <h1 className="sr-only">Housing Solver</h1>
      <div className="flex md:flex-row flex-col md:justify-center items-center md:items-start gap-4">
        <div className="top-4 static md:sticky min-w-max">
          <Stats />
        </div>
        <TabsCard />
      </div>
      <WinDialog />
      <LoseDialog />
      <EndGameDialog />
    </div>
  )
}
