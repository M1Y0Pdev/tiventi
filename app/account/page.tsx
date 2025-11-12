'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Package, MapPin, Heart, Settings, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const menuItems = [
    { id: 'profile', label: 'Profil Bilgilerim', icon: User },
    { id: 'orders', label: 'Siparişlerim', icon: Package },
    { id: 'addresses', label: 'Adreslerim', icon: MapPin },
    { id: 'favorites', label: 'Favorilerim', icon: Heart },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ]

  const recentOrders = [
    { id: 'TIV123ABC', date: '15 Ekim 2024', total: '₺249.99', status: 'Teslim Edildi' },
    { id: 'TIV456DEF', date: '10 Ekim 2024', total: '₺189.99', status: 'Kargoda' },
    { id: 'TIV789GHI', date: '5 Ekim 2024', total: '₺329.99', status: 'Teslim Edildi' },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 bg-tiventi-orange rounded-full flex items-center justify-center text-3xl font-bold">
              AY
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz, Ayşe!</h1>
              <p className="text-gray-300">ayse@example.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Account Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Menu */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === item.id
                            ? 'bg-tiventi-orange text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all">
                    <LogOut size={20} />
                    <span className="font-medium">Çıkış Yap</span>
                  </button>
                </nav>
              </motion.div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-8"
              >
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Profil Bilgilerim</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Ad</label>
                          <input
                            type="text"
                            defaultValue="Ayşe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Soyad</label>
                          <input
                            type="text"
                            defaultValue="Yılmaz"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">E-posta</label>
                        <input
                          type="email"
                          defaultValue="ayse@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Telefon</label>
                        <input
                          type="tel"
                          defaultValue="+90 555 123 4567"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Doğum Tarihi</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary"
                      >
                        Değişiklikleri Kaydet
                      </motion.button>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-semibold text-lg">Sipariş #{order.id}</p>
                              <p className="text-gray-600 text-sm">{order.date}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Teslim Edildi'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xl font-bold text-tiventi-orange">{order.total}</p>
                            <Link href={`/order-tracking`}>
                              <button className="text-tiventi-orange hover:underline font-medium">
                                Detayları Gör
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/products">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary mt-6 flex items-center gap-2"
                      >
                        <ShoppingBag size={20} />
                        Alışverişe Devam Et
                      </motion.button>
                    </Link>
                  </div>
                )}

                {activeTab === 'addresses' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Adreslerim</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center hover:border-tiventi-orange transition-colors cursor-pointer">
                        <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 font-medium">Yeni Adres Ekle</p>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold">Ev Adresi</h3>
                          <span className="bg-tiventi-orange text-white text-xs px-2 py-1 rounded">
                            Varsayılan
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Ayşe Yılmaz<br />
                          Atatürk Cad. No: 123<br />
                          Kadıköy, İstanbul 34710<br />
                          +90 555 123 4567
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button className="text-tiventi-orange hover:underline text-sm">Düzenle</button>
                          <button className="text-red-500 hover:underline text-sm">Sil</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'favorites' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Favorilerim</h2>
                    <p className="text-gray-600 mb-6">
                      Favori ürünlerinizi görüntülemek için Favoriler sayfasına gidin.
                    </p>
                    <Link href="/favorites">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Heart size={20} />
                        Favorilere Git
                      </motion.button>
                    </Link>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Ayarlar</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-4">Bildirim Tercihleri</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-tiventi-orange focus:ring-tiventi-orange" />
                            <span>E-posta bildirimleri</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-tiventi-orange focus:ring-tiventi-orange" />
                            <span>SMS bildirimleri</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-tiventi-orange focus:ring-tiventi-orange" />
                            <span>Kampanya ve fırsat bildirimleri</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Şifre Değiştir</h3>
                        <div className="space-y-4 max-w-md">
                          <input
                            type="password"
                            placeholder="Mevcut Şifre"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                          />
                          <input
                            type="password"
                            placeholder="Yeni Şifre"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                          />
                          <input
                            type="password"
                            placeholder="Yeni Şifre (Tekrar)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary"
                          >
                            Şifreyi Güncelle
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
