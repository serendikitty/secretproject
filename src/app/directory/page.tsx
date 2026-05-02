import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getPerfumesFromDB } from "@/lib/firebase"

export default async function DirectoryPage() {
  const perfumes = await getPerfumesFromDB()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="font-serif text-5xl text-stone-900 italic">The Directory</h1>
            <p className="text-stone-500 font-light text-lg leading-relaxed">
              Explore our curated library of Indonesian olfactive masterpieces. From daylight fresh to nightfall deep.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12">
            {perfumes.map((perfume) => (
              <div key={perfume.id} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden mb-4 relative shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <img 
                    src={perfume.imageUrl} 
                    alt={perfume.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-stone-900 shadow-sm uppercase tracking-tighter">
                    {perfume.avgRating}/10
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[8px] uppercase tracking-widest bg-stone-900 text-white px-2 py-0.5 rounded-full">
                      {perfume.occasionTag}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold leading-none">{perfume.brand}</h4>
                  <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors">{perfume.name}</h3>
                  <p className="text-[11px] text-stone-500 font-light mt-1 line-clamp-1">{perfume.notes.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>

          {perfumes.length === 0 && (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-400 font-serif italic text-xl">The directory is currently being curated.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
