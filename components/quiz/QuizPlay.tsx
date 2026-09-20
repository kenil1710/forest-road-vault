'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { Question } from '@/lib/questions'

type QuizPlayProps = {
  question: Question
  index: number
  total: number
  score: number
  selected: number | null
  onAnswer: (optionIndex: number) => void
  onNext: () => void
}

export default function QuizPlay({
  question,
  index,
  total,
  score,
  selected,
  onAnswer,
  onNext,
}: QuizPlayProps) {
  const reduceMotion = useReducedMotion()
  const answered = selected !== null
  const isLast = index === total - 1
  const progress = ((index + (answered ? 1 : 0)) / total) * 100

  const slide = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 48 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -48 },
        transition: { duration: 0.3, ease: 'easeOut' as const },
      }

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between font-body text-xs uppercase tracking-tagline text-cream/55">
          <span>
            Question {index + 1} of {total}
          </span>
          <span className="text-gold">{score} correct</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Quiz progress"
          className="h-px w-full bg-cream/15"
        >
          <motion.div
            className="h-full bg-gold"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} {...slide}>
          <div className="border border-gold/30 bg-navy-light/25 p-8 sm:p-10">
            <p className="font-body text-xs uppercase tracking-tagline text-gold">
              Question {index + 1}
            </p>
            <h2 className="mt-4 font-heading text-2xl font-bold leading-snug text-cream sm:text-3xl">
              {question.question}
            </h2>

            <ul className="mt-8 space-y-3">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.correctIndex
                const isChosen = optionIndex === selected
                let tone = 'border-cream/15 hover:border-gold hover:bg-cream/5'
                if (answered && isCorrect) {
                  tone = 'border-forest-pale bg-forest-pale/10'
                } else if (answered && isChosen) {
                  tone = 'border-red-400/70 bg-red-500/10'
                } else if (answered) {
                  tone = 'border-cream/10 opacity-55'
                }

                return (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => onAnswer(optionIndex)}
                      disabled={answered}
                      className={`flex w-full items-center justify-between gap-4 rounded-btn border px-5 py-4 text-left font-body text-sm text-cream transition-colors disabled:cursor-default sm:text-base ${tone}`}
                    >
                      <span>{option}</span>
                      {answered && isCorrect ? (
                        <Check
                          className="h-5 w-5 shrink-0 text-forest-pale"
                          aria-label="Correct answer"
                        />
                      ) : null}
                      {answered && isChosen && !isCorrect ? (
                        <X
                          className="h-5 w-5 shrink-0 text-red-300"
                          aria-label="Your answer, incorrect"
                        />
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>

            <AnimatePresence>
              {answered ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <p
                    role="status"
                    className="mt-8 border-l-2 border-gold pl-5 text-sm leading-relaxed text-cream/75"
                  >
                    {question.explanation}
                  </p>
                  <div className="mt-8 flex justify-end">
                    <Button type="button" onClick={onNext} variant="primary">
                      {isLast ? 'See Results' : 'Next Question'}
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
