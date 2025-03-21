import { describe, expect, it, vi } from 'vitest'
import {
  createAchievementConfigs,
  GameStateValues,
} from './create-achievement-configs'

vi.mock('../constants/achievement-definitions', () => {
  return {
    ACHIEVEMENT_DEFINITIONS: {
      supportPoints: [
        { text: 'Generate 100 support points', threshold: 100 },
        { text: 'Generate 1000 support points', threshold: 1000 },
      ],
      housingAffordability: [
        { text: 'Reduce housing unaffordability to 50%', threshold: 50 },
        { text: 'Reduce housing unaffordability to 0%', threshold: 0 },
      ],
      volunteers: [
        { text: 'Recruit a volunteer', threshold: 1 },
        { text: 'Recruit 10 volunteers', threshold: 10 },
      ],
      adCampaigns: [
        { text: 'Run your first ad campaign', threshold: 1 },
        { text: 'Run 5 ad campaigns', threshold: 5 },
      ],
      trainingPrograms: [
        { text: 'Fund a job training program', threshold: 1 },
        { text: 'Fund 3 job training programs', threshold: 3 },
      ],
      elections: [
        { text: 'Get elected to local office', threshold: 1 },
        { text: 'Get elected to regional office', threshold: 1 },
        { text: 'Get elected to national office', threshold: 1 },
      ],
      nimbyProtestsPrevented: [
        { text: 'Prevent a NIMBY protest', threshold: 1 },
        { text: 'Prevent 3 NIMBY protests', threshold: 3 },
      ],
      corruptionScandalsPrevented: [
        { text: 'Prevent a corruption scandal', threshold: 1 },
        { text: 'Prevent 2 corruption scandals', threshold: 2 },
      ],
      immigrationWavesPrevented: [
        { text: 'Prevent an immigration wave', threshold: 1 },
        { text: 'Prevent 2 immigration waves', threshold: 2 },
      ],
    },
  }
})

describe('createAchievementConfigs', () => {
  const defaultGameState: GameStateValues = {
    allTimePoints: 0,
    score: 100,
    electedToLocalOffice: false,
    electedToRegionalOffice: false,
    electedToNationalOffice: false,
    volunteersRecruited: 0,
    volunteerRecruitersRecruited: 0,
    campaignManagersRecruited: 0,
    totalAdCampaigns: 0,
    totalTrainingPrograms: 0,
    nimbyProtestsPrevented: 0,
    corruptionScandalsPrevented: 0,
    immigrationWavesPrevented: 0,
  }

  it('should return an object with all achievement categories', () => {
    const achievements = createAchievementConfigs(defaultGameState)

    expect(achievements).toHaveProperty('supportPoints')
    expect(achievements).toHaveProperty('housingAffordability')
    expect(achievements).toHaveProperty('volunteers')
    expect(achievements).toHaveProperty('adCampaigns')
    expect(achievements).toHaveProperty('trainingPrograms')
    expect(achievements).toHaveProperty('elections')
    expect(achievements).toHaveProperty('nimbyProtestsPrevented')
    expect(achievements).toHaveProperty('corruptionScandalsPrevented')
    expect(achievements).toHaveProperty('immigrationWavesPrevented')
  })

  it('should add customCheck and message to each achievement', () => {
    const achievements = createAchievementConfigs(defaultGameState)

    // Check structure of one achievement from each category
    for (const category of Object.values(achievements)) {
      for (const achievement of category) {
        expect(achievement).toHaveProperty('text')
        expect(achievement).toHaveProperty('threshold')
        expect(achievement).toHaveProperty('customCheck')
        expect(achievement).toHaveProperty('message')
        expect(typeof achievement.customCheck).toBe('function')
        expect(typeof achievement.message).toBe('string')
      }
    }
  })

  describe('supportPoints achievements', () => {
    it('should mark achievements as completed when allTimePoints threshold is met', () => {
      // Test with points below first threshold
      let gameState = { ...defaultGameState, allTimePoints: 50 }
      let achievements = createAchievementConfigs(gameState)
      expect(achievements.supportPoints[0].customCheck()).toBe(false)
      expect(achievements.supportPoints[1].customCheck()).toBe(false)

      // Test with points above first but below second threshold
      gameState = { ...defaultGameState, allTimePoints: 500 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.supportPoints[0].customCheck()).toBe(true)
      expect(achievements.supportPoints[1].customCheck()).toBe(false)

      // Test with points above both thresholds
      gameState = { ...defaultGameState, allTimePoints: 1500 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.supportPoints[0].customCheck()).toBe(true)
      expect(achievements.supportPoints[1].customCheck()).toBe(true)
    })

    it('should format messages correctly for supportPoints', () => {
      const achievements = createAchievementConfigs(defaultGameState)
      expect(achievements.supportPoints[0].message).toBe(
        'Generated 100 support points!'
      )
      expect(achievements.supportPoints[1].message).toBe(
        'Generated 1,000 support points!'
      )
    })
  })

  describe('housingAffordability achievements', () => {
    it('should mark achievements as completed when score is at or below threshold', () => {
      // Test with score above both thresholds
      let gameState = { ...defaultGameState, score: 75 }
      let achievements = createAchievementConfigs(gameState)
      expect(achievements.housingAffordability[0].customCheck()).toBe(false) // 50% threshold
      expect(achievements.housingAffordability[1].customCheck()).toBe(false) // 0% threshold

      // Test with score below first but above second threshold
      gameState = { ...defaultGameState, score: 30 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.housingAffordability[0].customCheck()).toBe(true)
      expect(achievements.housingAffordability[1].customCheck()).toBe(false)

      // Test with score at 0
      gameState = { ...defaultGameState, score: 0 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.housingAffordability[0].customCheck()).toBe(true)
      expect(achievements.housingAffordability[1].customCheck()).toBe(true)
    })

    it('should format messages correctly for housingAffordability', () => {
      const achievements = createAchievementConfigs(defaultGameState)
      expect(achievements.housingAffordability[0].message).toBe(
        'Reduced housing unaffordability to 50% or lower!'
      )
      expect(achievements.housingAffordability[1].message).toBe(
        'You have completely eliminated housing unaffordability!'
      )
    })
  })

  describe('volunteers achievements', () => {
    it('should count total volunteers from all volunteer types', () => {
      // Test with no volunteers
      let gameState = { ...defaultGameState }
      let achievements = createAchievementConfigs(gameState)
      expect(achievements.volunteers[0].customCheck()).toBe(false)
      expect(achievements.volunteers[1].customCheck()).toBe(false)

      // Test with some regular volunteers only
      gameState = { ...defaultGameState, volunteersRecruited: 5 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.volunteers[0].customCheck()).toBe(true)
      expect(achievements.volunteers[1].customCheck()).toBe(false)

      // Test with mixed volunteer types summing to above threshold
      gameState = {
        ...defaultGameState,
        volunteersRecruited: 3,
        volunteerRecruitersRecruited: 4,
        campaignManagersRecruited: 4,
      }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.volunteers[0].customCheck()).toBe(true)
      expect(achievements.volunteers[1].customCheck()).toBe(true)
    })

    it('should format messages correctly for volunteers', () => {
      const achievements = createAchievementConfigs(defaultGameState)
      expect(achievements.volunteers[0].message).toBe(
        'You recruited your first volunteer!'
      )
      expect(achievements.volunteers[1].message).toBe(
        'You recruited 10 volunteers!'
      )
    })
  })

  describe('elections achievements', () => {
    it('should check election status based on boolean flags', () => {
      // Test with no elections won
      let gameState = { ...defaultGameState }
      let achievements = createAchievementConfigs(gameState)
      expect(achievements.elections[0].customCheck()).toBe(false)
      expect(achievements.elections[1].customCheck()).toBe(false)
      expect(achievements.elections[2].customCheck()).toBe(false)

      // Test with local office won
      gameState = { ...defaultGameState, electedToLocalOffice: true }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.elections[0].customCheck()).toBe(true)
      expect(achievements.elections[1].customCheck()).toBe(false)
      expect(achievements.elections[2].customCheck()).toBe(false)

      // Test with all offices won
      gameState = {
        ...defaultGameState,
        electedToLocalOffice: true,
        electedToRegionalOffice: true,
        electedToNationalOffice: true,
      }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.elections[0].customCheck()).toBe(true)
      expect(achievements.elections[1].customCheck()).toBe(true)
      expect(achievements.elections[2].customCheck()).toBe(true)
    })

    it('should format messages correctly for elections', () => {
      const achievements = createAchievementConfigs(defaultGameState)
      expect(achievements.elections[0].message).toBe(
        'You were elected to local office!'
      )
      expect(achievements.elections[1].message).toBe(
        'You were elected to regional office!'
      )
      expect(achievements.elections[2].message).toBe(
        'You were elected to national office!'
      )
    })
  })

  // Test one generic counter-based achievement type as an example
  describe('adCampaigns achievements', () => {
    it('should mark achievements based on totalAdCampaigns counter', () => {
      // Test with no campaigns
      let gameState = { ...defaultGameState }
      let achievements = createAchievementConfigs(gameState)
      expect(achievements.adCampaigns[0].customCheck()).toBe(false)
      expect(achievements.adCampaigns[1].customCheck()).toBe(false)

      // Test with 1 campaign
      gameState = { ...defaultGameState, totalAdCampaigns: 1 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.adCampaigns[0].customCheck()).toBe(true)
      expect(achievements.adCampaigns[1].customCheck()).toBe(false)

      // Test with 5 campaigns
      gameState = { ...defaultGameState, totalAdCampaigns: 5 }
      achievements = createAchievementConfigs(gameState)
      expect(achievements.adCampaigns[0].customCheck()).toBe(true)
      expect(achievements.adCampaigns[1].customCheck()).toBe(true)
    })

    it('should format messages correctly for adCampaigns', () => {
      const achievements = createAchievementConfigs(defaultGameState)
      expect(achievements.adCampaigns[0].message).toBe(
        'You ran your first ad campaign about the affordable housing crisis!'
      )
      expect(achievements.adCampaigns[1].message).toBe(
        'You ran 5 ad campaigns about the affordable housing crisis!'
      )
    })
  })
})
