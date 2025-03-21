import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Achievement, getInitialAchievements } from './get-initial-achievements'

vi.mock('../constants/achievement-definitions', () => {
  return {
    ACHIEVEMENT_DEFINITIONS: {
      category1: [
        { text: 'Generate 100 support points', someOtherProp: 'value1' },
        { text: 'Generate 1000 support points', someOtherProp: 'value2' },
      ],
      category2: [
        { text: 'Recruit a volunteer', someOtherProp: 'value3' },
        { text: 'Recruit 10 volunteers', someOtherProp: 'value4' },
      ],
    },
  }
})

describe('getInitialAchievements', () => {
  let achievements: Achievement[]

  beforeEach(() => {
    vi.resetModules()
    achievements = getInitialAchievements()
  })

  it('should return an array of achievements with the correct structure', () => {
    expect(Array.isArray(achievements)).toBe(true)
    expect(achievements.length).toBe(4)

    for (const achievement of achievements) {
      expect(achievement).toHaveProperty('text')
      expect(achievement).toHaveProperty('visible')
      expect(achievement).toHaveProperty('achieved')
      expect(typeof achievement.text).toBe('string')
      expect(typeof achievement.visible).toBe('boolean')
      expect(typeof achievement.achieved).toBe('boolean')
    }
  })

  it('should set all achievements as not achieved initially', () => {
    for (const achievement of achievements) {
      expect(achievement.achieved).toBe(false)
    }
  })

  it('should make only specific achievements visible initially', () => {
    const visibleAchievements = achievements.filter((a) => a.visible)
    expect(visibleAchievements.length).toBe(2)

    expect(
      visibleAchievements.some((a) => a.text === 'Generate 100 support points')
    ).toBe(true)
    expect(
      visibleAchievements.some((a) => a.text === 'Recruit a volunteer')
    ).toBe(true)

    const invisibleAchievements = achievements.filter((a) => !a.visible)
    expect(invisibleAchievements.length).toBe(2)
    expect(
      invisibleAchievements.some(
        (a) => a.text === 'Generate 1000 support points'
      )
    ).toBe(true)
    expect(
      invisibleAchievements.some((a) => a.text === 'Recruit 10 volunteers')
    ).toBe(true)
  })

  it('should correctly extract the text from all achievement definitions', () => {
    const achievementTexts = achievements.map((a) => a.text)

    expect(achievementTexts).toContain('Generate 100 support points')
    expect(achievementTexts).toContain('Generate 1000 support points')
    expect(achievementTexts).toContain('Recruit a volunteer')
    expect(achievementTexts).toContain('Recruit 10 volunteers')
  })

  it('should flatten all achievement categories', () => {
    expect(achievements.length).toBe(4)
  })
})
