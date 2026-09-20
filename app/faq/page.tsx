import type { Metadata } from 'next'
import FAQ from '@/components/FAQ'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Straight answers on deposits, USDfr vs sUSDfr, defaults, sectors, transparency data, and the public audit.',
}

export default function FaqPage() {
  return (
    <section className="section-y bg-cream dark:bg-navy-deep">
      <div className="container-content">
        <SectionHeader
          tagline="Questions"
          title="Frequently Asked"
          subtitle="The things people actually ask before they deposit — answered plainly."
          align="left"
        />
        <FAQ />
      </div>
    </section>
  )
}
