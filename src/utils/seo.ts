export interface SocialMetaTags {
  title: string
  description: string
  image: string
  url: string
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
  getOrCreateMetaTag('meta[name="description"]').setAttribute(
    'content',
    meta.description
  )

  // Open Graph meta tags
  getOrCreateMetaTag('meta[property="og:title"]').setAttribute(
    'content',
    meta.title
  )
  getOrCreateMetaTag('meta[property="og:description"]').setAttribute(
    'content',
    meta.description
  )
  getOrCreateMetaTag('meta[property="og:image"]').setAttribute(
    'content',
    meta.image
  )
  getOrCreateMetaTag('meta[property="og:url"]').setAttribute(
    'content',
    meta.url
  )

  // Twitter Card meta tags
  getOrCreateMetaTag('meta[name="twitter:title"]').setAttribute(
    'content',
    meta.title
  )
  getOrCreateMetaTag('meta[name="twitter:description"]').setAttribute(
    'content',
    meta.description
  )
  getOrCreateMetaTag('meta[name="twitter:image"]').setAttribute(
    'content',
    meta.image
  )
  getOrCreateMetaTag('meta[name="twitter:card"]').setAttribute(
    'content',
    'summary_large_image'
  )
}
