'use client'

import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import { Category } from '@/types'

interface CategoryFilterProps {
  onFilterChange: (selectedCategories: string[]) => void
  categories: Category[]
}

const CategoryFilter = ({ onFilterChange, categories = [] }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryToggle = (categoryName: string) => {
    const updated = selectedCategories.includes(categoryName)
      ? selectedCategories.filter(c => c !== categoryName)
      : [...selectedCategories, categoryName]
    
    setSelectedCategories(updated)
    onFilterChange(updated)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    onFilterChange([])
  }

  const hasActiveFilters = selectedCategories.length > 0;

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
                  key={category.id}
                  className="flex items-center gap-2 cursor-pointer hover:text-tiventi-orange transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                    className="w-4 h-4 text-tiventi-orange focus:ring-tiventi-orange"
                  />
                  <span className="capitalize">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export default CategoryFilter
