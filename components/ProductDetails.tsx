'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartProvider'
import { Star, Minus, Plus, ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes ? product.sizes[0] : null)
  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors ? product.colors[0] : null)

  const handleQuantity = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount))
  }
  
  const handleAddToCart = async () => {
    if (!selectedSize) {
      // TODO: Add a more user-friendly visual cue, like shaking the size options
      console.error("Lütfen bir beden seçin.");
      return;
    }
    if (!selectedColor) {
      // TODO: Add a more user-friendly visual cue, like shaking the color options
      console.error("Lütfen bir renk seçin.");
      return;
    }
    // The new addToCart is async and will trigger the modal from the CartProvider
    await addToCart(product, quantity, selectedSize, selectedColor);
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="w-full">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image 
              src={product.image || 'https://placehold.co/600x600'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
        {/* Thumbnails could go here */}
      </div>

      {/* Product Info */}
      <div>
        <span className="text-sm text-gray-500 uppercase">{product.category_name}</span>
        <h1 className="text-3xl md:text-4xl font-bold my-2">{product.name}</h1>
        
        <div className="flex items-center gap-4 my-4">
            <div className="flex items-center">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <Star size={18} className="text-gray-300" />
                <span className="text-sm text-gray-500 ml-2">(123 reviews)</span>
            </div>
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.original_price && (
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.original_price)}</span>
            )}
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedSize === size 
                      ? 'bg-tiventi-orange text-white border-tiventi-orange'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === color ? 'border-tiventi-orange scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex items-center border border-gray-300 rounded-lg px-2">
                <button onClick={() => handleQuantity(-1)} className="p-2 text-gray-500 hover:text-gray-800"><Minus size={16}/></button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button onClick={() => handleQuantity(1)} className="p-2 text-gray-500 hover:text-gray-800"><Plus size={16}/></button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-tiventi-orange text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag size={20} />
              Sepete Ekle
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                <Heart size={20} />
            </button>
        </div>
      </div>
    </div>
  )
}
