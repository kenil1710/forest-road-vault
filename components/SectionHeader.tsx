import AnimateIn from './AnimateIn'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  tone = 'light',
}: SectionHeaderProps) {
  const alignment =
    align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleTone =
    tone === 'dark' ? 'text-white' : 'text-navy dark:text-white'
  const subtitleTone =
    tone === 'dark' ? 'text-white/65' : 'text-navy/65 dark:text-white/65'

  return (
    <AnimateIn className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-light">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${titleTone}`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${subtitleTone}`}>
          {subtitle}
        </p>
      ) : null}
    </AnimateIn>
  )
}
