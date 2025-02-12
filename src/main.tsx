import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Link, RouterProvider, createRouter } from '@tanstack/react-router'
import { Theme, ThemePanel } from '@radix-ui/themes'
import './global.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useThemeStore } from './hooks/use-theme-store'

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found! Custom 404 page here.</p>
        <Link to="/">Go home</Link>
      </div>
    )
  },
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
  const shouldUseDarkTheme = useThemeStore((state) => state.shouldUseDarkTheme)
  return (
    <Theme appearance={shouldUseDarkTheme ? 'dark' : 'light'}>
      <RouterProvider router={router} />
      <ThemePanel />
    </Theme>
  )
}

export default AppRoot
