'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { XCircle, RefreshCcw, Headphones, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function CheckoutFailPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'N/A'

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
              className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="w-12 h-12 text-red-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4"
            >
              Payment Failed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              Unfortunately, your payment could not be processed. Please try again or contact support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-lg p-6 mb-8"
            >
              <p className="text-sm text-gray-500 mb-2">Order Attempt ID</p>
              <p className="text-2xl font-bold text-red-600">{orderId}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              <div className="flex flex-col items-center p-4">
                <RefreshCcw className="w-8 h-8 text-red-600 mb-2" />
                <p className="text-sm font-semibold">Try Again</p>
                <p className="text-xs text-gray-500 mt-1">Re-attempt payment</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Headphones className="w-8 h-8 text-red-600 mb-2" />
                <p className="text-sm font-semibold">Contact Support</p>
                <p className="text-xs text-gray-500 mt-1">We're here to help</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <ArrowLeft size={20} />
                  Return to Checkout
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
              If the problem persists, please contact our customer service at{' '}
              <a href="mailto:support@tiventi.com" className="text-red-600 hover:underline">
                support@tiventi.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
