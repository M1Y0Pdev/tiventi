'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { products } from '@/lib/data'
import { Product } from '@/types'
import { Grid, List } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleFilterChange = (filters: any) => {
    let filtered = [...products]

    // Filter by category
    if (filters.category.length > 0) {
      filtered = filtered.filter(p => filters.category.includes(p.category))
    }

    // Filter by color
    if (filters.color.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => filters.color.includes(color))
      )
    }

    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    setFilteredProducts(filtered)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    let sorted = [...filteredProducts]

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        sorted = sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew))
        break
      default:
        sorted = products.filter(p => filteredProducts.includes(p))
    }

    setFilteredProducts(sorted)
  }

  useEffect(() => {
    // Check for URL parameters
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    const filter = params.get('filter')

    if (category) {
      handleFilterChange({ category: [category], color: [], priceRange: [0, 200] })
    } else if (filter === 'new') {
      setFilteredProducts(products.filter(p => p.isNew))
    } else if (filter === 'sale') {
      setFilteredProducts(products.filter(p => p.discount))
    } else if (filter === 'bestseller') {
      setFilteredProducts(products.filter(p => p.isBestSeller))
    }
  }, [])

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Products</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our complete collection of premium lingerie
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-80 hidden lg:block">
              <CategoryFilter onFilterChange={handleFilterChange} />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-8 pb-4 border-b">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products
                </p>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiventi-orange"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid'
                          ? 'bg-tiventi-orange text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list'
                          ? 'bg-tiventi-orange text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <button
                    onClick={() => setFilteredProducts(products)}
                    className="mt-4 text-tiventi-orange hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter */}
      <CategoryFilter onFilterChange={handleFilterChange} />
    </div>
  )
}
