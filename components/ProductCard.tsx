'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-tiventi-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
            YENİ
          </span>
        )}
        {product.discount && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{product.discount}%
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
            ÇOK SATAN
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-tiventi-orange hover:text-white transition-colors"
        >
          <Heart size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-tiventi-orange hover:text-white transition-colors"
        >
          <Eye size={18} />
        </motion.button>
      </div>

      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-80 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Quick Add Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-tiventi-orange text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-lg"
            >
              <ShoppingBag size={20} /> Hızlı Ekle
            </motion.button>
          </motion.div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-tiventi-orange transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
        
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex gap-1 mt-3">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border border-gray-300"
              style={{
                backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                color.toLowerCase() === 'black' ? '#000000' :
                                color.toLowerCase() === 'red' ? '#ef4444' :
                                color.toLowerCase() === 'nude' ? '#f5deb3' :
                                color.toLowerCase() === 'pink' ? '#ec4899' :
                                color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                color.toLowerCase() === 'gray' ? '#6b7280' :
                                color.toLowerCase() === 'purple' ? '#9333ea' :
                                color.toLowerCase() === 'champagne' ? '#f7e7ce' :
                                '#e5e5e5'
              }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
