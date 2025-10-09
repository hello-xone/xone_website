import { EXTERNAL_LINKS } from '@/constants/external';

export const MENUS_CONFIG = [
  {
    text: 'Study',
    items: [
      { label: 'What is Xone?', href: EXTERNAL_LINKS.docs + 'study/xone' },
      { label: 'What is a Xone Account?', href: EXTERNAL_LINKS.docs + 'study/account' },
      { label: 'Xone Coin', href: EXTERNAL_LINKS.docs + 'study/xoc' },
      { label: 'Gas Fees', href: EXTERNAL_LINKS.docs + 'study/gas' },
      { label: 'Modules', href: EXTERNAL_LINKS.docs + 'study/modules' },
      { label: 'Nodes', href: EXTERNAL_LINKS.docs + 'study/nodes' },
      { label: 'Epoch', href: EXTERNAL_LINKS.docs + 'study/epoch' }
    ]
  },
  {
    text: 'Build',
    items: [
      { label: 'Developer Center', href: '/build' },
      { label: 'RPC Access', href: '/build/access' },
      { label: 'Developer Docs', href: EXTERNAL_LINKS.docs + 'developers/ready' },
      { label: 'Explorer', href: EXTERNAL_LINKS.MainExplorer },
      { label: 'Faucet', href: EXTERNAL_LINKS.faucet },
      { label: 'Bounty Hunter', href: EXTERNAL_LINKS.docs + 'study/bug' }
    ]
  },
  {
    text: 'Ecology',
    href: '/apps'
  },
  {
    text: 'Release',
    href: '/release'
  },
  {
    text: 'Community',
    items: [
      { label: 'X', href: EXTERNAL_LINKS.Twitter },
      { label: 'Telegram', href: EXTERNAL_LINKS.Telegram },
      { label: 'Events', href: EXTERNAL_LINKS.Events },
      { label: 'News', href: EXTERNAL_LINKS.Medium }
    ]
  },
];
