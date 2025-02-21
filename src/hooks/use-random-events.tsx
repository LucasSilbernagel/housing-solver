import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { RANDOM_EVENTS } from '../constants/random-events'
import { useGameStore } from './use-game-store'

export const useRandomEvents = () => {
  const { electedToLocalOffice, availablePoints, updateAvailablePoints } =
    useGameStore(
      useShallow((state) => ({
        electedToLocalOffice: state.electedToLocalOffice,
        availablePoints: state.availablePoints,
        updateAvailablePoints: state.updateAvailablePoints,
      }))
    )

  const [selectedEvent, setSelectedEvent] = useState<
    { title: string; description: string } | undefined
  >()

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

    let timerId: number

    const scheduleNext = () => {
      const intervalMs = getRandomInterval()
      timerId = setTimeout(() => {
        setSelectedEvent(getRandomEvent(RANDOM_EVENTS))
        scheduleNext()
      }, intervalMs)
    }

    // Start the first interval
    scheduleNext()

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [baseMinutes, electedToLocalOffice, varianceMinutes])

  useEffect(() => {
    if (!selectedEvent) return

    if (selectedEvent.title === 'Grassroots community rally') {
      updateAvailablePoints(availablePoints + 50_000)
      toast.custom(
        <div>
          <div>
            <span>{selectedEvent.title}</span>
          </div>
          <div>
            <span>{selectedEvent.description}</span>
          </div>
        </div>
      )
    }

    setSelectedEvent(undefined)
  }, [availablePoints, selectedEvent, updateAvailablePoints])
}
