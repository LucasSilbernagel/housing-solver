import { createFileRoute } from '@tanstack/react-router'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'
import { useAchievements } from '../hooks/use-achievements'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  useAchievements()

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
