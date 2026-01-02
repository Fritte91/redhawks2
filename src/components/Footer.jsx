import React from 'react'
import { FiFeather, FiMapPin, FiArrowUpRight, FiInstagram, FiFacebook } from 'react-icons/fi'
import { SiTiktok } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className="bg-stone-950 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand & Links */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FiFeather className="text-red-600 text-2xl" />
                <span className="font-heading text-lg font-semibold text-white tracking-tight">REDHAWKS</span>
              </div>
              <p className="text-stone-500 text-sm font-light max-w-sm">
                Authentic flavors, modern spirit. RedHawks brings the heat of the grill to the heart of the city. Eat bold.
              </p>
            </div>
            
            <div className="flex justify-between max-w-sm">
              {/* Links */}
              <div>
                <h4 className="text-white font-heading text-sm font-medium tracking-widest mb-6">EXPLORE</h4>
                <ul className="space-y-4 text-sm text-stone-500 font-light">
                  <li><a href="#" className="hover:text-red-500 transition-colors">Our Story</a></li>
                  <li><a href="#menu" className="hover:text-red-500 transition-colors">The Menu</a></li>
                  <li><a href="#" className="hover:text-red-500 transition-colors">Locations</a></li>
                </ul>
              </div>
              {/* Contact */}
              <div>
                <h4 className="text-white font-heading text-sm font-medium tracking-widest mb-6">CONNECT</h4>
                <div className="flex gap-4 mb-6">
                  <a href="#" className="text-stone-500 hover:text-white transition-colors">
                    <FiInstagram className="text-xl" />
                  </a>
                  <a href="#" className="text-stone-500 hover:text-white transition-colors">
                    <FiFacebook className="text-xl" />
                  </a>
                  <a href="#" className="text-stone-500 hover:text-white transition-colors">
                    <SiTiktok className="text-lg" />
                  </a>
                </div>
                <p className="text-stone-500 text-sm">hello@redhawks.com</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 min-h-[300px] relative rounded-lg overflow-hidden border border-white/10 group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.90502179144!2d-0.07921358407421876!3d51.51490281797828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487603348821f8d9%3A0x673322194c7943e8!2sBrick%20Ln%2C%20London!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk" 
              className="map-dark w-full h-full object-cover" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="RedHawks Location"
            ></iframe>
            
            {/* Floating Location Card */}
            <div className="absolute bottom-6 left-6 bg-stone-950/90 backdrop-blur-md border border-white/10 p-5 rounded-md shadow-2xl max-w-xs transition-transform transform group-hover:-translate-y-1 duration-500">
              <div className="flex items-start gap-4">
                <div className="bg-red-900/20 p-2.5 rounded-full text-red-500 shrink-0">
                  <FiMapPin className="text-lg" />
                </div>
                <div>
                  <h5 className="text-white font-heading text-sm font-medium tracking-wide">DOWNTOWN HQ</h5>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">88 Spitfire Ave, District 9<br />London, UK</p>
                  <a href="#" className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-3 block hover:underline flex items-center gap-1">
                    Get Directions <FiArrowUpRight className="text-xs" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-600 text-xs uppercase tracking-wider">© 2024 RedHawks Burger & Kebab.</p>
          <div className="flex gap-6">
            <a href="#" className="text-stone-600 hover:text-stone-400 text-xs transition-colors">Privacy</a>
            <a href="#" className="text-stone-600 hover:text-stone-400 text-xs transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

