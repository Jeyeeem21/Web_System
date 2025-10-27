export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-[#D4AF37]/20 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
              © 2025 <span className="text-[#D4AF37] font-semibold">MCDCN3</span> Dental Clinic. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-200">
              Contact Us
            </a>
          </div>

          {/* Social Links or Version */}
          <div className="text-xs text-gray-500">
            Version 1.0.0
          </div>
        </div>
      </div>
    </footer>
  )
}
