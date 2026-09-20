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
      {/* Bottom-right arch window, mirrored to sit in the corner as the
          brand's posts place it. */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: archY }}
        className="pointer-events-none absolute -bottom-10 -right-10 hidden text-gold/45 sm:block"
      >
        <GoldArch className="h-[300px] w-[300px] -scale-x-100" leaves={4} />
      </motion.div>

      <div className="hero-height container-content relative flex items-center py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[3fr_2fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tagline">{siteMeta.tagline}</p>
            <h1 className="mt-6 font-display text-[2.6rem] font-black uppercase leading-[0.98] tracking-[-0.01em] text-navy dark:text-cream sm:text-6xl lg:text-[4.5rem]">
              Built on Real Credit.
            </h1>
            <GoldDivider width="short" align="left" className="mt-8" />
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
