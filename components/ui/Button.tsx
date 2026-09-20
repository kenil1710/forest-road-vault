import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'outline-light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-body font-medium transition-colors duration-200 disabled:cursor-default disabled:opacity-60'

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-9 py-4 text-base',
}

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-cream hover:bg-forest-light',
  secondary: 'bg-gold text-navy hover:bg-gold-light',
  // On cream surfaces.
  outline: 'border border-navy/30 text-navy hover:border-navy hover:bg-navy/5',
  // On navy surfaces.
  'outline-light':
    'border border-cream/30 text-cream hover:border-gold hover:text-gold',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps & {
  href: string
  external?: boolean
}

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
  } = props
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if ('href' in props && props.href !== undefined) {
    const { href, external } = props
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
