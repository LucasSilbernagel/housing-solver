import { createFileRoute } from '@tanstack/react-router'
import Stats from '../components/Stats/Stats'
import TabsCard from '../components/Tabs/TabsCard/TabsCard'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
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
