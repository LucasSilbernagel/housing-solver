export interface Upgrade {
  title: string
  description: string
  cost: number
  quantity: number
  visible: boolean
  maximumQuantity?: number
}

export const UPGRADES: Upgrade[] = [
  {
    title: 'Recruit a volunteer',
    description:
      'Automatically accumulate 1 additional support point every second',
    cost: 50,
    quantity: 0,
    visible: true,
  },
  {
    title: 'Recruit a volunteer recruiter',
    description:
      'Automatically accumulate 2 additional support points every second',
    cost: 150,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Recruit a campaign manager',
    description:
      'Automatically accumulate 5 additional support points every second',
    cost: 500,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Run a local ad campaign about the affordable housing crisis',
    description:
      'Automatically accumulate 10 additional support points every second',
    cost: 2000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Run a regional ad campaign about the affordable housing crisis',
    description:
      'Automatically accumulate 25 additional support points every second',
    cost: 8000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Run a national ad campaign about the affordable housing crisis',
    description:
      'Automatically accumulate 100 additional support points every second',
    cost: 150_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Run for local office',
    description: 'Reduce upgrade costs by 20%',
    cost: 6000,
    quantity: 0,
    visible: false,
    maximumQuantity: 1,
  },
  {
    title: 'Run for regional office',
    description: 'Reduce upgrade costs by 30%',
    cost: 100_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 1,
  },
  {
    title: 'Run for national office',
    description: 'Reduce upgrade costs by 50%',
    cost: 1_000_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 1,
  },
  {
    title: 'Fund a local research project',
    description:
      'Learn how to make housing more affordable; each click generates 5 additional support points',
    cost: 5000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Fund a regional research project',
    description:
      'Learn how to make housing more affordable; each click generates 20 additional support points',
    cost: 50_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Fund a national research project',
    description:
      'Learn how to make housing more affordable; each click generates 50 additional support points',
    cost: 500_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Regulate and reduce short-term housing rentals',
    description: 'Reduce housing unaffordability by 0.2%',
    cost: 40_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 8,
  },
  {
    title: 'Fund a job training program',
    description: 'Reduce housing unaffordability by 0.2%',
    cost: 30_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 8,
  },
  {
    title: 'Tax vacant homes',
    description: 'Reduce housing unaffordability by 0.2%',
    cost: 20_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 18,
  },
  {
    title:
      'Support remote work policies to reduce demand for housing in expensive city centers',
    description: 'Reduce housing unaffordability by 0.1%',
    cost: 10_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 20,
  },
  {
    title: 'Implement zoning reforms to increase housing density',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 80_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 14,
  },
  {
    title: 'Fund new home construction subsidies',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 1_200_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 12,
  },
  {
    title: 'Legislate rent control',
    description: 'Reduce housing unaffordability by 1%',
    cost: 2_000_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 5,
  },
  {
    title: 'Tax breaks for developers who build affordable housing',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 2_400_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 10,
  },
  {
    title: 'Invest in public transportation',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 5_000_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Run a community festival to promote affordable housing discussions',
    description: 'Prevent one NIMBY protest per festival purchased',
    cost: 50_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Pass an anti-corruption law',
    description: 'Prevent one government corruption scandal per law passed',
    cost: 50_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Put an annual cap on immigration',
    description: 'Prevent one wave of unfettered immigration per cap',
    cost: 50_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Legislate rent subsidies for low-income residents',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 2_000_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 2,
  },
  {
    title: 'Build a public housing project',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 5_000_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Legislate a government-funded affordable daycare plan',
    description: 'Reduce housing unaffordability by 0.5%',
    cost: 2_000_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 1,
  },
  {
    title: 'Increase the minimum wage',
    description: 'Reduce housing unaffordability by 1%',
    cost: 5_000_000,
    quantity: 0,
    visible: false,
  },
  {
    title:
      'Restrict corporation ownership of residential properties to specific types',
    description: 'Reduce housing unaffordability by 1%',
    cost: 6_000_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 1,
  },
  {
    title: 'Increase taxes on large corporations',
    description: 'Reduce housing unaffordability by 1%',
    cost: 10_000_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Increase taxes on billionaires',
    description: 'Reduce housing unaffordability by 2%',
    cost: 20_000_000,
    quantity: 0,
    visible: false,
  },
  {
    title: 'Make it illegal for individuals to own more than two homes',
    description: 'Reduce housing unaffordability by 4%',
    cost: 50_000_000,
    quantity: 0,
    visible: false,
    maximumQuantity: 1,
  },
]
