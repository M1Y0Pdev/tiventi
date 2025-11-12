'use client'

import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'

interface CategoryFilterProps {
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  category: string[]
  color: string[]
  priceRange: [number, number]
}

const CategoryFilter = ({ onFilterChange }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    color: [],
    priceRange: [0, 200]
  })

  const categories = ['bra', 'panty', 'sets', 'nightwear']
  const colors = ['Black', 'White', 'Red', 'Pink', 'Nude', 'Gray']

  const handleCategoryToggle = (category: string) => {
    const updated = filters.category.includes(category)
      ? filters.category.filter(c => c !== category)
      : [...filters.category, category]
    
    const newFilters = { ...filters, category: updated }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleColorToggle = (color: string) => {
    const updated = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color]
    
    const newFilters = { ...filters, color: updated }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (value: number) => {
    const newFilters = { ...filters, priceRange: [0, value] as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      category: [],
      color: [],
      priceRange: [0, 200] as [number, number]
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-tiventi-orange text-white p-4 rounded-full shadow-lg"
      >
        <Filter size={24} />
      </button>

      {/* Filter Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -300 }}
        className={`${
          isOpen ? 'fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent' : 'hidden lg:block'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white h-full w-80 lg:w-full p-6 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer hover:text-tiventi-orange transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 text-tiventi-orange focus:ring-tiventi-orange"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4">Color</h4>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                    filters.color.includes(color)
                      ? 'border-tiventi-orange bg-orange-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: 
                        color === 'White' ? '#ffffff' :
                        color === 'Black' ? '#000000' :
                        color === 'Red' ? '#ef4444' :
                        color === 'Pink' ? '#ec4899' :
                        color === 'Nude' ? '#f5deb3' :
                        color === 'Gray' ? '#6b7280' :
                        '#e5e5e5'
                    }}
                  />
                  <span className="text-sm">{color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h4 className="font-semibold mb-4">Price Range</h4>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="200"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full accent-tiventi-orange"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>$0</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All Filters
          </button>
        </motion.div>
      </motion.div>
    </>
  )
}

export default CategoryFilter
