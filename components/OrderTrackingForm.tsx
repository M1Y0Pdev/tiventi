'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Truck, CheckCircle } from 'lucide-react'

const OrderTrackingForm = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [orderStatus, setOrderStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock order status
    setOrderStatus({
      orderNumber: orderNumber.toUpperCase(),
      status: 'shipped',
      date: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [
        { name: 'Elegant Lace Bra', quantity: 2 },
        { name: 'Romantic Lingerie Set', quantity: 1 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      updates: [
        { date: new Date().toLocaleDateString(), time: '10:30 AM', status: 'Order placed', completed: true },
        { date: new Date().toLocaleDateString(), time: '2:45 PM', status: 'Order confirmed', completed: true },
        { date: new Date().toLocaleDateString(), time: '4:20 PM', status: 'Package shipped', completed: true },
        { date: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString(), time: 'Pending', status: 'Out for delivery', completed: false },
        { date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(), time: 'Pending', status: 'Delivered', completed: false },
      ]
    })

    setIsLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return <Package className="w-8 h-8" />
      case 'shipped':
        return <Truck className="w-8 h-8" />
      case 'delivered':
        return <CheckCircle className="w-8 h-8" />
      default:
        return <Package className="w-8 h-8" />
    }
  }

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case 'preparing':
        return 1
      case 'shipped':
        return 2
      case 'delivered':
        return 3
      default:
        return 1
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-8 mb-8"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Order Number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number (e.g., TIV123ABC)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-tiventi-orange text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search size={20} />
                )}
                Track
              </motion.button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            You can find your order number in your confirmation email
          </p>
        </form>
      </motion.div>

      {/* Order Status */}
      {orderStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Status Overview */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Order #{orderStatus.orderNumber}</h2>
                <p className="text-gray-600">Placed on {orderStatus.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="font-semibold">{orderStatus.trackingNumber}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-8">
              <div className="flex justify-between items-center">
                {['Preparing', 'Shipped', 'Delivered'].map((step, index) => {
                  const stepNumber = index + 1
                  const currentStep = getStatusStep(orderStatus.status)
                  const isActive = stepNumber <= currentStep
                  const isCompleted = stepNumber < currentStep

                  return (
                    <div key={step} className="flex flex-col items-center flex-1">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                          isActive ? 'bg-tiventi-orange text-white' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <span className="text-xl font-bold">{stepNumber}</span>
                        )}
                      </motion.div>
                      <p className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step}
                      </p>
                    </div>
                  )
                })}
              </div>
              <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 -z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((getStatusStep(orderStatus.status) - 1) / 2) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-full bg-tiventi-orange"
                />
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-orange-50 border border-tiventi-orange rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
              <p className="text-xl font-bold text-tiventi-orange">{orderStatus.estimatedDelivery}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Shipping Address</h3>
              <p className="text-gray-600">{orderStatus.shippingAddress}</p>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-2">
                {orderStatus.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracking Updates */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-semibold mb-6">Tracking Updates</h3>
            <div className="space-y-4">
              {orderStatus.updates.map((update: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-4 h-4 rounded-full mt-1 ${
                    update.completed ? 'bg-tiventi-orange' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className={`font-medium ${update.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {update.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      {update.date} • {update.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default OrderTrackingForm
