type GoldArchProps = {
  className?: string
  /** Number of nested arches in the fan. */
  leaves?: number
}

/**
 * Art-deco arch window, matching the corner motif in the brand's posts:
 * nested arches springing from a shared baseline over a thin colonnade of
 * vertical rules. Anchored to the bottom-left of the viewBox so a caller can
 * rotate it into any corner. Purely decorative.
 */
export default function GoldArch({ className = '', leaves = 4 }: GoldArchProps) {
  const size = 200
  const base = 200
  const columns = 7

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      {Array.from({ length: leaves }).map((_, i) => {
        const span = base * (1 - i * 0.21)
        const rise = span * 0.94
        return (
          <path
            key={span}
            d={`M0 ${base} A ${span / 2} ${rise} 0 0 1 ${span} ${base}`}
          />
        )
      })}

      {/* Colonnade under the arches. */}
      {Array.from({ length: columns }).map((_, i) => {
        const x = ((i + 1) * base) / (columns + 1)
        return (
          <line
            key={x}
            x1={x}
            y1={base - 62}
            x2={x}
            y2={base}
            strokeWidth="0.7"
          />
        )
      })}

      <line x1="0" y1={base} x2={base} y2={base} strokeWidth="0.9" />
    </svg>
  )
}
