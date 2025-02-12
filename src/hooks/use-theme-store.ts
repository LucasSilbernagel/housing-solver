import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ThemeState {
  shouldUseDarkTheme: boolean
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        shouldUseDarkTheme: false,
        toggleTheme: () =>
          set((state) => ({ shouldUseDarkTheme: !state.shouldUseDarkTheme })),
      }),
      {
        name: 'theme-store',
      }
    )
  )
)
