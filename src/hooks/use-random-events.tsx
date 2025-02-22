import { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { RANDOM_EVENTS } from '../constants/random-events'
import { useCustomToast } from './use-custom-toast'
import { useGameStore } from './use-game-store'

interface RandomEvent {
  title: string
  description: string
}

export const useRandomEvents = (): void => {
  const { electedToLocalOffice, availablePoints, updateAllPoints } =
    useGameStore(
      useShallow((state) => ({
        electedToLocalOffice: state.electedToLocalOffice,
        availablePoints: state.availablePoints,
        updateAllPoints: state.updateAllPoints,
      }))
    )

  const customToast = useCustomToast()

  const [selectedEvent, setSelectedEvent] = useState<RandomEvent | undefined>()

  function getRandomEvent<T>(randomEvents: T[]): T | undefined {
    if (randomEvents.length === 0) {
      return undefined
    }
    const randomIndex = Math.floor(Math.random() * randomEvents.length)
    return randomEvents[randomIndex]
  }

  const baseMinutes = 12
  const varianceMinutes = 2
  const initializedCount = useRef(false)

  useEffect(() => {
    if (initializedCount.current || !electedToLocalOffice) return
    initializedCount.current = true

    const getRandomInterval = (): number => {
      // Generate a random value between -variance and +variance
      const variance = (Math.random() * 2 - 1) * varianceMinutes
      // Add the variance to the base time (in milliseconds)
      const intervalMs = (baseMinutes + variance) * 60 * 1000
      return Math.max(1000, intervalMs) // Ensure interval is at least 1 second
    }

    const scheduleNext = () => {
      const intervalMs = getRandomInterval()
      setTimeout(() => {
        setSelectedEvent(getRandomEvent(RANDOM_EVENTS))
        scheduleNext()
      }, intervalMs)
    }

    // Start the first interval
    scheduleNext()
  }, [baseMinutes, electedToLocalOffice, varianceMinutes])

  useEffect(() => {
    if (!selectedEvent) return

    if (selectedEvent.title === 'Grassroots community rally') {
      updateAllPoints(availablePoints + 50_000)
      customToast({ type: 'success', content: selectedEvent })
    }

    setSelectedEvent(undefined)
  }, [availablePoints, customToast, selectedEvent, updateAllPoints])
}
