import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Story from './Story'
import Menu from './Menu'
import Journal from './Journal'
import Newsletter from './Newsletter'
import Footer from './Footer'

const Home = () => {
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

export default Home


