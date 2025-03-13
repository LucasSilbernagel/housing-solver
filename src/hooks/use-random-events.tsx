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
    updateUpgrade,
    upgrades,
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
      updateUpgrade: state.updateUpgrade,
      upgrades: state.upgrades,
    }))
  )

  const customToast = useCustomToast()

  const [selectedEvent, setSelectedEvent] = useState<RandomEvent | undefined>()

  const timeoutReference = useRef<number | null>(null)
  const isMounted = useRef(false)

  function getRandomEvent<T>(randomEvents: T[]): T | undefined {
    if (randomEvents.length === 0) {
      return undefined
    }
    const randomIndex = Math.floor(Math.random() * randomEvents.length)
    return randomEvents[randomIndex]
  }

  const baseMinutes = 8
  const varianceMinutes = 2

  useEffect(() => {
    if (!electedToLocalOffice) return

    isMounted.current = true

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
      // Clear any existing timeout
      if (timeoutReference.current !== null) {
        globalThis.clearTimeout(timeoutReference.current)
      }

      const intervalMs = getRandomInterval()

      // Store timeout ID in ref for cleanup
      timeoutReference.current = globalThis.setTimeout(() => {
        // Only proceed if component is still mounted
        if (isMounted.current) {
          setSelectedEvent(getRandomEvent(eligibleRandomEvents))
          scheduleNext()
        }
      }, intervalMs)
    }

    // Start the first interval
    scheduleNext()

    // Cleanup function to run when component unmounts or dependencies change
    return () => {
      isMounted.current = false
      if (timeoutReference.current !== null) {
        globalThis.clearTimeout(timeoutReference.current)
        // eslint-disable-next-line unicorn/no-null
        timeoutReference.current = null
      }
    }
  }, [electedToLocalOffice, electedToNationalOffice])

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
      const updatedUpgrade = upgrades.find(
        (upgrade) =>
          upgrade.title ===
          'Run a community festival to promote affordable housing discussions'
      )
      const clonedUpgrade = updatedUpgrade ? { ...updatedUpgrade } : undefined
      if (clonedUpgrade) {
        updateUpgrade(clonedUpgrade.title, {
          ...clonedUpgrade,
          quantity: clonedUpgrade.quantity - 1,
        })
      }
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
      const updatedUpgrade = upgrades.find(
        (upgrade) => upgrade.title === 'Pass an anti-corruption law'
      )
      const clonedUpgrade = updatedUpgrade ? { ...updatedUpgrade } : undefined
      if (clonedUpgrade) {
        updateUpgrade(clonedUpgrade.title, {
          ...clonedUpgrade,
          quantity: clonedUpgrade.quantity - 1,
        })
      }
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
      const updatedUpgrade = upgrades.find(
        (upgrade) => upgrade.title === 'Put an annual cap on immigration'
      )
      const clonedUpgrade = updatedUpgrade ? { ...updatedUpgrade } : undefined
      if (clonedUpgrade) {
        updateUpgrade(clonedUpgrade.title, {
          ...clonedUpgrade,
          quantity: clonedUpgrade.quantity - 1,
        })
      }
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
    updateUpgrade,
    upgrades,
  ])
}
