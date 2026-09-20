'use client'

import { useCallback, useEffect, useRef } from 'react'
import { CERT_HEIGHT, CERT_WIDTH, drawCertificate } from '@/lib/certificate'
import type { TreeLevel } from '@/lib/constants'

type CertificateProps = {
  name: string
  score: number
  total: number
  level: TreeLevel
}

export default function Certificate({
  name,
  score,
  total,
  level,
}: CertificateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawCertificate(canvas, {
      name,
      score,
      total,
      levelName: level.name,
      levelColor: level.color,
      levelDescription: level.description,
    })
  }, [name, score, total, level])

  useEffect(() => {
    render()
    // Fonts load asynchronously; redraw once they are ready so the canvas
    // uses DM Serif Display rather than the fallback metrics.
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(render).catch(() => undefined)
    }
  }, [render])

  return (
    <canvas
      ref={canvasRef}
      width={CERT_WIDTH}
      height={CERT_HEIGHT}
      role="img"
      aria-label={`Forest Road Vault certificate of knowledge for ${
        name.trim() || 'your name'
      }, ${level.name}, score ${score} out of ${total}`}
      className="h-auto w-full rounded-card border border-white/10 shadow-2xl shadow-black/40"
    />
  )
}
