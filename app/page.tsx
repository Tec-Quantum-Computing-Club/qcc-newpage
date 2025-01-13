import { Header } from '../components/header'
import { Hero } from '../components/hero'
import { Logos } from '../components/logos'
import { Features } from '../components/features'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Logos />
      </main>
      <Footer />
    </div>
  )
}

