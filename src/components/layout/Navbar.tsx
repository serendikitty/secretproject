"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useQuizStore } from "@/lib/store"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const setIsQuizOpen = useQuizStore((state) => state.setIsOpen)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 glass-nav border-b border-stone-200/50 transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          className="md:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/" className="font-serif text-2xl tracking-tight text-stone-900 font-semibold mx-auto md:mx-0">
          Scent & Soul.
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#directory" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Directory</Link>
          <Link href="/#occasions" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Occasions</Link>
          <Link href="/#reviews" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">Community</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-stone-900">Sign In</Link>
          <Button 
            onClick={() => setIsQuizOpen(true)}
            className="bg-stone-900 text-stone-50 hover:bg-stone-900/90 h-9 px-4 py-2"
          >
            Take the Quiz
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-4 animate-in slide-in-from-top-4">
          <Link href="/#directory" className="block text-sm font-medium text-stone-600" onClick={() => setIsMobileMenuOpen(false)}>Directory</Link>
          <Link href="/#occasions" className="block text-sm font-medium text-stone-600" onClick={() => setIsMobileMenuOpen(false)}>Occasions</Link>
          <button 
            className="block text-sm font-medium text-stone-900" 
            onClick={() => {
              setIsQuizOpen(true)
              setIsMobileMenuOpen(false)
            }}
          >
            Take the Quiz
          </button>
        </div>
      )}
    </header>
  )
}
