import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Programs } from "@/components/programs"
import { ImpactFramework } from "@/components/impact-framework"
import { Quiz } from "@/components/quiz"
import { About } from "@/components/about"
import { AdaptFramework } from "@/components/adapt-framework"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Programs />
      <ImpactFramework />
      <AdaptFramework />
      <About />
      <FAQ />
      <Quiz />
      <Footer />
    </main>
  )
}