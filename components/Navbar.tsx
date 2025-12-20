'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, User, Heart, ChevronDown, LogOut, LogIn } from 'lucide-react'
import { type User as SupabaseUser } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/context/CartProvider'; // useCart eklendi

const megaMenuCategories = {
  kadin: {
    title: 'Kadın',
    sections: [
      { title: 'İç Giyim', items: ['Sütyen', 'Külot', 'Bralet', 'Takım', 'Body', 'Jartiyer', 'String', 'Tanga'] },
      { title: 'Gecelik & Pijama', items: ['Gecelik', 'Pijama Takımı', 'Sabahlık', 'Şort Takım', 'Uyku Tulumu', 'Göz Bandı'] },
      { title: 'Plaj Giyim', items: ['Bikini', 'Mayo', 'Pareo', 'Plaj Elbisesi', 'Kimono', 'Plaj Çantası'] },
      { title: 'Spor & Aktif', items: ['Sporcu Sütyeni', 'Spor Tayt', 'Eşofman Altı', 'Spor Şort', 'Spor Tişört', 'Kapüşonlu'] },
      { title: 'Özel Günler', items: ['Fantezi Giyim', 'Gelinlik İç Giyim', 'Korseler', 'Büstiyer', 'Babydoll'] },
      { title: 'Aksesuarlar', items: ['Çorap', 'Dizaltı Çorap', 'Silikon Sütyen', 'Sütyen Aksesuarı', 'Terlik'] }
    ]
  },
  erkek: {
    title: 'Erkek',
    sections: [
      { title: 'İç Giyim', items: ['Boxer', 'Slip', 'Atlet', 'Fanila', 'Paçalı Don', 'Termal İçlik'] },
      { title: 'Pijama & Ev Giyim', items: ['Pijama Takımı', 'Şort Takım', 'Sabahlık', 'Ev Şortu', 'Eşofman Takımı'] },
      { title: 'Spor & Outdoor', items: ['Sporcu Boxer', 'Spor Atlet', 'Termal', 'Koşu Şortu', 'Performans Tişört'] },
      { title: 'Aksesuarlar', items: ['Çorap', 'Havlu', 'Bornoz', 'Terlik'] }
    ]
  },
  cocuk: {
    title: 'Çocuk',
    sections: [
      { title: 'Kız Çocuk', items: ['Külot', 'Atlet', 'Pijama Takımı', 'Elbise', 'Tayt', 'Çorap'] },
      { title: 'Erkek Çocuk', items: ['Boxer', 'Atlet', 'Pijama Takımı', 'Şort', 'Eşofman', 'Çorap'] },
      { title: 'Bebek (0-2 Yaş)', items: ['Body', 'Zıbın', 'Tulum', 'Pijama', 'Takım', 'Patik', 'Önlük'] },
      { title: 'Okul Giyim', items: ['Okul Çorabı', 'Okul Atleti', 'Külotlu Çorap'] }
    ]
  },
  aksesuar: {
    title: 'Aksesuar',
    sections: [
      { title: 'Kadın Aksesuar', items: ['Çanta', 'Cüzdan', 'Şal', 'Fular', 'Kemer', 'Güneş Gözlüğü', 'Takı'] },
      { title: 'Erkek Aksesuar', items: ['Kravat', 'Papyon', 'Cüzdan', 'Kemer', 'Şapka', 'Atkı', 'Eldiven'] },
      { title: 'Ev & Yaşam', items: ['Nevresim Takımı', 'Yastık Kılıfı', 'Banyo Paspası', 'Mutfak Önlüğü', 'Dekoratif Yastık'] },
      { title: 'Kişisel Bakım', items: ['Parfüm', 'Deodorant', 'Vücut Losyonu', 'El Kremi', 'Makyaj Çantası'] }
    ]
  },
  markalar: {
    title: 'Markalar',
    sections: [
      { title: 'Premium Markalar', items: ["Victoria's Secret", 'Calvin Klein', 'La Perla', 'Agent Provocateur', 'Stella McCartney'] },
      { title: 'Popüler Markalar', items: ['Penti', 'Oysho', 'Suwen', 'Dagi', 'Kom'] },
      { title: 'Spor Markaları', items: ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok'] },
      { title: 'Lisanslı Markalar', items: ['Disney', 'Marvel', 'Warner Bros.', 'Hello Kitty'] }
    ]
  },
  outlet: {
    title: 'Outlet',
    sections: [
      { title: 'Kadın Fırsat', items: ['Sütyen', 'Külot', 'Pijama', 'Gecelik', 'Mayo'] },
      { title: 'Erkek Fırsat', items: ['Boxer', 'Atlet', 'Pijama', 'Çorap'] },
      { title: 'Çocuk Fırsat', items: ['Kız Çocuk', 'Erkek Çocuk', 'Bebek'] },
      { title: 'Tüm İndirimler', items: ["%50'ye Varan", "%70'e Varan", '3 Al 2 Öde', 'Son Şans Ürünleri'] }
    ]
  },
  lisansli: {
    title: 'Lisanslı',
    sections: [
      { title: 'Çizgi Film & Animasyon', items: ['Disney Princess', 'Marvel Universe', 'Barbie Dreamhouse', 'Frozen Kingdom', 'Looney Tunes', 'Tom & Jerry'] },
      { title: 'Spor Kulüpleri', items: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor', 'Bursaspor', 'Milli Takım'] },
      { title: 'Süper Kahramanlar', items: ['Batman', 'Superman', 'Spider-Man', 'Wonder Woman', 'Iron Man', 'Captain America'] },
      { title: 'Oyun & Karakterler', items: ['Hello Kitty', 'Peppa Pig', 'Paw Patrol', 'Minecraft', 'Fortnite', 'Pokemon'] }
    ]
  }
}


const Navbar = ({ user }: { user: SupabaseUser | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const { cartCount } = useCart(); // Dinamik cartCount buradan alınacak
  const pathname = usePathname();
  const router = useRouter();
  
  const isHomePage = pathname === '/';

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { if (!megaMenuOpen) setIsHovered(false); }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-800'
            : isHovered
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ height: '80px' }}
      >
        <div className="container-custom h-20 px-4"> {/* px-8'den px-4'e düşürüldü */}
          <div className="flex items-center justify-between h-full">
            {/* Logo - Sabit kalmalı */}
                                    <div className="flex-shrink-0">
                                                  <Link href="/" className="flex-shrink-0">
                                                    <h1 className={`text-3xl font-bold select-none transition-colors duration-300 h-full flex items-center overflow-hidden ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`}>
                                                      <span className="text-tiventi-orange">Tiventi</span>
                                                    </h1>
                                                  </Link>                                    </div>
                        
                                    {/* Desktop Navigation - Esneyen ve ortalanan kısım */}
                                    <div className="flex-1 flex justify-center min-w-0"> {/* min-w-0 eklendi */}
                                      <nav className="hidden lg:flex items-center gap-4 overflow-x-auto lg:overflow-x-visible pb-1 no-scrollbar"> {/* gap-2'den gap-4'e çıkarıldı */}
                                        <Link href="/" className={`hover:text-tiventi-orange transition-colors font-medium whitespace-nowrap ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`}>Ana Sayfa</Link>
                                        {Object.keys(megaMenuCategories).map(key => (
                                                            <div key={key} className="relative" onMouseEnter={() => setMegaMenuOpen(key)}>
                                                              <button className={`hover:text-tiventi-orange transition-colors font-medium flex items-center gap-1 whitespace-nowrap ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`}>
                                                                {megaMenuCategories[key as keyof typeof megaMenuCategories].title}
                                                                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen === key ? 'rotate-180' : ''}`} />
                                                              </button>
                                                            </div>
                                        ))}
                                      </nav>
                                    </div>
            {/* Right Icons - Sabit kalmalı */}
            <div className="flex-shrink-0">
                          <div className="flex items-center space-x-6">
                            <Link href="/search"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`hover:text-tiventi-orange transition-colors ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`} title="Ara"><Search size={22} /></motion.button></Link>
                            <Link href="/favorites"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`hover:text-tiventi-orange transition-colors hidden sm:block ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`} title="Favorilerim"><Heart size={22} /></motion.button></Link>
                            
                            {user ? (
                              <Link href="/account" className="hidden sm:flex items-center gap-3"> {/* Link to account page */}
                                 <span className={`text-sm whitespace-nowrap ${isScrolled || !isHomePage ? 'text-gray-300' : isHovered ? 'text-gray-700' : 'text-gray-200'}`}>{user.email}</span>
                                 <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`hover:text-tiventi-orange transition-colors ${
                                      isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
                                    }`}
                                    title="Hesabım"
                                  >
                                    <User size={22} /> {/* User icon */}
                                  </motion.button>
                              </Link>
                            ) : (
                              <Link href="/login" className="hidden sm:block">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`hover:text-tiventi-orange transition-colors flex items-center gap-2 ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`} title="Giriş Yap / Kayıt Ol"><LogIn size={22} /></motion.button>
                              </Link>
                            )}
              
                            <Link href="/cart" className="hidden sm:block">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`relative hover:text-tiventi-orange transition-colors ${isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'}`}>
                                <ShoppingBag size={22} />
                                {/* Dinamik sepet sayısı ve rozet düzenlemesi */}
                                {cartCount > 0 && (
                                  <span className="absolute -top-1 -right-1 bg-tiventi-orange text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 py-0.5">
                                    {cartCount}
                                  </span>
                                )}
                              </motion.div>
                            </Link>
                          </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {megaMenuOpen && megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-20 left-0 right-0 z-40 shadow-2xl border-t ${isScrolled || !isHomePage ? 'bg-black/95 backdrop-blur-md border-gray-800' : 'bg-white/95 backdrop-blur-md border-gray-200'}`}
            onMouseLeave={() => setMegaMenuOpen(null)}
          >
            <div className="container-custom py-8 px-4">
              <div className="grid grid-cols-4 gap-8">
                {Object.keys(megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories].sections).map(sectionKey => {
                  const section = megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories].sections[Number(sectionKey)]; // sectionKey'in number olması garanti değil, düzeltilebilir
                  return (
                    <div key={sectionKey}>
                      <h3 className={`font-bold text-lg mb-4 ${isScrolled || !isHomePage ? 'text-tiventi-orange' : 'text-gray-900'}`}>{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link href={`/products?category=${megaMenuOpen}&subcategory=${item.toLowerCase().replace(/\s+/g, '-')}`} className={`transition-colors hover:text-tiventi-orange ${isScrolled || !isHomePage ? 'text-gray-300' : 'text-gray-700'}`}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className={`mt-6 pt-6 border-t ${isScrolled || !isHomePage ? 'border-gray-700' : 'border-gray-200'}`}>
                <Link href={`/products?category=${megaMenuOpen}`} className="inline-flex items-center gap-2 px-6 py-3 bg-tiventi-orange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">Tüm {megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories].title} Ürünlerini Gör</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
