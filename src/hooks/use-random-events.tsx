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
  const {
    electedToLocalOffice,
    availablePoints,
    updateAllPoints,
    housingUnaffordabilityScore,
    updateHousingUnaffordabilityScore,
    updateAvailablePoints,
    communityFestivals,
    decrementCommunityFestivals,
  } = useGameStore(
    useShallow((state) => ({
      electedToLocalOffice: state.electedToLocalOffice,
      availablePoints: state.availablePoints,
      updateAllPoints: state.updateAllPoints,
      housingUnaffordabilityScore: state.housingUnaffordabilityScore,
      updateHousingUnaffordabilityScore:
        state.updateHousingUnaffordabilityScore,
      updateAvailablePoints: state.updateAvailablePoints,
      communityFestivals: state.communityFestivals,
      decrementCommunityFestivals: state.decrementCommunityFestivals,
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

    if (selectedEvent.title === 'Breakthrough in construction technology') {
      updateHousingUnaffordabilityScore(housingUnaffordabilityScore - 0.1)
      customToast({ type: 'success', content: selectedEvent })
    }

    if (selectedEvent.title === 'NIMBY protest' && communityFestivals === 0) {
      updateAvailablePoints(Math.floor(availablePoints / 2))
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'NIMBY protest' && communityFestivals > 0) {
      decrementCommunityFestivals()
      customToast({
        type: 'success',
        content: {
          title: 'Community outreach',
          description:
            'You were able to prevent a NIMBY protest from gaining traction!',
        },
      })
    }

    if (selectedEvent.title === 'Government corruption scandal') {
      updateAvailablePoints(Math.floor(availablePoints * 0.66))
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'Construction costs increased') {
      updateHousingUnaffordabilityScore(housingUnaffordabilityScore + 0.1)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'Economic recession') {
      updateHousingUnaffordabilityScore(housingUnaffordabilityScore + 1)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'Wave of unfettered immigration') {
      updateHousingUnaffordabilityScore(housingUnaffordabilityScore + 0.5)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'Neighbourhood gentrification') {
      updateHousingUnaffordabilityScore(housingUnaffordabilityScore + 0.1)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (
      selectedEvent.title === 'An international trade partner enacted tariffs'
    ) {
      updateHousingUnaffordabilityScore(housingUnaffordabilityScore + 0.5)
      customToast({ type: 'error', content: selectedEvent })
    }

    setSelectedEvent(undefined)
  }, [
    availablePoints,
    customToast,
    housingUnaffordabilityScore,
    selectedEvent,
    updateAllPoints,
    updateAvailablePoints,
    updateHousingUnaffordabilityScore,
  ])
}
