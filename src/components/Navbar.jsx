import React, { useState } from 'react'
import { FiFeather, FiAlignRight, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <span className="absolute inset-0 bg-red-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></span>
              <FiFeather className="text-red-500 relative z-10 transition-transform group-hover:-translate-y-1 duration-500 text-[28px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-semibold tracking-tighter text-white leading-none">REDHAWKS</span>
              <span className="font-heading text-[10px] text-stone-500 tracking-[0.2em] leading-none mt-0.5">BURGER & KEBAB</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#" className="text-xs font-medium text-white hover:text-red-500 transition-colors uppercase tracking-widest">The Legend</a>
            <a href="#menu" className="text-xs font-medium text-stone-400 hover:text-white transition-colors uppercase tracking-widest">Menu</a>
            <a href="#" className="text-xs font-medium text-stone-400 hover:text-white transition-colors uppercase tracking-widest">Journal</a>
            <button className="bg-stone-100 hover:bg-white text-stone-950 px-5 py-2 rounded-sm font-heading font-semibold tracking-wider transition-all text-xs flex items-center gap-2">
              ORDER NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiAlignRight className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/5 mt-4 pt-4">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-sm font-medium text-white hover:text-red-500 transition-colors uppercase tracking-widest">The Legend</a>
              <a href="#menu" className="text-sm font-medium text-stone-400 hover:text-white transition-colors uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>Menu</a>
              <a href="#" className="text-sm font-medium text-stone-400 hover:text-white transition-colors uppercase tracking-widest">Journal</a>
              <button className="bg-stone-100 hover:bg-white text-stone-950 px-5 py-2 rounded-sm font-heading font-semibold tracking-wider transition-all text-xs w-fit">
                ORDER NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

