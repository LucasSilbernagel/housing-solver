export interface Upgrade {
  title: string
  description: string
  cost: number
  quantity: number
  visible: boolean
  oneTimePurchase?: {
    purchased: boolean
  }
}

export const UPGRADES: Upgrade[] = [
  {
    title: 'Recruit a volunteer',
    description: 'Automatically accumulate 1 support point every 2 seconds',
    cost: 50,
    quantity: 0,
    visible: true,
  },
  {
    title: 'Recruit a volunteer recruiter',
    description: 'Automatically accumulate 1 support point every second',
    cost: 500,
    quantity: 0,
    visible: true,
  },
  {
    title: 'Run for regional office',
    description: 'Reduce upgrade costs by 25%',
    cost: 100_000,
    quantity: 1,
    visible: true,
    oneTimePurchase: {
      purchased: true,
    },
  },
  {
    title: 'Run for local office',
    description: 'Reduce upgrade costs by 20%',
    cost: 50_000,
    quantity: 0,
    visible: true,
    oneTimePurchase: {
      purchased: false,
    },
  },
]
