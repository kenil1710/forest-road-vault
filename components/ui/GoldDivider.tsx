type GoldDividerProps = {
  className?: string
  /** 'full' spans the container; 'short' is a centred 200px rule. */
  width?: 'full' | 'short'
}

export default function GoldDivider({
  className = '',
  width = 'full',
}: GoldDividerProps) {
  return (
    <hr
      aria-hidden="true"
      className={`border-0 bg-gold/40 ${
        width === 'short' ? 'mx-auto h-px w-[200px]' : 'h-px w-full'
      } ${className}`}
    />
  )
}
