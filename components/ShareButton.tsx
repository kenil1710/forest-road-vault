'use client'

import { siteMeta } from '@/lib/constants'

type ShareButtonProps = {
  name: string
  score: number
  total: number
  levelEmoji: string
  levelName: string
}

export default function ShareButton({
  name,
  score,
  total,
  levelEmoji,
  levelName,
}: ShareButtonProps) {
  const who = name.trim()
  const text = [
    `${levelEmoji} I scored ${score}/${total} on the Forest Road Vault knowledge quiz and earned ${levelName}${
      who ? ` — ${who}` : ''
    }.`,
    '',
    'Real-world credit on Ethereum L1. Identified collateral, variable yield, published audits.',
    '',
    `Take the quiz and earn your tree ${siteMeta.handle}`,
  ].join('\n')

  const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(siteMeta.url)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-dark"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Share on X
    </a>
  )
}
