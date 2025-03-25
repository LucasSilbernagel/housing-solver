import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useScreenWidth from '../../../hooks/use-screen-width'
import TabsCard from './TabsCard'

vi.mock('../Upgrades/Upgrades', () => ({
  default: () => <div data-testid="upgrades-component">Upgrades Content</div>,
}))

vi.mock('../Achievements/Achievements', () => ({
  default: () => (
    <div data-testid="achievements-component">Achievements Content</div>
  ),
}))

vi.mock('../Announcements/Announcements', () => ({
  default: () => (
    <div data-testid="announcements-component">Announcements Content</div>
  ),
}))

vi.mock('../Stats/Stats', () => ({
  default: () => <div data-testid="stats-component">Stats Content</div>,
}))

vi.mock('../Settings/Settings', () => ({
  default: () => <div data-testid="settings-component">Settings Content</div>,
}))

vi.mock('../../../hooks/use-screen-width', () => ({
  default: vi.fn((callback: (value: boolean) => void) => {
    // Call the callback once during initialization, not on every render
    return setTimeout(() => callback(true), 0)
  }),
}))

describe('TabsCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with default "upgrades" tab selected', () => {
    render(<TabsCard />)

    expect(screen.getByRole('tab', { name: /upgrades/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: /achievements/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: /announcements/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: /stats/i })).toBeVisible()
    expect(screen.getByRole('tab', { name: /settings/i })).toBeVisible()

    const upgradesTab = screen.getByRole('tab', { name: /upgrades/i })
    expect(upgradesTab).toHaveAttribute('aria-selected', 'true')

    expect(screen.getByRole('tab', { name: /achievements/i })).toHaveAttribute(
      'aria-selected',
      'false'
    )
    expect(screen.getByRole('tab', { name: /announcements/i })).toHaveAttribute(
      'aria-selected',
      'false'
    )
    expect(screen.getByRole('tab', { name: /stats/i })).toHaveAttribute(
      'aria-selected',
      'false'
    )
    expect(screen.getByRole('tab', { name: /settings/i })).toHaveAttribute(
      'aria-selected',
      'false'
    )

    expect(screen.getByTestId('upgrades-component')).toBeVisible()
  })

  it('applies the correct size based on screen width', async () => {
    const useScreenWidthMock = vi.fn()
    vi.mocked(
      useScreenWidth as (callback: (value: boolean) => void) => void
    ).mockImplementation(useScreenWidthMock)

    let setIsMinWidthCallback: ((value: boolean) => void) | undefined

    useScreenWidthMock.mockImplementation(
      (callback: (value: boolean) => void) => {
        setIsMinWidthCallback = callback
        return
      }
    )

    const { rerender } = render(<TabsCard />)

    await waitFor(() => {
      if (setIsMinWidthCallback) setIsMinWidthCallback(true)
    })

    rerender(<TabsCard />)

    const card = document.querySelector('.rt-BaseCard.rt-Card')
    expect(card).toHaveAttribute(
      'class',
      expect.stringContaining('rt-r-size-4')
    )

    await waitFor(() => {
      if (setIsMinWidthCallback) setIsMinWidthCallback(false)
    })

    rerender(<TabsCard />)

    expect(card).toHaveAttribute(
      'class',
      expect.stringContaining('rt-r-size-2')
    )
  })
})
