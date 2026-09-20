import Link from 'next/link'
import { links } from '@/lib/constants'
import TreeLogo from './TreeLogo'

const columns = [
  {
    title: 'Protocol',
    items: [
      { label: 'Website', href: links.website, external: true },
      { label: 'Transparency', href: links.transparency, external: true },
      { label: 'How It Works', href: links.howItWorks, external: true },
      { label: 'Sectors', href: links.sectors, external: true },
      { label: 'Risk Disclosures', href: links.risk, external: true },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'X (Twitter)', href: links.twitter, external: true },
      { label: 'GitHub', href: links.github, external: true },
      { label: 'Whitelist', href: links.whitelist, external: true },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'FAQ', href: '/faq', external: false },
      { label: 'Quiz', href: '/quiz', external: false },
      { label: 'Deep Dive', href: '/learn', external: false },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="safe-bottom border-t border-white/10 bg-navy-deep text-white">
      <div className="container-content py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <TreeLogo className="h-7 w-7 text-forest-pale" />
              <span className="font-display text-lg">Forest Road Vault</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Real-world credit on Ethereum L1. Identified collateral, variable
              yield, published audits.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-forest-pale/70">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/65 transition-colors hover:text-forest-pale"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-white/65 transition-colors hover:text-forest-pale"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/45">
            This page is an educational community contribution. It is not
            affiliated with Forest Road Asset Management. It does not constitute
            investment advice or an offer of securities. © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
