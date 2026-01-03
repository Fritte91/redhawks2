import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiClock, FiCalendar, FiUser } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'
import { getArticleById } from '../data/articles'
import Navbar from './Navbar'

const ArticleReader = () => {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const foundArticle = getArticleById(id)
    if (foundArticle) {
      setArticle(foundArticle)
      // Scroll to top when article loads
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [id])

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <FaFire className="text-stone-700 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-heading text-white mb-2">Article Not Found</h2>
          <p className="text-stone-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest text-sm font-medium"
          >
            <FiArrowLeft /> Back to Journal
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="antialiased overflow-x-hidden selection:bg-red-700 selection:text-white bg-stone-950 text-stone-200">
      <Navbar />
      <article className="min-h-screen bg-[#0c0a09] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-stone-800/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Image Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/50 to-stone-950 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent z-20"></div>
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-900 z-5"></div>
        )}
        
        <img 
          src={article.image} 
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'} filter grayscale-[20%]`}
        />

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-30">
          <Link 
            to="/"
            className="group flex items-center gap-2 px-4 py-2.5 bg-stone-950/80 backdrop-blur-md text-white rounded-full border border-white/10 hover:border-red-500/50 transition-all duration-300"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium uppercase tracking-wider">Back</span>
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-8 right-8 z-30">
          <span className="px-4 py-2 bg-stone-950/90 backdrop-blur-md text-white text-xs font-heading font-bold uppercase tracking-wider rounded-full border border-white/20 shadow-lg">
            {article.category}
          </span>
        </div>

        {/* Article Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-8 lg:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 text-white/90">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                <FiCalendar className="text-xs" />
                <span className="text-xs font-medium">{article.date}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                <FiClock className="text-xs" />
                <span className="text-xs font-medium">{article.readTime}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-950/80 backdrop-blur-md rounded-full border border-white/10">
                  <FiUser className="text-xs" />
                  <span className="text-xs font-medium">{article.author}</span>
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white leading-tight tracking-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-10 -mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Card */}
          <div className="bg-stone-950/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-16 shadow-2xl">
            {/* Excerpt */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <FaFire className="text-red-600 text-xl" />
                <span className="text-red-600 text-xs font-heading font-semibold tracking-[0.3em] uppercase">Featured Story</span>
              </div>
              <p className="text-xl md:text-2xl text-stone-300 font-light leading-relaxed italic border-l-4 border-red-600 pl-6">
                {article.excerpt}
              </p>
            </div>

            {/* Main Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              {article.fullContent.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-stone-300 text-lg md:text-xl font-light leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="my-16 border-t border-white/10"></div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <FaFire className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-heading text-sm font-medium">REDHAWK JOURNAL</p>
                  <p className="text-stone-400 text-xs">Stories from the grill</p>
                </div>
              </div>
              
              <Link 
                to="/"
                className="group flex items-center gap-2 px-6 py-3 bg-transparent border border-white/10 hover:border-red-500 text-white rounded-full transition-all duration-300 uppercase tracking-widest text-xs font-medium"
              >
                <span>More Stories</span>
                <FiArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Related Articles Suggestion */}
          <div className="mt-16 text-center">
            <p className="text-stone-400 text-sm mb-4">Enjoyed this story?</p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest text-sm font-medium"
            >
              Explore More Articles
              <FiArrowLeft className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </article>
    </div>
  )
}

export default ArticleReader

