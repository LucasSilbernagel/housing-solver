import { Theme } from '@radix-ui/themes'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './global.css'

// Import the generated route tree
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import { useGameStore } from './hooks/use-game-store'
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.querySelector('#root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AppRoot />
    </StrictMode>
  )
}

function AppRoot() {
  const shouldUseDarkTheme = useGameStore((state) => state.shouldUseDarkTheme)
  return (
    <Theme appearance={shouldUseDarkTheme ? 'dark' : 'light'}>
      <RouterProvider router={router} />
      <Toaster toastOptions={{ duration: 7000 }} />
    </Theme>
  )
}

export default AppRoot
