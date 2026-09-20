import { TREE_PATH, TREE_SIZE } from './tree'

export const CERT_WIDTH = 1080
export const CERT_HEIGHT = 720

export type CertificateData = {
  name: string
  score: number
  total: number
  levelName: string
  levelColor: string
  levelDescription: string
}

/**
 * next/font hashes the family name, so canvas can't hardcode "DM Serif
 * Display". Read the generated stack out of the CSS variable instead.
 */
function fontStack(variable: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
  return value ? `${value}, ${fallback}` : fallback
}

/** Canvas letterSpacing is not universal — draw tracked text by hand. */
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

/** Relative luminance (WCAG) of an #rrggbb colour. */
function luminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function parseHex(hex: string): [number, number, number] {
  const value = hex.replace('#', '')
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ]
}

/**
 * The deepest tree colour (#2d6a4f) sits too close to the navy background to
 * read. Lift it toward forest-pale rather than white, so it gains contrast
 * without washing out to grey.
 */
const LIFT_TARGET: [number, number, number] = [183, 228, 199] // forest-pale

function readable(hex: string, minLuminance = 0.34): string {
  const base = parseHex(hex)
  let rgb = base
  let mix = 0
  while (luminance(rgb) < minLuminance && mix < 1) {
    mix += 0.05
    rgb = base.map((c, i) =>
      Math.round(c + (LIFT_TARGET[i] - c) * mix)
    ) as [number, number, number]
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

function drawTree(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  top: number,
  size: number,
  color: string
) {
  const scale = size / TREE_SIZE
  ctx.save()
  ctx.translate(centerX - size / 2, top)
  ctx.scale(scale, scale)
  ctx.fillStyle = color
  ctx.fill(new Path2D(TREE_PATH), 'evenodd')
  ctx.restore()
}

function drawCorners(ctx: CanvasRenderingContext2D, inset: number, arm: number) {
  ctx.save()
  ctx.strokeStyle = 'rgba(183, 228, 199, 0.4)'
  ctx.lineWidth = 2
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

/** Wrap to at most `maxLines` lines, ellipsising anything that overflows. */
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
    ctx.font = `${size}px ${family}`
    if (ctx.measureText(text).width <= maxWidth) break
    size -= 2
  }
  return size
}

export function drawCertificate(
  canvas: HTMLCanvasElement,
  data: CertificateData
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = CERT_WIDTH
  canvas.height = CERT_HEIGHT

  const display = fontStack('--font-display', 'Georgia, serif')
  const sans = fontStack('--font-sans', 'Helvetica, Arial, sans-serif')
  const centerX = CERT_WIDTH / 2
  const name = data.name.trim() || 'Your Name'
  const accent = readable(data.levelColor)

  ctx.clearRect(0, 0, CERT_WIDTH, CERT_HEIGHT)

  // Background: deep navy with a soft forest glow behind the emblem.
  ctx.fillStyle = '#0f1a2e'
  ctx.fillRect(0, 0, CERT_WIDTH, CERT_HEIGHT)

  const glow = ctx.createRadialGradient(
    centerX,
    CERT_HEIGHT * 0.42,
    40,
    centerX,
    CERT_HEIGHT * 0.42,
    CERT_WIDTH * 0.62
  )
  glow.addColorStop(0, 'rgba(45, 106, 79, 0.42)')
  glow.addColorStop(0.55, 'rgba(45, 106, 79, 0.12)')
  glow.addColorStop(1, 'rgba(15, 26, 46, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, CERT_WIDTH, CERT_HEIGHT)

  // Double border.
  ctx.strokeStyle = 'rgba(183, 228, 199, 0.45)'
  ctx.lineWidth = 2
  ctx.strokeRect(28, 28, CERT_WIDTH - 56, CERT_HEIGHT - 56)
  ctx.strokeStyle = 'rgba(183, 228, 199, 0.18)'
  ctx.lineWidth = 1
  ctx.strokeRect(40, 40, CERT_WIDTH - 80, CERT_HEIGHT - 80)

  drawCorners(ctx, 54, 26)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  drawTree(ctx, centerX, 92, 116, accent)

  ctx.fillStyle = 'rgba(183, 228, 199, 0.5)'
  ctx.font = `600 13px ${sans}`
  drawTracked(ctx, 'FOREST ROAD VAULT', centerX, 250, 5)

  ctx.fillStyle = '#ffffff'
  ctx.font = `16px ${sans}`
  drawTracked(ctx, 'Certificate of Knowledge', centerX, 286, 1.5)

  const nameSize = fitFontSize(ctx, name, display, 52, 24, CERT_WIDTH - 220)
  ctx.font = `${nameSize}px ${display}`
  ctx.fillStyle = accent
  ctx.fillText(name, centerX, 364)

  // Divider.
  ctx.strokeStyle = 'rgba(183, 228, 199, 0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(centerX - 150, 398)
  ctx.lineTo(centerX + 150, 398)
  ctx.stroke()

  ctx.fillStyle = accent
  ctx.font = `bold 28px ${sans}`
  drawTracked(ctx, data.levelName, centerX, 450, 2)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.78)'
  ctx.font = `18px ${sans}`
  ctx.fillText(`Score: ${data.score} / ${data.total}`, centerX, 490)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
  ctx.font = `15px ${sans}`
  const lines = wrapText(ctx, data.levelDescription, CERT_WIDTH - 340, 2)
  lines.forEach((line, i) => {
    ctx.fillText(line, centerX, 542 + i * 26)
  })

  ctx.fillStyle = 'rgba(183, 228, 199, 0.45)'
  ctx.font = `12px ${sans}`
  drawTracked(
    ctx,
    'forestroadvault.com  •  @forestroadvault  •  Built on Ethereum',
    centerX,
    652,
    2
  )
}
