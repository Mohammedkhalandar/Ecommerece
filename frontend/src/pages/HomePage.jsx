// Stub – HomePage (full implementation would include hero banner, featured products, best sellers)
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { productAPI } from '@services/api'
import ProductCard from '@components/product/ProductCard'
import ProductCardSkeleton from '@components/product/ProductCardSkeleton'
import { ArrowRight, Zap, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const { data: featured, isLoading: loadingFeatured } = useQuery({
    queryKey: ['featured'],
    queryFn: productAPI.getFeatured,
  })
  const { data: bestSellers, isLoading: loadingBS } = useQuery({
    queryKey: ['best-sellers'],
    queryFn: productAPI.getBestSellers,
  })

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-16">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm mb-4">
            <Zap size={14} className="fill-white" /> New arrivals every week
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display mb-4">Shop the Future</h1>
          <p className="text-white/80 mb-8 text-lg max-w-lg mx-auto">Discover thousands of curated products at the best prices.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-3.5 rounded-2xl hover:bg-dark-50 transition-colors text-lg">
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <section className="section">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title mb-1 flex items-center gap-2">
                <Zap size={28} className="text-primary-500" /> Featured Products
              </h2>
              <p className="section-subtitle mb-0">Handpicked products just for you</p>
            </div>
            <Link to="/products?featured=true" className="btn-outline btn-sm">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loadingFeatured ? Array(5).fill(0).map((_, i) => <ProductCardSkeleton key={i} />) :
              (featured || []).slice(0, 10).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title mb-1 flex items-center gap-2">
                <TrendingUp size={28} className="text-primary-500" /> Best Sellers
              </h2>
              <p className="section-subtitle mb-0">Most popular picks</p>
            </div>
            <Link to="/products?sort=totalSold,desc" className="btn-outline btn-sm">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {loadingBS ? Array(5).fill(0).map((_, i) => <ProductCardSkeleton key={i} />) :
              (bestSellers || []).slice(0, 10).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
