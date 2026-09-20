'use client'

import { Download, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { siteMeta, siteUrl, type TreeLevel } from '@/lib/constants'

type ShareButtonProps = {
  getCanvas: () => HTMLCanvasElement | null
  name: string
  score: number
  total: number
  level: TreeLevel
  onRetake: () => void
}

function slugify(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'forest-road-vault'
  )
}

export default function ShareButton({
  getCanvas,
  name,
  score,
  total,
  level,
  onRetake,
}: ShareButtonProps) {
  const [busy, setBusy] = useState(false)

  const shareUrl = `${siteUrl}/quiz/share?name=${encodeURIComponent(
    name.trim()
  )}&score=${score}&level=${level.slug}`

  const message = `🌳 I scored ${score}/${total} on the Forest Road Vault Knowledge Quiz and earned the "${level.name}" certificate!\n\nTest your knowledge about this real-world credit protocol on Ethereum L1.\n\n${siteMeta.handle} #ForestRoadVault #DeFi #RWA`

  /**
   * X's tweet composer cannot attach an image from a URL, so the desktop path
   * links to /quiz/share, whose OG image is the certificate — X renders that
   * as the card. Mobile gets the real file via the Web Share API.
   */
  function shareViaIntent() {
    const intent = `https://x.com/intent/tweet?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(shareUrl)}`
    window.open(intent, '_blank', 'noopener,noreferrer')
  }

  async function handleShare() {
    const canvas = getCanvas()
    if (!canvas) {
      shareViaIntent()
      return
    }

    setBusy(true)
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png')
      )
      if (!blob) {
        shareViaIntent()
        return
      }

      const file = new File([blob], 'forest-road-vault-certificate.png', {
        type: 'image/png',
      })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'Forest Road Vault Certificate',
          text: `${message}\n\n${shareUrl}`,
          files: [file],
        })
        return
      }

      shareViaIntent()
    } catch (error) {
      // A user cancelling the share sheet is not a failure.
      if ((error as Error)?.name !== 'AbortError') shareViaIntent()
    } finally {
      setBusy(false)
    }
  }

  function handleDownload() {
    const canvas = getCanvas()
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `${slugify(name)}-${level.slug}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Button
        type="button"
        onClick={handleShare}
        disabled={busy}
        variant="secondary"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {busy ? 'Preparing…' : 'Share on X'}
      </Button>

      <Button type="button" onClick={handleDownload} variant="primary">
        <Download className="h-4 w-4" aria-hidden="true" />
        Download Certificate
      </Button>

      <Button type="button" onClick={onRetake} variant="outline-light">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Retake Quiz
      </Button>
    </div>
  )
}
