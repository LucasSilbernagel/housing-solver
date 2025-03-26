import * as ReactRouter from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as UseGameStore from './hooks/use-game-store'
import { GameState } from './hooks/use-game-store'

vi.mock('@radix-ui/themes', () => ({
  Theme: ({
    children,
    appearance,
  }: {
    children: React.ReactNode
    appearance: string
  }) => (
    <div data-testid="theme-provider" data-appearance={appearance}>
      {children}
    </div>
  ),
}))

vi.mock('@tanstack/react-router', () => ({
  RouterProvider: ({ router }: { router: { routeTree?: string } }) => (
    <div data-testid="router-provider">
      {router.routeTree ? 'Router Mounted' : ''}
    </div>
  ),
  createRouter: vi.fn(() => ({
    routeTree: 'mocked-route-tree',
  })),
}))

vi.mock('react-hot-toast', () => ({
  Toaster: ({ toastOptions }: { toastOptions: { duration: number } }) => (
    <div data-testid="toaster" data-duration={toastOptions.duration}>
      Toast Provider
    </div>
  ),
}))

vi.mock('./hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('./routeTree.gen', () => ({
  routeTree: 'mocked-route-tree',
}))

const createRootMock = vi.fn(() => ({
  render: vi.fn(),
}))

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock,
  default: {
    createRoot: createRootMock,
  },
}))

vi.mock('./components/NotFoundPage/NotFoundPage', () => ({
  default: () => <div>Not Found</div>,
}))

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal()
  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      StrictMode: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
    }
  }
  return actual
})

describe('AppRoot', () => {
  // Create the root element before each test
  beforeEach(() => {
    vi.clearAllMocks()

    // Create a root element for each test
    const mockRootElement = document.createElement('div')
    mockRootElement.id = 'root'
    mockRootElement.innerHTML = 'placeholder' // Set some content initially
    document.body.append(mockRootElement)

    // Default mock implementation for useGameStore
    vi.mocked(UseGameStore.useGameStore).mockImplementation((selector) =>
      selector({ shouldUseDarkTheme: false } as GameState)
    )
  })

  // Clean up after each test
  afterEach(() => {
    const rootElement = document.querySelector('#root')
    if (rootElement) {
      rootElement.remove()
    }
    vi.resetModules()
  })

  it('renders with light theme by default', async () => {
    const { default: AppRoot } = await import('./main')

    render(<AppRoot />)

    const themeProvider = screen.getByTestId('theme-provider')
    expect(themeProvider).toBeInTheDocument()
    expect(themeProvider).toHaveAttribute('data-appearance', 'light')

    const routerProvider = screen.getByTestId('router-provider')
    expect(routerProvider).toBeInTheDocument()
    expect(routerProvider).toHaveTextContent('Router Mounted')

    const toaster = screen.getByTestId('toaster')
    expect(toaster).toBeInTheDocument()
    expect(toaster).toHaveAttribute('data-duration', '5000')
  })

  it('renders with dark theme when shouldUseDarkTheme is true', async () => {
    vi.mocked(UseGameStore.useGameStore).mockImplementation((selector) =>
      selector({ shouldUseDarkTheme: true } as GameState)
    )

    const { default: AppRoot } = await import('./main')

    render(<AppRoot />)

    const themeProvider = screen.getByTestId('theme-provider')
    expect(themeProvider).toBeInTheDocument()
    expect(themeProvider).toHaveAttribute('data-appearance', 'dark')
  })

  it('initializes the router with correct configuration', async () => {
    await import('./main')

    expect(ReactRouter.createRouter).toHaveBeenCalledWith({
      routeTree: 'mocked-route-tree',
      defaultNotFoundComponent: expect.any(Function),
    })
  })

  it('creates root and renders app on initial load', async () => {
    vi.resetModules()

    const rootElement = document.querySelector('#root')
    if (rootElement) {
      rootElement.innerHTML = ''
    }

    await import('./main')

    expect(createRootMock).toHaveBeenCalled()
  })
})
