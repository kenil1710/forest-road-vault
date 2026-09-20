'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const tabs = [
  {
    id: 'architecture',
    label: 'Protocol Architecture',
    paragraphs: [
      'Forest Road Vault is a real-world credit protocol deployed on Ethereum L1. It bridges on-chain capital with off-chain credit markets without relying on any AMM, price feed, or external DeFi protocol.',
      'The design philosophy centers on minimalism and auditability. USDC is the only external token. Every off-chain fact — loan status, interest accruals, facility performance — enters through an m-of-n attested oracle, meaning no single party can inject false data.',
      'The locked design decisions include identified-per-asset collateral (not a blind pool), variable-yield pass-through (not a fixed rate), and Ethereum L1 as the settlement layer. These prioritize transparency and risk management over convenience.',
    ],
  },
  {
    id: 'tokens',
    label: 'Tokens',
    heading: 'Tokens (USDfr & sUSDfr)',
    paragraphs: [
      'USDfr is the stable, non-yielding synthetic dollar — minted 1:1 from approved stablecoins. Every USDfr in circulation has corresponding backing in reserves or deployed facilities.',
      'sUSDfr is the yield-bearing vault token built on ERC-4626. Stake USDfr into the vault, receive sUSDfr. As interest flows in from credit facilities, the exchange rate between sUSDfr and USDfr increases — your tokens become redeemable for more USDfr over time. No fixed rate, ever — the value moves with the book’s actual performance.',
      'ERC-4626 is a widely adopted vault specification enabling composability across DeFi. Other protocols can integrate sUSDfr as collateral or a yield source without custom adapters.',
    ],
  },
  {
    id: 'security',
    label: 'Security & Audits',
    paragraphs: [
      'Forest Road publishes everything it finds — including open findings and those accepted rather than fixed. The audit register contains 15 internal engineering review rounds, each with findings, severities, and remediation history.',
      'Corrovera Security conducted an independent AI-assisted review. Two Medium findings were accepted with recorded conditions and revisit triggers. This satisfies Forest Road’s one-external-audit launch requirement, though the scope and methodological limits remain part of the evidence.',
      'The security model includes: three-layer loss cascade, surrendered bootstrap authority (timelock holds admin and upgrader roles, no deployer EOA retains authority), and every finding has a reproducing test. Vulnerabilities can be reported privately.',
    ],
  },
  {
    id: 'credit',
    label: 'Credit Structure',
    heading: 'Credit Structure & Sectors',
    paragraphs: [
      'The vault deploys capital across three sectors: media & entertainment, renewable energy, and digital assets (a related-party facility, disclosed as such). Each uses identified, lien-perfected collateral — traceable on-chain through the attested oracle.',
      'Losses flow through a fixed cascade: curator first-loss capital absorbs first, then the sGROVE backstop, then — only if both are exhausted — sUSDfr principal. Depositors are last by construction, not by promise.',
      'Variable-yield pass-through means you earn what facilities actually produce. No fixed rate guarantees, no hidden spreads. Real, auditable yield.',
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    paragraphs: [
      'Deployed on Ethereum mainnet (chain 1) as of August 16, 2026. Bootstrap authority surrendered — the timelock holds DEFAULT_ADMIN and UPGRADER on every module. Verified on-chain.',
      'Licensed under Business Source License 1.1 (non-production use permitted, converts to Apache 2.0 on Change Date). Copyright held by Road Runner Capital, LLC, a Forest Road entity.',
      'The transparency dashboard at forestroadvault.com/transparency provides live backing, supply, and facilities data.',
    ],
  },
]

export default function DeepDive() {
  const [active, setActive] = useState(tabs[0].id)
  const reduceMotion = useReducedMotion()
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0]

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Deep dive topics"
        className="flex flex-wrap gap-1 border-b border-navy/10 dark:border-white/10"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                selected
                  ? 'text-forest dark:text-forest-pale'
                  : 'text-navy/55 hover:text-navy dark:text-white/55 dark:hover:text-white'
              }`}
            >
              {tab.label}
              {selected ? (
                <motion.span
                  layoutId="deep-dive-indicator"
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-forest dark:bg-forest-pale"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 400, damping: 34 }
                  }
                />
              ) : null}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.id}
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          tabIndex={0}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pt-8"
        >
          <h3 className="text-2xl text-navy dark:text-white sm:text-3xl">
            {activeTab.heading ?? activeTab.label}
          </h3>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-navy/70 dark:text-white/70">
            {activeTab.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
