/**
 * Where *this* community site is deployed. It is deliberately separate from
 * links.website (the official protocol site) — Open Graph images and the X
 * share link must resolve against the host actually serving these pages.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000')

export const siteMeta = {
  name: 'Forest Road Vault',
  title: 'Forest Road Vault — Learn & Earn Your Tree',
  description:
    'Learn about Forest Road Vault, the real-world credit protocol on Ethereum L1. Take the quiz, earn your tree certificate, share on X.',
  handle: '@forestroadvault',
  url: siteUrl,
}

export const links = {
  website: 'https://forestroadvault.com/',
  transparency: 'https://forestroadvault.com/transparency',
  howItWorks: 'https://forestroadvault.com/how-it-works',
  sectors: 'https://forestroadvault.com/sectors',
  risk: 'https://forestroadvault.com/risk',
  twitter: 'https://x.com/forestroadvault',
  github: 'https://github.com/Forest-Road-Company/forest-road-vault',
  whitelist: 'https://whitelist.forestroadvault.com',
}

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/learn', label: 'Learn' },
  { href: '/faq', label: 'FAQ' },
  { href: '/quiz', label: 'Quiz' },
]

export type TreeLevel = {
  min: number
  max: number
  emoji: string
  name: string
  color: string
  description: string
}

export const treeLevels: TreeLevel[] = [
  {
    min: 0,
    max: 5,
    emoji: '🌱',
    name: 'Seedling',
    color: '#95d5b2',
    description: 'Just planted — read the Deep Dive and try again.',
  },
  {
    min: 6,
    max: 9,
    emoji: '🌿',
    name: 'Sapling',
    color: '#40916c',
    description: 'Growing strong — you know the fundamentals well.',
  },
  {
    min: 10,
    max: 15,
    emoji: '🌳',
    name: 'Elder Tree',
    color: '#2d6a4f',
    description:
      'Deep roots — you truly understand the Forest Road Vault protocol.',
  },
]

export function getTreeLevel(score: number): TreeLevel {
  return (
    treeLevels.find((level) => score >= level.min && score <= level.max) ??
    treeLevels[0]
  )
}

export const stats = [
  { value: 'Ethereum L1', label: 'Blockchain' },
  { value: 'ERC-4626', label: 'Vault Standard' },
  { value: 'USDfr', label: 'Synthetic Dollar' },
  { value: '3-Layer', label: 'Loss Cascade' },
  { value: 'Live', label: 'Mainnet Status' },
]
