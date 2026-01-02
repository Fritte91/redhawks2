import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Menu from './components/Menu'
import Journal from './components/Journal'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  return (
    <div className="antialiased overflow-x-hidden selection:bg-red-700 selection:text-white bg-stone-950 text-stone-200">
      <Navbar />
      <Hero />
      <Story />
      <Menu />
      <Journal />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App

