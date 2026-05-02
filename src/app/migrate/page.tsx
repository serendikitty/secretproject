"use client"

import * as React from "react"
import { migrateExcelToFirestore } from "@/lib/migration"
import { Button } from "@/components/ui/Button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function MigratePage() {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<{ success: boolean; count?: number; error?: string } | null>(null)

  const handleMigrate = async () => {
    setLoading(true)
    setResult(null)
    const res = await migrateExcelToFirestore()
    setResult(res)
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-center space-y-6">
          <h1 className="font-serif text-3xl text-stone-900">Data Migration</h1>
          <p className="text-stone-500 font-light text-sm">
            Populate your perfume directory using the data from the local Excel catalog.
          </p>

          {result?.success && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600 text-sm">
              <CheckCircle className="w-4 h-4 shrink-0" />
              Success! Migrated {result.count} perfumes.
            </div>
          )}

          {result?.success === false && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Error: {result.error}
            </div>
          )}

          <Button 
            onClick={handleMigrate} 
            disabled={loading}
            className="w-full rounded-full py-6 h-auto text-sm uppercase tracking-widest font-bold"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Start Migration
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
