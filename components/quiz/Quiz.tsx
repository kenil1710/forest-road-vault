'use client'

import { useCallback, useEffect, useState } from 'react'
import { questions } from '@/lib/questions'
import {
  clearQuizState,
  createQuizState,
  loadQuizState,
  saveQuizState,
  type QuizState,
} from '@/lib/quiz-storage'
import QuizPlay from './QuizPlay'
import QuizResults from './QuizResults'
import QuizResumeModal from './QuizResumeModal'
import QuizStart from './QuizStart'

type Stage = 'loading' | 'start' | 'playing' | 'results'

export default function Quiz() {
  // 'loading' until localStorage has been read, so the first paint after
  // hydration doesn't flash the start screen over a saved session.
  const [stage, setStage] = useState<Stage>('loading')
  const [state, setState] = useState<QuizState>(createQuizState)
  const [selected, setSelected] = useState<number | null>(null)
  const [resumable, setResumable] = useState<QuizState | null>(null)

  const total = questions.length

  /**
   * A session saved between answering and advancing already holds an answer
   * for the current question. Restore that selection, otherwise the question
   * would be answerable a second time and the score counted twice.
   */
  function selectedForCurrent(saved: QuizState): number | null {
    const answer = saved.answers.find(
      (a) => a.questionIndex === saved.currentQuestion
    )
    return answer ? answer.selectedIndex : null
  }

  useEffect(() => {
    const saved = loadQuizState()
    if (!saved) {
      setStage('start')
      return
    }
    if (saved.status === 'completed') {
      setState(saved)
      setStage('results')
      return
    }
    // An untouched in-progress record is not worth interrupting for.
    if (saved.answers.length === 0) {
      setStage('start')
      return
    }
    setResumable(saved)
    setStage('start')
  }, [])

  const persist = useCallback((next: QuizState) => {
    setState(next)
    saveQuizState(next)
  }, [])

  function handleStart() {
    const fresh = createQuizState()
    clearQuizState()
    persist(fresh)
    setSelected(null)
    setStage('playing')
  }

  function handleResume() {
    if (!resumable) return
    setState(resumable)
    setSelected(selectedForCurrent(resumable))
    setResumable(null)
    setStage('playing')
  }

  function handleRestart() {
    setResumable(null)
    handleStart()
  }

  function handleAnswer(optionIndex: number) {
    if (selected !== null) return
    if (state.answers.some((a) => a.questionIndex === state.currentQuestion)) return
    const question = questions[state.currentQuestion]
    const correct = optionIndex === question.correctIndex
    setSelected(optionIndex)
    persist({
      ...state,
      score: state.score + (correct ? 1 : 0),
      answers: [
        ...state.answers,
        { questionIndex: state.currentQuestion, selectedIndex: optionIndex, correct },
      ],
    })
  }

  function handleNext() {
    const isLast = state.currentQuestion === total - 1
    if (isLast) {
      persist({ ...state, status: 'completed' })
      setStage('results')
      return
    }
    persist({ ...state, currentQuestion: state.currentQuestion + 1 })
    setSelected(null)
  }

  function handleNameChange(name: string) {
    persist({ ...state, name })
  }

  function handleRetake() {
    clearQuizState()
    const fresh = createQuizState()
    setState(fresh)
    setSelected(null)
    setStage('start')
  }

  if (stage === 'loading') {
    // Reserve height so the section doesn't jump once storage is read.
    return <div className="min-h-[420px]" aria-busy="true" />
  }

  return (
    <>
      {resumable && stage === 'start' ? (
        <QuizResumeModal
          state={resumable}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      ) : null}

      {stage === 'start' ? <QuizStart onStart={handleStart} /> : null}

      {stage === 'playing' ? (
        <QuizPlay
          question={questions[state.currentQuestion]}
          index={state.currentQuestion}
          total={total}
          score={state.score}
          selected={selected}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      ) : null}

      {stage === 'results' ? (
        <QuizResults
          score={state.score}
          total={total}
          name={state.name}
          onNameChange={handleNameChange}
          onRetake={handleRetake}
        />
      ) : null}
    </>
  )
}
