'use client'

import { motion } from 'framer-motion'
import OrderTrackingForm from '@/components/OrderTrackingForm'
import { Package } from 'lucide-react'

export default function OrderTrackingPage() {
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
              <Package className="w-10 h-10 text-tiventi-orange" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Enter your order number below to check the status of your delivery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-12">
        <div className="container-custom">
          <OrderTrackingForm />
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Can't find your order?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Make sure you're entering the correct order number from your confirmation email.
                  Order numbers typically start with "TIV" followed by alphanumeric characters.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Contact Support</h3>
                <p className="text-gray-600 text-sm mb-2">
                  If you're having trouble tracking your order, our customer service team is here to help.
                </p>
                <div className="space-y-1 text-sm">
                  <p>Email: <a href="mailto:support@tiventi.com" className="text-tiventi-orange hover:underline">support@tiventi.com</a></p>
                  <p>Phone: <a href="tel:+15551234567" className="text-tiventi-orange hover:underline">+1 (555) 123-4567</a></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
