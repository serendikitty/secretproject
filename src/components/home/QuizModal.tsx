"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { useQuizStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  {
    id: "vibe",
    title: "What is your desired vibe?",
    options: [
      { label: "Fresh & Airy", value: "fresh" },
      { label: "Deep & Mysterious", value: "deep" },
      { label: "Bold & Confident", value: "bold" },
      { label: "Soft & Clean", value: "soft" }
    ]
  },
  {
    id: "occasion",
    title: "When do you plan to wear it most?",
    options: [
      { label: "Bright Mornings", value: "daylight" },
      { label: "Elegant Evenings", value: "nightfall" },
      { label: "Special Occasions", value: "statement" },
      { label: "Daily Signature", value: "daily" }
    ]
  },
  {
    id: "personality",
    title: "Choose an environment that speaks to you:",
    options: [
      { label: "A minimalist glass house", value: "minimalist" },
      { label: "A cozy wooden cabin", value: "cozy" },
      { label: "A vibrant city rooftop", value: "vibrant" },
      { label: "A tropical garden at dusk", value: "tropical" }
    ]
  }
]

export function QuizModal() {
  const router = useRouter()
  const { isOpen, setIsOpen, answers, setAnswer, resetQuiz } = useQuizStore()
  const [step, setStep] = React.useState(0)

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      // Calculate result and redirect
      setIsOpen(false)
      // For now just redirect to result page
      router.push("/result")
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const currentQuestion = questions[step]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) {
        // Delay resetting to allow exit animation
        setTimeout(() => {
          setStep(0)
          // resetQuiz() // Uncomment if you want to clear answers on close
        }, 300)
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <p className="text-xs uppercase tracking-widest text-stone-400 mb-2">Analysis Step {step + 1} of {questions.length}</p>
          <DialogTitle className="text-2xl">{currentQuestion.title}</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-3"
            >
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAnswer(currentQuestion.id, option.value)}
                  className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                    answers[currentQuestion.id] === option.value
                      ? "border-stone-900 bg-stone-900 text-white shadow-md"
                      : "border-stone-100 bg-stone-50 hover:border-stone-300 text-stone-700"
                  }`}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            disabled={step === 0}
            className={step === 0 ? "opacity-0" : ""}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="px-8"
          >
            {step === questions.length - 1 ? "Show Results" : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
