import Link from "next/link"
import { perfumes } from "@/lib/data"

export function DirectoryGrid() {
  return (
    <section id="directory" className="py-32 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">The Directory</h2>
          <p className="text-stone-500 font-light">Trending Indonesian masterpieces this week.</p>
        </div>
        <Link 
          href="/directory" 
          className="text-sm font-medium text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors"
        >
          View All Fragrances
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {perfumes.map((perfume) => (
          <div key={perfume.id} className="group cursor-pointer">
            <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden mb-4 relative">
              <img 
                src={perfume.imageUrl} 
                alt={perfume.name} 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-stone-900 shadow-sm">
                {perfume.avgRating}/10
              </div>
            </div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 mb-1">{perfume.brand}</h4>
            <h3 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors">{perfume.name}</h3>
            <p className="text-sm text-stone-400 font-light mt-1">{perfume.notes.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
