import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const usePrefersReducedMotion = () => {
  const { updateShowAnimations, shouldOverrideBrowserReducedMotion } =
    useGameStore(
      useShallow((state) => ({
        updateShowAnimations: state.updateShowAnimations,
        shouldOverrideBrowserReducedMotion:
          state.shouldOverrideBrowserReducedMotion,
      }))
    )

  useEffect(() => {
    if (shouldOverrideBrowserReducedMotion) return
    if (typeof globalThis === 'undefined') return
    const mediaQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)')

    // Set initial value
    updateShowAnimations(!mediaQuery.matches)

    // Update state if the preference changes
    const handleChange = () => updateShowAnimations(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [shouldOverrideBrowserReducedMotion, updateShowAnimations])
}
