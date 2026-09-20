'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navLinks } from '@/lib/constants'
import ThemeToggle from './ThemeToggle'
import TreeLogo from './TreeLogo'

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="fixed inset-x-0 top-0 z-50 safe-top border-b border-white/10 bg-navy-deep/95 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="container-content flex h-16 items-center justify-between"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white"
          aria-label="Forest Road Vault — home"
        >
          <TreeLogo className="h-7 w-7 text-forest-pale" />
          <span className="font-display text-lg tracking-tight sm:text-xl">
            Forest Road Vault
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`rounded-btn px-3 py-2 text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-forest-pale'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/quiz"
            className="hidden rounded-btn bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-light sm:inline-flex"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-btn border border-white/15 text-white lg:hidden"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-navy-deep lg:hidden"
          >
            <ul className="container-content flex flex-col py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`block rounded-btn px-3 py-3 text-base transition-colors ${
                      isActive(link.href)
                        ? 'bg-white/5 text-forest-pale'
                        : 'text-white/75 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/quiz"
                  className="btn-primary w-full"
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
