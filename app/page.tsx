import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { TeachMeAIFrameworks } from "@/components/teachmeai-frameworks"
import { Quiz } from "@/components/quiz"
import { About } from "@/components/about"
import { FAQ } from "@/components/faq"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Programs />
      <TeachMeAIFrameworks />
      <About />
      <Quiz />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}