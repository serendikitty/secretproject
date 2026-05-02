import { create } from 'zustand'

interface QuizState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  answers: Record<string, string>
  setAnswer: (questionId: string, answer: string) => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  answers: {},
  setAnswer: (questionId, answer) => 
    set((state) => ({ 
      answers: { ...state.answers, [questionId]: answer } 
    })),
  resetQuiz: () => set({ answers: {}, isOpen: false }),
}))
