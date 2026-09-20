import { ArrowDown } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import SectionHeader from '@/components/ui/SectionHeader'

const steps = [
  {
    number: '01',
    title: 'Deposit USDC',
    description:
      'Connect your wallet and deposit USDC to receive USDfr 1:1. Access is KYC-gated — the legal and risk disclosures are part of the flow, not a footnote.',
  },
  {
    number: '02',
    title: 'Capital Goes to Work',
    description:
      'Deposits are deployed into identified, lien-perfected credit facilities across media & entertainment, renewable energy, and digital assets. Each facility is tracked on its own, never pooled blindly.',
  },
  {
    number: '03',
    title: 'Earn sUSDfr Yield',
    description:
      'Interest passes through to the sUSDfr vault token as it is earned. Your position sits behind a three-layer loss cascade.',
  },
]

const cascade = [
  {
    layer: 'Layer 01',
    title: 'Curator First-Loss Capital',
    description:
      'The curator has its own capital at risk ahead of everyone else. Any loss on the book hits this layer before it touches another participant.',
    accent: 'border-gold',
  },
  {
    layer: 'Layer 02',
    title: 'sGROVE Backstop',
    description:
      'If first-loss capital is fully absorbed, the sGROVE backstop takes the next tranche of losses. It is a dedicated buffer, not a discretionary bailout.',
    accent: 'border-cream/30',
  },
  {
    layer: 'Layer 03',
    title: 'sUSDfr Principal',
    description:
      'Only if both layers above are exhausted does sUSDfr principal absorb a loss.',
    accent: 'border-cream/15',
    note: 'Depositors are last by construction',
  },
]

export default function HowItWorks() {
  return (
    <>
      {/* Cream: the three steps. */}
      <section className="section-y bg-cream dark:bg-navy-deep">
        <div className="container-content">
          <SectionHeader
            tagline="Three Steps"
            title="How It Works"
            subtitle="From a USDC deposit to real, auditable yield."
          />

          <ol className="mt-20 grid gap-px overflow-hidden border border-gold/30 bg-gold/30 lg:grid-cols-3">
            {steps.map((step, index) => (
              <AnimateIn
                as="li"
                key={step.number}
                delay={index * 0.12}
                className="bg-cream dark:bg-navy-deep"
              >
                <article className="h-full p-8 lg:p-10">
                  <p
                    aria-hidden="true"
                    className="font-heading text-4xl font-bold text-gold"
                  >
                    {step.number}
                  </p>
                  <h3 className="mt-5 font-heading text-xl font-bold text-navy dark:text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted dark:text-cream/65">
                    {step.description}
                  </p>
                </article>
              </AnimateIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Navy: the loss waterfall. */}
      <section className="section-y bg-navy-deep text-cream">
        <div className="container-content">
          <SectionHeader
            tagline="Loss Waterfall"
            title="The Three-Layer Loss Cascade"
            subtitle="Losses flow in a fixed order. Nothing about it is discretionary, and nothing about it changes after a default."
            tone="dark"
          />

          <ol className="mx-auto mt-20 max-w-2xl">
            {cascade.map((item, index) => (
              <AnimateIn as="li" key={item.layer} delay={index * 0.12}>
                <article className={`border-l-2 ${item.accent} bg-navy-light/30 p-8`}>
                  <p className="font-body text-xs uppercase tracking-tagline text-gold">
                    {item.layer}
                  </p>
                  <h3 className="mt-3 font-heading text-xl font-bold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    {item.description}
                  </p>
                  {item.note ? (
                    <p className="mt-5 inline-block border border-gold/40 px-4 py-2 font-body text-xs uppercase tracking-tagline text-gold">
                      {item.note}
                    </p>
                  ) : null}
                </article>
                {index < cascade.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="flex flex-col items-center py-4 text-gold/60"
                  >
                    <span className="h-8 w-px bg-gold/30" />
                    <ArrowDown className="h-4 w-4" />
                  </div>
                ) : null}
              </AnimateIn>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
