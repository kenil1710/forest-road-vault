'use client'

import Button from '@/components/ui/Button'
import { treeLevels } from '@/lib/constants'
import { questions } from '@/lib/questions'

export default function QuizStart({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto mt-16 max-w-4xl text-center">
      <ul className="grid gap-px bg-gold/30 sm:grid-cols-3">
        {treeLevels.map((level) => (
          <li key={level.slug} className="bg-navy-deep p-8">
            <p aria-hidden="true" className="text-4xl">
              {level.emoji}
            </p>
            <h3 className="mt-4 font-heading text-xl font-bold text-cream">
              {level.name}
            </h3>
            <p className="mt-2 font-body text-xs uppercase tracking-tagline text-gold">
              {level.min}–{level.max} correct
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              {level.description}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <Button type="button" onClick={onStart} variant="primary" size="lg">
          Start Quiz
        </Button>
        <p className="mt-5 font-body text-xs text-cream/40">
          {questions.length} questions. Your progress is saved automatically.
        </p>
      </div>
    </div>
  )
}
