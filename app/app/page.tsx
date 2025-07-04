
import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import ChatbotEmbed from '@/components/chatbot-embed'
import FooterSection from '@/components/footer-section'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ChatbotEmbed />
      <FooterSection />
    </main>
  )
}
