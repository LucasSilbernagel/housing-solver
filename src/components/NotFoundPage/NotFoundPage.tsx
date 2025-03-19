import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SocialMetaTags, updateMetaTags } from '../../utils/seo'

const NotFoundPage = () => {
  useEffect(() => {
    const metaTags: SocialMetaTags = {
      title: '404 | Housing Solver',
    }
    updateMetaTags(metaTags)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 pt-6">
      <div className="w-[200px] sm:w-[250px]">
        <img src="/houses.png" alt="" />
      </div>
      <h1 className="font-bold text-6xl sm:text-7xl">404</h1>
      <h2 className="text-4xl sm:text-6xl">Page not found!</h2>
      <Link to="/" className="group relative text-xl">
        <ArrowLeftIcon
          width="25"
          height="25"
          className="group-hover:-left-10 group-focus-visible:-left-10 top-0.5 -left-8 absolute transition-all duration-300 ease-in-out"
        />{' '}
        Go back
      </Link>
    </div>
  )
}

export default NotFoundPage
