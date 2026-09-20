type GoldDividerProps = {
  className?: string
  /**
   * 'short' is the brand's section rule — a stubby centred bar under a
   * heading. 'full' spans the container for structural breaks.
   */
  width?: 'full' | 'short'
  align?: 'center' | 'left'
}

export default function GoldDivider({
  className = '',
  width = 'full',
  align = 'center',
}: GoldDividerProps) {
  const short = width === 'short'
  return (
    <hr
      aria-hidden="true"
      className={`border-0 bg-gold ${
        short
          ? `h-[3px] w-[72px] ${align === 'center' ? 'mx-auto' : 'mx-0'}`
          : 'h-px w-full opacity-40'
      } ${className}`}
    />
  )
}
