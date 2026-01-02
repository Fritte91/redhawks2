import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

const Journal = () => {
  const articles = [
    {
      id: 1,
      title: "THE SMOKE SIGNAL: SECRETS OF OUR CHIPOTLE SAUCE",
      excerpt: "We traveled deep into the southwest to find the perfect smoked jalapeños. Here is the story of how our signature RedHawk sauce came to be.",
      image: "https://images.unsplash.com/photo-1596524430615-b46476ddc6aa?q=80&w=800&auto=format&fit=crop",
      category: "Recipes",
      date: "OCT 12, 2024",
      readTime: "5 MIN READ"
    },
    {
      id: 2,
      title: "GATHERING GROUNDS: THE COMMUNITY FEAST",
      excerpt: "Why eating together matters. We explore the tradition of the communal meal and how we are bringing that spirit to our downtown location.",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop",
      category: "Culture",
      date: "SEP 28, 2024",
      readTime: "3 MIN READ"
    },
    {
      id: 3,
      title: "BEYOND THE BURGER: THE KEBAB EVOLUTION",
      excerpt: "Tracing the history of the spit-roast and how we've adapted an ancient cooking method for the modern RedHawk kitchen.",
      image: "https://images.unsplash.com/photo-1542344807-167bb33c1626?q=80&w=800&auto=format&fit=crop",
      category: "Origin",
      date: "SEP 15, 2024",
      readTime: "4 MIN READ"
    }
  ]

  return (
    <section className="py-24 bg-[#0c0a09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-heading font-medium text-white mb-2 tracking-tight">TRIBAL <span className="text-stone-600">JOURNAL</span></h2>
            <p className="text-stone-400 font-light text-sm max-w-md">Stories from the grill, culture pieces, and the secrets behind our recipes.</p>
          </div>
          <div className="flex gap-2">
            <a href="#" className="text-xs font-medium text-white hover:text-red-500 border-b border-red-600 pb-0.5 transition-colors uppercase tracking-widest">View Archive</a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <article key={article.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-6 border border-white/5">
                <div className="absolute inset-0 bg-red-900/10 z-10 group-hover:bg-transparent transition-colors"></div>
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-stone-950/80 backdrop-blur text-white text-[10px] font-heading font-semibold uppercase tracking-wider rounded-full border border-white/10">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3 text-xs text-stone-500">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-red-600"></span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-heading font-medium text-white mb-3 group-hover:text-red-500 transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center text-red-500 text-xs font-medium uppercase tracking-widest group-hover:gap-2 transition-all">
                Read Story <FiArrowRight className="ml-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journal

