import { faker } from '@faker-js/faker'

faker.seed(12345)

const campaignThemes = [
  'HOLIDAY',
  'WORLDCUP',
  'VIP',
  'WELCOME',
  'WEEKEND',
  'CASHBACK',
  'FREESPIN',
  'DEPOSIT',
  'LOYALTY',
  'SPORTS',
  'CASINO',
  'BLACKFRIDAY',
  'NEWYEAR',
  'SUMMER',
  'CHAMPIONSHIP',
]

const campaignTypes = [
  'FTD',
  'SPORTS',
  'CASHBACK',
  'BONUS',
  'PROMO',
  'REWARD',
  'SPECIAL',
]

const campaignNames = [
  'Holiday Season FTD Campaign',
  'World Cup Sports Betting Promotion',
  'VIP Loyalty Cashback Program',
  'Welcome Bonus Mega Event',
  'Weekend Casino Boost',
  'Monthly Cashback Rewards',
  'Free Spins Extravaganza',
  'First Deposit Bonus',
  'Loyalty Points Program',
  'Sports Betting Championship',
  'Casino Welcome Package',
  'Black Friday Special Offers',
  'New Year Mega Promotion',
  'Summer Sports Bonanza',
  'Championship Betting Event',
]

const campaignDescriptions = [
  'First deposit bonus campaign targeting new users during the holiday season with enhanced rewards and special promotions.',
  'Sports betting focused campaign with free bets and enhanced odds for World Cup matches to drive engagement among sports enthusiasts.',
  'Exclusive cashback program for VIP members with tiered rewards based on gaming activity and deposit history.',
  'Welcome package for new players featuring multiple deposit bonuses and free spins across various casino games.',
  'Weekend special promotion offering boosted rewards and enhanced betting opportunities for casino players.',
  'Monthly cashback rewards program providing players with percentage returns based on their total gaming activity.',
  'Free spins promotion across popular slot games with no wagering requirements for qualified players.',
  'First-time deposit bonus offering matched funds and additional rewards to encourage new player acquisition.',
  'Comprehensive loyalty program rewarding long-term players with points redeemable for bonuses and exclusive perks.',
  'Sports betting campaign with enhanced odds and special markets for major championship events.',
  'Multi-tier casino welcome bonus featuring deposit matches and free play credits across table games and slots.',
  'Black Friday exclusive offers with limited-time bonuses and enhanced reward multipliers for all players.',
  'New Year celebration campaign with progressive bonuses and special tournaments throughout January.',
  'Summer-themed sports betting promotion featuring enhanced odds on major sporting events and tournaments.',
  'Championship event campaign with special betting markets and boosted odds for qualified matches.',
]

const teams = ['Marketing Team', 'Campaign Team', 'Product Team', 'Growth Team']

const statuses = [0, 1, 2, 3]

export const campaigns = Array.from({ length: 25 }, () => {
  const theme = faker.helpers.arrayElement(campaignThemes)
  const type = faker.helpers.arrayElement(campaignTypes)
  const year = faker.helpers.arrayElement([2024, 2025])
  const month = faker.number.int({ min: 10, max: 12 })
  const day = faker.number.int({ min: 1, max: 28 })

  const createdDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const modifiedDay = faker.number.int({ min: day, max: 28 })
  const modifiedDate = `${year}-${String(month).padStart(2, '0')}-${String(modifiedDay).padStart(2, '0')}`

  const createdBy = faker.helpers.arrayElement(teams)
  const modifiedBy = faker.helpers.arrayElement(teams)

  return {
    code: `CAM_${theme}_${type}_${year}`,
    name: faker.helpers.arrayElement(campaignNames),
    description: faker.helpers.arrayElement(campaignDescriptions),
    status: faker.helpers.arrayElement(statuses),
    createdDate,
    createdBy,
    modifiedDate,
    modifiedBy,
  }
})
