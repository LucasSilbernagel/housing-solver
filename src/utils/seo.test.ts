import { beforeEach, describe, expect, it } from 'vitest'
import { SocialMetaTags, updateMetaTags } from './seo'

describe('updateMetaTags', () => {
  beforeEach(() => {
    document.head.innerHTML = ''
    document.title = ''
  })

  it('should update document title', () => {
    const meta: SocialMetaTags = {
      title: 'Test Title',
    }

    updateMetaTags(meta)

    expect(document.title).toBe('Test Title')
  })

  it('should create and set Open Graph title tag', () => {
    const meta: SocialMetaTags = {
      title: 'Test Title',
    }

    updateMetaTags(meta)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    expect(ogTitle).not.toBeNull()
    expect(ogTitle?.getAttribute('content')).toBe('Test Title')
  })

  it('should create and set Twitter Card tags', () => {
    const meta: SocialMetaTags = {
      title: 'Test Title',
    }

    updateMetaTags(meta)

    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterCard = document.querySelector('meta[name="twitter:card"]')

    expect(twitterTitle).not.toBeNull()
    expect(twitterTitle?.getAttribute('content')).toBe('Test Title')

    expect(twitterCard).not.toBeNull()
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image')
  })

  it('should update existing meta tags instead of creating duplicates', () => {
    const ogTitle = document.createElement('meta')
    ogTitle.setAttribute('property', 'og:title')
    ogTitle.setAttribute('content', 'Original Title')
    document.head.append(ogTitle)

    const twitterTitle = document.createElement('meta')
    twitterTitle.setAttribute('name', 'twitter:title')
    twitterTitle.setAttribute('content', 'Original Title')
    document.head.append(twitterTitle)

    const twitterCard = document.createElement('meta')
    twitterCard.setAttribute('name', 'twitter:card')
    twitterCard.setAttribute('content', 'summary')
    document.head.append(twitterCard)

    const meta: SocialMetaTags = {
      title: 'Updated Title',
    }

    updateMetaTags(meta)

    expect(document.querySelectorAll('meta[property="og:title"]').length).toBe(
      1
    )
    expect(document.querySelectorAll('meta[name="twitter:title"]').length).toBe(
      1
    )
    expect(document.querySelectorAll('meta[name="twitter:card"]').length).toBe(
      1
    )

    expect(
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content')
    ).toBe('Updated Title')
    expect(
      document
        .querySelector('meta[name="twitter:title"]')
        ?.getAttribute('content')
    ).toBe('Updated Title')
    expect(
      document
        .querySelector('meta[name="twitter:card"]')
        ?.getAttribute('content')
    ).toBe('summary_large_image')
  })

  it('getOrCreateMetaTag utility works correctly with property selectors', () => {
    const meta: SocialMetaTags = {
      title: 'Property Test',
    }

    updateMetaTags(meta)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    expect(ogTitle).not.toBeNull()
    expect(ogTitle?.getAttribute('property')).toBe('og:title')
    expect(ogTitle?.getAttribute('content')).toBe('Property Test')
  })

  it('getOrCreateMetaTag utility works correctly with name selectors', () => {
    const meta: SocialMetaTags = {
      title: 'Name Test',
    }

    updateMetaTags(meta)

    const twitterCard = document.querySelector('meta[name="twitter:card"]')
    expect(twitterCard).not.toBeNull()
    expect(twitterCard?.getAttribute('name')).toBe('twitter:card')
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image')
  })
})
