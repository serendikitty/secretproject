import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { getArticlesFromDB } from "@/lib/firebase"
import { ArticleCard } from "@/components/articles/ArticleCard"

export default async function ArticlesPage() {
  const articles = await getArticlesFromDB()

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="font-serif text-5xl text-stone-900 italic">Journal</h1>
            <p className="text-stone-500 font-light text-lg">
              Exploring the depth of Indonesian olfactive culture, one story at a time.
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-400 font-serif italic text-xl">No stories published yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
