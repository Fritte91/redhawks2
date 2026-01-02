import React from 'react'

const Hero = () => {
  return (
    <header className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/2.jpg" 
          alt="Fire and Smoke" 
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent"></div>
        <div className="absolute inset-0 pattern-native opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
          <div className="h-[1px] w-12 bg-red-600/50"></div>
          <span className="text-red-500 text-xs font-medium uppercase tracking-[0.3em] font-heading">Est. 2024 • Tribal Flavors</span>
          <div className="h-[1px] w-12 bg-red-600/50"></div>
        </div>
        
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-heading font-medium text-white mb-8 leading-[0.85] tracking-tight">
          SPIRIT OF<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-stone-100 to-stone-600">THE FIRE</span>
        </h1>
        
        <p className="text-stone-400 text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Where ancient grilling traditions meet the modern street food culture. A tribute to the land, the hunt, and the feast.
        </p>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-[1px] bg-gradient-to-b from-transparent via-red-900 to-red-600"></div>
      </div>
    </header>
  )
}

export default Hero

