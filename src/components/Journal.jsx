import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'
import { articles } from '../data/articles'

const Journal = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [imageLoaded, setImageLoaded] = useState({})
  const observerRef = useRef(null)

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'Recipes', label: 'Recipes' },
    { id: 'Culture', label: 'Culture' },
    { id: 'Origin', label: 'Origin' }
  ]

  const filteredArticles = activeFilter === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeFilter)

  const featuredArticle = articles.find(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          observerRef.current.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.journal-article')
    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [filteredArticles])

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }))
  }

  return (
    <section id="journal" className="py-24 bg-[#0c0a09] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-stone-800/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <FaFire className="text-red-600 text-xl" />
              <span className="text-red-600 text-xs font-heading font-semibold tracking-[0.2em] uppercase">Tribal Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-heading font-medium text-white tracking-tight leading-none">
              TRIBAL <span className="text-stone-600">JOURNAL</span>
            </h2>
            <p className="text-stone-400 font-light text-base max-w-lg leading-relaxed">
              Stories from the grill, culture pieces, and the secrets behind our recipes. Dive deep into the RedHawk world.
            </p>
          </div>
          <div className="flex gap-2">
            <a href="#" className="text-xs font-medium text-white hover:text-red-500 border-b border-red-600 pb-1 transition-colors uppercase tracking-widest">
              View Archive
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <div className="inline-flex flex-wrap justify-start items-center gap-2 p-1.5 bg-stone-900/50 backdrop-blur-sm border border-white/5 rounded-full">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-heading font-medium tracking-widest uppercase transition-all duration-300 ${
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

        {/* Featured Article */}
        {featuredArticle && activeFilter === 'all' && (
          <Link to={`/article/${featuredArticle.id}`} className="journal-article mb-20 group cursor-pointer block">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-stone-900/30 backdrop-blur-sm">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-stone-900/40 z-10"></div>
                  <div className={`absolute inset-0 bg-stone-900 transition-opacity duration-700 ${imageLoaded[featuredArticle.id] ? 'opacity-0' : 'opacity-100'}`}></div>
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    onLoad={() => handleImageLoad(featuredArticle.id)}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
                    loading="eager"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-2 bg-stone-950/90 backdrop-blur-md text-white text-xs font-heading font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-lg">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                      <FiCalendar className="text-xs" />
                      <span className="text-xs font-medium">{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                      <FiClock className="text-xs" />
                      <span className="text-xs font-medium">{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-stone-950/50 backdrop-blur-sm">
                  <div className="mb-6">
                    <span className="text-red-600 text-xs font-heading font-bold tracking-[0.3em] uppercase mb-4 block">Featured Story</span>
                    <h3 className="text-3xl lg:text-4xl font-heading font-medium text-white mb-6 leading-tight group-hover:text-red-500 transition-colors duration-300">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-stone-300 text-base font-light leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <p className="text-stone-400 text-sm font-light leading-relaxed mb-8">
                      {Array.isArray(featuredArticle.fullContent) ? featuredArticle.fullContent[0] : featuredArticle.fullContent}
                    </p>
                  </div>
                  <div className="flex items-center text-red-500 text-sm font-medium uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                    Read Full Story 
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`}
              className="journal-article group cursor-pointer block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl border border-white/5 bg-stone-900/30 backdrop-blur-sm group-hover:border-red-500/30 transition-all duration-500 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent z-10"></div>
                  <div className={`absolute inset-0 bg-stone-900 transition-opacity duration-700 ${imageLoaded[article.id] ? 'opacity-0' : 'opacity-100'}`}></div>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    onLoad={() => handleImageLoad(article.id)}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1.5 bg-stone-950/90 backdrop-blur-md text-white text-[10px] font-heading font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-lg">
                      {article.category}
                    </span>
                  </div>

                  {/* Date & Read Time Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                        <FiCalendar className="text-[10px]" />
                        <span className="text-[10px] font-medium">{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                        <FiClock className="text-[10px]" />
                        <span className="text-[10px] font-medium">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-heading font-medium text-white mb-3 group-hover:text-red-500 transition-colors duration-300 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-3 mb-5 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-red-500 text-xs font-medium uppercase tracking-widest group-hover:gap-2 transition-all duration-300 pt-2 border-t border-white/5">
                    Read Story 
                    <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {regularArticles.length === 0 && (
          <div className="text-center py-20">
            <FaFire className="text-stone-700 text-5xl mx-auto mb-4" />
            <p className="text-stone-400 text-lg font-light">No stories found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Journal

