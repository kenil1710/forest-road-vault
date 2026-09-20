'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import GoldArch from '@/components/ui/GoldArch'
import GoldDivider from '@/components/ui/GoldDivider'
import TreeLogo from '@/components/ui/TreeLogo'
import { siteMeta } from '@/lib/constants'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // Gentle parallax on the decorative arcs.
  const archY = useTransform(scrollY, [0, 600], [0, 60])

  return (
    <section className="relative overflow-hidden bg-cream dark:bg-navy-deep">
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: archY }}
        className="pointer-events-none absolute -right-16 -top-16 hidden text-gold/25 sm:block"
      >
        <GoldArch className="h-[520px] w-[520px] rotate-90" rings={4} />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 hidden text-gold/15 lg:block"
      >
        <GoldArch className="h-[360px] w-[360px] -rotate-90" rings={3} />
      </div>

      <div className="hero-height container-content relative flex items-center py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[3fr_2fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tagline">{siteMeta.tagline}</p>
            <h1 className="mt-6 font-heading text-[2.75rem] font-bold leading-[1.05] text-navy dark:text-cream sm:text-6xl lg:text-[4.25rem]">
              Built on Real Credit.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted dark:text-cream/65 sm:text-lg">
              Forest Road Vault bridges on-chain capital with off-chain credit
              markets — without an AMM, a price feed, or an external DeFi
              dependency. Identified collateral, variable-yield pass-through,
              and an audit register published in full.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/quiz" variant="primary" size="lg">
                Take the Quiz
              </Button>
              <Button href="/learn" variant="outline" size="lg">
                Explore the Protocol
              </Button>
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <motion.div
              className="relative flex h-[260px] w-[260px] items-center justify-center sm:h-[340px] sm:w-[340px]"
              animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-gold/40"
              />
              <div
                aria-hidden="true"
                className="absolute inset-8 rounded-full border border-gold/20"
              />
              <TreeLogo
                className="relative h-36 w-36 text-navy dark:text-cream sm:h-44 sm:w-44"
                title="Forest Road Vault emblem"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <GoldDivider />
    </section>
  )
}
