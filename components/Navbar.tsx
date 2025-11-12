'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, User, Heart, ChevronDown, Shirt, Moon, Tag, Sparkles } from 'lucide-react'

// Mega menü kategorileri
const megaMenuCategories = {
  kadin: {
    title: 'Kadın',
    sections: [
      {
        title: 'İç Giyim',
        items: ['Sütyen', 'Külot', 'Takım', 'Body', 'Jartiyer']
      },
      {
        title: 'Gecelik & Pijama',
        items: ['Gecelik', 'Pijama Takımı', 'Sabahlık', 'Şort Takım']
      },
      {
        title: 'Spor & Aktif',
        items: ['Sporcu Sütyeni', 'Spor Tayt', 'Spor Takım']
      },
      {
        title: 'Özel Günler',
        items: ['Fantezi', 'Gelinlik İç Giyim', 'Korseler']
      }
    ]
  },
  erkek: {
    title: 'Erkek',
    sections: [
      {
        title: 'İç Giyim',
        items: ['Boxer', 'Slip', 'Atlet', 'Fanila']
      },
      {
        title: 'Pijama',
        items: ['Pijama Takımı', 'Şort Takım', 'Sabahlık']
      },
      {
        title: 'Spor',
        items: ['Sporcu Boxer', 'Spor Atlet', 'Termal']
      }
    ]
  },
  cocuk: {
    title: 'Çocuk',
    sections: [
      {
        title: 'Kız Çocuk',
        items: ['İç Giyim', 'Pijama', 'Gecelik', 'Takım']
      },
      {
        title: 'Erkek Çocuk',
        items: ['İç Giyim', 'Pijama', 'Boxer', 'Atlet']
      },
      {
        title: 'Bebek',
        items: ['Body', 'Zıbın', 'Pijama', 'Takım']
      }
    ]
  },
  lisansli: {
    title: 'Lisanslı',
    sections: [
      {
        title: 'Çizgi Film',
        items: ['Disney', 'Marvel', 'Barbie', 'Frozen']
      },
      {
        title: 'Spor Kulüpleri',
        items: ['Galatasaray', 'Fenerbahçe', 'Beşiktaş', 'Trabzonspor']
      },
      {
        title: 'Karakterler',
        items: ['Hello Kitty', 'Peppa Pig', 'Paw Patrol']
      }
    ]
  }
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null)
  const [cartCount] = useState(2)
  const pathname = usePathname()
  
  // Anasayfa kontrolü
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-800'
          : isHovered
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container-custom h-20 px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className={`text-3xl font-bold select-none transition-colors duration-300 ${
              isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
            }`}>
              <span className="text-tiventi-orange">Tiventi</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`hover:text-tiventi-orange transition-colors font-medium ${
              isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
            }`}>
              Ana Sayfa
            </Link>
            
            {/* Kadın - Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen('kadin')}
            >
              <button className={`hover:text-tiventi-orange transition-colors font-medium flex items-center gap-1 ${
                isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
              }`}>
                Kadın
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen === 'kadin' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Erkek - Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen('erkek')}
            >
              <button className={`hover:text-tiventi-orange transition-colors font-medium flex items-center gap-1 ${
                isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
              }`}>
                Erkek
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen === 'erkek' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Çocuk - Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen('cocuk')}
            >
              <button className={`hover:text-tiventi-orange transition-colors font-medium flex items-center gap-1 ${
                isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
              }`}>
                Çocuk
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen === 'cocuk' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Lisanslı - Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setMegaMenuOpen('lisansli')}
            >
              <button className={`hover:text-tiventi-orange transition-colors font-medium flex items-center gap-1 ${
                isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
              }`}>
                Lisanslı
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen === 'lisansli' ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <Link href="/products?filter=firsat" className={`hover:text-tiventi-orange transition-colors font-medium ${
              isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
            }`}>
              Fırsat
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/search">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`hover:text-tiventi-orange transition-colors ${
                  isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
                }`}
                title="Ara"
              >
                <Search size={22} />
              </motion.button>
            </Link>
            
            <Link href="/favorites">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`hover:text-tiventi-orange transition-colors hidden sm:block ${
                  isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
                }`}
                title="Favorilerim"
              >
                <Heart size={22} />
              </motion.button>
            </Link>

            <Link href="/account">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`hover:text-tiventi-orange transition-colors hidden sm:block ${
                  isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
                }`}
                title="Hesabım"
              >
                <User size={22} />
              </motion.button>
            </Link>

            <Link href="/cart" className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative hover:text-tiventi-orange transition-colors ${
                  isScrolled || !isHomePage ? 'text-white' : isHovered ? 'text-gray-900' : 'text-white'
                }`}
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-tiventi-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {megaMenuOpen && megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-20 left-0 right-0 z-50 shadow-2xl border-t ${
              isScrolled || !isHomePage
                ? 'bg-black/95 backdrop-blur-md border-gray-800'
                : 'bg-white/95 backdrop-blur-md border-gray-200'
            }`}
            onMouseLeave={() => setMegaMenuOpen(null)}
          >
            <div className="container-custom py-8 px-4">
              <div className="grid grid-cols-4 gap-8">
                {megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories].sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className={`font-bold text-lg mb-4 ${
                      isScrolled || !isHomePage ? 'text-tiventi-orange' : 'text-gray-900'
                    }`}>
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={`/products?category=${megaMenuOpen}&subcategory=${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className={`transition-colors hover:text-tiventi-orange ${
                              isScrolled || !isHomePage ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {/* Tümünü Gör Butonu */}
              <div className={`mt-6 pt-6 border-t ${
                isScrolled || !isHomePage ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <Link
                  href={`/products?category=${megaMenuOpen}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-tiventi-orange text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Tüm {megaMenuCategories[megaMenuOpen as keyof typeof megaMenuCategories].title} Ürünlerini Gör
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  )
}

export default Navbar
