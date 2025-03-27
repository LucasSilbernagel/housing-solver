import { fireEvent, render, screen } from '@testing-library/react'
import toast from 'react-hot-toast'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useBackupStore } from '../../../hooks/use-backup-store'
import { useGameStore } from '../../../hooks/use-game-store'
import Settings from './Settings'

vi.mock('../../../hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('../../../hooks/use-backup-store', () => ({
  useBackupStore: vi.fn(),
}))

vi.mock('clipboard-copy', () => ({
  default: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('@radix-ui/themes', () => ({
  AlertDialog: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="alert-dialog-root">{children}</div>
    ),
    Trigger: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="alert-dialog-trigger">{children}</div>
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
    Cancel: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="alert-dialog-cancel">{children}</div>
    ),
    Action: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="alert-dialog-action">{children}</div>
    ),
  },
  Button: ({
    children,
    onClick,
    disabled,
    color,
    variant,
  }: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    color?: string
    variant?: string
  }) => (
    <button
      data-testid="button"
      data-color={color}
      data-variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  ),
  Flex: ({
    children,
    gap,
    direction,
    justify,
    style,
  }: {
    children: React.ReactNode
    gap?: string
    direction?: string
    justify?: string
    style?: React.CSSProperties
  }) => (
    <div
      data-testid="flex"
      data-gap={gap}
      data-direction={direction}
      data-justify={justify}
      style={style}
    >
      {children}
    </div>
  ),
  Switch: ({
    size,
    checked,
    onClick,
  }: {
    size?: string
    checked?: boolean
    onClick?: () => void
  }) => (
    <div
      role="switch"
      data-testid="switch"
      data-size={size}
      aria-checked={checked}
      onClick={onClick}
      onKeyDown={(event_) => {
        if (event_.key === 'Enter' || event_.key === ' ') {
          event_.preventDefault()
          onClick?.()
        }
      }}
      tabIndex={0}
    />
  ),
  Text: ({
    children,
    as,
    size,
  }: {
    children: React.ReactNode
    as?: string
    size?: string
  }) => (
    <div data-testid="text" data-as={as} data-size={size}>
      {children}
    </div>
  ),
  TextArea: ({
    placeholder,
    onChange,
    value,
    style,
  }: {
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    value?: string
    style?: React.CSSProperties
  }) => (
    <textarea
      data-testid="textarea"
      placeholder={placeholder}
      value={value}
      style={style}
      onChange={onChange}
    />
  ),
  Tooltip: ({
    children,
    content,
  }: {
    children: React.ReactNode
    content?: string
  }) => (
    <div data-testid="tooltip" data-content={content}>
      {children}
    </div>
  ),
  IconButton: ({
    children,
    onClick,
    variant,
    style,
  }: {
    children: React.ReactNode
    onClick?: () => void
    variant?: string
    style?: React.CSSProperties
  }) => (
    <button
      data-testid="icon-button"
      data-variant={variant}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  ),
  Separator: ({ size }: { size?: string }) => (
    <div data-testid="separator" data-size={size} />
  ),
}))

describe('Settings Component', () => {
  const mockToggleTheme = vi.fn()
  const mockResetGame = vi.fn()
  const mockToggleShowAnimations = vi.fn()
  const mockUpdateShouldOverrideBrowserReducedMotion = vi.fn()
  const mockSerializeStore = vi.fn()
  const mockDeserializeStore = vi.fn()

  const defaultMockState = {
    shouldUseDarkTheme: false,
    toggleTheme: mockToggleTheme,
    resetGame: mockResetGame,
    allTimePoints: 100,
    showAnimations: true,
    toggleShowAnimations: mockToggleShowAnimations,
    shouldOverrideBrowserReducedMotion: false,
    updateShouldOverrideBrowserReducedMotion:
      mockUpdateShouldOverrideBrowserReducedMotion,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useGameStore).mockReturnValue(defaultMockState)
    vi.mocked(useBackupStore).mockReturnValue({
      serializeStore: mockSerializeStore,
      deserializeStore: mockDeserializeStore,
    })

    mockSerializeStore.mockReturnValue('mock-serialized-store')
  })

  it('renders theme toggle switch correctly', () => {
    render(<Settings />)

    const switches = screen.getAllByTestId('switch')
    const themeSwitch = switches[0]

    expect(themeSwitch).toHaveAttribute('aria-checked', 'false')
    expect(screen.getAllByTestId('text')[0]).toHaveTextContent('Dark theme')
  })

  it('renders animations toggle switch correctly', () => {
    render(<Settings />)

    const switches = screen.getAllByTestId('switch')
    const animationsSwitch = switches[1]

    expect(animationsSwitch).toHaveAttribute('aria-checked', 'true')
    expect(screen.getAllByTestId('text')[1]).toHaveTextContent('Animations')
  })

  it('toggles theme when dark theme switch is clicked', () => {
    render(<Settings />)

    const switches = screen.getAllByTestId('switch')
    const themeSwitch = switches[0]

    const onClickFunction = themeSwitch.onclick

    if (onClickFunction) {
      fireEvent.click(themeSwitch)
    } else {
      fireEvent.click(themeSwitch)
    }

    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('toggles animations and updates override when animations switch is clicked', () => {
    render(<Settings />)

    const switches = screen.getAllByTestId('switch')
    const animationsSwitch = switches[1]

    const onClickFunction = animationsSwitch.onclick

    if (onClickFunction) {
      fireEvent.click(animationsSwitch)
    } else {
      fireEvent.click(animationsSwitch)
    }

    expect(mockToggleShowAnimations).toHaveBeenCalledTimes(1)
    expect(mockUpdateShouldOverrideBrowserReducedMotion).toHaveBeenCalledTimes(
      1
    )
  })

  it('does not update override when animations switch is clicked and override is already true', () => {
    vi.mocked(useGameStore).mockReturnValue({
      shouldUseDarkTheme: false,
      toggleTheme: mockToggleTheme,
      resetGame: mockResetGame,
      allTimePoints: 100,
      showAnimations: true,
      toggleShowAnimations: mockToggleShowAnimations,
      shouldOverrideBrowserReducedMotion: true,
      updateShouldOverrideBrowserReducedMotion:
        mockUpdateShouldOverrideBrowserReducedMotion,
    })

    render(<Settings />)

    const switches = screen.getAllByTestId('switch')
    const animationsSwitch = switches[1]

    const onClickFunction = animationsSwitch.onclick

    if (onClickFunction) {
      fireEvent.click(animationsSwitch)
    } else {
      fireEvent.click(animationsSwitch)
    }

    expect(mockToggleShowAnimations).toHaveBeenCalledTimes(1)
    expect(mockUpdateShouldOverrideBrowserReducedMotion).not.toHaveBeenCalled()
  })

  it('renders backup textarea and buttons', () => {
    render(<Settings />)

    expect(screen.getByTestId('textarea')).toBeVisible()
    expect(screen.getByText('Create backup')).toBeVisible()
    expect(screen.getByText('Import backup')).toBeVisible()
  })

  it('creates backup when Create backup button is clicked', () => {
    render(<Settings />)

    fireEvent.click(screen.getByText('Create backup'))

    expect(mockSerializeStore).toHaveBeenCalledTimes(1)
    expect(screen.getByTestId('textarea')).toHaveValue('mock-serialized-store')
  })

  it('displays copy button when backup is created', () => {
    render(<Settings />)

    expect(screen.queryByTestId('icon-button')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Create backup'))

    expect(screen.getByTestId('icon-button')).toBeVisible()
    expect(screen.getByTestId('tooltip')).toHaveAttribute(
      'data-content',
      'Copy backup code'
    )
  })

  it('loads backup when Import backup button is clicked', () => {
    render(<Settings />)

    const textarea = screen.getByTestId('textarea')
    fireEvent.change(textarea, { target: { value: 'test-backup-data' } })

    fireEvent.click(screen.getByText('Import backup'))

    expect(mockDeserializeStore).toHaveBeenCalledWith('test-backup-data')
    expect(textarea).toHaveValue('')
    expect(toast.success).toHaveBeenCalledWith('Backup loaded successfully', {
      ariaProps: {
        role: 'alert',
        'aria-live': 'assertive',
      },
    })
  })

  it('shows error toast when backup import fails', () => {
    mockDeserializeStore.mockImplementation(() => {
      throw new Error('Invalid backup data')
    })

    render(<Settings />)

    const textarea = screen.getByTestId('textarea')
    fireEvent.change(textarea, { target: { value: 'invalid-backup-data' } })

    fireEvent.click(screen.getByText('Import backup'))

    expect(mockDeserializeStore).toHaveBeenCalledWith('invalid-backup-data')
    expect(toast.error).toHaveBeenCalledWith(
      'Failed to load backup: Invalid backup data',
      {
        ariaProps: {
          role: 'alert',
          'aria-live': 'assertive',
        },
      }
    )
  })

  it('disables Create backup button when allTimePoints is 0', () => {
    vi.mocked(useGameStore).mockReturnValue({
      ...defaultMockState,
      allTimePoints: 0,
    })

    render(<Settings />)

    const createBackupButton = screen
      .getByText('Create backup')
      .closest('button')
    expect(createBackupButton).toBeDisabled()
  })

  it('disables Import backup button when backup string is empty', () => {
    render(<Settings />)

    const importBackupButton = screen
      .getByText('Import backup')
      .closest('button')
    expect(importBackupButton).toBeDisabled()

    const textarea = screen.getByTestId('textarea')
    fireEvent.change(textarea, { target: { value: 'test-backup-data' } })

    expect(importBackupButton).not.toBeDisabled()
  })

  it('renders reset game button and dialog', () => {
    render(<Settings />)

    expect(screen.getAllByText('Reset game').length).toEqual(3)
    expect(screen.getByTestId('alert-dialog-root')).toBeVisible()
  })

  it('calls resetGame when reset confirmation is clicked', () => {
    render(<Settings />)

    const resetButton = screen
      .getByTestId('alert-dialog-action')
      .querySelector('button')

    fireEvent.click(resetButton!)

    expect(mockResetGame).toHaveBeenCalledTimes(1)
  })

  it('disables Reset game button when allTimePoints is 0', () => {
    vi.mocked(useGameStore).mockReturnValue({
      shouldUseDarkTheme: false,
      toggleTheme: mockToggleTheme,
      resetGame: mockResetGame,
      allTimePoints: 0,
      showAnimations: true,
      toggleShowAnimations: mockToggleShowAnimations,
      shouldOverrideBrowserReducedMotion: false,
      updateShouldOverrideBrowserReducedMotion:
        mockUpdateShouldOverrideBrowserReducedMotion,
    })

    render(<Settings />)

    const resetGameButton = screen
      .getByTestId('alert-dialog-trigger')
      .querySelector('button')
    expect(resetGameButton).toBeDisabled()
  })

  it('renders developer link', () => {
    render(<Settings />)

    const link = screen.getByText('Lucas Silbernagel')
    expect(link).toHaveAttribute('href', 'https://lucassilbernagel.com/')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders "Buy me a coffee" link', () => {
    render(<Settings />)

    expect(screen.getByAltText('Buy Me A Coffee')).toBeVisible()
    expect(screen.getByAltText('Buy Me A Coffee').closest('a')).toHaveAttribute(
      'href',
      'https://www.buymeacoffee.com/LucasSilbernagel'
    )
  })
})
