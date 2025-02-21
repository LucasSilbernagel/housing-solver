import { createFileRoute } from '@tanstack/react-router'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'
import { useAchievements } from '../hooks/use-achievements'
import { useAutomaticIncrement } from '../hooks/use-automatic-increment'
import { useRandomEvents } from '../hooks/use-random-events'
import { useRenderUpgrades } from '../hooks/use-render-upgrades'
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
  useAchievements()
  useAutomaticIncrement()
  useRenderUpgrades()
  useRandomEvents()

  return (
    <div className="mx-auto p-4 max-w-screen-2xl">
      <h1 className="sr-only">Housing Solver</h1>
      <div className="flex md:flex-row flex-col md:justify-center items-center md:items-start gap-4">
        <Stats />
        <TabsCard />
      </div>
    </div>
  )
}
