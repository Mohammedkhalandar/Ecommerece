import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart, Heart, Share2, Star, Truck, Shield, RefreshCw,
  ChevronLeft, ChevronRight, Minus, Plus, Check, AlertTriangle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { productAPI } from '@services/api'
import { useCart } from '@context/CartContext'
import { useAuth } from '@context/AuthContext'
import ReviewSection from '@components/review/ReviewSection'
import ProductCard from '@components/product/ProductCard'
import Breadcrumb from '@components/ui/Breadcrumb'
import RatingStars from '@components/ui/RatingStars'
import ProductDetailSkeleton from '@components/product/ProductDetailSkeleton'

export default function ProductDetailPage() {
  const { slug }        = useParams()
  const navigate        = useNavigate()
  const { addToCart }   = useCart()
  const { user }        = useAuth()
  const [qty, setQty]   = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const [adding, setAdding] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn:  () => productAPI.getBySlug(slug),
  })

  if (isLoading) return <ProductDetailSkeleton />
  if (error || !product) return (
    <div className="container-custom py-20 text-center">
      <div className="text-6xl mb-4">😢</div>
      <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
      <button onClick={() => navigate(-1)} className="btn-primary mt-4">Go Back</button>
    </div>
  )

  const prod = product.data || product
  const images = prod.images?.length > 0 ? prod.images : ['/placeholder.jpg']
  const discountPct = prod.discountPercent > 0 ? Math.round(prod.discountPercent) : null
  const inStock = prod.stockQuantity > 0

  const handleAddToCart = async () => {
    if (!inStock) return
    setAdding(true)
    await addToCart(prod.id, qty)
    setAdding(false)
  }

  const handleBuyNow = async () => {
    const ok = await addToCart(prod.id, qty)
    if (ok) navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <div className="container-custom py-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: 'Home', href: '/home' },
          { label: prod.categoryName, href: `/category/${prod.categorySlug}` },
          { label: prod.name },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          {/* ── Image Gallery ─────────────────────────── */}
          <div>
            <div className="relative overflow-hidden rounded-2xl bg-dark-50 dark:bg-dark-800 aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={images[imgIdx]}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {discountPct && (
                <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                  -{discountPct}% OFF
                </span>
              )}

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-dark-800/80 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-dark-800/80 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all
                                ${i === imgIdx ? 'border-primary-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ──────────────────────────── */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                {prod.brand && (
                  <span className="text-primary-500 font-semibold text-sm uppercase tracking-wide">{prod.brand}</span>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-dark-900 dark:text-white mt-1 leading-tight">
                  {prod.name}
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className={`btn-icon border border-dark-200 dark:border-dark-700 transition-colors
                              ${wishlisted ? 'text-red-500 border-red-200 bg-red-50' : 'hover:text-red-500'}`}
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="btn-icon border border-dark-200 dark:border-dark-700 hover:text-primary-500">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={prod.avgRating} size={16} />
              <span className="text-sm font-semibold text-dark-800 dark:text-dark-200">{prod.avgRating?.toFixed(1)}</span>
              <span className="text-sm text-dark-400">({prod.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-dark-900 dark:text-white">
                ₹{prod.price?.toLocaleString('en-IN')}
              </span>
              {prod.originalPrice > prod.price && (
                <>
                  <span className="text-lg text-dark-400 line-through">
                    ₹{prod.originalPrice?.toLocaleString('en-IN')}
                  </span>
                  <span className="badge badge-success text-sm">
                    Save ₹{(prod.originalPrice - prod.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {inStock ? (
                <>
                  <Check size={16} className="text-success" />
                  <span className="text-success font-semibold text-sm">
                    {prod.stockQuantity <= 10 ? `Only ${prod.stockQuantity} left!` : 'In Stock'}
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle size={16} className="text-error" />
                  <span className="text-error font-semibold text-sm">Out of Stock</span>
                </>
              )}
            </div>

            {/* Short description */}
            {prod.shortDescription && (
              <p className="text-dark-600 dark:text-dark-300 mb-6 leading-relaxed">{prod.shortDescription}</p>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-dark-600 dark:text-dark-300">Quantity:</span>
              <div className="flex items-center border border-dark-200 dark:border-dark-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(prod.stockQuantity, q + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!inStock || adding}
                className="flex-1 btn-outline btn-lg text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="flex-1 btn-primary btn-lg text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-dark-50 dark:bg-dark-800/50 rounded-2xl">
              {[
                { icon: Truck,  text: 'Free Delivery above ₹999' },
                { icon: Shield, text: 'Secure Payment' },
                { icon: RefreshCw, text: '7-Day Easy Returns' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <badge.icon size={20} className="text-primary-500" />
                  <span className="text-xs text-dark-500 dark:text-dark-400">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description ────────────────────────────── */}
        {prod.description && (
          <div className="mt-12 card p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Product Description</h2>
            <div className="prose dark:prose-invert max-w-none text-dark-600 dark:text-dark-300 leading-relaxed">
              {prod.description}
            </div>
          </div>
        )}

        {/* ── Reviews ────────────────────────────────── */}
        <ReviewSection productId={prod.id} />
      </div>
    </div>
  )
}
