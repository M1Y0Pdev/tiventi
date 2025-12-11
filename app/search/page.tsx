'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Clock } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'
import Link from 'next/link'

function SearchContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [searchResults, setSearchResults] = useState(products)
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Sütyen',
    'Külot',
    'Takım',
    'Gecelik'
  ])

  const popularSearches = [
    'Dantel Sütyen',
    'Pamuklu Külot',
    'Romantik Takım',
    'Saten Gecelik',
    'Push-up Sütyen',
    'Yüksek Bel Külot'
  ]

  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      if (query.trim() === '') {
        setSearchResults(products)
      } else {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category_name?.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
        )
        setSearchResults(filtered)
        
        // Add to recent searches
        if (query.trim() && !recentSearches.includes(query)) {
          setRecentSearches([query, ...recentSearches.slice(0, 4)])
        }
      }
      setIsSearching(false)
    }, 300)
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults(products)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Ürün Ara</h1>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full pl-14 pr-14 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-tiventi-orange/50 shadow-xl"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
              
              {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl p-4 text-gray-600 text-center">
                  Aranıyor...
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Suggestions & Results */}
      <section className="py-12">
        <div className="container-custom">
          {searchQuery.trim() === '' ? (
            /* Show suggestions when no search */
            <div className="max-w-4xl mx-auto">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Clock className="text-tiventi-orange" size={24} />
                      Son Aramalar
                    </h2>
                    <button
                      onClick={clearRecentSearches}
                      className="text-gray-500 hover:text-red-500 text-sm transition-colors"
                    >
                      Temizle
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleQuickSearch(search)}
                        className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-tiventi-orange hover:text-tiventi-orange transition-all shadow-sm"
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-tiventi-orange" size={24} />
                  Popüler Aramalar
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {popularSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      onClick={() => handleQuickSearch(search)}
                      className="px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-tiventi-orange hover:shadow-md transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="group-hover:text-tiventi-orange transition-colors">
                          {search}
                        </span>
                        <Search className="text-gray-400 group-hover:text-tiventi-orange transition-colors" size={16} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Featured Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <h2 className="text-xl font-bold mb-6">Kategorilere Göz At</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Sütyenler', icon: '👙', link: '/products?category=bra' },
                    { name: 'Külotlar', icon: '🩲', link: '/products?category=panty' },
                    { name: 'Takımlar', icon: '💝', link: '/products?category=sets' },
                    { name: 'Gecelikler', icon: '🌙', link: '/products?category=nightwear' }
                  ].map((category, index) => (
                    <Link key={index} href={category.link}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-tiventi-orange"
                      >
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h3 className="font-semibold">{category.name}</h3>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Show search results */
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-2">
                  Arama Sonuçları
                </h2>
                <p className="text-gray-600">
                  "<span className="font-semibold text-tiventi-orange">{searchQuery}</span>" için {searchResults.length} ürün bulundu
                </p>
              </motion.div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {searchResults.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard product={product} index={index} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <Search className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Sonuç Bulunamadı</h3>
                  <p className="text-gray-600 mb-8">
                    "<span className="font-semibold">{searchQuery}</span>" için ürün bulunamadı. <br />
                    Farklı anahtar kelimeler deneyebilirsiniz.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="text-gray-500">Öneriler:</span>
                    {popularSearches.slice(0, 3).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSearch(search)}
                        className="px-3 py-1 bg-tiventi-orange/10 text-tiventi-orange rounded-full text-sm hover:bg-tiventi-orange hover:text-white transition-all"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <SearchContent />
    </Suspense>
  )
}
