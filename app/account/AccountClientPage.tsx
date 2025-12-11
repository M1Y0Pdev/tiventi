'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Package, MapPin, Heart, Settings, LogOut, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { updateUserProfile } from '@/app/account/actions'
import { createClient } from '@/lib/supabase/client' // For client-side auth actions like password change
import { useRouter } from 'next/navigation'

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  birth_date: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface Order {
    id: string;
    date: string;
    total: string;
    status: string;
}

const menuItems = [
  { id: 'profile', label: 'Profil Bilgilerim', icon: User },
  { id: 'orders', label: 'Siparişlerim', icon: Package },
  { id: 'addresses', label: 'Adreslerim', icon: MapPin },
  // { id: 'favorites', label: 'Favorilerim', icon: Heart }, // Favoriler kaldırıldı
  { id: 'settings', label: 'Ayarlar', icon: Settings },
]

export default function AccountClientPage({ activeTab, userEmail, initialProfile, orders }: { activeTab: string, userEmail: string, initialProfile: Profile, orders: Order[] }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: '' // Although not strictly used by Supabase update, good for UX
  });
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleProfileSubmit = async (formData: FormData) => {
    setLoading(true);
    setMessage(null);
    const result = await updateUserProfile(formData);
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Re-fetch profile data to update local state if needed
      // For now, assume Server Action revalidates and this will be current on next render
    } else {
      setMessage({ type: 'error', text: result.message });
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Yeni şifreler eşleşmiyor.' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Şifre en az 6 karakter olmalıdır.' });
      return;
    }
    
    setLoading(true);
    // Supabase update user only takes new password, it does not verify current one client-side
    const { error } = await supabase.auth.updateUser({ password: passwordForm.newPassword });

    if (error) {
      console.error('Password update error:', error);
      setPasswordMessage({ type: 'error', text: 'Şifre güncellenirken bir hata oluştu: ' + error.message });
    } else {
      setPasswordMessage({ type: 'success', text: 'Şifreniz başarıyla güncellendi!' });
      setPasswordForm({ newPassword: '', confirmPassword: '', currentPassword: '' });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh to clear user session on server components
  }

  // Update local profile state when initialProfile prop changes (e.g., after revalidate)
  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);


  return (
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
                <Link
                  key={item.id}
                  href={`/account?tab=${item.id}`}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-tiventi-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
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
          className="bg-white rounded-lg shadow-md p-8 min-h-[400px]"
        >
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Profil Bilgilerim</h2>
              <form action={handleProfileSubmit} className="space-y-6">
                {message && (
                  <div className={`p-3 rounded-lg text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {message.text}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium mb-2">Ad</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      defaultValue={profile.first_name || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium mb-2">Soyad</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      defaultValue={profile.last_name || ''}
                      onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email || userEmail} // Display from profile if available, else from auth userEmail
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue={profile.phone || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                  />
                </div>
                <div>
                  <label htmlFor="birth_date" className="block text-sm font-medium mb-2">Doğum Tarihi</label>
                  <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    defaultValue={profile.birth_date || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, birth_date: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto"
                >
                  {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </motion.button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
             <div>
                <h2 className="text-2xl font-bold mb-6">Siparişlerim</h2>
                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-semibold text-lg">Sipariş #{order.id}</p>
                            <p className="text-gray-600 text-sm">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-700' : 
                              order.status === 'Kargoda' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
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
                    ))
                  ) : (
                    <p className="text-gray-600">Henüz bir siparişiniz bulunmamaktadır.</p>
                  )}
                </div>
             </div>
          )}
          
          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Adreslerim</h2>
              <p className="text-gray-500">Adres yönetimi yakında eklenecektir.</p>
            </div>
          )}



          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ayarlar</h2>
              <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                {passwordMessage && (
                  <div className={`p-3 rounded-lg text-white ${passwordMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {passwordMessage.text}
                  </div>
                )}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-2">Yeni Şifre</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="En az 6 karakter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
