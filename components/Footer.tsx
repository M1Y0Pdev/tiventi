'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = ({ className = '' }: { className?: string }) => {
  return (
    <footer className={`bg-black text-white ${className}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-tiventi-orange">Tiventi</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Premium iç çamaşırı koleksiyonumuzla zarafeti ve konforu keşfedin.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.2, color: '#FF6B00' }}
                href="#"
                className="text-gray-400 hover:text-tiventi-orange transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#FF6B00' }}
                href="#"
                className="text-gray-400 hover:text-tiventi-orange transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#FF6B00' }}
                href="#"
                className="text-gray-400 hover:text-tiventi-orange transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, color: '#FF6B00' }}
                href="#"
                className="text-gray-400 hover:text-tiventi-orange transition-colors"
              >
                <Youtube size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link href="/products?filter=new" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  Yeni Gelenler
                </Link>
              </li>
              <li>
                <Link href="/products?filter=sale" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  İndirimler
                </Link>
              </li>
              <li>
                <Link href="/order-tracking" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  Sipariş Takibi
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  Beden Rehberi
                </Link>
              </li>
              <li>
                <Link href="/policies/return" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-gray-400 hover:text-tiventi-orange transition-colors">
                  Kargo Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Bağlantıda Kalın</h4>
            <p className="text-gray-400 mb-4">
              Özel teklifler ve kampanyalardan haberdar olmak için abone olun.
            </p>
            <form className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-tiventi-orange text-white rounded-r-lg hover:bg-orange-600 transition-colors"
                >
                  <Mail size={20} />
                </motion.button>
              </div>
            </form>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Fashion Ave, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Tiventi. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/policies/privacy" className="text-gray-400 hover:text-tiventi-orange text-sm transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/policies/terms" className="text-gray-400 hover:text-tiventi-orange text-sm transition-colors">
                Kullanım Şartları
              </Link>
              <Link href="/policies/cookie" className="text-gray-400 hover:text-tiventi-orange text-sm transition-colors">
                Çerez Politikası
              </Link>
              <Link href="/policies/legal-notice" className="text-gray-400 hover:text-tiventi-orange text-sm transition-colors">
                Mesafeli Satış Sözleşmesi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
