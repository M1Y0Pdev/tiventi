'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=1920&h=1080&fit=crop',
    title: 'Zarafeti',
    titleHighlight: 'Tiventi ile Keşfedin',
    description: 'Premium iç çamaşırı koleksiyonumuzla lüks ve konforu deneyimleyin. Hem stili hem de özgüveni önemseyen modern kadınlar için tasarlandı.',
    primaryBtn: 'Alışverişe Başla',
    primaryLink: '/products',
    secondaryBtn: 'Yeni Koleksiyon',
    secondaryLink: '/products?filter=new'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1920&h=1080&fit=crop',
    title: 'Yeni Sezon',
    titleHighlight: 'Koleksiyonu',
    description: 'En yeni trendleri ve şık tasarımları keşfedin. Konfor ve zarafeti bir arada sunan özel koleksiyonumuz sizleri bekliyor.',
    primaryBtn: 'Koleksiyonu İncele',
    primaryLink: '/products?filter=new',
    secondaryBtn: 'Tüm Ürünler',
    secondaryLink: '/products'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=1920&h=1080&fit=crop',
    title: 'Özel Fırsatlar',
    titleHighlight: '%50\'ye Varan İndirim',
    description: 'Seçili ürünlerde muhteşem indirimler! Kaliteli ve şık ürünleri kaçırılmayacak fiyatlarla keşfedin.',
    primaryBtn: 'Fırsatları Gör',
    primaryLink: '/products?filter=firsat',
    secondaryBtn: 'Kampanyalar',
    secondaryLink: '/products?filter=sale'
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // 5 saniyede bir değişir
    
    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={`Hero Slide ${currentSlide + 1}`}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            quality={90}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  <span className="text-tiventi-orange">{slides[currentSlide].title}</span>{' '}
                  {slides[currentSlide].titleHighlight}
                </h1>
                
                <p className="text-xl text-gray-200 mb-8">
                  {slides[currentSlide].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={slides[currentSlide].primaryLink}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary flex items-center gap-2 text-lg"
                    >
                      {slides[currentSlide].primaryBtn}
                      <ArrowRight size={20} />
                    </motion.button>
                  </Link>
                  
                  <Link href={slides[currentSlide].secondaryLink}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium transition-all duration-300 hover:bg-white hover:text-black text-lg"
                    >
                      {slides[currentSlide].secondaryBtn}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-tiventi-orange">500+</p>
                <p className="text-gray-300">Ürün</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-tiventi-orange">50K+</p>
                <p className="text-gray-300">Mutlu Müşteri</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-tiventi-orange">4.9★</p>
                <p className="text-gray-300">Puan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-tiventi-orange'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          y: { duration: 2, repeat: Infinity }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
