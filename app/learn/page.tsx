import type { Metadata } from 'next'
import DeepDive from '@/components/DeepDive'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Deep Dive',
  description:
    'Protocol architecture, tokens, security and audits, credit structure, and governance behind Forest Road Vault.',
}

export default function LearnPage() {
  return (
    <section className="section-y bg-cream dark:bg-navy-deep">
      <div className="container-content">
        <SectionHeader
          eyebrow="Learn"
          title="Deep Dive"
          subtitle="The architecture, the tokens, the audit record, the credit book, and who holds the keys."
          align="left"
        />
        <DeepDive />
      </div>
    </section>
  )
}
