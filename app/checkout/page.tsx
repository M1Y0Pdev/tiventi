'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import CheckoutForm from '@/components/CheckoutForm'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { Lock, Shield } from 'lucide-react'
import Image from 'next/image'

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock cart items for demo
  const cartItems = [
    {
      product: products[0],
      quantity: 2,
      selectedSize: '34B',
      selectedColor: 'Black'
    },
    {
      product: products[2],
      quantity: 1,
      selectedSize: 'M',
      selectedColor: 'Red'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckoutSubmit = async (formData: any) => {
    setIsProcessing(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to success page
    router.push('/checkout/success')
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Lock size={16} />
            <span>Secure checkout powered by SSL encryption</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleCheckoutSubmit} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.product.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.selectedColor} / {item.selectedSize} / Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-tiventi-orange">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center gap-4">
                  <Shield className="text-green-600" size={20} />
                  <span className="text-xs text-gray-600">100% Secure Payment</span>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                    AMEX
                  </div>
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                    PP
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 text-center"
          >
            <div className="w-16 h-16 border-4 border-tiventi-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold">Processing your order...</p>
            <p className="text-gray-600 mt-2">Please wait while we confirm your payment</p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
