import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import reactLogo from '../../assets/react.svg'

export default function ClientFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-black border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-50"></div>
                <img src={reactLogo} alt="Logo" className="h-10 w-10 relative z-10" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                Dental Clinic
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Providing exceptional dental care with state-of-the-art technology and compassionate service. Your smile is our priority.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services-client" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/doctors-client" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300"></span>
                  Our Doctors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-[#D4AF37] group-hover:w-4 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">General Dentistry</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Teeth Whitening</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Dental Implants</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Orthodontics</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Root Canal</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>123 Dental Street, Medical District, City 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>info@dentalclinic.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <div>Mon-Fri: 8:00 AM - 6:00 PM</div>
                  <div>Sat: 9:00 AM - 2:00 PM</div>
                  <div>Sun: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© {currentYear} Dental Clinic. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </Link>
              <Link to="/dashboard" className="hover:text-[#D4AF37] transition-colors">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
