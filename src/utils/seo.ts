export interface SocialMetaTags {
  title: string
}

const getOrCreateMetaTag = (selector: string): HTMLMetaElement => {
  let tag = document.querySelector(selector)

  if (!tag) {
    tag = document.createElement('meta')
    if (selector.startsWith('meta[property')) {
      tag.setAttribute('property', /property="([^"]*)"/.exec(selector)![1])
    } else {
      tag.setAttribute('name', /name="([^"]*)"/.exec(selector)![1])
    }
    document.head.append(tag)
  }

  return tag as HTMLMetaElement
}

export const updateMetaTags = (meta: SocialMetaTags) => {
  document.title = meta.title

  // Open Graph meta tags
  getOrCreateMetaTag('meta[property="og:title"]').setAttribute(
    'content',
    meta.title
  )

  // Twitter Card meta tags
  getOrCreateMetaTag('meta[name="twitter:title"]').setAttribute(
    'content',
    meta.title
  )

  getOrCreateMetaTag('meta[name="twitter:card"]').setAttribute(
    'content',
    'summary_large_image'
  )
}
