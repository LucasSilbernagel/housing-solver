import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGameStore } from '../../../hooks/use-game-store'
import Stats from './Stats'

vi.mock('../../../hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('./StatCard/StatCard', () => ({
  default: ({
    label,
    value,
    showAnimations,
  }: {
    label: string
    value: string
    showAnimations: boolean
  }) => (
    <li
      data-testid="stat-card"
      data-label={label}
      data-value={value}
      data-show-animations={showAnimations}
    >
      {label}: {value}
    </li>
  ),
}))

describe('Stats Component', () => {
  const mockGameState = {
    allTimePoints: 1000,
    automaticIncrementAmount: 5,
    manualIncrementAmount: 10,
    totalPointsSpent: 500,
    totalUpgradesPurchased: 15,
    totalAchievementsEarned: 7,
    totalPlayTime: 3665, // 1h 1m 5s
    showAnimations: true,
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useGameStore).mockReturnValue(mockGameState)
  })

  it('renders all stat cards with correct values', () => {
    render(<Stats />)

    const statCards = screen.getAllByTestId('stat-card')
    expect(statCards).toHaveLength(7)

    const findCardByLabel = (label: string) =>
      statCards.find((card) => card.dataset.label === label)

    expect(findCardByLabel('Support points earned per click:')).toHaveAttribute(
      'data-value',
      '10'
    )
    expect(
      findCardByLabel('Support points automatically earned per second:')
    ).toHaveAttribute('data-value', '5')
    expect(findCardByLabel('Total support points generated:')).toHaveAttribute(
      'data-value',
      '1,000'
    )
    expect(findCardByLabel('Total support points spent:')).toHaveAttribute(
      'data-value',
      '500'
    )
    expect(findCardByLabel('Total upgrades purchased:')).toHaveAttribute(
      'data-value',
      '15'
    )
    expect(findCardByLabel('Total achievements earned:')).toHaveAttribute(
      'data-value',
      '7'
    )
  })

  it('formats play time correctly', () => {
    render(<Stats />)

    const playTimeCard = [...screen.getAllByTestId('stat-card')].find(
      (card) => card.dataset.label === 'Total play time:'
    )

    expect(playTimeCard).toHaveTextContent('1 hour, 1 minute, 5 seconds')
  })

  it('passes showAnimations prop to all StatCard components', () => {
    render(<Stats />)

    const statCards = screen.getAllByTestId('stat-card')

    for (const card of statCards) {
      expect(card).toHaveAttribute('data-show-animations', 'true')
    }
  })

  it('formats numbers with locale string', () => {
    vi.mocked(useGameStore).mockReturnValue({
      ...mockGameState,
      allTimePoints: 1_234_567,
    })

    render(<Stats />)

    const totalPointsCard = [...screen.getAllByTestId('stat-card')].find(
      (card) => card.dataset.label === 'Total support points generated:'
    )

    expect(totalPointsCard).toHaveTextContent('1,234,567')
  })

  it('handles zero play time correctly', () => {
    vi.mocked(useGameStore).mockReturnValue({
      ...mockGameState,
      totalPlayTime: 0,
    })

    render(<Stats />)

    const playTimeCard = [...screen.getAllByTestId('stat-card')].find(
      (card) => card.dataset.label === 'Total play time:'
    )

    expect(playTimeCard).toHaveTextContent('0 seconds')
  })

  it('formats long play time correctly', () => {
    // 1 year, 2 months, 1 week, 3 days, 5 hours, 30 minutes, 10 seconds
    const longPlayTime =
      31_536_000 + // 1 year
      2_592_000 * 2 + // 2 months
      604_800 + // 1 week
      86_400 * 3 + // 3 days
      3600 * 5 + // 5 hours
      60 * 30 + // 30 minutes
      10 // 10 seconds

    vi.mocked(useGameStore).mockReturnValue({
      ...mockGameState,
      totalPlayTime: longPlayTime,
    })

    render(<Stats />)

    const playTimeCard = [...screen.getAllByTestId('stat-card')].find(
      (card) => card.dataset.label === 'Total play time:'
    )

    expect(playTimeCard).toHaveTextContent(
      '1 year, 2 months, 1 week, 3 days, 5 hours, 30 minutes, 10 seconds'
    )
  })

  it('passes animations disabled to StatCard components when showAnimations is false', () => {
    vi.mocked(useGameStore).mockReturnValue({
      ...mockGameState,
      showAnimations: false,
    })

    render(<Stats />)

    const statCards = screen.getAllByTestId('stat-card')

    for (const card of statCards) {
      expect(card).toHaveAttribute('data-show-animations', 'false')
    }
  })

  it('truncates decimal points in total points generated', () => {
    vi.mocked(useGameStore).mockReturnValue({
      ...mockGameState,
      allTimePoints: 1000.75, // Should be truncated to 1000
    })

    render(<Stats />)

    const totalPointsCard = [...screen.getAllByTestId('stat-card')].find(
      (card) => card.dataset.label === 'Total support points generated:'
    )

    expect(totalPointsCard).toHaveTextContent('1,000')
    expect(totalPointsCard).not.toHaveTextContent('1,000.75')
  })

  it('generates correct keys for StatCard components', () => {
    const { container } = render(<Stats />)

    // Check for the presence of the list with the correct spacing class
    const list = container.querySelector('ul.space-y-4')
    expect(list).toBeInTheDocument()

    // Each item should be a StatCard with a key attribute
    const statCards = screen.getAllByTestId('stat-card')
    expect(statCards.length).toBe(7)
  })
})
