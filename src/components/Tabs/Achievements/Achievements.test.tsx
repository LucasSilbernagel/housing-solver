import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGameStore } from '../../../hooks/use-game-store'
import Achievements from './Achievements'

vi.mock('../../../hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('@radix-ui/themes', () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Text: ({
    children,
    className,
  }: {
    children: React.ReactNode
    wrap?: string
    className?: string
  }) => (
    <span data-testid="text" className={className}>
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

const mockAchievements = [
  {
    text: 'Recruit a volunteer',
    achieved: true,
    visible: true,
  },
  {
    text: 'Run an ad campaign about the affordable housing crisis',
    achieved: false,
    visible: true,
  },
  {
    text: 'Fund a job training program',
    achieved: false,
    visible: false,
  },
]

describe('Achievements Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useGameStore).mockReturnValue({
      achievements: mockAchievements,
    })
  })

  it('renders visible achievements', () => {
    render(<Achievements />)

    expect(screen.getByText('Recruit a volunteer')).toBeVisible()
    expect(
      screen.getByText('Run an ad campaign about the affordable housing crisis')
    ).toBeVisible()

    const listItems = screen.getAllByRole('listitem')

    const secretItem = listItems.find((item) =>
      item.textContent?.includes('Fund a job training program')
    )

    expect(secretItem).toHaveClass('hidden')
  })

  it('sorts achievements with unachieved ones first', () => {
    render(<Achievements />)

    const visibleItems = screen
      .getAllByRole('listitem')
      .filter((item) => !item.classList.contains('hidden'))

    // Because of the sort, "Run an ad campaign about the affordable housing crisis" (not achieved) should come before "Recruit a volunteer" (achieved)
    const firstItemText = visibleItems[0].textContent ?? ''
    const secondItemText = visibleItems[1].textContent ?? ''

    expect(firstItemText).toContain(
      'Run an ad campaign about the affordable housing crisis'
    )
    expect(secondItemText).toContain('Recruit a volunteer')
  })

  it('applies line-through style to achieved achievements', () => {
    render(<Achievements />)

    const achievedText = screen
      .getByText('Recruit a volunteer')
      .closest('[data-testid="text"]')
    const unachievedText = screen
      .getByText('Run an ad campaign about the affordable housing crisis')
      .closest('[data-testid="text"]')

    expect(achievedText).toHaveClass('line-through')
    expect(unachievedText).not.toHaveClass('line-through')
  })

  it('shows check icon for achieved achievements', () => {
    render(<Achievements />)

    const achievedItem = screen.getByText('Recruit a volunteer').closest('li')
    const unachievedItem = screen
      .getByText('Run an ad campaign about the affordable housing crisis')
      .closest('li')

    expect(achievedItem?.querySelector('[aria-label="achieved"]')).toBeVisible()
    expect(
      unachievedItem?.querySelector('[aria-label="in progress"]')
    ).toBeVisible()
  })

  it('applies correct tooltip content based on achievement status', () => {
    render(<Achievements />)

    const tooltips = screen.getAllByTestId('tooltip')

    const achievedTooltip = tooltips.find((tooltip) =>
      tooltip.closest('li')?.textContent?.includes('Recruit a volunteer')
    )

    const unachievedTooltip = tooltips.find((tooltip) =>
      tooltip
        .closest('li')
        ?.textContent?.includes(
          'Run an ad campaign about the affordable housing crisis'
        )
    )

    expect(achievedTooltip).toHaveAttribute('data-content', 'Achieved')
    expect(unachievedTooltip).toHaveAttribute('data-content', 'In progress')
  })

  it('renders list items with appropriate data', () => {
    render(<Achievements />)

    const visibleItems = screen
      .getAllByRole('listitem')
      .filter((item) => !item.classList.contains('hidden'))

    expect(visibleItems.length).toBe(2)

    expect(visibleItems[0]).toHaveTextContent(
      'Run an ad campaign about the affordable housing crisis'
    )
    expect(visibleItems[1]).toHaveTextContent('Recruit a volunteer')
  })
})
