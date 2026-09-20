type GoldArchProps = {
  className?: string
  /** Number of nested arcs. */
  rings?: number
}

/**
 * Art-deco corner flourish: concentric quarter-arcs, echoing the thin gold
 * curves in the brand's posts. Purely decorative.
 */
export default function GoldArch({ className = '', rings = 3 }: GoldArchProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: rings }).map((_, i) => {
        const r = 190 - i * 34
        return (
          <path
            key={r}
            d={`M0 ${r} A ${r} ${r} 0 0 0 ${r} 0`}
            stroke="currentColor"
            strokeWidth="1"
          />
        )
      })}
    </svg>
  )
}
