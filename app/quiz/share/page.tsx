import type { Metadata } from 'next'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import GoldDivider from '@/components/ui/GoldDivider'
import TreeLogo from '@/components/ui/TreeLogo'
import {
  getTreeLevelBySlug,
  siteMeta,
  siteUrl,
  treeLevels,
} from '@/lib/constants'
import { questions } from '@/lib/questions'

type SearchParams = { [key: string]: string | string[] | undefined }

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

/** Normalise untrusted query params once, for both metadata and the page. */
function parse(searchParams: SearchParams) {
  const name = first(searchParams.name).trim().slice(0, 40)
  const parsed = Number.parseInt(first(searchParams.score), 10)
  const score =
    Number.isFinite(parsed) && parsed >= 0 && parsed <= questions.length
      ? parsed
      : 0
  const level =
    getTreeLevelBySlug(first(searchParams.level)) ??
    treeLevels.find((l) => score >= l.min && score <= l.max) ??
    treeLevels[0]
  return { name, score, level }
}

function certificatePath(name: string, score: number, levelSlug: string) {
  return `/api/og-certificate?name=${encodeURIComponent(
    name
  )}&score=${score}&level=${levelSlug}`
}

/** Crawlers need an absolute URL; the page itself is better off relative. */
function certificateUrl(name: string, score: number, levelSlug: string) {
  return `${siteUrl}${certificatePath(name, score, levelSlug)}`
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const { name, score, level } = parse(searchParams)
  const who = name || 'Someone'
  const title = `${who} earned ${level.name} on the Forest Road Vault quiz`
  const description = `${who} scored ${score}/${questions.length} on the Forest Road Vault Knowledge Quiz. Take it yourself and earn your tree.`
  const image = certificateUrl(name, score, level.slug)

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      siteName: siteMeta.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteMeta.handle,
      title,
      description,
      images: [{ url: image, alt: title }],
    },
  }
}

export default function SharePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { name, score, level } = parse(searchParams)
  const who = name || 'Someone'
  const image = certificatePath(name, score, level.slug)

  return (
    <section className="section-y bg-navy-deep text-cream">
      <div className="container-content">
        <div className="mx-auto max-w-3xl text-center">
          <TreeLogo className="mx-auto h-10 w-10 text-cream" />
          <p className="tagline-on-dark mt-6">{siteMeta.tagline}</p>
          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-cream sm:text-4xl">
            {who} earned {level.name} on the Forest Road Vault quiz
          </h1>
          <GoldDivider width="short" className="mt-7" />
          <p className="mt-7 text-base leading-relaxed text-cream/65">
            Scored {score} out of {questions.length}. {level.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl border border-gold/40">
          <Image
            src={image}
            alt={`Certificate of Knowledge for ${who} — ${level.name}, scored ${score} of ${questions.length}`}
            width={1200}
            height={630}
            className="h-auto w-full"
            unoptimized
            priority
          />
        </div>

        <div className="mt-12 text-center">
          <Button href="/quiz" variant="primary" size="lg">
            Take the quiz yourself
          </Button>
        </div>
      </div>
    </section>
  )
}
