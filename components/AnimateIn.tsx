'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type AnimateInProps = {
  children: ReactNode
  delay?: number
  className?: string
  /** Render as a list item when used inside <ul>/<ol>. */
  as?: 'div' | 'li'
}

export default function AnimateIn({
  children,
  delay = 0,
  className,
  as = 'div',
}: AnimateInProps) {
  const reduceMotion = useReducedMotion()
  const Component = as === 'li' ? motion.li : motion.div

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}
