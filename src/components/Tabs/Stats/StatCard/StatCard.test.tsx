import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import StatCard from './StatCard'

vi.mock('react-slot-counter', () => ({
  default: ({ value }: { value: string }) => (
    <span data-testid="slot-counter">{value}</span>
  ),
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
    wrap,
    size,
    className,
  }: {
    children: React.ReactNode
    wrap?: string
    size?: string
    className?: string
  }) => (
    <span
      data-testid="text"
      data-size={size}
      data-wrap={wrap}
      className={className}
    >
      {children}
    </span>
  ),
}))

describe('StatCard Component', () => {
  it('renders the label correctly', () => {
    render(<StatCard label="Points" value="42" showAnimations={false} />)

    const labelText = screen.getByText('Points')
    expect(labelText).toBeVisible()
    expect(labelText.closest('[data-testid="text"]')).toHaveAttribute(
      'data-size',
      '4'
    )
    expect(labelText.closest('[data-testid="text"]')).toHaveAttribute(
      'class',
      'font-bold'
    )
  })

  it('renders the value correctly when animations are disabled', () => {
    render(<StatCard label="Points" value="42" showAnimations={false} />)

    // Should render plain text, not SlotCounter
    expect(screen.getByText('42')).toBeVisible()
    expect(screen.queryByTestId('slot-counter')).not.toBeInTheDocument()
  })

  it('renders the value with SlotCounter when animations are enabled', () => {
    render(<StatCard label="Points" value="42" showAnimations={true} />)

    // Should render SlotCounter
    expect(screen.getByTestId('slot-counter')).toBeVisible()
    expect(screen.getByTestId('slot-counter')).toHaveTextContent('42')
  })

  it('renders the value as plain text when label is "Total play time:" even if animations are enabled', () => {
    render(
      <StatCard label="Total play time:" value="1h 30m" showAnimations={true} />
    )

    // Should render plain text, not SlotCounter
    expect(screen.getByText('1h 30m')).toBeVisible()
    expect(screen.queryByTestId('slot-counter')).not.toBeInTheDocument()
  })
})
