'use client'

import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'
import Link from 'next/link'

export default function FavoritesPage() {
  // Demo için ilk 3 ürünü favorilere ekleyelim
  const favoriteProducts = products.slice(0, 3)

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-tiventi-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-tiventi-orange fill-tiventi-orange" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Favorilerim</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Beğendiğiniz ürünleri burada bulabilirsiniz
            </p>
          </motion.div>
        </div>
      </section>

      {/* Favorites Content */}
      <section className="py-12">
        <div className="container-custom">
          {favoriteProducts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
              >
                <h2 className="text-2xl font-bold">
                  {favoriteProducts.length} Favori Ürün
                </h2>
                <button className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2">
                  <Trash2 size={18} />
                  Tümünü Temizle
                </button>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Favori Ürününüz Yok</h2>
              <p className="text-gray-600 mb-8">
                Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz
              </p>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Alışverişe Başla
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Favoriler Hakkında</h3>
            <p className="text-gray-600">
              Favorileriniz cihazınızda saklanır ve dilediğiniz zaman erişebilirsiniz. 
              Ürünleri sepete eklemeden önce karşılaştırmak için favorileri kullanabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
