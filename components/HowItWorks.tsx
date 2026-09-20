import AnimateIn from './AnimateIn'
import SectionHeader from './SectionHeader'

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
      'Interest passes through to the sUSDfr vault token as it is earned. Your position is protected by a three-layer loss cascade: curator first-loss → sGROVE backstop → sUSDfr principal.',
  },
]

const cascade = [
  {
    layer: 'Layer 1',
    title: 'Curator First-Loss Capital',
    description:
      'The curator has its own capital at risk ahead of everyone else. Any loss on the book hits this layer before it touches another participant.',
    tone: 'border-forest-pale/50 bg-forest-pale/10',
  },
  {
    layer: 'Layer 2',
    title: 'sGROVE Backstop',
    description:
      'If first-loss capital is fully absorbed, the sGROVE backstop takes the next tranche of losses. It is a dedicated buffer, not a discretionary bailout.',
    tone: 'border-forest-light/50 bg-forest-light/10',
  },
  {
    layer: 'Layer 3',
    title: 'sUSDfr Principal',
    description:
      'Only if both layers above are exhausted does sUSDfr principal absorb a loss. Depositors are last by construction, not by promise.',
    tone: 'border-gold/40 bg-gold/10',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-y bg-navy-deep text-white">
      <div className="container-content">
        <SectionHeader
          eyebrow="Three steps"
          title="How It Works"
          subtitle="From a USDC deposit to real, auditable yield — and what stands between your principal and a default."
          tone="dark"
        />

        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <AnimateIn as="li" key={step.number} delay={index * 0.12}>
              <article className="card-dark h-full">
                <p
                  aria-hidden="true"
                  className="font-display text-5xl text-forest-pale/25"
                >
                  {step.number}
                </p>
                <h3 className="mt-4 text-xl text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {step.description}
                </p>
              </article>
            </AnimateIn>
          ))}
        </ol>

        <div className="mt-20 lg:mt-24">
          <SectionHeader
            eyebrow="Loss waterfall"
            title="The Three-Layer Loss Cascade"
            subtitle="Losses flow in a fixed order. Nothing about it is discretionary, and nothing about it changes after a default."
            tone="dark"
          />

          <ol className="mx-auto mt-12 max-w-2xl space-y-3">
            {cascade.map((item, index) => (
              <AnimateIn as="li" key={item.layer} delay={index * 0.12}>
                <article
                  className={`rounded-card border p-6 ${item.tone}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    {item.layer}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>
                </article>
                {index < cascade.length - 1 ? (
                  <div
                    aria-hidden="true"
                    className="mx-auto my-3 h-6 w-px bg-gradient-to-b from-white/30 to-white/5"
                  />
                ) : null}
              </AnimateIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
