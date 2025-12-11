'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartProvider'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import ConfirmationModal from '@/components/ConfirmationModal'
import { CartItem } from '@/types'

export default function CartPage() {
  const { cartItems, cartCount, totalPrice, updateQuantity, removeFromCart, isLoading } = useCart()

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const handleRemoveClick = (item: CartItem) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.product.id, itemToDelete.selectedSize, itemToDelete.selectedColor);
    }
    setIsConfirmOpen(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold mb-8">Sepetim ({cartCount} ürün)</h1>

          {isLoading ? (
             <div className="text-center p-12">Yükleniyor...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center bg-white p-12 rounded-lg shadow">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Sepetiniz şu anda boş</h2>
              <p className="text-gray-500 mb-6">Görünüşe göre sepetinize henüz bir şey eklemediniz.</p>
              <Link href="/products" className="bg-tiventi-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
                {cartItems.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-b-0">
                    <Link href={`/products/${item.product.id}`}>
                      <div className="relative w-full sm:w-32 h-40 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                        <Image 
                          src={item.product.image || 'https://placehold.co/300x300'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/products/${item.product.id}`} className="hover:text-tiventi-orange">
                          <h3 className="font-semibold text-lg">{item.product.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-500">Beden: {item.selectedSize} / Renk: <span className="capitalize">{item.selectedColor}</span></p>
                      </div>
                      <div className="flex items-center justify-between mt-4 sm:mt-0">
                        <div className="flex items-center border border-gray-200 rounded-md px-2">
                          <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)} className="p-1 text-gray-500 hover:text-gray-800"><Minus size={14}/></button>
                          <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)} className="p-1 text-gray-500 hover:text-gray-800"><Plus size={14}/></button>
                        </div>
                        <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button onClick={() => handleRemoveClick(item)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-4">Sipariş Özeti</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Ara Toplam</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kargo</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4 mt-2">
                      <span>Toplam</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <button className="w-full mt-6 bg-tiventi-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
                      Ödemeye Geç
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Ürünü Sil"
        message="Bu ürünü sepetinizden kaldırmak istediğinize emin misiniz?"
      />
    </>
  )
}
