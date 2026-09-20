import AnimateIn from './AnimateIn'
import GoldDivider from './GoldDivider'

type SectionHeaderProps = {
  tagline?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export default function SectionHeader({
  tagline,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}: SectionHeaderProps) {
  const isDark = tone === 'dark'
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <AnimateIn className={`max-w-2xl ${alignment}`}>
      {tagline ? (
        <p className={isDark ? 'tagline-on-dark' : 'tagline'}>{tagline}</p>
      ) : null}
      <h2
        className={`mt-4 text-[2rem] font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${
          isDark ? 'text-cream' : 'text-navy dark:text-cream'
        }`}
      >
        {title}
      </h2>
      <GoldDivider
        width="short"
        className={`mt-6 ${align === 'center' ? '' : 'mx-0'}`}
      />
      {subtitle ? (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            isDark ? 'text-cream/65' : 'text-muted dark:text-cream/65'
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </AnimateIn>
  )
}
