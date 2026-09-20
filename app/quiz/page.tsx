import type { Metadata } from 'next'
import Quiz from '@/components/Quiz'
import SectionHeader from '@/components/SectionHeader'

export const metadata: Metadata = {
  title: 'Quiz',
  description:
    '15 questions about Forest Road Vault. Score high, earn your tree, download your certificate and share it on X.',
}

export default function QuizPage() {
  return (
    <section className="section-y bg-gradient-to-b from-navy-deep via-navy to-[#16362b] text-white">
      <div className="container-content">
        <SectionHeader
          eyebrow="Learn & earn"
          title="Test Your Knowledge"
          subtitle="15 questions about Forest Road Vault. Score high, earn your tree, share your certificate."
          tone="dark"
        />
        <Quiz />
      </div>
    </section>
  )
}
