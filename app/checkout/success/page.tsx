'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  const orderNumber = 'TIV' + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              Order Confirmed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              Thank you for your purchase! Your order has been successfully placed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-lg p-6 mb-8"
            >
              <p className="text-sm text-gray-500 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-tiventi-orange">{orderNumber}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="flex flex-col items-center p-4">
                <Mail className="w-8 h-8 text-tiventi-orange mb-2" />
                <p className="text-sm font-semibold">Confirmation Email</p>
                <p className="text-xs text-gray-500 mt-1">Check your inbox</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Package className="w-8 h-8 text-tiventi-orange mb-2" />
                <p className="text-sm font-semibold">Preparing Order</p>
                <p className="text-xs text-gray-500 mt-1">Ships in 1-2 days</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <CheckCircle className="w-8 h-8 text-tiventi-orange mb-2" />
                <p className="text-sm font-semibold">Estimated Delivery</p>
                <p className="text-xs text-gray-500 mt-1">3-5 business days</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <Link href="/order-tracking">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Track Your Order
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600">
              Need help? Contact our customer service at{' '}
              <a href="mailto:support@tiventi.com" className="text-tiventi-orange hover:underline">
                support@tiventi.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
