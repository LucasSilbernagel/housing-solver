import { createFileRoute } from '@tanstack/react-router'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'
import { useLocalStorage } from '../hooks/use-localstorage'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  useLocalStorage()

  return (
    <div className="p-4">
      <h1 className="sr-only">Housing Solver</h1>
      <div className="flex xl:flex-row flex-col gap-4">
        <Stats />
        <TabsCard />
      </div>
    </div>
  )
}
