import React from 'react'
import { FaLeaf, FaFire } from 'react-icons/fa'

const Story = () => {
  return (
    <section className="py-24 bg-stone-950 relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <FaFire className="text-red-600 text-xl" />
              <h2 className="text-sm font-heading font-semibold text-red-600 tracking-widest">THE ORIGIN</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-heading font-medium text-white mb-6 leading-none tracking-tight">THE REDHAWK LEGEND</h3>
            
            <div className="space-y-6 text-stone-400 font-light leading-relaxed">
              <p>
                Before the first burger hit the grill, there was the fire. The RedHawk represents vision, power, and guardianship. We adopted this symbol to represent our commitment to watching over every detail of our food, from the sourcing of premium meat to the precise moment it leaves the flame.
              </p>
              <p>
                We don't just make fast food; we craft modern sustenance rooted in the primal art of cooking over fire. Our spice blends are a closely guarded secret, inspired by native herbs and earth spices that bring a distinct, smoky warmth to our signature Kebabs and Smash Burgers.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <span className="block text-3xl font-heading font-medium text-white mb-1">100%</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">Angus Beef</span>
              </div>
              <div>
                <span className="block text-3xl font-heading font-medium text-white mb-1">24HR</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">Marinade Process</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-900 to-amber-900 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-stone-900 border border-white/10">
              <img 
                src="/5.jpg" 
                alt="Chef Grilling" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 hover:opacity-100"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-stone-950/90 backdrop-blur-sm border border-white/10 rounded">
                <div className="flex items-center gap-3">
                  <FaLeaf className="text-amber-500 text-2xl" />
                  <div>
                    <p className="text-white font-heading text-sm font-medium">SOURCED LOCALLY</p>
                    <p className="text-stone-500 text-xs">Respecting the land we serve.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Story

