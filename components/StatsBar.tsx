import { stats } from '@/lib/constants'
import AnimateIn from './AnimateIn'

export default function StatsBar() {
  return (
    <section
      aria-label="Protocol at a glance"
      className="border-y border-navy/10 bg-cream dark:border-white/10 dark:bg-navy"
    >
      <ul className="container-content grid grid-cols-2 gap-x-6 gap-y-8 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:py-14">
        {stats.map((stat, index) => (
          <AnimateIn
            as="li"
            key={stat.label}
            delay={index * 0.1}
            className="text-center"
          >
            <p className="font-display text-xl text-navy dark:text-white sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-navy/50 dark:text-white/50">
              {stat.label}
            </p>
          </AnimateIn>
        ))}
      </ul>
    </section>
  )
}
