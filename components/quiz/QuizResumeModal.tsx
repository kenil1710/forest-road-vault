'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import type { QuizState } from '@/lib/quiz-storage'
import { questions } from '@/lib/questions'

type QuizResumeModalProps = {
  state: QuizState
  onResume: () => void
  onRestart: () => void
}

export default function QuizResumeModal({
  state,
  onResume,
  onRestart,
}: QuizResumeModalProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/85 p-5 backdrop-blur-sm">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md border border-gold/40 bg-navy-deep p-8"
      >
        <p className="font-body text-xs uppercase tracking-tagline text-gold">
          Welcome back
        </p>
        <h2
          id="resume-title"
          className="mt-4 font-heading text-2xl font-bold text-cream"
        >
          You have a quiz in progress
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-cream/65">
          You were on question {Math.min(state.currentQuestion + 1, questions.length)} of{' '}
          {questions.length}, with {state.score} correct so far. Pick up where
          you left off, or start over from the beginning.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            autoFocus
            type="button"
            onClick={onResume}
            variant="primary"
            className="flex-1"
          >
            Resume
          </Button>
          <Button
            type="button"
            onClick={onRestart}
            variant="outline-light"
            className="flex-1"
          >
            Start Over
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
