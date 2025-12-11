'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CartItem } from '@/types'

interface AddedToCartModalProps {
  isOpen: boolean
  onClose: () => void
  item: CartItem | null
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { 
    y: "0", 
    opacity: 1,
    transition: { delay: 0.2, type: "spring", stiffness: 120 }
  },
}

export default function AddedToCartModal({ isOpen, onClose, item }: AddedToCartModalProps) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-[100] flex justify-center items-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
            variants={modal}
          >
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={28} />
                    <h2 className="text-xl font-semibold text-gray-800">Sepete Eklendi!</h2>
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={item.product.image || '/placeholder.png'}
                            alt={item.product.name}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-gray-900">{item.product.name}</h3>
                        <p className="text-gray-500 text-sm capitalize">Renk: {item.selectedColor}</p>
                        <p className="text-gray-500 text-sm">Beden: {item.selectedSize}</p>
                        <p className="text-gray-500 text-sm">Adet: {item.quantity}</p>
                        <p className="text-lg font-semibold text-tiventi-orange mt-2">
                           {(item.product.price * item.quantity).toFixed(2)} TL
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-xl flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onClose}
                    className="w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                >
                    Alışverişe Devam Et
                </button>
                <Link href="/cart" className="w-full">
                    <button 
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-tiventi-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                        onClick={onClose}
                    >
                        <ShoppingCart size={20}/>
                        Sepete Git
                    </button>
                </Link>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={24}/>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
