"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { useQuizStore } from "@/lib/store"
import { getPerfumesFromDB } from "@/lib/firebase"
import { type Perfume } from "@/lib/data"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Sparkles, Trophy, CheckCircle2, Loader2 } from "lucide-react"

export default function ResultPage() {
  const { answers } = useQuizStore()
  const [perfumes, setPerfumes] = React.useState<Perfume[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function loadPerfumes() {
      const data = await getPerfumesFromDB()
      setPerfumes(data)
      setLoading(false)
    }
    loadPerfumes()
  }, [])
  
  // Ranking logic
  const recommendedPerfumes = React.useMemo(() => {
    if (perfumes.length === 0) return []

    // Sort perfumes based on how many tags they match
    const sorted = [...perfumes].sort((a, b) => {
      let scoreA = 0
      let scoreB = 0
      
      if (a.occasionTag === answers.occasion) scoreA += 2
      if (b.occasionTag === answers.occasion) scoreB += 2
      
      return scoreB - scoreA
    })
    
    return sorted.slice(0, 5)
  }, [answers, perfumes])

  const compatibilityLabels = [
    { label: "Most Compatible", icon: <Trophy className="w-3 h-3" />, color: "bg-stone-900 text-stone-50" },
    { label: "Strong Match", icon: <CheckCircle2 className="w-3 h-3" />, color: "bg-stone-100 text-stone-900" },
    { label: "Great Match", icon: null, color: "bg-stone-100 text-stone-600" },
    { label: "Good Match", icon: null, color: "bg-stone-50 text-stone-500" },
    { label: "Acceptable", icon: null, color: "bg-stone-50 text-stone-400" },
  ]

  const profileName = React.useMemo(() => {
    if (answers.vibe === "deep") return "The Nightfall"
    if (answers.vibe === "fresh") return "The Daylight"
    return "The Statement"
  }, [answers])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-stone-300 animate-spin" />
            <p className="text-stone-400 font-serif italic">Analyzing your aura...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-xs font-medium uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              Analysis Complete
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-stone-900">
              You are <span className="italic text-stone-500">{profileName}</span>
            </h1>
            <p className="text-stone-500 max-w-2xl mx-auto font-light text-lg leading-relaxed">
              Based on your unique aura, we've ranked these 5 Indonesian masterpieces from your most precise match to acceptable harmonies.
            </p>
          </motion.div>

          <div className="grid gap-16 max-w-6xl mx-auto">
            {/* Top Match */}
            {recommendedPerfumes.slice(0, 1).map((perfume, index) => (
              <motion.div 
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={perfume.imageUrl} 
                    alt={perfume.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="space-y-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${compatibilityLabels[0].color}`}>
                    {compatibilityLabels[0].icon}
                    {compatibilityLabels[0].label}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm uppercase tracking-widest text-stone-400 font-medium">{perfume.brand}</h4>
                    <h3 className="font-serif text-5xl text-stone-900">{perfume.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.map(note => (
                      <span key={note} className="text-xs px-3 py-1 bg-stone-50 border border-stone-200 text-stone-600 rounded-md">
                        {note}
                      </span>
                    ))}
                  </div>
                  <p className="text-stone-600 font-light text-xl leading-relaxed">
                    This is your signature essence. It perfectly mirrors your preference for {answers.vibe || "sophisticated"} vibes and {answers.personality || "refined"} environments.
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Other Matches */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {recommendedPerfumes.slice(1).map((perfume, index) => (
                <motion.div 
                  key={perfume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="space-y-4 group"
                >
                  <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden shadow-sm transition-shadow group-hover:shadow-md">
                    <img 
                      src={perfume.imageUrl} 
                      alt={perfume.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-[8px] uppercase tracking-tighter font-bold ${compatibilityLabels[index + 1].color}`}>
                      {compatibilityLabels[index + 1].icon}
                      {compatibilityLabels[index + 1].label}
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-stone-400 font-medium leading-none mb-1">{perfume.brand}</h4>
                      <h3 className="font-serif text-lg text-stone-900">{perfume.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-32 text-center">
            <hr className="border-stone-100 mb-16" />
            <h3 className="font-serif text-3xl text-stone-900 mb-8">Not quite your soul's match?</h3>
            <Button variant="outline" size="lg" onClick={() => window.location.href = "/"} className="rounded-full px-12">
              Retake the Analysis
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
