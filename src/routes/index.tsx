import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'
import WinDialog from '../components/WinDialog/WinDialog'
import { useAchievements } from '../hooks/use-achievements'
import { useAutomaticIncrement } from '../hooks/use-automatic-increment'
import { useGameStore } from '../hooks/use-game-store'
import { useRandomEvents } from '../hooks/use-random-events'
import { useRenderUpgrades } from '../hooks/use-render-upgrades'
import { useWinGame } from '../hooks/use-win-game'
import { SocialMetaTags, updateMetaTags } from '../utils/seo'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const metaTags: SocialMetaTags = {
      title: 'Housing Solver',
      description:
        'Think you have what it takes to solve the affordable housing crisis? Prove it in this incremental clicker game!',
      image: 'https://yourdomain.com/share-image.jpg',
      url: globalThis.location.href,
    }
    // Update meta tags when route loads
    updateMetaTags(metaTags)
  },
  component: Index,
})

function Index() {
  const { incrementPlayTime, allTimePoints } = useGameStore(
    useShallow((state) => ({
      incrementPlayTime: state.incrementPlayTime,
      allTimePoints: state.allTimePoints,
    }))
  )

  useAchievements()
  useAutomaticIncrement()
  useRenderUpgrades()
  useRandomEvents()
  useWinGame()

  useEffect(() => {
    if (allTimePoints === 0) return
    const interval = setInterval(() => {
      incrementPlayTime()
    }, 1000)
    return () => clearInterval(interval)
  }, [incrementPlayTime, allTimePoints])

  return (
    <div className="mx-auto p-4 max-w-screen-2xl">
      <h1 className="sr-only">Housing Solver</h1>
      <div className="flex md:flex-row flex-col md:justify-center items-center md:items-start gap-4">
        <Stats />
        <TabsCard />
      </div>
      <WinDialog />
    </div>
  )
}
