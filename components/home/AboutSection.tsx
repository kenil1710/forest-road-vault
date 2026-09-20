import { Clock, FileText, Lock, Shield } from 'lucide-react'
import AnimateIn from '@/components/ui/AnimateIn'
import GoldArch from '@/components/ui/GoldArch'
import SectionHeader from '@/components/ui/SectionHeader'

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
    <section className="section-y relative overflow-hidden bg-cream dark:bg-navy-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 -left-12 hidden text-gold/30 lg:block"
      >
        <GoldArch className="h-[260px] w-[260px]" leaves={3} />
      </div>

      <div className="container-content relative">
        <SectionHeader
          tagline="The Protocol"
          title="What is Forest Road Vault?"
          subtitle="A real-world credit protocol on Ethereum L1, built for auditability before convenience."
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <AnimateIn className="space-y-6 text-base leading-relaxed text-muted dark:text-cream/70">
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

          <ul className="space-y-5">
            {highlights.map((item, index) => (
              <AnimateIn as="li" key={item.title} delay={index * 0.1}>
                <article className="flex gap-5 border-l-2 border-gold/50 bg-cream-dark/70 p-6 dark:bg-navy-light/40">
                  <span className="mt-0.5 shrink-0 text-gold-muted dark:text-gold">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-body text-base font-semibold text-navy dark:text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted dark:text-cream/65">
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
