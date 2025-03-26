import { fireEvent, render, screen } from '@testing-library/react'
import type { Mock } from 'vitest'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MAXIMUM_SUPPORT_POINTS } from '../../constants/stats'
import { useGameStore } from '../../hooks/use-game-store'
import Stats from './Stats'

vi.mock('../../hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('../../hooks/use-screen-width', () => ({
  default: vi.fn(),
}))

vi.mock('react-slot-counter', () => ({
  default: ({ value }: { value: number }) => (
    <div data-testid="slot-counter">{value}</div>
  ),
}))

vi.mock('../FloatingTextButton/FloatingTextButton', () => ({
  default: ({
    children,
    onClick,
    disabled,
    floatingText,
  }: {
    children: React.ReactNode
    onClick: () => void
    disabled: boolean
    floatingText: string
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid="floating-button"
      data-floating-text={floatingText}
    >
      {children}
    </button>
  ),
}))

describe('Stats Component', () => {
  const mockGameStore = {
    score: 20,
    manualIncrementAmount: 10,
    availablePoints: 50,
    manuallyIncrementPoints: vi.fn(),
    showAnimations: true,
    allTimePoints: 100,
    updateHasGameStarted: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: typeof mockGameStore) => unknown) =>
        selector(mockGameStore)
    )
  })

  it('renders correctly with animations enabled', () => {
    render(<Stats />)

    expect(screen.getByText('Housing Unaffordability:')).toBeVisible()
    const scoreElement = screen.getByText('20')
    expect(scoreElement).toBeVisible()
    expect(scoreElement.nextSibling?.textContent).toBe('%')

    expect(screen.getByText('Support Points:')).toBeVisible()
    expect(screen.getByTestId('slot-counter')).toHaveTextContent('50')
    expect(screen.getByTestId('floating-button')).toHaveTextContent(
      'Generate Support Points'
    )
    expect(screen.getByTestId('floating-button')).toHaveAttribute(
      'data-floating-text',
      '+ 10'
    )
  })

  it('renders correctly with animations disabled', () => {
    ;(useGameStore as unknown as Mock).mockImplementation(
      (
        selector: (
          store: typeof mockGameStore & { showAnimations: boolean }
        ) => unknown
      ) =>
        selector({
          ...mockGameStore,
          showAnimations: false,
        })
    )

    render(<Stats />)

    expect(screen.getByText('50')).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Generate Support Points' })
    ).toBeVisible()
  })

  it('applies correct border color based on score', () => {
    interface MockGameStore {
      score: number
      manualIncrementAmount: number
      availablePoints: number
      manuallyIncrementPoints: Mock
      showAnimations: boolean
      allTimePoints: number
      updateHasGameStarted: Mock
    }

    // Test green border for low score
    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: MockGameStore) => unknown) =>
        selector({
          ...mockGameStore,
          score: 10,
        })
    )

    const { rerender } = render(<Stats />)
    const scoreContainer = screen.getByText('10').closest('div')?.parentElement
    expect(scoreContainer).not.toBeNull()
    if (scoreContainer) {
      expect(scoreContainer).toHaveClass('border-green-500')
    }

    // Test yellow border for medium score
    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: MockGameStore) => unknown) =>
        selector({
          ...mockGameStore,
          score: 20,
        })
    )

    rerender(<Stats />)
    expect(screen.getByText('20').closest('div')?.parentElement).toHaveClass(
      'border-yellow-500'
    )

    // Test red border for high score
    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: MockGameStore) => unknown) =>
        selector({
          ...mockGameStore,
          score: 30,
        })
    )

    rerender(<Stats />)
    expect(screen.getByText('30').closest('div')?.parentElement).toHaveClass(
      'border-red-500'
    )

    // Test animation for very high score
    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: MockGameStore) => unknown) =>
        selector({
          ...mockGameStore,
          score: 45,
        })
    )

    rerender(<Stats />)
    expect(screen.getByText('45').closest('div')?.parentElement).toHaveClass(
      'animate-pulse'
    )
  })

  it('rounds score to 2 decimal places', () => {
    interface MockGameStore {
      score: number
      manualIncrementAmount: number
      availablePoints: number
      manuallyIncrementPoints: Mock
      showAnimations: boolean
      allTimePoints: number
      updateHasGameStarted: Mock
    }

    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: MockGameStore) => unknown) =>
        selector({
          ...mockGameStore,
          score: 20.123_456,
        })
    )

    render(<Stats />)
    expect(screen.getByText('20.12')).toBeVisible()
  })

  it('calls manuallyIncrementPoints when generate button is clicked', () => {
    render(<Stats />)

    fireEvent.click(screen.getByTestId('floating-button'))

    expect(mockGameStore.manuallyIncrementPoints).toHaveBeenCalledTimes(1)
  })

  it('calls updateHasGameStarted when generate button is clicked and allTimePoints is 0', () => {
    interface MockGameStore {
      score: number
      manualIncrementAmount: number
      availablePoints: number
      manuallyIncrementPoints: Mock
      showAnimations: boolean
      allTimePoints: number
      updateHasGameStarted: Mock
    }

    ;(useGameStore as unknown as Mock).mockImplementation(
      (selector: (store: MockGameStore) => unknown) =>
        selector({
          ...mockGameStore,
          allTimePoints: 0,
        })
    )

    render(<Stats />)

    fireEvent.click(screen.getByTestId('floating-button'))

    expect(mockGameStore.updateHasGameStarted).toHaveBeenCalledTimes(1)
    expect(mockGameStore.manuallyIncrementPoints).toHaveBeenCalledTimes(1)
  })

  it('disables generate button when availablePoints exceeds maximum', () => {
    ;(useGameStore as unknown as Mock).mockImplementation(
      (
        selector: (
          store: typeof mockGameStore & { availablePoints: number }
        ) => unknown
      ) =>
        selector({
          ...mockGameStore,
          availablePoints: MAXIMUM_SUPPORT_POINTS + 1,
        })
    )

    render(<Stats />)

    expect(screen.getByTestId('floating-button')).toBeDisabled()

    fireEvent.click(screen.getByTestId('floating-button'))
    expect(mockGameStore.manuallyIncrementPoints).not.toHaveBeenCalled()
  })

  it('shows popover content when info buttons are clicked', () => {
    render(<Stats />)

    // Housing unaffordability info popup
    fireEvent.click(screen.getAllByRole('button', { name: /information/i })[0])
    expect(
      screen.getByText(/represents the percentage of households/i)
    ).toBeVisible()
    expect(screen.getByText(/30% or higher is considered/i)).toBeVisible()

    // Support points info popup
    fireEvent.click(screen.getAllByRole('button', { name: /information/i })[1])
    expect(
      screen.getByText(/support points represent your ability/i)
    ).toBeVisible()
  })
})
