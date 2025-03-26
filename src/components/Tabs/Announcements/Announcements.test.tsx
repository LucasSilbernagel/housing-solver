import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGameStore } from '../../../hooks/use-game-store'
import Announcements from './Announcements'

vi.mock('../../../hooks/use-game-store', () => ({
  useGameStore: vi.fn(),
}))

vi.mock('react-time-ago', () => ({
  default: ({ date }: { date: number }) => (
    <span data-testid="time-ago">{date}</span>
  ),
}))

vi.mock('javascript-time-ago', () => ({
  default: {
    addLocale: vi.fn(),
  },
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
    size,
  }: {
    children: React.ReactNode
    wrap?: string
    size?: string
  }) => (
    <span data-testid="text" data-size={size}>
      {children}
    </span>
  ),
  Callout: {
    Root: ({
      children,
      size,
    }: {
      children: React.ReactNode
      size?: string
    }) => (
      <div data-testid="callout-root" data-size={size}>
        {children}
      </div>
    ),
    Icon: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="callout-icon">{children}</div>
    ),
    Text: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="callout-text">{children}</div>
    ),
  },
}))

const mockAnnouncements = [
  {
    title: 'First example announcement',
    description: 'First example announcement subtitle',
    timestamp: Date.now(),
  },
  {
    title: 'Second example announcement',
    description: 'Second example announcement subtitle',
    timestamp: Date.now() - 60_000, // 1 minute ago
  },
  {
    title: 'Third example announcement',
    description: undefined,
    timestamp: Date.now() - 3_600_000, // 1 hour ago
  },
]

describe('Announcements Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders announcements when there are some', () => {
    vi.mocked(useGameStore).mockReturnValue({
      announcements: mockAnnouncements,
    })

    render(<Announcements />)

    expect(screen.getByText('First example announcement')).toBeVisible()
    expect(screen.getByText('Second example announcement')).toBeVisible()
    expect(screen.getByText('Third example announcement')).toBeVisible()

    expect(
      screen.getByText('First example announcement subtitle')
    ).toBeVisible()
    expect(
      screen.getByText('Second example announcement subtitle')
    ).toBeVisible()

    expect(screen.getAllByRole('listitem').length).toBe(3)
  })

  it('sorts announcements with newest first', () => {
    vi.mocked(useGameStore).mockReturnValue({
      announcements: mockAnnouncements,
    })

    render(<Announcements />)

    const listItems = screen.getAllByRole('listitem')

    // First item should be "First example announcement" (newest)
    expect(listItems[0]).toHaveTextContent('First example announcement')
    // Second item should be "Second example announcement"
    expect(listItems[1]).toHaveTextContent('Second example announcement')
    // Third item should be "Third example announcement" (oldest)
    expect(listItems[2]).toHaveTextContent('Third example announcement')
  })

  it('shows callout when there are no announcements', () => {
    vi.mocked(useGameStore).mockReturnValue({
      announcements: [],
    })

    render(<Announcements />)

    expect(screen.getByTestId('callout-root')).toBeVisible()
    expect(
      screen.getByText(
        'There are no announcements at this time, check back later.'
      )
    ).toBeVisible()

    // Should have 1 list item (the callout)
    expect(screen.getAllByRole('listitem').length).toBe(1)
  })

  it('renders announcements without descriptions correctly', () => {
    vi.mocked(useGameStore).mockReturnValue({
      announcements: mockAnnouncements,
    })

    render(<Announcements />)

    const briefUpdateItem = screen
      .getAllByRole('listitem')
      .find((item) => item.textContent?.includes('Third example announcement'))

    // It should have the title but not duplicate elements for description
    expect(briefUpdateItem).toHaveTextContent('Third example announcement')

    // Count the number of Text elements inside the Third example announcement item
    // Should only have 2 - one for title and one for time ago
    const textElements =
      briefUpdateItem?.querySelectorAll('[data-testid="text"]') ?? []
    expect(textElements.length).toBe(2)
  })

  it('displays timestamps using ReactTimeAgo', () => {
    vi.mocked(useGameStore).mockReturnValue({
      announcements: mockAnnouncements,
    })

    render(<Announcements />)

    // Check that we have 3 time-ago elements (one for each announcement)
    const timeAgoElements = screen.getAllByTestId('time-ago')
    expect(timeAgoElements.length).toBe(3)

    // Check that the timestamps match the mock data
    expect(timeAgoElements[0].textContent).toBe(
      mockAnnouncements[0].timestamp.toString()
    )
    expect(timeAgoElements[1].textContent).toBe(
      mockAnnouncements[1].timestamp.toString()
    )
    expect(timeAgoElements[2].textContent).toBe(
      mockAnnouncements[2].timestamp.toString()
    )
  })
})
