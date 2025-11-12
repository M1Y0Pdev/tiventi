'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, ShoppingBag, Search, User, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const MobileBottomNav = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Ana Sayfa', icon: Home },
    { href: '/search', label: 'Ara', icon: Search },
    { href: '/products', label: 'Alışveriş', icon: ShoppingBag },
    { href: '/favorites', label: 'Favoriler', icon: Heart },
    { href: '/account', label: 'Hesabım', icon: User },
  ]

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom" style={{ height: '64px' }}>
        <div className="grid grid-cols-5" style={{ height: '64px' }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors",
                  isActive 
                    ? "text-tiventi-orange" 
                    : "text-gray-600 hover:text-tiventi-orange"
                )}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Spacer for bottom nav */}
      <div className="lg:hidden" style={{ height: '64px' }} />
    </>
  )
}

export default MobileBottomNav
