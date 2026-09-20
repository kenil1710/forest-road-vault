import type { Metadata } from 'next'
import HowItWorks from '@/components/HowItWorks'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'From a USDC deposit to sUSDfr yield — and the three-layer loss cascade that puts depositors last by construction.',
}

export default function HowItWorksPage() {
  return <HowItWorks />
}
