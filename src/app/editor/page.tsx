"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { 
  saveArticleToDB, 
  savePerfumeToDB, 
  updateArticleInDB, 
  updatePerfumeInDB,
  getArticlesFromDB, 
  getPerfumesFromDB, 
  type Article,
} from "@/lib/firebase"
import { type Perfume } from "@/lib/data"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Image as ImageIcon, Link as LinkIcon, Type, Hash, Loader2, LogOut, FileText, FlaskConical, Star, Edit3, Plus, Trash2, Eye, EyeOff, ExternalLink, Calendar } from "lucide-react"

export default function EditorPage() {
  const [authLoading, setAuthLoading] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const [success, setSuccess] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"article" | "perfume">("article")
  const [showPreview, setShowPreview] = React.useState(false)
  
  const [articles, setArticles] = React.useState<Article[]>([])
  const [perfumes, setPerfumes] = React.useState<Perfume[]>([])
  const [selectedId, setSelectedId] = React.useState<string | null>(null)

  const loadData = React.useCallback(async () => {
    const [arts, perfs] = await Promise.all([getArticlesFromDB(), getPerfumesFromDB()])
    setArticles(arts)
    setPerfumes(perfs)
  }, [])

  React.useEffect(() => {
    const session = localStorage.getItem("ss_admin")
    if (!session) {
      router.push("/login")
    } else {
      setAuthLoading(false)
      loadData()
    }
  }, [router, loadData])

  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
    affiliateLink: "",
    category: "Review",
    author: "Scent & Soul Editor"
  })

  const [perfumeData, setPerfumeData] = React.useState({
    brand: "",
    name: "",
    occasionTag: "daylight",
    notes: "",
    imageUrl: "",
    avgRating: 9.0
  })

  const resetForms = () => {
    setSelectedId(null)
    setFormData({
      title: "",
      slug: "",
      content: "",
      imageUrl: "",
      affiliateLink: "",
      category: "Review",
      author: "Scent & Soul Editor"
    })
    setPerfumeData({
      brand: "",
      name: "",
      occasionTag: "daylight",
      notes: "",
      imageUrl: "",
      avgRating: 9.0
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === "title" && !selectedId) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handlePerfumeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPerfumeData(prev => ({ ...prev, [name]: name === "avgRating" ? parseFloat(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    
    let result
    if (selectedId) {
      result = await updateArticleInDB(selectedId, formData)
    } else {
      result = await saveArticleToDB(formData)
    }
    
    if (result.success) {
      setSuccess(true)
      resetForms()
      await loadData()
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  const handlePerfumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    
    const formattedData = {
      ...perfumeData,
      occasionTag: perfumeData.occasionTag as "daylight" | "nightfall" | "statement",
      notes: typeof perfumeData.notes === 'string' ? perfumeData.notes.split(",").map(n => n.trim()) : perfumeData.notes
    }
    
    let result
    if (selectedId) {
      result = await updatePerfumeInDB(selectedId, formattedData)
    } else {
      result = await savePerfumeToDB(formattedData)
    }
    
    if (result.success) {
      setSuccess(true)
      resetForms()
      await loadData()
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  const startEditArticle = (art: Article) => {
    setSelectedId(art.id || null)
    setFormData({
      title: art.title,
      slug: art.slug,
      content: art.content,
      imageUrl: art.imageUrl,
      affiliateLink: art.affiliateLink,
      category: art.category,
      author: art.author
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startEditPerfume = (perf: Perfume) => {
    setSelectedId(perf.id || null)
    setPerfumeData({
      brand: perf.brand,
      name: perf.name,
      occasionTag: perf.occasionTag,
      notes: Array.isArray(perf.notes) ? perf.notes.join(", ") : perf.notes,
      imageUrl: perf.imageUrl,
      avgRating: perf.avgRating
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-stone-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("ss_admin")
    router.push("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex justify-between items-end"
          >
            <div>
              <h1 className="font-serif text-4xl text-stone-900 mb-2">Editor Panel</h1>
              <p className="text-stone-500 font-light text-sm">Manage your journal articles and fragrance directory.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout} 
              className="rounded-full text-stone-400 hover:text-stone-900 border-stone-200"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </motion.div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <button 
                onClick={() => { setActiveTab("article"); resetForms(); }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "article" ? "bg-stone-900 text-white shadow-lg" : "bg-stone-200 text-stone-500 hover:bg-stone-300"}`}
              >
                <FileText className="w-4 h-4" /> Articles
              </button>
              <button 
                onClick={() => { setActiveTab("perfume"); resetForms(); }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === "perfume" ? "bg-stone-900 text-white shadow-lg" : "bg-stone-200 text-stone-500 hover:bg-stone-300"}`}
              >
                <FlaskConical className="w-4 h-4" /> Directory
              </button>
            </div>
            
            {selectedId && (
              <Button variant="outline" onClick={resetForms} className="rounded-full gap-2 text-xs">
                <Plus className="w-3 h-3" /> New {activeTab === "article" ? "Article" : "Perfume"}
              </Button>
            )}

            <Button 
              variant="outline" 
              onClick={() => setShowPreview(!showPreview)} 
              className="rounded-full gap-2 text-xs"
            >
              {showPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "article" ? (
              <div key="article-section" className="space-y-12">
                <motion.form 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100"
                >
                  <h2 className="font-serif text-2xl text-stone-900 mb-6">{selectedId ? "Edit Article" : "New Article"}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <Type className="w-3 h-3" /> Title
                      </label>
                      <Input name="title" value={formData.title} onChange={handleChange} placeholder="Article Title" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <Hash className="w-3 h-3" /> Slug
                      </label>
                      <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="article-slug" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-stone-200 bg-stone-50 text-sm">
                        <option value="Review">Review</option>
                        <option value="Guide">Guide</option>
                        <option value="News">News</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <ImageIcon className="w-3 h-3" /> Image URL
                      </label>
                      <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                      <LinkIcon className="w-3 h-3" /> Affiliate Link
                    </label>
                    <Input name="affiliateLink" value={formData.affiliateLink} onChange={handleChange} placeholder="Affiliate URL" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Content</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} rows={10} className="w-full p-4 rounded-md border border-stone-200 bg-stone-50 text-sm font-light" required />
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    {success && <p className="text-emerald-600 text-sm font-medium">{selectedId ? "Changes saved!" : "Article published!"}</p>}
                    <div />
                    <Button type="submit" disabled={loading} className="rounded-full px-8 gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {selectedId ? "Save Changes" : "Publish Article"}
                    </Button>
                  </div>
                </motion.form>

                {showPreview && (formData.title || formData.content) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
                  >
                    <div className="p-4 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold">
                      <Eye className="w-3 h-3 inline mr-2" /> Article Preview
                    </div>
                    {formData.imageUrl && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img src={formData.imageUrl} alt={formData.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest font-medium">
                        <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-900 font-bold">{formData.category}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Today</span>
                      </div>
                      <h2 className="font-serif text-3xl text-stone-900 leading-tight">{formData.title || "Untitled Article"}</h2>
                      <p className="text-stone-500 font-light leading-relaxed whitespace-pre-wrap">{formData.content || "Your content will appear here..."}</p>
                      {formData.affiliateLink && (
                        <a href={formData.affiliateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-emerald-100 transition-colors">
                          Shop the Scent <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-stone-900 px-2">Published Articles</h3>
                  <div className="grid gap-3">
                    {articles.map(art => (
                      <div key={art.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:border-stone-300 transition-all">
                        <div>
                          <h4 className="font-medium text-stone-900">{art.title}</h4>
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest">{art.category} • {art.slug}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => startEditArticle(art)} className="rounded-full h-8 text-xs">
                          <Edit3 className="w-3 h-3 mr-1" /> Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div key="perfume-section" className="space-y-12">
                <motion.form 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handlePerfumeSubmit} 
                  className="space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100"
                >
                  <h2 className="font-serif text-2xl text-stone-900 mb-6">{selectedId ? "Edit Perfume" : "New Perfume"}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Brand</label>
                      <Input name="brand" value={perfumeData.brand} onChange={handlePerfumeChange} placeholder="HMNS" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Perfume Name</label>
                      <Input name="name" value={perfumeData.name} onChange={handlePerfumeChange} placeholder="Orgasm" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Occasion Tag</label>
                      <select name="occasionTag" value={perfumeData.occasionTag} onChange={handlePerfumeChange} className="w-full h-10 px-3 rounded-md border border-stone-200 bg-stone-50 text-sm">
                        <option value="daylight">Daylight</option>
                        <option value="nightfall">Nightfall</option>
                        <option value="statement">Statement</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                        <Star className="w-3 h-3" /> Rating (0-10)
                      </label>
                      <Input name="avgRating" type="number" step="0.1" value={perfumeData.avgRating} onChange={handlePerfumeChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                      <ImageIcon className="w-3 h-3" /> Image URL
                    </label>
                    <Input name="imageUrl" value={perfumeData.imageUrl} onChange={handlePerfumeChange} placeholder="Image URL" required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Notes (comma separated)</label>
                    <Input name="notes" value={perfumeData.notes} onChange={handlePerfumeChange} placeholder="Vanilla, Rose, Musk" required />
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    {success && <p className="text-emerald-600 text-sm font-medium">{selectedId ? "Changes saved!" : "Perfume added!"}</p>}
                    <div />
                    <Button type="submit" disabled={loading} className="rounded-full px-8 gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FlaskConical className="w-4 h-4" />}
                      {selectedId ? "Save Changes" : "Add to Directory"}
                    </Button>
                  </div>
                </motion.form>

                {showPreview && (perfumeData.name || perfumeData.brand) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
                  >
                    <div className="p-4 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold">
                      <Eye className="w-3 h-3 inline mr-2" /> Directory Preview
                    </div>
                    <div className="p-8">
                      <div className="max-w-[240px]">
                        <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden mb-4 relative shadow-sm">
                          {perfumeData.imageUrl ? (
                            <img src={perfumeData.imageUrl} alt={perfumeData.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300">
                              <ImageIcon className="w-12 h-12" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-stone-900 shadow-sm">
                            {perfumeData.avgRating}/10
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <span className="text-[8px] uppercase tracking-widest bg-stone-900 text-white px-2 py-0.5 rounded-full">
                              {perfumeData.occasionTag}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold leading-none">{perfumeData.brand || "Brand"}</h4>
                          <h3 className="font-serif text-xl text-stone-900">{perfumeData.name || "Perfume Name"}</h3>
                          <p className="text-[11px] text-stone-500 font-light mt-1">
                            {perfumeData.notes ? (typeof perfumeData.notes === 'string' ? perfumeData.notes : perfumeData.notes) : "Notes will appear here"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-stone-900 px-2">Directory Items</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {perfumes.map(perf => (
                      <div key={perf.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:border-stone-300 transition-all">
                        <div>
                          <h4 className="font-medium text-stone-900">{perf.name}</h4>
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest">{perf.brand} • {perf.occasionTag}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => startEditPerfume(perf)} className="rounded-full h-8 text-xs">
                          <Edit3 className="w-3 h-3 mr-1" /> Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
