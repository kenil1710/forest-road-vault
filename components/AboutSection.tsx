import { Clock, FileText, Lock, Shield } from 'lucide-react'
import AnimateIn from './AnimateIn'
import SectionHeader from './SectionHeader'

const highlights = [
  {
    icon: Shield,
    title: 'Identified Collateral',
    description:
      'Each asset is identified per-facility, not pooled blindly. You know where capital goes.',
  },
  {
    icon: Clock,
    title: 'Variable Yield Pass-Through',
    description:
      'Interest is passed through as earned — no fixed rate promises, just real yield.',
  },
  {
    icon: FileText,
    title: 'Full Audit Transparency',
    description:
      '15 engineering rounds published. Every finding, severity, and remediation on record.',
  },
  {
    icon: Lock,
    title: 'Attested Oracle',
    description:
      'Off-chain data enters only through an m-of-n attested oracle — no single point of trust.',
  },
]

export default function AboutSection() {
  return (
    <section className="section-y bg-white dark:bg-navy-deep">
      <div className="container-content">
        <SectionHeader
          eyebrow="The protocol"
          title="What is Forest Road Vault?"
          subtitle="A real-world credit protocol on Ethereum L1, built for auditability before convenience."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateIn className="space-y-5 text-base leading-relaxed text-navy/70 dark:text-white/70">
            <p>
              Forest Road Vault connects on-chain capital to off-chain credit
              markets. Depositors bring USDC and receive USDfr, a fully-backed
              synthetic dollar minted 1:1. Stake that USDfr into the ERC-4626
              vault and you hold sUSDfr, whose exchange rate rises as interest
              flows back from the credit book.
            </p>
            <p>
              Capital is deployed into identified, lien-perfected facilities
              across media &amp; entertainment, renewable energy, and digital
              assets. Nothing is pooled blindly — every facility is tracked
              individually, and every off-chain fact about it enters the
              protocol through an m-of-n attested oracle rather than a single
              trusted party.
            </p>
            <p>
              The design is deliberately minimal. USDC is the only external
              token. There is no AMM, no price feed, no external DeFi
              dependency. Losses follow a fixed three-layer cascade that puts
              depositors last by construction, and bootstrap authority has been
              surrendered to a timelock.
            </p>
          </AnimateIn>

          <ul className="space-y-4">
            {highlights.map((item, index) => (
              <AnimateIn as="li" key={item.title} delay={index * 0.1}>
                <article className="card flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-pale">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-navy dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy/65 dark:text-white/65">
                      {item.description}
                    </p>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
