import React, { useState, useMemo } from 'react'
import { FiPlus, FiClock, FiUsers, FiDownload } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'
import { menuItems } from '../data/menuItems'

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Get unique categories from menuItems data
  const availableCategories = useMemo(() => {
    const cats = [...new Set(menuItems.map(item => item.category))]
    return cats.sort()
  }, [])

  const categories = [
    { id: 'all', label: 'All Items' },
    ...availableCategories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1) + (cat === 'wraps' ? ' & Kebabs' : '')
    }))
  ]

  // Filter items by category - with strict deduplication by ID
  const filteredItems = useMemo(() => {
    // First, ensure we only have unique items by ID (prevents any duplicates)
    const uniqueItemsMap = new Map()
    menuItems.forEach(item => {
      if (item && item.id && !uniqueItemsMap.has(item.id)) {
        uniqueItemsMap.set(item.id, item)
      }
    })
    const uniqueItems = Array.from(uniqueItemsMap.values())
    
    // Then filter by category
    if (activeFilter === 'all') {
      return uniqueItems
    }
    return uniqueItems.filter(item => item.category === activeFilter)
  }, [activeFilter])

  // Format price display based on prices object
  const formatPrice = (prices) => {
    if (!prices || typeof prices !== 'object') return 'N/A'
    
    const priceValues = Object.values(prices)
    if (priceValues.length === 0) return 'N/A'
    
    const minPrice = Math.min(...priceValues)
    const maxPrice = Math.max(...priceValues)
    
    if (minPrice === maxPrice) {
      return `${minPrice}฿`
    }
    return `${minPrice}฿ - ${maxPrice}฿`
  }

  // Get available protein options for display
  const getProteinOptions = (prices) => {
    if (!prices || typeof prices !== 'object') return []
    const proteins = Object.keys(prices).filter(key => key !== 'single')
    return proteins
  }

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'Signature':
        return 'bg-red-600/90 text-white'
      case 'Best Seller':
        return 'bg-stone-800/90 text-stone-300 border border-white/10'
      case 'Plant Based':
        return 'bg-green-900/80 text-green-100 border border-green-500/20'
      default:
        return 'bg-stone-800/90 text-stone-300'
    }
  }

  const getTagIcon = (tag) => {
    if (tag === 'spicy' || tag === 'medium-heat') {
      return <FaFire className="text-red-500" />
    } else if (tag === '24hr-prep') {
      return <FiClock className="text-stone-400" />
    } else if (tag === 'sharable') {
      return <FiUsers className="text-stone-400" />
    }
    return null
  }

  return (
    <section id="menu" className="py-24 bg-stone-950 relative border-b border-white/5">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-stone-800/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Menu Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-xs font-medium uppercase tracking-[0.2em] font-heading block mb-3">Culinary Arsenal</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-white tracking-tight mb-8">THE FEAST</h2>
          
          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap justify-center items-center gap-2 p-1.5 bg-stone-900/50 backdrop-blur-sm border border-white/5 rounded-full mx-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full text-[11px] font-heading font-medium tracking-widest uppercase transition-all ${
                  activeFilter === category.id
                    ? 'bg-red-700 text-white font-semibold shadow-lg shadow-red-900/20'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative">
              <div className="aspect-[5/4] mb-5 overflow-hidden rounded-lg bg-stone-900 relative border border-white/5 group-hover:border-red-500/30 transition-colors duration-500">
                {/* Image */}
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 filter contrast-110 saturate-[0.9]"
                  loading="lazy"
                  key={`${item.id}-${item.image}`}
                  onError={(e) => {
                    console.error(`Failed to load image: ${item.image}`, item.name)
                    e.target.style.display = 'none'
                  }}
                />
                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 ${getBadgeColor(item.badge)} text-[10px] font-heading font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm`}>
                      {item.badge}
                    </span>
                  </div>
                )}
                {/* Add Button */}
                <button 
                  className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-stone-950 text-white border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-600 hover:border-red-600"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <FiPlus className="text-base" />
                </button>
              </div>
              
              <div className="flex justify-between items-start mb-2 gap-4">
                <h3 className="text-xl font-heading font-medium text-white group-hover:text-red-500 transition-colors flex-1">
                  {item.name}
                </h3>
                <span className="text-lg font-heading font-medium text-stone-200 whitespace-nowrap">
                  {formatPrice(item.prices)}
                </span>
              </div>
              
              {item.description && (
                <p className="text-sm text-stone-400 font-light leading-relaxed mb-3">
                  {item.description}
                </p>
              )}
              
              {getProteinOptions(item.prices).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {getProteinOptions(item.prices).map((protein) => (
                    <span 
                      key={protein}
                      className="text-[10px] text-stone-500 uppercase tracking-wider font-medium px-2 py-0.5 bg-stone-900/50 rounded border border-white/5"
                    >
                      {protein}
                    </span>
                  ))}
                </div>
              )}
              
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {item.tags.map((tag, index) => (
                    <div key={`${item.id}-${tag}-${index}`} className="flex items-center gap-1 text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                      {getTagIcon(tag)}
                      <span>
                        {tag === '24hr-prep' ? '24hr Prep' : 
                         tag === 'medium-heat' ? 'Medium Heat' :
                         tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-400 text-lg">No items found in this category.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <button className="bg-transparent border border-white/10 hover:border-white text-white px-8 py-3 rounded-sm font-heading font-semibold tracking-wider transition-all text-xs inline-flex items-center gap-2 group">
            DOWNLOAD FULL MENU <FiDownload className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Menu
