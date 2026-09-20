import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { brand, getTreeLevelBySlug, treeLevels } from '@/lib/constants'
import { questions } from '@/lib/questions'
import { TREE_PATH, TREE_VIEWBOX } from '@/lib/tree'

export const runtime = 'edge'

const WIDTH = 1200
const HEIGHT = 675

/**
 * Fallback emblem. Satori has no <path> support, so the traced mark goes in as
 * an inline SVG image if the official bitmap cannot be read.
 */
const treeFallbackUri = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${TREE_VIEWBOX}"><path fill="${brand.navy}" fill-rule="evenodd" d="${TREE_PATH}"/></svg>`
)}`

/** The official logo, bundled beside the route so there is no network hop. */
async function loadLogoDataUri(): Promise<string> {
  try {
    const bytes = await fetch(new URL('./logo-navy.png', import.meta.url)).then(
      (r) => r.arrayBuffer()
    )
    let binary = ''
    const view = new Uint8Array(bytes)
    for (let i = 0; i < view.length; i++) binary += String.fromCharCode(view[i])
    return `data:image/png;base64,${btoa(binary)}`
  } catch {
    return treeFallbackUri
  }
}

function GoldRule({ width, marginTop }: { width: number; marginTop: number }) {
  return (
    <div
      style={{
        width,
        height: 1,
        backgroundColor: brand.gold,
        marginTop,
      }}
    />
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const rawName = (searchParams.get('name') ?? '').trim()
  // Keep the rendered name bounded — this value comes straight from a URL.
  const name = rawName.slice(0, 40) || 'Your Name'

  const parsedScore = Number.parseInt(searchParams.get('score') ?? '', 10)
  const score =
    Number.isFinite(parsedScore) && parsedScore >= 0 && parsedScore <= questions.length
      ? parsedScore
      : 0

  const level =
    getTreeLevelBySlug(searchParams.get('level') ?? '') ??
    treeLevels.find((l) => score >= l.min && score <= l.max) ??
    treeLevels[0]

  const [playfair, dmSans, dmSansMedium, treeDataUri] = await Promise.all([
    fetch(new URL('./fonts/PlayfairDisplay-Bold.ttf', import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL('./fonts/DMSans-Regular.ttf', import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL('./fonts/DMSans-Medium.ttf', import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
    loadLogoDataUri(),
  ])

  const nameSize = name.length > 26 ? 30 : name.length > 18 ? 36 : 40

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: brand.cream,
          fontFamily: 'DM Sans',
          position: 'relative',
        }}
      >
        {/* Outer gold frame */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: `2px solid ${brand.gold}`,
          }}
        />
        {/* Art-deco corner brackets */}
        {[
          { top: 40, left: 40, borderTop: true, borderLeft: true },
          { top: 40, right: 40, borderTop: true, borderRight: true },
          { bottom: 40, left: 40, borderBottom: true, borderLeft: true },
          { bottom: 40, right: 40, borderBottom: true, borderRight: true },
        ].map((corner, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 26,
              height: 26,
              ...(corner.top !== undefined ? { top: corner.top } : {}),
              ...(corner.bottom !== undefined ? { bottom: corner.bottom } : {}),
              ...(corner.left !== undefined ? { left: corner.left } : {}),
              ...(corner.right !== undefined ? { right: corner.right } : {}),
              ...(corner.borderTop ? { borderTop: `1.5px solid ${brand.gold}` } : {}),
              ...(corner.borderBottom
                ? { borderBottom: `1.5px solid ${brand.gold}` }
                : {}),
              ...(corner.borderLeft ? { borderLeft: `1.5px solid ${brand.gold}` } : {}),
              ...(corner.borderRight
                ? { borderRight: `1.5px solid ${brand.gold}` }
                : {}),
            }}
          />
        ))}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 56,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={treeDataUri} width={88} height={88} alt="" />

          <div
            style={{
              marginTop: 24,
              fontSize: 12,
              letterSpacing: 6,
              color: brand.navy,
              fontWeight: 500,
            }}
          >
            FOREST ROAD VAULT
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 18,
              fontFamily: 'Playfair Display',
              color: brand.navy,
            }}
          >
            Certificate of Knowledge
          </div>

          <GoldRule width={200} marginTop={22} />

          <div
            style={{
              marginTop: 34,
              fontSize: nameSize,
              fontFamily: 'Playfair Display',
              color: brand.navy,
              textAlign: 'center',
              maxWidth: 940,
            }}
          >
            {name}
          </div>

          <GoldRule width={200} marginTop={28} />

          <div
            style={{
              marginTop: 30,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: 2,
              color: brand.gold,
            }}
          >
            {level.name}
          </div>

          <div style={{ marginTop: 18, fontSize: 16, color: brand.muted }}>
            {`Score: ${score} / ${questions.length}`}
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 14,
              color: brand.muted,
              textAlign: 'center',
              maxWidth: 820,
            }}
          >
            {`${name} ${level.citation}.`}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 52,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 12, color: brand.muted, letterSpacing: 1.5 }}>
            forestroadvault.com • @forestroadvault • Built on Ethereum
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 10,
              letterSpacing: 4,
              color: brand.gold,
              fontWeight: 500,
            }}
          >
            CAPITAL MOVES FURTHER.
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'Playfair Display', data: playfair, style: 'normal', weight: 700 },
        { name: 'DM Sans', data: dmSans, style: 'normal', weight: 400 },
        { name: 'DM Sans', data: dmSansMedium, style: 'normal', weight: 500 },
      ],
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=86400',
      },
    }
  )
}
