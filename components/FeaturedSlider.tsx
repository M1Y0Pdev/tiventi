'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '@/lib/data'

const FeaturedSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const featuredProducts = products.filter(p => p.isNew || p.isBestSeller)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1)
      else if (window.innerWidth < 768) setItemsPerView(2)
      else if (window.innerWidth < 1024) setItemsPerView(3)
      else setItemsPerView(4)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Öne Çıkan Ürünler
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Özenle seçilmiş premium iç çamaşırı koleksiyonumuzu keşfedin
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-tiventi-orange hover:text-white'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 transition-all ${
              currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-tiventi-orange hover:text-white'
            }`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Products Slider */}
          <div className="overflow-hidden px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                }}
              >
                {featuredProducts
                  .slice(currentIndex, currentIndex + itemsPerView)
                  .map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-8 bg-tiventi-orange'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSlider
