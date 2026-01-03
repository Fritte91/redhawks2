import React from 'react'
import { FiFeather, FiMapPin, FiArrowUpRight, FiInstagram, FiFacebook, FiPhone, FiMail } from 'react-icons/fi'
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
                <div className="space-y-3 text-sm text-stone-500">
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-red-500 mt-0.5 shrink-0" />
                    <p className="font-light">Hua Hin<br />Prachuap Khiri Khan, Thailand</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-red-500 shrink-0" />
                    <a href="tel:+66811425861" className="font-light hover:text-red-500 transition-colors">+66 81 142 5861</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMail className="text-red-500 shrink-0" />
                    <a href="mailto:hello@redhawks.com" className="font-light hover:text-red-500 transition-colors">hello@redhawks.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3 min-h-[300px] relative rounded-lg overflow-hidden border border-white/10 group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.726013274!2d99.9547621!3d12.5454302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30fdab1f656658fd%3A0x895aeec57703c742!2sRedHawks%20Burger%20%26%20Kebab!5e0!3m2!1sen!2sth!4v1704290000000!5m2!1sen!2sth" 
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
                  <h5 className="text-white font-heading text-sm font-medium tracking-wide">HUA HIN</h5>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">Hua Hin<br />Prachuap Khiri Khan, Thailand</p>
                  <a href="https://www.google.com/maps/place/RedHawks+Burger+%26+Kebab/@12.5454302,99.9547621,17z/data=!3m1!4b1!4m6!3m5!1s0x30fdab1f656658fd:0x895aeec57703c742!8m2!3d12.545425!4d99.957337!16s%2Fg%2F11vd70rzz8?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-3 block hover:underline flex items-center gap-1">
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

