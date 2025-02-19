import { createFileRoute } from '@tanstack/react-router'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'
import { useAchievements } from '../hooks/use-achievements'
import { useAutomaticIncrement } from '../hooks/use-automatic-increment'
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

  return (
    <div className="mx-auto max-w-screen-2xl p-4">
      <h1 className="sr-only">Housing Solver</h1>
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-center">
        <Stats />
        <TabsCard />
      </div>
    </div>
  )
}
