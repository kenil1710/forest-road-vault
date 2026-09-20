'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Is this live? Can I deposit real money?',
    answer:
      'Yes. Forest Road Vault is live on Ethereum mainnet. Access is KYC-gated — review the legal and risk disclosures before transacting.',
  },
  {
    question: "What's the difference between USDfr and sUSDfr?",
    answer:
      'USDfr is the stable, non-yielding unit, minted 1:1 from approved stablecoins. sUSDfr is what you get when you stake USDfr into the vault — its value moves with the book’s actual performance. No fixed rate, ever.',
  },
  {
    question: 'What happens if a loan defaults?',
    answer:
      'Losses flow through a fixed cascade: curator first-loss capital absorbs first, then the sGROVE backstop, then — only if both are exhausted — sUSDfr principal. Depositors are last by construction, not by promise.',
  },
  {
    question: 'What sectors does the book cover?',
    answer:
      'Media & entertainment, renewable energy, and digital assets (a related-party facility, disclosed as such).',
  },
  {
    question: 'Where do I check the numbers myself?',
    answer:
      'forestroadvault.com/transparency — live backing, supply, and facilities data.',
  },
  {
    question: 'Is the audit public?',
    answer:
      'Yes. Full audit report is on GitHub: github.com/Forest-Road-Company/forest-road-vault',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <div className="mt-12">
      <ul className="divide-y divide-navy/10 border-y border-navy/10 dark:divide-white/10 dark:border-white/10">
        {faqs.map((faq, index) => {
          const expanded = open === index
          return (
            <li key={faq.question}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : index)}
                  aria-expanded={expanded}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-sans text-base font-medium text-navy dark:text-white sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="shrink-0 text-forest dark:text-forest-pale"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    id={`faq-panel-${index}`}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 text-sm leading-relaxed text-navy/65 dark:text-white/65 sm:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>

      <p className="mt-8 text-sm text-navy/50 dark:text-white/50">
        Team will never DM you first. Always verify links against official
        sources.
      </p>
    </div>
  )
}
