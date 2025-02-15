import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'
import { useGameStore } from './use-game-store'

export const useAchievements = () => {
  const {
    achievements,
    updateAchievement,
    allTimePoints,
    housingUnaffordabilityScore,
    electedToLocalOffice,
    volunteersRecruited,
    volunteerRecruitersRecruited,
    campaignManagersRecruited,
    totalAdCampaigns,
    totalTrainingProgramsFunded,
    electedToRegionalOffice,
    electedToNationalOffice,
    nimbyProtestsPrevented,
    totalNimbyProtests,
  } = useGameStore(
    useShallow((state) => ({
      achievements: state.achievements,
      updateAchievement: state.updateAchievement,
      allTimePoints: state.allTimePoints,
      housingUnaffordabilityScore: state.housingUnaffordabilityScore,
      electedToLocalOffice: state.electedToLocalOffice,
      volunteersRecruited: state.volunteersRecruited,
      volunteerRecruitersRecruited: state.volunteerRecruitersRecruited,
      campaignManagersRecruited: state.campaignManagersRecruited,
      totalAdCampaigns: state.totalAdCampaigns,
      totalTrainingProgramsFunded: state.totalTrainingProgramsFunded,
      electedToRegionalOffice: state.electedToRegionalOffice,
      electedToNationalOffice: state.electedToNationalOffice,
      nimbyProtestsPrevented: state.nimbyProtestsPrevented,
      totalNimbyProtests: state.totalNimbyProtests,
    }))
  )

  const totalVolunteers =
    volunteersRecruited +
    volunteerRecruitersRecruited +
    campaignManagersRecruited

  useEffect(() => {
    const checkAchievement = (
      achievementText: string,
      attribute: 'visible' | 'achieved'
    ) => {
      return achievements.find(
        (achievement) => achievement.text === achievementText
      )?.[attribute]
    }

    if (
      allTimePoints >= 100 &&
      !checkAchievement('Generate 100 support points', 'achieved')
    ) {
      updateAchievement('Generate 100 support points', 'achieved', true)
      toast.success('Generated 100 support points!')
      updateAchievement('Generate 1,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 1000 &&
      !checkAchievement('Generate 1,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 1,000 support points', 'achieved', true)
      toast.success('Generated 1,000 support points!')
      updateAchievement('Generate 10,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 10_000 &&
      !checkAchievement('Generate 10,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 10,000 support points', 'achieved', true)
      toast.success('Generated 10,000 support points!')
      updateAchievement('Generate 100,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 100_000 &&
      !checkAchievement('Generate 100,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 100,000 support points', 'achieved', true)
      toast.success('Generated 100,000 support points!')
      updateAchievement('Generate 500,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 500_000 &&
      !checkAchievement('Generate 500,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 500,000 support points', 'achieved', true)
      toast.success('Generated 500,000 support points!')
      updateAchievement('Generate 1,000,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 1_000_000 &&
      !checkAchievement('Generate 1,000,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 1,000,000 support points', 'achieved', true)
      toast.success('Generated 1,000,000 support points!')
      updateAchievement('Generate 10,000,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 10_000_000 &&
      !checkAchievement('Generate 10,000,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 10,000,000 support points', 'achieved', true)
      toast.success('Generated 10,000,000 support points!')
      updateAchievement('Generate 100,000,000 support points', 'visible', true)
    }
    if (
      allTimePoints >= 100_000_000 &&
      !checkAchievement('Generate 100,000,000 support points', 'achieved')
    ) {
      updateAchievement('Generate 100,000,000 support points', 'achieved', true)
      toast.success('Generated 100,000,000 support points!')
      updateAchievement(
        'Generate 1,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 1_000_000_000 &&
      !checkAchievement('Generate 1,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 1,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 1,000,000,000 support points!')
      updateAchievement(
        'Generate 10,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 10_000_000_000 &&
      !checkAchievement('Generate 10,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 10,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 10,000,000,000 support points!')
      updateAchievement(
        'Generate 100,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 100_000_000_000 &&
      !checkAchievement('Generate 100,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 100,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 100,000,000,000 support points!')
      updateAchievement(
        'Generate 1,000,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 1_000_000_000_000 &&
      !checkAchievement('Generate 1,000,000,000,000 support points', 'achieved')
    ) {
      updateAchievement(
        'Generate 1,000,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 1,000,000,000,000 support points!')
      updateAchievement(
        'Generate 10,000,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 10_000_000_000_000 &&
      !checkAchievement(
        'Generate 10,000,000,000,000 support points',
        'achieved'
      )
    ) {
      updateAchievement(
        'Generate 10,000,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 10,000,000,000,000 support points!')
      updateAchievement(
        'Generate 100,000,000,000,000 support points',
        'visible',
        true
      )
    }
    if (
      allTimePoints >= 100_000_000_000_000 &&
      !checkAchievement(
        'Generate 100,000,000,000,000 support points',
        'achieved'
      )
    ) {
      updateAchievement(
        'Generate 100,000,000,000,000 support points',
        'achieved',
        true
      )
      toast.success('Generated 100,000,000,000,000 support points!')
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 30%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 30%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 25%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 25%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 20%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 20%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 15%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 15%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 10%', 'visible')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 10%',
        'visible',
        true
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Reduce housing unaffordability to 5%', 'visible')
    ) {
      updateAchievement('Reduce housing unaffordability to 5%', 'visible', true)
    }
    if (
      electedToLocalOffice &&
      !checkAchievement(
        'Completely eliminate housing unaffordability',
        'visible'
      )
    ) {
      updateAchievement(
        'Completely eliminate housing unaffordability',
        'visible',
        true
      )
    }
    if (
      housingUnaffordabilityScore <= 30 &&
      !checkAchievement('Reduce housing unaffordability to 30%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 30%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 30% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 25 &&
      !checkAchievement('Reduce housing unaffordability to 25%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 25%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 25% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 20 &&
      !checkAchievement('Reduce housing unaffordability to 20%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 20%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 20% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 15 &&
      !checkAchievement('Reduce housing unaffordability to 15%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 15%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 15% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 10 &&
      !checkAchievement('Reduce housing unaffordability to 10%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 10%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 10% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 5 &&
      !checkAchievement('Reduce housing unaffordability to 5%', 'achieved')
    ) {
      updateAchievement(
        'Reduce housing unaffordability to 5%',
        'achieved',
        true
      )
      toast.success('Reduced housing unaffordability to 5% or lower!')
    }
    if (
      housingUnaffordabilityScore <= 0 &&
      !checkAchievement(
        'Completely eliminate housing unaffordability',
        'achieved'
      )
    ) {
      updateAchievement(
        'Completely eliminate housing unaffordability',
        'achieved',
        true
      )
      toast.success('You have completely eliminated housing unaffordability!')
    }
    if (
      totalVolunteers >= 1 &&
      !checkAchievement('Recruit a volunteer', 'achieved')
    ) {
      updateAchievement('Recruit a volunteer', 'achieved', true)
      toast.success('You recruited your first volunteer!')
    }
    if (
      checkAchievement('Recruit a volunteer', 'achieved') &&
      !checkAchievement('Recruit 10 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 10 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 10 &&
      !checkAchievement('Recruit 10 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 10 volunteers', 'achieved', true)
      toast.success('You recruited 10 volunteers!')
    }
    if (
      checkAchievement('Recruit 10 volunteers', 'achieved') &&
      !checkAchievement('Recruit 100 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 100 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 100 &&
      !checkAchievement('Recruit 100 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 100 volunteers', 'achieved', true)
      toast.success('You recruited 100 volunteers!')
    }
    if (
      checkAchievement('Recruit 100 volunteers', 'achieved') &&
      !checkAchievement('Recruit 500 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 500 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 500 &&
      !checkAchievement('Recruit 500 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 500 volunteers', 'achieved', true)
      toast.success('You recruited 500 volunteers!')
    }
    if (
      checkAchievement('Recruit 500 volunteers', 'achieved') &&
      !checkAchievement('Recruit 1,000 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 1,000 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 1000 &&
      !checkAchievement('Recruit 1,000 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 1,000 volunteers', 'achieved', true)
      toast.success('You recruited 1,000 volunteers!')
    }
    if (
      checkAchievement('Recruit 1,000 volunteers', 'achieved') &&
      !checkAchievement('Recruit 10,000 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 10,000 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 10_000 &&
      !checkAchievement('Recruit 10,000 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 10,000 volunteers', 'achieved', true)
      toast.success('You recruited 10,000 volunteers!')
    }
    if (
      checkAchievement('Recruit 10,000 volunteers', 'achieved') &&
      !checkAchievement('Recruit 100,000 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 100,000 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 100_000 &&
      !checkAchievement('Recruit 100,000 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 100,000 volunteers', 'achieved', true)
      toast.success('You recruited 100,000 volunteers!')
    }
    if (
      checkAchievement('Recruit 100,000 volunteers', 'achieved') &&
      !checkAchievement('Recruit 1,000,000 volunteers', 'visible')
    ) {
      updateAchievement('Recruit 1,000,000 volunteers', 'visible', true)
    }
    if (
      totalVolunteers >= 1_000_000 &&
      !checkAchievement('Recruit 1,000,000 volunteers', 'achieved')
    ) {
      updateAchievement('Recruit 1,000,000 volunteers', 'achieved', true)
      toast.success('You recruited 1,000,000 volunteers!')
    }
    if (
      campaignManagersRecruited >= 1 &&
      !checkAchievement(
        'Run an ad campaign about the affordable housing crisis',
        'visible'
      )
    ) {
      updateAchievement(
        'Run an ad campaign about the affordable housing crisis',
        'visible',
        true
      )
    }
    if (
      totalAdCampaigns >= 1 &&
      !checkAchievement(
        'Run an ad campaign about the affordable housing crisis',
        'achieved'
      )
    ) {
      updateAchievement(
        'Run an ad campaign about the affordable housing crisis',
        'achieved',
        true
      )
      toast.success(
        'You ran your first ad campaign about the affordable housing crisis!'
      )
    }
    if (
      checkAchievement(
        'Run an ad campaign about the affordable housing crisis',
        'achieved'
      ) &&
      !checkAchievement(
        'Run 10 ad campaigns about the affordable housing crisis',
        'visible'
      )
    ) {
      updateAchievement(
        'Run 10 ad campaigns about the affordable housing crisis',
        'visible',
        true
      )
    }
    if (
      totalAdCampaigns >= 10 &&
      !checkAchievement(
        'Run 10 ad campaigns about the affordable housing crisis',
        'achieved'
      )
    ) {
      updateAchievement(
        'Run 10 ad campaigns about the affordable housing crisis',
        'achieved',
        true
      )
      toast.success(
        'You ran 10 ad campaigns about the affordable housing crisis!'
      )
    }
    if (
      checkAchievement(
        'Run 10 ad campaigns about the affordable housing crisis',
        'achieved'
      ) &&
      !checkAchievement(
        'Run 100 ad campaigns about the affordable housing crisis',
        'visible'
      )
    ) {
      updateAchievement(
        'Run 100 ad campaigns about the affordable housing crisis',
        'visible',
        true
      )
    }
    if (
      totalAdCampaigns >= 100 &&
      !checkAchievement(
        'Run 100 ad campaigns about the affordable housing crisis',
        'achieved'
      )
    ) {
      updateAchievement(
        'Run 100 ad campaigns about the affordable housing crisis',
        'achieved',
        true
      )
      toast.success(
        'You ran 100 ad campaigns about the affordable housing crisis!'
      )
    }
    if (
      checkAchievement(
        'Run 100 ad campaigns about the affordable housing crisis',
        'achieved'
      ) &&
      !checkAchievement(
        'Run 500 ad campaigns about the affordable housing crisis',
        'visible'
      )
    ) {
      updateAchievement(
        'Run 500 ad campaigns about the affordable housing crisis',
        'visible',
        true
      )
    }
    if (
      totalAdCampaigns >= 500 &&
      !checkAchievement(
        'Run 500 ad campaigns about the affordable housing crisis',
        'achieved'
      )
    ) {
      updateAchievement(
        'Run 500 ad campaigns about the affordable housing crisis',
        'achieved',
        true
      )
      toast.success(
        'You ran 500 ad campaigns about the affordable housing crisis!'
      )
    }
    if (
      checkAchievement(
        'Run 600 ad campaigns about the affordable housing crisis',
        'achieved'
      ) &&
      !checkAchievement(
        'Run 1,000 ad campaigns about the affordable housing crisis',
        'visible'
      )
    ) {
      updateAchievement(
        'Run 1,000 ad campaigns about the affordable housing crisis',
        'visible',
        true
      )
    }
    if (
      totalAdCampaigns >= 1000 &&
      !checkAchievement(
        'Run 1,000 ad campaigns about the affordable housing crisis',
        'achieved'
      )
    ) {
      updateAchievement(
        'Run 1,000 ad campaigns about the affordable housing crisis',
        'achieved',
        true
      )
      toast.success(
        'You ran 1,000 ad campaigns about the affordable housing crisis!'
      )
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Fund a job training program', 'visible')
    ) {
      updateAchievement('Fund a job training program', 'visible', true)
    }
    if (
      totalTrainingProgramsFunded >= 1 &&
      !checkAchievement('Fund a job training program', 'achieved')
    ) {
      updateAchievement('Fund a job training program', 'achieved', true)
      toast.success('You successfully funded a job training program!')
    }
    if (
      checkAchievement('Fund a job training program', 'achieved') &&
      !checkAchievement('Fund 5 job training programs', 'visible')
    ) {
      updateAchievement('Fund 5 job training programs', 'visible', true)
    }
    if (
      totalTrainingProgramsFunded >= 5 &&
      !checkAchievement('Fund 5 job training programs', 'achieved')
    ) {
      updateAchievement('Fund 5 job training programs', 'achieved', true)
      toast.success('You funded 5 job training programs!')
    }
    if (
      checkAchievement('Fund 5 job training programs', 'achieved') &&
      !checkAchievement('Fund 10 job training programs', 'visible')
    ) {
      updateAchievement('Fund 10 job training programs', 'visible', true)
    }
    if (
      totalTrainingProgramsFunded >= 10 &&
      !checkAchievement('Fund 10 job training programs', 'achieved')
    ) {
      updateAchievement('Fund 10 job training programs', 'achieved', true)
      toast.success('You funded 10 job training programs!')
    }
    if (
      totalAdCampaigns >= 1 &&
      !checkAchievement('Get elected to local office', 'visible')
    ) {
      updateAchievement('Get elected to local office', 'visible', true)
    }
    if (
      electedToLocalOffice &&
      !checkAchievement('Get elected to local office', 'achieved')
    ) {
      updateAchievement('Get elected to local office', 'achieved', true)
      toast.success('You were elected to local office!')
    }
    if (
      checkAchievement('Get elected to local office', 'achieved') &&
      !checkAchievement('Get elected to regional office', 'visible')
    ) {
      updateAchievement('Get elected to regional office', 'visible', true)
    }
    if (
      electedToRegionalOffice &&
      !checkAchievement('Get elected to regional office', 'achieved')
    ) {
      updateAchievement('Get elected to regional office', 'achieved', true)
      toast.success('You were elected to regional office!')
    }
    if (
      checkAchievement('Get elected to regional office', 'achieved') &&
      !checkAchievement('Get elected to national office', 'visible')
    ) {
      updateAchievement('Get elected to national office', 'visible', true)
    }
    if (
      electedToNationalOffice &&
      !checkAchievement('Get elected to national office', 'achieved')
    ) {
      updateAchievement('Get elected to national office', 'achieved', true)
      toast.success('You were elected to national office!')
    }
    if (
      totalNimbyProtests >= 1 &&
      !checkAchievement('Prevent a NIMBY protest', 'visible')
    ) {
      updateAchievement('Prevent a NIMBY protest', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 1 &&
      !checkAchievement('Prevent a NIMBY protest', 'achieved')
    ) {
      updateAchievement('Prevent a NIMBY protest', 'achieved', true)
      toast.success('You were able to prevent a NIMBY protest!')
    }
    if (
      checkAchievement('Prevent a NIMBY protest', 'achieved') &&
      !checkAchievement('Prevent 2 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 2 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 2 &&
      !checkAchievement('Prevent 2 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 2 NIMBY protests', 'achieved', true)
      toast.success('You prevented 2 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 2 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 5 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 5 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 5 &&
      !checkAchievement('Prevent 5 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 5 NIMBY protests', 'achieved', true)
      toast.success('You prevented 5 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 5 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 10 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 10 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 10 &&
      !checkAchievement('Prevent 10 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 10 NIMBY protests', 'achieved', true)
      toast.success('You prevented 10 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 10 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 20 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 20 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 20 &&
      !checkAchievement('Prevent 20 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 20 NIMBY protests', 'achieved', true)
      toast.success('You prevented 20 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 20 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 50 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 50 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 50 &&
      !checkAchievement('Prevent 50 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 50 NIMBY protests', 'achieved', true)
      toast.success('You prevented 50 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 50 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 100 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 100 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 100 &&
      !checkAchievement('Prevent 100 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 100 NIMBY protests', 'achieved', true)
      toast.success('You prevented 100 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 100 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 500 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 500 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 500 &&
      !checkAchievement('Prevent 500 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 500 NIMBY protests', 'achieved', true)
      toast.success('You prevented 500 NIMBY protests!')
    }
    if (
      checkAchievement('Prevent 500 NIMBY protests', 'achieved') &&
      !checkAchievement('Prevent 1,000 NIMBY protests', 'visible')
    ) {
      updateAchievement('Prevent 1,000 NIMBY protests', 'visible', true)
    }
    if (
      nimbyProtestsPrevented >= 1000 &&
      !checkAchievement('Prevent 1,000 NIMBY protests', 'achieved')
    ) {
      updateAchievement('Prevent 1,000 NIMBY protests', 'achieved', true)
      toast.success('You prevented 1,000 NIMBY protests!')
    }
  }, [
    allTimePoints,
    updateAchievement,
    achievements,
    housingUnaffordabilityScore,
    electedToLocalOffice,
    totalVolunteers,
    campaignManagersRecruited,
    totalAdCampaigns,
    totalTrainingProgramsFunded,
    electedToRegionalOffice,
    electedToNationalOffice,
    totalNimbyProtests,
    nimbyProtestsPrevented,
  ])
}
