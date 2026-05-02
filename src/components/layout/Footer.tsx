import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="font-serif text-2xl tracking-tight text-stone-900 font-semibold">Scent & Soul.</Link>
          <p className="mt-4 text-sm text-stone-500 max-w-sm font-light">
            The premier encyclopedia and community for Indonesian local fragrances. Elevating local scents to global aesthetic standards.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-stone-900 mb-4">Platform</h4>
          <ul className="space-y-3 text-sm text-stone-500 font-light">
            <li><Link href="/#directory" className="hover:text-stone-900">Directory</Link></li>
            <li><button className="hover:text-stone-900 text-left">Discover Quiz</button></li>
            <li><Link href="/#reviews" className="hover:text-stone-900">Community Reviews</Link></li>
            <li><Link href="/wardrobe" className="hover:text-stone-900">User Wardrobe</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-stone-900 mb-4">Connect</h4>
          <ul className="space-y-3 text-sm text-stone-500 font-light">
            <li><a href="#" className="hover:text-stone-900">Instagram</a></li>
            <li><a href="#" className="hover:text-stone-900">Twitter</a></li>
            <li><a href="#" className="hover:text-stone-900">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
        <p>&copy; {new Date().getFullYear()} Scent & Soul. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="/privacy" className="hover:text-stone-600">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-stone-600">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
