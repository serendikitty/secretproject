import { Card } from "@/components/ui/Card"

const occasions = [
  {
    title: "The Daylight",
    description: "Crisp, citrus, and airy notes perfect for office hours or a sunny brunch.",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800",
    color: "bg-stone-100"
  },
  {
    title: "The Nightfall",
    description: "Intense, woody, and amber profiles for evening elegance and intimacy.",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
    color: "bg-stone-900"
  },
  {
    title: "The Statement",
    description: "Complex, niche, and unforgettable blends designed to turn heads.",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=800",
    color: "bg-stone-200"
  }
]

export function OccasionSection() {
  return (
    <section id="occasions" className="py-32 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">Curated for the Moment</h2>
          <p className="text-stone-500 font-light">Find the perfect harmony for your time of day.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {occasions.map((occasion, index) => (
          <Card key={index} className="group cursor-pointer p-1 flex flex-col border-none shadow-none hover:shadow-xl transition-all duration-500">
            <div className={`h-64 ${occasion.color} rounded-lg overflow-hidden relative`}>
              <img 
                src={occasion.image} 
                alt={occasion.title} 
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${occasion.title === 'The Nightfall' ? 'opacity-80' : ''}`}
              />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl mb-2">{occasion.title}</h3>
              <p className="text-stone-500 text-sm font-light">{occasion.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
