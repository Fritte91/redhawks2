import React, { useState } from 'react'
import { FiMail, FiSend } from 'react-icons/fi'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribed:', email)
    setEmail('')
  }

  return (
    <section className="py-20 relative overflow-hidden bg-stone-900 border-y border-white/5">
      {/* Texture */}
      <div className="absolute inset-0 pattern-native opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/20 blur-[100px] rounded-full"></div>

      <div className="max-w-xl mx-auto px-4 relative z-10 text-center">
        <FiSend className="mx-auto text-stone-600 mb-6 text-4xl" />
        <h2 className="text-3xl font-heading font-medium text-white mb-4 tracking-tight">JOIN THE TRIBE</h2>
        <p className="text-stone-400 font-light mb-8">Receive exclusive invites to our tasting events and secret menu drops. No spam, just smoke.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input 
              type="email" 
              placeholder="enter your email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-950 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-stone-600 font-light text-sm"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600">
              <FiMail className="text-base" />
            </div>
          </div>
          <button 
            type="submit"
            className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-sm font-heading font-semibold tracking-wider text-sm transition-all shadow-[0_0_20px_rgba(185,28,28,0.3)] hover:shadow-[0_0_30px_rgba(185,28,28,0.5)]"
          >
            SUBSCRIBE
          </button>
        </form>
        <p className="text-stone-600 text-[10px] mt-4 uppercase tracking-widest">We respect your privacy.</p>
      </div>
    </section>
  )
}

export default Newsletter

