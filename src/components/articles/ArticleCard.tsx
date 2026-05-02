import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, User } from "lucide-react"
import { type Article } from "@/lib/firebase"

export function ArticleCard({ article }: { article: Article }) {
  // Format date if it exists
  const dateStr = article.createdAt?.seconds 
    ? new Date(article.createdAt.seconds * 1000).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
    : "Recently published"

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-stone-900 shadow-sm">
          {article.category}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-[10px] text-stone-400 uppercase tracking-widest font-medium">
          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {dateStr}</span>
          <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {article.author}</span>
        </div>
        
        <h3 className="font-serif text-2xl text-stone-900 group-hover:text-stone-600 transition-colors leading-tight">
          {article.title}
        </h3>
        
        <p className="text-stone-500 font-light text-sm line-clamp-2 leading-relaxed">
          {article.content}
        </p>
        
        <div className="pt-4 flex items-center justify-between">
          <Link 
            href={`/articles/${article.slug}`}
            className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors"
          >
            Read More
          </Link>
          
          {article.affiliateLink && (
            <a 
              href={article.affiliateLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-3 py-1 rounded-full"
            >
              Shop the Scent <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
