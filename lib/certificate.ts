import { brand } from './constants'
import { TREE_PATH, TREE_SIZE } from './tree'

/**
 * 1200x630 is the 1.91:1 ratio X and Open Graph expect for
 * summary_large_image. A taller card gets centre-cropped by X.
 */
export const CERT_WIDTH = 1200
export const CERT_HEIGHT = 630

/** Path to the official mark, drawn onto the certificate when it has loaded. */
export const CERT_LOGO_SRC = '/images/logo-navy.png'

export type CertificateData = {
  name: string
  score: number
  total: number
  levelName: string
  levelCitation: string
}

/**
 * next/font hashes the family name, so canvas can't hardcode "Playfair
 * Display". Read the generated stack out of the CSS variable instead.
 */
function fontStack(variable: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
  return value ? `${value}, ${fallback}` : fallback
}

/** Canvas letterSpacing is not universally supported — track text by hand. */
function drawTracked(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  spacing: number
) {
  const chars = Array.from(text)
  const widths = chars.map((c) => ctx.measureText(c).width)
  const total =
    widths.reduce((sum, w) => sum + w, 0) + spacing * (chars.length - 1)
  let x = centerX - total / 2
  const previousAlign = ctx.textAlign
  ctx.textAlign = 'left'
  chars.forEach((char, i) => {
    ctx.fillText(char, x, y)
    x += widths[i] + spacing
  })
  ctx.textAlign = previousAlign
}

/**
 * Prefers the official logo bitmap; falls back to the traced path so the
 * certificate still renders correctly before the image has loaded (or if it
 * fails to).
 */
function drawTree(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  top: number,
  size: number,
  color: string,
  logo?: CanvasImageSource | null
) {
  if (logo) {
    ctx.drawImage(logo, centerX - size / 2, top, size, size)
    return
  }
  const scale = size / TREE_SIZE
  ctx.save()
  ctx.translate(centerX - size / 2, top)
  ctx.scale(scale, scale)
  ctx.fillStyle = color
  ctx.fill(new Path2D(TREE_PATH), 'evenodd')
  ctx.restore()
}

function drawGoldRule(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  y: number,
  width: number
) {
  ctx.save()
  ctx.strokeStyle = brand.gold
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(centerX - width / 2, y)
  ctx.lineTo(centerX + width / 2, y)
  ctx.stroke()
  ctx.restore()
}

/** Art-deco style corner brackets, matching the brand's decorative language. */
function drawCorners(ctx: CanvasRenderingContext2D, inset: number, arm: number) {
  ctx.save()
  ctx.strokeStyle = brand.gold
  ctx.lineWidth = 1.5
  const corners: Array<[number, number, number, number]> = [
    [inset, inset, 1, 1],
    [CERT_WIDTH - inset, inset, -1, 1],
    [inset, CERT_HEIGHT - inset, 1, -1],
    [CERT_WIDTH - inset, CERT_HEIGHT - inset, -1, -1],
  ]
  corners.forEach(([x, y, dx, dy]) => {
    ctx.beginPath()
    ctx.moveTo(x + dx * arm, y)
    ctx.lineTo(x, y)
    ctx.lineTo(x, y + dy * arm)
    ctx.stroke()
  })
  ctx.restore()
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate
    } else {
      lines.push(current)
      current = word
      if (lines.length === maxLines) break
    }
  }
  if (lines.length < maxLines && current) lines.push(current)
  return lines.slice(0, maxLines)
}

/** Shrink the name until it fits the certificate's inner width. */
function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  startSize: number,
  minSize: number,
  maxWidth: number
): number {
  let size = startSize
  while (size > minSize) {
    ctx.font = `700 ${size}px ${family}`
    if (ctx.measureText(text).width <= maxWidth) break
    size -= 2
  }
  return size
}

export function drawCertificate(
  canvas: HTMLCanvasElement,
  data: CertificateData,
  logo?: CanvasImageSource | null
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = CERT_WIDTH
  canvas.height = CERT_HEIGHT

  const heading = fontStack('--font-heading', 'Georgia, serif')
  const body = fontStack('--font-body', 'Helvetica, Arial, sans-serif')
  const centerX = CERT_WIDTH / 2
  const name = data.name.trim() || 'Your Name'

  ctx.clearRect(0, 0, CERT_WIDTH, CERT_HEIGHT)

  // Cream ground — the certificate matches the brand's light palette.
  ctx.fillStyle = brand.cream
  ctx.fillRect(0, 0, CERT_WIDTH, CERT_HEIGHT)

  ctx.strokeStyle = brand.gold
  ctx.lineWidth = 2
  ctx.strokeRect(20, 20, CERT_WIDTH - 40, CERT_HEIGHT - 40)
  drawCorners(ctx, 40, 26)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  drawTree(ctx, centerX, 52, 80, brand.navy, logo)

  ctx.fillStyle = brand.navy
  ctx.font = `500 12px ${body}`
  drawTracked(ctx, 'FOREST ROAD VAULT', centerX, 172, 6)

  ctx.fillStyle = brand.navy
  ctx.font = `700 18px ${heading}`
  drawTracked(ctx, 'Certificate of Knowledge', centerX, 208, 1)

  drawGoldRule(ctx, centerX, 234, 200)

  const nameSize = fitFontSize(ctx, name, heading, 40, 20, CERT_WIDTH - 240)
  ctx.font = `700 ${nameSize}px ${heading}`
  ctx.fillStyle = brand.navy
  ctx.fillText(name, centerX, 296)

  drawGoldRule(ctx, centerX, 330, 200)

  ctx.fillStyle = brand.gold
  ctx.font = `700 24px ${body}`
  drawTracked(ctx, data.levelName, centerX, 376, 2)

  ctx.fillStyle = brand.muted
  ctx.font = `400 16px ${body}`
  ctx.fillText(`Score: ${data.score} / ${data.total}`, centerX, 410)

  ctx.fillStyle = brand.muted
  ctx.font = `400 14px ${body}`
  const citation = `${name} ${data.levelCitation}.`
  wrapText(ctx, citation, CERT_WIDTH - 320, 2).forEach((line, i) => {
    ctx.fillText(line, centerX, 452 + i * 22)
  })

  ctx.fillStyle = brand.muted
  ctx.font = `400 12px ${body}`
  drawTracked(
    ctx,
    'forestroadvault.com  •  @forestroadvault  •  Built on Ethereum',
    centerX,
    556,
    1.5
  )

  ctx.fillStyle = brand.gold
  ctx.font = `500 10px ${body}`
  drawTracked(ctx, 'CAPITAL MOVES FURTHER.', centerX, 588, 4)
}
