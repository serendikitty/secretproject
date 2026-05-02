"use client"

import { Button } from "@/components/ui/Button"
import { useQuizStore } from "@/lib/store"
import { motion } from "framer-motion"

export function Hero() {
  const setIsQuizOpen = useQuizStore((state) => state.setIsOpen)

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 z-10"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">The Local Fragrance Directory</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-stone-900">
            Know your <br />
            <span className="italic text-stone-500">scent,</span> <br />
            know yourself.
          </h1>
          <p className="text-lg text-stone-600 max-w-md font-light leading-relaxed">
            Discover the finest Indonesian fragrances. Unbound by gender, curated by occasion, and matched to your very soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg"
              onClick={() => setIsQuizOpen(true)}
              className="h-12 px-8 text-base"
            >
              Discover Your Scent
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Directory
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px] md:h-[700px] w-full mt-10 md:mt-0"
        >
          <div className="absolute inset-0 bg-stone-200 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
              alt="Elegant minimal perfume bottle" 
              className="w-full h-full object-cover object-center opacity-90 mix-blend-multiply transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
