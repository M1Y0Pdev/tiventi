'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Product, Category } from '@/types'
import { Grid, List } from 'lucide-react'

export default function ProductView({ initialProducts, initialCategories }: { initialProducts: Product[], initialCategories: Category[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleFilterChange = (selectedCategories: string[]) => {
    let filtered = [...products]

    if (selectedCategories.length > 0) {
      filtered = products.filter(p => p.category_name && selectedCategories.includes(p.category_name))
    } else {
      // If no categories are selected, show all products
      filtered = [...products]
    }
    
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
        sorted.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))
        break
      default:
        sorted = products.filter(p => filteredProducts.some(fp => fp.id === p.id))
    }

    setFilteredProducts(sorted)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    
    if (category) {
      handleFilterChange([category])
    } else {
      // Ensure products are not filtered by default unless a URL param exists
      handleFilterChange([])
    }
  }, [products])

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <aside className="w-80 hidden lg:block">
        <CategoryFilter onFilterChange={handleFilterChange} categories={initialCategories} />
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
              onClick={() => handleFilterChange([])}
              className="mt-4 text-tiventi-orange hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
