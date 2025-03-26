import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as seo from '../../utils/seo'
import NotFoundPage from './NotFoundPage'

vi.mock('@radix-ui/react-icons', () => ({
  ArrowLeftIcon: () => <span data-testid="arrow-left-icon" />,
}))

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={to} className={className} data-testid="router-link">
      {children}
    </a>
  ),
}))

describe('NotFoundPage', () => {
  beforeEach(() => {
    vi.spyOn(seo, 'updateMetaTags')
  })

  it('renders correctly with all elements', () => {
    render(<NotFoundPage />)

    expect(screen.getByText('404')).toBeVisible()
    expect(screen.getByText('Page not found!')).toBeVisible()

    const image = screen.getByAltText('')
    expect(image).toBeVisible()
    expect(image).toHaveAttribute('src', '/houses.png')

    const link = screen.getByTestId('router-link')
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/')
    expect(link).toHaveTextContent('Go back')

    expect(screen.getByTestId('arrow-left-icon')).toBeVisible()
  })

  it('calls updateMetaTags with correct meta information', () => {
    render(<NotFoundPage />)

    expect(seo.updateMetaTags).toHaveBeenCalledTimes(1)
    expect(seo.updateMetaTags).toHaveBeenCalledWith({
      title: '404 | Housing Solver',
    })
  })

  it('has proper accessibility attributes', () => {
    render(<NotFoundPage />)

    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBe(2)

    const link = screen.getByTestId('router-link')
    expect(link.className).toContain('group')
  })
})
