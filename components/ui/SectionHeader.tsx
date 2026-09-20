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
        className={`mt-4 font-display text-[1.9rem] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] sm:text-4xl lg:text-[2.6rem] ${
          isDark ? 'text-cream' : 'text-navy dark:text-cream'
        }`}
      >
        {title}
      </h2>
      <GoldDivider
        width="short"
        align={align === 'center' ? 'center' : 'left'}
        className="mt-7"
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
