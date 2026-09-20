'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import GoldDivider from '@/components/ui/GoldDivider'
import { getTreeLevel } from '@/lib/constants'
import Certificate, { type CertificateHandle } from './Certificate'
import ShareButton from './ShareButton'

type QuizResultsProps = {
  score: number
  total: number
  name: string
  onNameChange: (name: string) => void
  onRetake: () => void
}

export default function QuizResults({
  score,
  total,
  name,
  onNameChange,
  onRetake,
}: QuizResultsProps) {
  const certificateRef = useRef<CertificateHandle>(null)
  const reduceMotion = useReducedMotion()
  const level = getTreeLevel(score)

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mt-16 max-w-4xl"
    >
      <div className="text-center">
        <p aria-hidden="true" className="text-6xl">
          {level.emoji}
        </p>
        <h2 className="mt-5 font-heading text-4xl font-bold text-gold sm:text-5xl">
          {level.name}
        </h2>
        <p className="mt-4 font-heading text-xl text-cream">
          {score} / {total} correct
        </p>
        <GoldDivider width="short" className="mt-7" />
        <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-cream/65">
          {level.description}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-md">
        <label
          htmlFor="certificate-name"
          className="block font-body text-xs uppercase tracking-tagline text-gold"
        >
          Your name
        </label>
        <input
          id="certificate-name"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          maxLength={40}
          autoComplete="name"
          placeholder="Enter your name for the certificate"
          className="mt-3 w-full rounded-input border border-gold/40 bg-navy-light/30 px-4 py-3 font-body text-cream placeholder:text-cream/35 focus:border-gold"
        />
      </div>

      <div className="mt-12">
        <Certificate
          ref={certificateRef}
          name={name}
          score={score}
          total={total}
          level={level}
        />
      </div>

      <div className="mt-10">
        <ShareButton
          getCanvas={() => certificateRef.current?.getCanvas() ?? null}
          name={name}
          score={score}
          total={total}
          level={level}
          onRetake={onRetake}
        />
        <p className="mt-6 text-center font-body text-xs text-cream/40">
          On mobile, sharing attaches the certificate image directly. On
          desktop, X reads it from the share page as a card.
        </p>
      </div>
    </motion.div>
  )
}
