'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import TreeLogo from '@/components/ui/TreeLogo'
import { navLinks } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 safe-top bg-cream/95 backdrop-blur-md transition-colors duration-300 dark:bg-navy-deep/95 ${
        scrolled
          ? 'border-b border-gold/20'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-content flex h-[4.5rem] items-center justify-between"
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-navy dark:text-cream"
          aria-label="Forest Road Vault — home"
        >
          <TreeLogo className="h-8 w-8" />
          <span className="font-heading text-lg font-bold tracking-tight sm:text-xl">
            Forest Road Vault
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="relative block py-1 text-sm text-navy/70 transition-colors hover:text-navy dark:text-cream/70 dark:hover:text-cream"
              >
                {link.label}
                {isActive(link.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 34 }
                    }
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/quiz"
            className="hidden rounded-btn bg-forest px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-light sm:inline-flex"
          >
            Take the Quiz
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-btn border border-navy/15 text-navy transition-colors hover:border-gold dark:border-cream/20 dark:text-cream lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu with large nav links. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 bg-cream dark:bg-navy-deep lg:hidden"
          >
            <ul className="container-content flex flex-col gap-2 pt-10">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`block border-b border-warmline/60 py-4 font-heading text-3xl font-bold transition-colors dark:border-cream/10 ${
                      isActive(link.href)
                        ? 'text-gold'
                        : 'text-navy dark:text-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-8">
                <Link
                  href="/quiz"
                  className="inline-flex w-full items-center justify-center rounded-btn bg-forest px-6 py-4 font-body text-base font-medium text-cream"
                >
                  Take the Quiz
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
