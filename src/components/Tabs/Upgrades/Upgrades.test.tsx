import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Upgrade } from '../../../constants/upgrades'
import { useCustomToast } from '../../../hooks/use-custom-toast'
import { useGameStore } from '../../../hooks/use-game-store'
import { useProcessUpgrade } from '../../../hooks/use-process-upgrade'
import Upgrades from './Upgrades'

vi.mock('../../../hooks/use-game-store')
vi.mock('../../../hooks/use-process-upgrade')
vi.mock('../../../hooks/use-custom-toast')
vi.mock('@radix-ui/themes', () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
  }) => (
    <button onClick={onClick} disabled={disabled} data-testid="purchase-button">
      {children}
    </button>
  ),
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="upgrade-card" className={className}>
      {children}
    </div>
  ),
  Text: ({
    children,
    wrap,
    size,
    className,
    color,
  }: {
    children: React.ReactNode
    wrap?: boolean
    size?: string
    className?: string
    color?: string
  }) => (
    <span
      data-testid="text"
      data-wrap={wrap}
      data-size={size}
      className={className}
      data-color={color}
    >
      {children}
    </span>
  ),
  Tooltip: ({
    children,
    content,
  }: {
    children: React.ReactNode
    content: string
  }) => (
    <div data-testid="tooltip" data-content={content}>
      {children}
    </div>
  ),
}))
vi.mock('@radix-ui/react-icons', () => ({
  CheckIcon: ({
    width,
    height,
    color,
  }: {
    width?: number
    height?: number
    color?: string
  }) => (
    <svg data-testid="check-icon" width={width} height={height} color={color} />
  ),
}))
vi.mock('../../FloatingTextButton/FloatingTextButton', () => ({
  default: ({
    children,
    onClick,
    floatingText,
  }: {
    children: React.ReactNode
    onClick: () => void
    floatingText: string
  }) => (
    <button
      onClick={onClick}
      data-testid="floating-button"
      data-floating-text={floatingText}
    >
      {children}
    </button>
  ),
}))

const mockUpgrades: Upgrade[] = [
  {
    title: 'Basic Upgrade',
    description: 'A simple upgrade',
    cost: 100,
    quantity: 0,
    visible: true,
    maximumQuantity: undefined,
  },
  {
    title: 'Premium Upgrade',
    description: 'A one-time purchase',
    cost: 500,
    quantity: 0,
    visible: true,
    maximumQuantity: 1,
  },
  {
    title: 'Multi Upgrade',
    description: 'Can purchase multiple times',
    cost: 200,
    quantity: 2,
    visible: true,
    maximumQuantity: 5,
  },
  {
    title: 'Max Purchased',
    description: 'Already purchased max times',
    cost: 300,
    quantity: 3,
    visible: true,
    maximumQuantity: 3,
  },
  {
    title: 'Hidden Upgrade',
    description: 'Not visible yet',
    cost: 1000,
    quantity: 0,
    visible: false,
  },
]

describe('Upgrades', () => {
  const mockUpdateUpgrade = vi.fn()
  const mockUpdateAvailablePoints = vi.fn()
  const mockUpdateTotalPointsSpent = vi.fn()
  const mockIncrementTotalUpgradesPurchased = vi.fn()
  const mockProcessUpgrade = vi.fn()
  const mockMakeNextUpgradeVisible = vi.fn()
  const mockCustomToast = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useGameStore).mockReturnValue({
      upgrades: mockUpgrades,
      updateUpgrade: mockUpdateUpgrade,
      availablePoints: 300,
      updateAvailablePoints: mockUpdateAvailablePoints,
      totalPointsSpent: 0,
      updateTotalPointsSpent: mockUpdateTotalPointsSpent,
      incrementTotalUpgradesPurchased: mockIncrementTotalUpgradesPurchased,
      showAnimations: false,
    })

    vi.mocked(useProcessUpgrade).mockReturnValue({
      processUpgrade: mockProcessUpgrade,
      makeNextUpgradeVisible: mockMakeNextUpgradeVisible,
    })

    vi.mocked(useCustomToast).mockReturnValue(mockCustomToast)
  })

  it('renders visible upgrades correctly', () => {
    render(<Upgrades />)

    const cards = screen.getAllByTestId('upgrade-card')
    expect(cards.length).toBe(5)

    expect(screen.getByText(/Premium Upgrade/).closest('li')).not.toHaveClass(
      'hidden'
    )
    expect(screen.getByText(/Multi Upgrade/).closest('li')).not.toHaveClass(
      'hidden'
    )
    expect(screen.getByText(/Basic Upgrade/).closest('li')).not.toHaveClass(
      'hidden'
    )
    expect(screen.getByText(/Max Purchased/).closest('li')).not.toHaveClass(
      'hidden'
    )
    expect(screen.getByText(/Hidden Upgrade/).closest('li')).toHaveClass(
      'hidden'
    )
  })

  it('displays upgrade quantities correctly', () => {
    render(<Upgrades />)

    const cards = screen.getAllByTestId('upgrade-card')
    const multiUpgradeCard = cards.find((card) =>
      card.textContent?.includes('Multi Upgrade')
    )

    expect(multiUpgradeCard).toBeVisible()
    expect(multiUpgradeCard).toHaveTextContent('2')
    expect(multiUpgradeCard).toHaveTextContent('/ 5')

    const basicUpgradeCard = cards.find((card) =>
      card.textContent?.includes('Basic Upgrade')
    )
    expect(basicUpgradeCard).toBeVisible()
  })

  it('shows purchase button when upgrade is affordable', () => {
    render(<Upgrades />)

    // Available points: 300
    // Basic Upgrade: 100 (affordable)
    const purchaseButtons = screen.getAllByTestId('purchase-button')
    expect(purchaseButtons.length).toBeGreaterThan(0)

    // Premium Upgrade: 500 (not affordable)
    const tooltips = screen.getAllByTestId('tooltip')
    const notEnoughPointsTooltip = tooltips.find(
      (tooltip) => tooltip.dataset.content === 'Not enough points'
    )
    expect(notEnoughPointsTooltip).toBeVisible()
  })

  it('shows check icon for fully purchased upgrades', () => {
    render(<Upgrades />)

    // Max Purchased upgrade has quantity 3/3
    const checkIcons = screen.getAllByTestId('check-icon')
    expect(checkIcons.length).toBe(1)

    const purchasedTooltip = screen
      .getAllByTestId('tooltip')
      .find((tooltip) => tooltip.dataset.content === 'Purchased')
    expect(purchasedTooltip).toBeVisible()
  })

  it('handles purchase correctly when upgrade is affordable', () => {
    render(<Upgrades />)

    // Find the card with "Basic Upgrade"
    const cards = screen.getAllByTestId('upgrade-card')
    const basicUpgradeCard = cards.find((card) =>
      card.textContent?.includes('Basic Upgrade')
    )
    expect(basicUpgradeCard).toBeVisible()

    // Find the purchase button within that card
    const purchaseButton = basicUpgradeCard?.querySelector(
      '[data-testid="purchase-button"]'
    )
    expect(purchaseButton).toBeVisible()

    if (purchaseButton) {
      fireEvent.click(purchaseButton)
    }

    expect(mockUpdateUpgrade).toHaveBeenCalledWith('Basic Upgrade', {
      title: 'Basic Upgrade',
      description: 'A simple upgrade',
      cost: 110, // 100 * 1.1 rounded
      quantity: 1, // 0 + 1
      visible: true,
      maximumQuantity: undefined,
    })

    expect(mockUpdateAvailablePoints).toHaveBeenCalledWith(200) // 300 - 100
    expect(mockUpdateTotalPointsSpent).toHaveBeenCalledWith(100) // 0 + 100
    expect(mockIncrementTotalUpgradesPurchased).toHaveBeenCalled()
    expect(mockCustomToast).toHaveBeenCalledWith({
      type: 'success',
      content: 'Purchased Basic Upgrade',
    })
    expect(mockProcessUpgrade).toHaveBeenCalledWith('Basic Upgrade')
  })

  it('does not allow purchase when upgrade is unaffordable', () => {
    render(<Upgrades />)

    // Find the card with "Premium Upgrade" (cost: 500, points: 300)
    const cards = screen.getAllByTestId('upgrade-card')
    const premiumUpgradeCard = cards.find((card) =>
      card.textContent?.includes('Premium Upgrade')
    )
    expect(premiumUpgradeCard).toBeVisible()

    // Find the disabled purchase button
    const disabledButton = premiumUpgradeCard?.querySelector(
      '[data-testid="purchase-button"][disabled]'
    )
    expect(disabledButton).toBeVisible()

    // Try to click the button (should have no effect)
    if (disabledButton) {
      fireEvent.click(disabledButton)
    }

    expect(mockUpdateUpgrade).not.toHaveBeenCalled()
    expect(mockUpdateAvailablePoints).not.toHaveBeenCalled()
    expect(mockUpdateTotalPointsSpent).not.toHaveBeenCalled()
    expect(mockIncrementTotalUpgradesPurchased).not.toHaveBeenCalled()
    expect(mockCustomToast).not.toHaveBeenCalled()
    expect(mockProcessUpgrade).not.toHaveBeenCalled()
  })

  it('renders floating text button when animations are enabled', () => {
    // Update the mock to enable animations
    vi.mocked(useGameStore).mockReturnValue({
      upgrades: mockUpgrades,
      updateUpgrade: mockUpdateUpgrade,
      availablePoints: 300,
      updateAvailablePoints: mockUpdateAvailablePoints,
      totalPointsSpent: 0,
      updateTotalPointsSpent: mockUpdateTotalPointsSpent,
      incrementTotalUpgradesPurchased: mockIncrementTotalUpgradesPurchased,
      showAnimations: true,
    })

    render(<Upgrades />)

    const floatingButtons = screen.getAllByTestId('floating-button')
    expect(floatingButtons.length).toBeGreaterThan(0)

    const cards = screen.getAllByTestId('upgrade-card')
    const basicUpgradeCard = cards.find((card) =>
      card.textContent?.includes('Basic Upgrade')
    )
    expect(basicUpgradeCard).toBeVisible()

    const floatingButton = basicUpgradeCard?.querySelector(
      '[data-testid="floating-button"]'
    )
    expect(floatingButton).toBeVisible()
    expect(floatingButton?.getAttribute('data-floating-text')).toBe('$ 100')

    if (floatingButton) {
      fireEvent.click(floatingButton)
    }
    expect(mockUpdateUpgrade).toHaveBeenCalled()
  })

  it('sorts upgrades correctly based on priority rules', () => {
    render(<Upgrades />)

    const cards = screen.getAllByTestId('upgrade-card')
    expect(cards.length).toBe(5)

    // Find the indices for each card
    const premiumIndex = cards.findIndex((card) =>
      card.textContent?.includes('Premium Upgrade')
    )
    const basicIndex = cards.findIndex((card) =>
      card.textContent?.includes('Basic Upgrade')
    )
    const multiIndex = cards.findIndex((card) =>
      card.textContent?.includes('Multi Upgrade')
    )
    const maxIndex = cards.findIndex((card) =>
      card.textContent?.includes('Max Purchased')
    )

    // Verify key cards are present
    expect(premiumIndex).not.toBe(-1)
    expect(multiIndex).not.toBe(-1)
    expect(basicIndex).not.toBe(-1)
    expect(maxIndex).not.toBe(-1)

    // Check that:
    // 1. Premium Upgrade (unaffordable) appears early in the list
    expect(premiumIndex).toBeLessThan(maxIndex)

    // 2. Max Purchased (fully purchased) appears at the end
    expect(premiumIndex).toBeLessThan(maxIndex)
    expect(basicIndex).toBeLessThan(maxIndex)
    expect(multiIndex).toBeLessThan(maxIndex)
  })
})
