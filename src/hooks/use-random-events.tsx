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
    score,
    updateScore,
    updateAvailablePoints,
    communityFestivals,
    decrementCommunityFestivals,
    incrementNimbyProtestsPrevented,
    incrementTotalNimbyProtests,
    antiCorruptionLaws,
    decrementAntiCorruptionLaws,
    incrementCorruptionScandalsPrevented,
    incrementTotalCorruptionScandals,
    immigrationCaps,
    decrementImmigrationCaps,
    incrementImmigrationWavesPrevented,
    incrementTotalImmigrationWaves,
    electedToNationalOffice,
  } = useGameStore(
    useShallow((state) => ({
      electedToLocalOffice: state.electedToLocalOffice,
      availablePoints: state.availablePoints,
      updateAllPoints: state.updateAllPoints,
      score: state.score,
      updateScore: state.updateScore,
      updateAvailablePoints: state.updateAvailablePoints,
      communityFestivals: state.communityFestivals,
      decrementCommunityFestivals: state.decrementCommunityFestivals,
      incrementNimbyProtestsPrevented: state.incrementNimbyProtestsPrevented,
      incrementTotalNimbyProtests: state.incrementTotalNimbyProtests,
      antiCorruptionLaws: state.antiCorruptionLaws,
      decrementAntiCorruptionLaws: state.decrementAntiCorruptionLaws,
      incrementCorruptionScandalsPrevented:
        state.incrementCorruptionScandalsPrevented,
      incrementTotalCorruptionScandals: state.incrementTotalCorruptionScandals,
      immigrationCaps: state.immigrationCaps,
      decrementImmigrationCaps: state.decrementImmigrationCaps,
      incrementImmigrationWavesPrevented:
        state.incrementImmigrationWavesPrevented,
      incrementTotalImmigrationWaves: state.incrementTotalImmigrationWaves,
      electedToNationalOffice: state.electedToNationalOffice,
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

    const eligibleRandomEvents = electedToNationalOffice
      ? RANDOM_EVENTS
      : RANDOM_EVENTS.filter(
          (event) => event.title !== 'Wave of unfettered immigration'
        )

    const scheduleNext = () => {
      const intervalMs = getRandomInterval()
      setTimeout(() => {
        setSelectedEvent(getRandomEvent(eligibleRandomEvents))
        scheduleNext()
      }, intervalMs)
    }

    // Start the first interval
    scheduleNext()
  }, [
    baseMinutes,
    electedToLocalOffice,
    electedToNationalOffice,
    varianceMinutes,
  ])

  useEffect(() => {
    if (!selectedEvent) return

    if (selectedEvent.title === 'Grassroots community rally') {
      updateAllPoints(availablePoints + 50_000)
      customToast({ type: 'success', content: selectedEvent })
    }

    if (selectedEvent.title === 'Breakthrough in construction technology') {
      updateScore(score - 0.1)
      customToast({ type: 'success', content: selectedEvent })
    }

    if (selectedEvent.title === 'NIMBY protest' && communityFestivals === 0) {
      incrementTotalNimbyProtests()
      updateAvailablePoints(Math.floor(availablePoints / 2))
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'NIMBY protest' && communityFestivals > 0) {
      incrementTotalNimbyProtests()
      incrementNimbyProtestsPrevented()
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

    if (
      selectedEvent.title === 'Government corruption scandal' &&
      antiCorruptionLaws === 0
    ) {
      incrementTotalCorruptionScandals()
      updateAvailablePoints(Math.floor(availablePoints / 2))
      customToast({ type: 'error', content: selectedEvent })
    }

    if (
      selectedEvent.title === 'Government corruption scandal' &&
      antiCorruptionLaws > 0
    ) {
      incrementTotalCorruptionScandals()
      incrementCorruptionScandalsPrevented()
      decrementAntiCorruptionLaws()
      customToast({
        type: 'success',
        content: {
          title: 'Anti-corruption government',
          description:
            'You were able to prevent a government corruption scandal!',
        },
      })
    }

    if (selectedEvent.title === 'Construction costs increased') {
      updateScore(score + 0.1)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (selectedEvent.title === 'Economic recession') {
      updateScore(score + 0.1)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (
      selectedEvent.title === 'Wave of unfettered immigration' &&
      immigrationCaps === 0
    ) {
      updateScore(score + 0.1)
      updateAvailablePoints(Math.floor(availablePoints / 2))
      incrementTotalImmigrationWaves()
      customToast({ type: 'error', content: selectedEvent })
    }

    if (
      selectedEvent.title === 'Wave of unfettered immigration' &&
      immigrationCaps > 0
    ) {
      incrementTotalImmigrationWaves()
      incrementImmigrationWavesPrevented()
      decrementImmigrationCaps()
      customToast({
        type: 'success',
        content: {
          title: 'Well-managed immigration policies',
          description:
            'You were able to prevent a wave of unfettered immigration!',
        },
      })
    }

    if (selectedEvent.title === 'Neighbourhood gentrification') {
      updateScore(score + 0.1)
      customToast({ type: 'error', content: selectedEvent })
    }

    if (
      selectedEvent.title === 'An international trade partner enacted tariffs'
    ) {
      updateScore(score + 0.1)
      customToast({ type: 'error', content: selectedEvent })
    }

    setSelectedEvent(undefined)
  }, [
    antiCorruptionLaws,
    availablePoints,
    communityFestivals,
    customToast,
    decrementAntiCorruptionLaws,
    decrementCommunityFestivals,
    decrementImmigrationCaps,
    immigrationCaps,
    incrementCorruptionScandalsPrevented,
    incrementImmigrationWavesPrevented,
    incrementNimbyProtestsPrevented,
    incrementTotalCorruptionScandals,
    incrementTotalImmigrationWaves,
    incrementTotalNimbyProtests,
    score,
    selectedEvent,
    updateAllPoints,
    updateAvailablePoints,
    updateScore,
  ])
}
