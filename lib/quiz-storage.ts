import { questions } from './questions'

const STORAGE_KEY = 'frv-quiz-state-v1'

export type QuizAnswer = {
  questionIndex: number
  selectedIndex: number
  correct: boolean
}

export type QuizState = {
  status: 'in-progress' | 'completed'
  currentQuestion: number
  score: number
  answers: QuizAnswer[]
  name: string
  startedAt: string
}

/**
 * Storage can throw (Safari private mode, blocked site data) and can hold
 * anything a previous version wrote, so every read is guarded and validated
 * rather than trusted.
 */
function isValid(value: unknown): value is QuizState {
  if (typeof value !== 'object' || value === null) return false
  const state = value as Partial<QuizState>
  return (
    (state.status === 'in-progress' || state.status === 'completed') &&
    typeof state.currentQuestion === 'number' &&
    state.currentQuestion >= 0 &&
    state.currentQuestion <= questions.length &&
    typeof state.score === 'number' &&
    state.score >= 0 &&
    state.score <= questions.length &&
    Array.isArray(state.answers) &&
    typeof state.name === 'string' &&
    typeof state.startedAt === 'string'
  )
}

export function saveQuizState(state: QuizState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* Storage unavailable — the quiz still works, it just won't resume. */
  }
}

export function loadQuizState(): QuizState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function clearQuizState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* Nothing to do — a stale entry is harmless. */
  }
}

export function createQuizState(): QuizState {
  return {
    status: 'in-progress',
    currentQuestion: 0,
    score: 0,
    answers: [],
    name: '',
    startedAt: new Date().toISOString(),
  }
}
