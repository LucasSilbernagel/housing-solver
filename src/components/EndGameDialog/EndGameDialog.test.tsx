import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGameStore } from '../../hooks/use-game-store'
import EndGameDialog from './EndGameDialog'

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
      Content: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-content">{children}</div>
      ),
      Title: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-title">{children}</div>
      ),
      Description: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-description">{children}</div>
      ),
      Action: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="alert-dialog-action">{children}</div>
      ),
    },
    Button: ({
      children,
      onClick,
    }: {
      children: React.ReactNode
      onClick?: () => void
    }) => (
      <button data-testid="button" onClick={onClick}>
        {children}
      </button>
    ),
    Flex: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="flex">{children}</div>
    ),
  }
})

describe('EndGameDialog', () => {
  const resetGameMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should not show the dialog when the game is not over', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      isGameOver: false,
    })

    render(<EndGameDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('false')
  })

  it('should show the dialog when the game is over', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      isGameOver: true,
    })

    render(<EndGameDialog />)

    const dialog = screen.getByTestId('alert-dialog')
    expect(dialog.dataset.open).toBe('true')
  })

  it('should display congratulations message', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      isGameOver: true,
    })

    render(<EndGameDialog />)

    expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(
      'Congratulations!'
    )
    expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent(
      'You have completely eliminated housing unaffordability!'
    )
  })

  it('should call resetGame when Play again button is clicked', () => {
    vi.mocked(useGameStore).mockReturnValue({
      resetGame: resetGameMock,
      isGameOver: true,
    })

    render(<EndGameDialog />)

    fireEvent.click(screen.getByText('Play again'))

    expect(resetGameMock).toHaveBeenCalledTimes(1)
  })
})
