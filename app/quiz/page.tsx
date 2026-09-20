import type { Metadata } from 'next'
import Quiz from '@/components/quiz/Quiz'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Quiz',
  description:
    '15 questions about Forest Road Vault. Score high, earn your tree, download your certificate and share it on X.',
}

export default function QuizPage() {
  return (
    <section className="section-y bg-navy-deep text-cream">
      <div className="container-content">
        <SectionHeader
          tagline="Learn & Earn"
          title="Test Your Knowledge"
          subtitle="15 questions about Forest Road Vault. Score high, earn your tree, share your certificate."
          tone="dark"
        />
        <Quiz />
      </div>
    </section>
  )
}
