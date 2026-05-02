export interface Perfume {
  id: string
  brand: string
  name: string
  occasionTag: "daylight" | "nightfall" | "statement"
  notes: string[]
  imageUrl: string
  avgRating: number
  createdAt: string
}

export const perfumes: Perfume[] = [
  {
    id: "1",
    brand: "HMNS",
    name: "Orgasm",
    occasionTag: "daylight",
    notes: ["Vanilla", "Floral", "Sweet"],
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    avgRating: 9.2,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    brand: "Saff & Co.",
    name: "Loui",
    occasionTag: "daylight",
    notes: ["Rose", "Musky", "Powdery"],
    imageUrl: "https://images.unsplash.com/photo-1592947945242-69312358628b?auto=format&fit=crop&q=80&w=600",
    avgRating: 8.8,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    brand: "Alchemist",
    name: "Powder Room",
    occasionTag: "daylight",
    notes: ["Clean", "Aldehydic", "Musky"],
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    avgRating: 9.0,
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    brand: "Carl & Claire",
    name: "Black Orchid",
    occasionTag: "statement",
    notes: ["Spicy", "Woody", "Dark"],
    imageUrl: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=600",
    avgRating: 9.5,
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    brand: "Alien Objects",
    name: "The Mirror",
    occasionTag: "nightfall",
    notes: ["Incense", "Ozone", "Metallic"],
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    avgRating: 9.3,
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    brand: "Project 1945",
    name: "The Great Nusantara",
    occasionTag: "statement",
    notes: ["Spices", "Amber", "Patchouli"],
    imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
    avgRating: 9.4,
    createdAt: new Date().toISOString()
  }
]
