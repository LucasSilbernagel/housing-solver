import { Dispatch, SetStateAction, useEffect } from 'react'

const useScreenWidth = (
  setIsMinWidth: Dispatch<SetStateAction<boolean>>
): void => {
  useEffect(() => {
    const checkWidth = () => {
      const isWidthAtLeastMinimum = window.innerWidth >= 600
      setIsMinWidth(isWidthAtLeastMinimum)
    }

    checkWidth()

    window.addEventListener('resize', checkWidth)

    return () => {
      window.removeEventListener('resize', checkWidth)
    }
  }, [setIsMinWidth])
}

export default useScreenWidth
