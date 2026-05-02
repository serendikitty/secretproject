import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/home/Hero"
import { OccasionSection } from "@/components/home/OccasionSection"
import { QuizTeaser } from "@/components/home/QuizTeaser"
import { DirectoryGrid } from "@/components/home/DirectoryGrid"
import { QuizModal } from "@/components/home/QuizModal"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-24 bg-white border-y border-stone-100">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">Fragrance has no gender. <br /> <span className="italic text-stone-500">It has an occasion.</span></h2>
            <p className="text-stone-600 text-lg font-light leading-relaxed">
              We believe that scent is a personal aura. Whether it's a crisp morning in Jakarta or an intimate dinner in Bali, your fragrance should adapt to your mood and moment, not your gender. 
            </p>
          </div>
        </section>

        <OccasionSection />
        
        <QuizTeaser />
        
        <DirectoryGrid />
      </main>

      <Footer />
      
      <QuizModal />
    </div>
  )
}
