'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import TreeLogo from './TreeLogo'

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero-height relative flex items-center overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-[#16362b]">
      {/* Quiet forest wash behind the emblem — no particles, no neon. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[420px] w-[420px] rounded-full bg-forest/20 blur-[120px]"
      />

      <div className="container-content relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="badge">Live on Ethereum mainnet</p>
          <h1 className="mt-5 text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Real-World Credit.{' '}
            <span className="text-forest-pale">On-Chain Trust.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Forest Road Vault bridges on-chain capital with off-chain credit
            markets — without an AMM, a price feed, or an external DeFi
            dependency. Identified collateral, variable-yield pass-through, and
            an audit register published in full.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/quiz" className="btn-primary">
              Take the Quiz
            </Link>
            <Link href="/learn" className="btn-outline">
              Explore the Protocol
            </Link>
          </div>
        </motion.div>

        <div className="flex justify-center lg:justify-end">
          <motion.div
            className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px]"
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-dashed border-forest-pale/25"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-forest/25 blur-2xl"
              animate={reduceMotion ? undefined : { opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="absolute inset-6 rounded-full border border-forest-pale/15 bg-navy-deep/40" />
            <TreeLogo
              className="relative h-36 w-36 text-forest-pale sm:h-48 sm:w-48"
              title="Forest Road Vault emblem"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 flex justify-center text-white/40"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
