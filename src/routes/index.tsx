import { Button } from '@radix-ui/themes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <h1>Housing Solver</h1>
      <Button>Click me</Button>
    </>
  )
}
