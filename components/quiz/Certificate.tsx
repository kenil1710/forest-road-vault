'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { CERT_HEIGHT, CERT_WIDTH, drawCertificate } from '@/lib/certificate'
import type { TreeLevel } from '@/lib/constants'

type CertificateProps = {
  name: string
  score: number
  total: number
  level: TreeLevel
}

export type CertificateHandle = {
  getCanvas: () => HTMLCanvasElement | null
}

const Certificate = forwardRef<CertificateHandle, CertificateProps>(
  function Certificate({ name, score, total, level }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useImperativeHandle(ref, () => ({ getCanvas: () => canvasRef.current }), [])

    const render = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      drawCertificate(canvas, {
        name,
        score,
        total,
        levelName: level.name,
        levelCitation: level.citation,
      })
    }, [name, score, total, level])

    useEffect(() => {
      render()
      // Fonts load asynchronously; redraw once ready so the canvas uses
      // Playfair Display rather than the fallback metrics.
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
        className="h-auto w-full border border-gold/40"
      />
    )
  }
)

export default Certificate
