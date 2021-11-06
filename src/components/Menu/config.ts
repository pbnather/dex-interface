import { MenuEntry } from 'trinityhelper'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://morpheusswap.app/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'https://morpheusswap.app/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'https://morpheusswap.app/pools',
  },
  {
    label: 'Neo Pools',
    icon: 'GroupsIcon',
    href: 'https://morpheusswap.app/staking',
  },
  
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: '#',
      },
      {
        label: 'Tokens',
        href: '#',
      },
      {
        label: 'Pairs',
        href: '#',
      },
      {
        label: 'Accounts',
        href: '#',
      },
    ],
  },
  
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/crypdawg',
      },
      {
        label: 'Docs',
        href: 'https://morpheusswap.gitbook.io/morpheus-swap/',
      },
    ],
  },
]

export default config
