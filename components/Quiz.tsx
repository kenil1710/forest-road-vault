'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Download, RotateCcw, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { CERT_HEIGHT, CERT_WIDTH } from '@/lib/certificate'
import { getTreeLevel, treeLevels } from '@/lib/constants'
import { questions } from '@/lib/questions'
import Certificate from './Certificate'
import ShareButton from './ShareButton'

type Stage = 'start' | 'playing' | 'results'

export default function Quiz() {
  const [stage, setStage] = useState<Stage>('start')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [name, setName] = useState('')
  const certificateRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const total = questions.length
  const current = questions[index]
  const answered = selected !== null
  const isLast = index === total - 1
  const level = getTreeLevel(score)

  function handleAnswer(optionIndex: number) {
    if (answered) return
    setSelected(optionIndex)
    if (optionIndex === current.correctIndex) setScore((value) => value + 1)
  }

  function handleNext() {
    if (isLast) {
      setStage('results')
      return
    }
    setIndex((value) => value + 1)
    setSelected(null)
  }

  function handleReset() {
    setStage('start')
    setIndex(0)
    setSelected(null)
    setScore(0)
    setName('')
  }

  function handleDownload() {
    const canvas = certificateRef.current?.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    const slug =
      name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') ||
      'forest-road-vault'
    link.download = `${slug}-${level.name.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const slide = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
        transition: { duration: 0.3, ease: 'easeOut' as const },
      }

  if (stage === 'start') {
    return (
      <div className="mx-auto max-w-4xl text-center">
        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {treeLevels.map((item) => (
            <li key={item.name} className="card-dark text-center">
              <p aria-hidden="true" className="text-4xl">
                {item.emoji}
              </p>
              <h3 className="mt-3 font-sans text-lg font-semibold text-white">
                {item.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-forest-pale/70">
                {item.min}–{item.max} correct
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setStage('playing')}
          className="btn-primary mt-12 px-10 py-4 text-base"
        >
          Start Quiz
        </button>
      </div>
    )
  }

  if (stage === 'playing') {
    const progress = ((index + (answered ? 1 : 0)) / total) * 100

    return (
      <div className="mx-auto mt-12 max-w-3xl">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/55">
            <span>
              Question {index + 1} of {total}
            </span>
            <span>
              {score} correct
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label="Quiz progress"
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              className="h-full rounded-full bg-forest-light"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={index} {...slide}>
            <div className="card-dark">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-pale/70">
                Question {index + 1}
              </p>
              <h2 className="mt-3 text-2xl leading-snug text-white sm:text-3xl">
                {current.question}
              </h2>

              <ul className="mt-7 space-y-3">
                {current.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === current.correctIndex
                  const isChosen = optionIndex === selected
                  let tone =
                    'border-white/15 bg-white/5 hover:border-forest-light hover:bg-white/10'
                  if (answered && isCorrect) {
                    tone = 'border-forest-light bg-forest-light/20'
                  } else if (answered && isChosen) {
                    tone = 'border-red-400/70 bg-red-500/15'
                  } else if (answered) {
                    tone = 'border-white/10 bg-white/[0.03] opacity-60'
                  }

                  return (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => handleAnswer(optionIndex)}
                        disabled={answered}
                        className={`flex w-full items-center justify-between gap-4 rounded-btn border px-4 py-3.5 text-left text-sm text-white transition-colors disabled:cursor-default sm:text-base ${tone}`}
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
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p
                      role="status"
                      className="mt-6 rounded-btn border border-forest-pale/20 bg-forest/10 px-4 py-3 text-sm leading-relaxed text-white/75"
                    >
                      {current.explanation}
                    </p>
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-primary"
                      >
                        {isLast ? 'See Results' : 'Next Question'}
                      </button>
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

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto mt-12 max-w-3xl"
    >
      <div className="text-center">
        <p aria-hidden="true" className="text-6xl">
          {level.emoji}
        </p>
        <h2 className="mt-4 text-3xl text-white sm:text-4xl">{level.name}</h2>
        <p className="mt-3 text-lg text-forest-pale">
          {score} / {total} correct
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65">
          {level.description}
        </p>
      </div>

      <div className="mt-10">
        <label
          htmlFor="certificate-name"
          className="block text-sm font-medium text-white/80"
        >
          Your name
        </label>
        <input
          id="certificate-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={40}
          autoComplete="name"
          placeholder="Enter your name for the certificate"
          className="input-field mt-2"
        />
      </div>

      <div ref={certificateRef} className="mt-8">
        <Certificate name={name} score={score} total={total} level={level} />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <ShareButton
          name={name}
          score={score}
          total={total}
          levelEmoji={level.emoji}
          levelName={level.name}
        />
        <button type="button" onClick={handleDownload} className="btn-primary">
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Certificate
        </button>
        <button type="button" onClick={handleReset} className="btn-outline">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Retake Quiz
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-white/40">
        Certificate renders at {CERT_WIDTH}×{CERT_HEIGHT}px PNG.
      </p>
    </motion.div>
  )
}
