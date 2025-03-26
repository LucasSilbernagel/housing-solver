import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGameStore } from '../../hooks/use-game-store'
import LoseDialog from './LoseDialog'

vi.mock('../../hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('@radix-ui/themes', async () => {
  const actual = await vi.importActual('@radix-ui/themes')
  return {
    ...actual,
    AlertDialog: {
      Root: ({
        children,
        open,
      }: {
        children: React.ReactNode
        open: boolean
      }) => (
        <div data-testid="alert-dialog" data-open={open}>
          {children}
        </div>
      ),
      Content: ({
        children,
        maxWidth,
      }: {
        children: React.ReactNode
        maxWidth: string
      }) => (
        <div data-testid="alert-dialog-content" data-max-width={maxWidth}>
          {children}
        </div>
      ),
      Title: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-title">{children}</div>
      ),
      Description: ({
        children,
        size,
      }: {
        children: React.ReactNode
        size: string
      }) => (
        <div data-testid="alert-dialog-description" data-size={size}>
          {children}
        </div>
      ),
      Action: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-action">{children}</div>
      ),
    },
    Button: ({
      children,
      onClick,
      variant,
      color,
    }: {
      children: React.ReactNode
      onClick?: () => void
      variant?: string
      color?: string
    }) => (
      <button
        data-testid="button"
        data-variant={variant}
        data-color={color}
        onClick={onClick}
      >
        {children}
      </button>
    ),
    Flex: ({
      children,
      gap,
      mt,
      justify,
    }: {
      children: React.ReactNode
      gap?: string
      mt?: string
      justify?: string
    }) => (
      <div
        data-testid="flex"
        data-gap={gap}
        data-mt={mt}
        data-justify={justify}
      >
        {children}
      </div>
    ),
  }
})

describe('LoseDialog', () => {
  const resetGameMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not show the dialog when hasLostGame is false', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      hasLostGame: false,
    })

    render(<LoseDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('false')
  })

  it('should show the dialog when hasLostGame is true', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      hasLostGame: true,
    })

    render(<LoseDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('true')
  })

  it('should display lose message', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      hasLostGame: true,
    })

    render(<LoseDialog />)

    expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(
      'You lose!'
    )
    expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent(
      'Unfortunately, housing unaffordability is now much worse than when you started playing. Hopefully you learned from your mistakes!'
    )
  })

  it('should call resetGame when Try again button is clicked', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      hasLostGame: true,
    })

    render(<LoseDialog />)

    fireEvent.click(screen.getByText('Try again'))

    expect(resetGameMock).toHaveBeenCalledTimes(1)
  })

  it('should have correct styling props', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      hasLostGame: true,
    })

    render(<LoseDialog />)

    // Check content max width
    const content = screen.getByTestId('alert-dialog-content')
    expect(content.dataset.maxWidth).toBe('450px')

    // Check description size
    const description = screen.getByTestId('alert-dialog-description')
    expect(description.dataset.size).toBe('2')

    // Check flex styling
    const flex = screen.getByTestId('flex')
    expect(flex.dataset.gap).toBe('3')
    expect(flex.dataset.mt).toBe('4')
    expect(flex.dataset.justify).toBe('end')

    // Check button styling
    const button = screen.getByTestId('button')
    expect(button.dataset.variant).toBe('solid')
    expect(button.dataset.color).toBe('blue')
  })
})
