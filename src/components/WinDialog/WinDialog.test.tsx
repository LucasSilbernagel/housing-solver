import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGameStore } from '../../hooks/use-game-store'
import WinDialog from './WinDialog'

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
        maxWidth?: string
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
        size?: string
      }) => (
        <div data-testid="alert-dialog-description" data-size={size}>
          {children}
        </div>
      ),
      Action: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-action">{children}</div>
      ),
      Cancel: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-cancel">{children}</div>
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

describe('WinDialog', () => {
  const resetGameMock = vi.fn()
  const completeWinFlowMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not show the dialog when player has not won the game', () => {
    vi.mocked(useGameStore).mockReturnValue({
      hasCompletedWinFlow: false,
      completeWinFlow: completeWinFlowMock,
      hasWonGame: false,
      resetGame: resetGameMock,
    })

    render(<WinDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('false')
  })

  it('should not show the dialog when win flow is already completed', () => {
    vi.mocked(useGameStore).mockReturnValue({
      hasCompletedWinFlow: true,
      completeWinFlow: completeWinFlowMock,
      hasWonGame: true,
      resetGame: resetGameMock,
    })

    render(<WinDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('false')
  })

  it('should show the dialog when the player has won and win flow is not completed', () => {
    vi.mocked(useGameStore).mockReturnValue({
      hasCompletedWinFlow: false,
      completeWinFlow: completeWinFlowMock,
      hasWonGame: true,
      resetGame: resetGameMock,
    })

    render(<WinDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('true')

    expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(
      'Congratulations!'
    )
    expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent(
      'You have successfully reduced housing unaffordability to 10% or lower.'
    )
  })

  it('should call completeWinFlow when Keep playing button is clicked', () => {
    vi.mocked(useGameStore).mockReturnValue({
      hasCompletedWinFlow: false,
      completeWinFlow: completeWinFlowMock,
      hasWonGame: true,
      resetGame: resetGameMock,
    })

    render(<WinDialog />)

    fireEvent.click(screen.getByText('Keep playing'))

    expect(completeWinFlowMock).toHaveBeenCalledTimes(1)
  })

  it('should call resetGame when Start over button is clicked', () => {
    vi.mocked(useGameStore).mockReturnValue({
      hasCompletedWinFlow: false,
      completeWinFlow: completeWinFlowMock,
      hasWonGame: true,
      resetGame: resetGameMock,
    })

    render(<WinDialog />)

    fireEvent.click(screen.getByText('Start over'))

    expect(resetGameMock).toHaveBeenCalledTimes(1)
  })
})
