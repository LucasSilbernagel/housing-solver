import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import FloatingTextButton from './FloatingTextButton'

describe('FloatingTextButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the button with children', () => {
    render(<FloatingTextButton floatingText="+1">Click me</FloatingTextButton>)

    const button = screen.getByText('Click me')
    expect(button).toBeVisible()
  })

  it('passes additional props to the Button component', () => {
    render(
      <FloatingTextButton
        floatingText="+1"
        data-testid="custom-button"
        disabled
      >
        Click me
      </FloatingTextButton>
    )

    const button = screen.getByTestId('custom-button')
    expect(button).toBeVisible()
    expect(button).toBeDisabled()
  })

  it('shows floating text when clicked', () => {
    render(<FloatingTextButton floatingText="+1">Click me</FloatingTextButton>)

    const button = screen.getByText('Click me')
    fireEvent.click(button)

    const floatingText = screen.getByText('+1')
    expect(floatingText).toBeVisible()
    expect(floatingText).toHaveClass('font-bold')
    expect(floatingText.parentElement).toHaveClass('animate-float')
  })

  it('removes the floating text after animation completes', () => {
    render(<FloatingTextButton floatingText="+1">Click me</FloatingTextButton>)

    const button = screen.getByText('Click me')
    fireEvent.click(button)

    expect(screen.getByText('+1')).toBeVisible()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryByText('+1')).not.toBeInTheDocument()
  })

  it('supports multiple clicks with different animation IDs', () => {
    render(<FloatingTextButton floatingText="+1">Click me</FloatingTextButton>)

    const button = screen.getByText('Click me')

    // First click
    fireEvent.click(button)

    // Second click
    fireEvent.click(button)

    // There should be two floating texts
    const floatingTexts = screen.getAllByText('+1')
    expect(floatingTexts).toHaveLength(2)

    // Each should have a different key (via animation.id)
    expect(floatingTexts[0]).not.toBe(floatingTexts[1])
  })

  it('calls the provided onClick handler', () => {
    const onClickMock = vi.fn()

    render(
      <FloatingTextButton floatingText="+1" onClick={onClickMock}>
        Click me
      </FloatingTextButton>
    )

    const button = screen.getByText('Click me')
    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('properly cleans up old animations when new ones are created', () => {
    render(<FloatingTextButton floatingText="+1">Click me</FloatingTextButton>)

    const button = screen.getByText('Click me')

    // First click
    fireEvent.click(button)

    // Fast-forward by 500ms (half the animation time)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Second click
    fireEvent.click(button)

    // Should have two animations
    expect(screen.getAllByText('+1')).toHaveLength(2)

    // Fast-forward another 500ms (first animation should complete)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Should have one animation left
    expect(screen.getAllByText('+1')).toHaveLength(1)

    // Fast-forward final 500ms (second animation should complete)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // All animations should be gone
    expect(screen.queryByText('+1')).not.toBeInTheDocument()
  })
})
