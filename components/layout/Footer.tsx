import Link from 'next/link'
import GoldDivider from '@/components/ui/GoldDivider'
import TreeLogo from '@/components/ui/TreeLogo'
import { links, siteMeta } from '@/lib/constants'

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
    <footer className="safe-bottom bg-navy-deep text-cream">
      <GoldDivider />
      <div className="container-content py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <TreeLogo className="h-8 w-8 text-cream" />
              <span className="font-heading text-lg font-bold">
                Forest Road Vault
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              Real-world credit on Ethereum L1.
            </p>
            <p className="tagline-on-dark mt-6">{siteMeta.tagline}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-body text-xs font-medium uppercase tracking-tagline text-gold">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cream/60 transition-colors hover:text-cream"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-cream/60 transition-colors hover:text-cream"
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

        <GoldDivider className="mt-14 opacity-60" />
        <p className="mt-6 text-xs leading-relaxed text-cream/40">
          This page is an educational community contribution. It is not
          affiliated with Forest Road Asset Management. It does not constitute
          investment advice or an offer of securities. © 2026
        </p>
      </div>
    </footer>
  )
}
