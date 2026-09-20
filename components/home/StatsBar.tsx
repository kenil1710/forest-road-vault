import AnimateIn from '@/components/ui/AnimateIn'
import { stats } from '@/lib/constants'

export default function StatsBar() {
  return (
    <section
      aria-label="Protocol at a glance"
      className="border-y border-gold/30 bg-cream-dark dark:bg-navy"
    >
      <ul className="container-content grid grid-cols-2 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-5 lg:py-16">
        {stats.map((stat, index) => (
          <AnimateIn
            as="li"
            key={stat.label}
            delay={index * 0.1}
            /* Gold rules between stats, but never before the first in a row. */
            className="px-4 text-center lg:border-l lg:border-gold/30 lg:first:border-l-0"
          >
            <p className="font-heading text-lg font-bold text-navy dark:text-cream sm:text-xl">
              {stat.value}
            </p>
            <p className="mt-2 font-body text-[0.7rem] uppercase tracking-tagline text-muted dark:text-cream/50">
              {stat.label}
            </p>
          </AnimateIn>
        ))}
      </ul>
    </section>
  )
}
