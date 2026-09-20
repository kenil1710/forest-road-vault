/**
 * Where *this* community site is deployed. Deliberately separate from
 * links.website (the official protocol site) — Open Graph images and share
 * links must resolve against the host actually serving these pages, and on
 * Vercel the per-deployment host sits behind deployment protection.
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
  ogDescription:
    'A real-world credit protocol on Ethereum. Take the quiz, grow your knowledge tree.',
  siteName: 'Forest Road Vault Community',
  handle: '@forestroadvault',
  tagline: 'Capital moves further.',
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
  slug: string
  min: number
  max: number
  emoji: string
  name: string
  description: string
  /** Certificate line: "<name> has ..." */
  citation: string
}

export const treeLevels: TreeLevel[] = [
  {
    slug: 'seedling',
    min: 0,
    max: 5,
    emoji: '🌱',
    name: 'Seedling',
    description: 'Just planted — read the Deep Dive and try again.',
    citation:
      'has begun learning the Forest Road Vault protocol',
  },
  {
    slug: 'sapling',
    min: 6,
    max: 9,
    emoji: '🌿',
    name: 'Sapling',
    description: 'Growing strong — you know the fundamentals well.',
    citation:
      'has demonstrated a solid grasp of the Forest Road Vault protocol',
  },
  {
    slug: 'elder-tree',
    min: 10,
    max: 15,
    emoji: '🌳',
    name: 'Elder Tree',
    description: 'Deep roots — you truly understand the protocol.',
    citation:
      'has demonstrated deep knowledge of the Forest Road Vault protocol',
  },
]

export function getTreeLevel(score: number): TreeLevel {
  return (
    treeLevels.find((level) => score >= level.min && score <= level.max) ??
    treeLevels[0]
  )
}

export function getTreeLevelBySlug(slug: string): TreeLevel | undefined {
  return treeLevels.find((level) => level.slug === slug)
}

export const stats = [
  { value: 'Ethereum L1', label: 'Blockchain' },
  { value: 'ERC-4626', label: 'Vault Standard' },
  { value: 'USDfr', label: 'Synthetic Dollar' },
  { value: '3-Layer Cascade', label: 'Loss Waterfall' },
  { value: 'Live on Mainnet', label: 'Status' },
]

/** Brand palette, mirrored here for the canvas/OG renderers. */
export const brand = {
  cream: '#F5F1EA',
  creamDark: '#EDE8DF',
  navy: '#1B2A4A',
  navyDeep: '#0F1A2E',
  forest: '#1E3D2F',
  gold: '#C4A44E',
  goldMuted: '#B8972F',
  muted: '#5A6A80',
  border: '#D6D0C4',
}
