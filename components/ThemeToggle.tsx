'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={
        mounted
          ? `Switch to ${isDark ? 'light' : 'dark'} mode`
          : 'Toggle colour theme'
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
    >
      {/* Render a stable icon until mounted so SSR and client markup match. */}
      {mounted && !isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
