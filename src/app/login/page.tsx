"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { loginAdmin } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await loginAdmin(email, password)
    
    if (result.success) {
      // Store session in localStorage
      localStorage.setItem("ss_admin", JSON.stringify({ email, loggedIn: true }))
      router.push("/editor")
    } else {
      setError(result.error || "Invalid email or password.")
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md px-6"
        >
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="font-serif text-3xl text-stone-900">Editor Login</h1>
              <p className="text-stone-500 font-light text-sm">Enter your credentials to access the article editor.</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@scentandsoul.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Password
                </label>
                <Input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-full py-6 h-auto text-sm uppercase tracking-widest font-bold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
