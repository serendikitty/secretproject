"use client"

import { Button } from "@/components/ui/Button"
import { useQuizStore } from "@/lib/store"

export function QuizTeaser() {
  const setIsQuizOpen = useQuizStore((state) => state.setIsOpen)

  return (
    <section id="quiz" className="py-24 bg-stone-900 text-stone-50">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
        <p className="text-stone-400 uppercase tracking-widest text-sm font-medium">AI-Powered Profiling</p>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
          Not sure where to start? <br />
          <span className="italic text-stone-300">Let us read your vibe.</span>
        </h2>
        <p className="text-stone-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Take our 2-minute psychological and preference assessment. We'll analyze your personality, favorite environments, and memory triggers to recommend the perfect local Indonesian fragrance specifically for you.
        </p>
        <div>
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => setIsQuizOpen(true)}
            className="bg-white text-stone-900 hover:bg-stone-100 h-14 px-10 text-lg mt-4 shadow-lg"
          >
            Start the Analysis
          </Button>
        </div>
      </div>
    </section>
  )
}
