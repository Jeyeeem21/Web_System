import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-700 text-gray-100 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">© 2025 <span className="font-semibold">MyBrand</span> — All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-sm text-gray-200 hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="text-sm text-gray-200 hover:text-white transition-colors">Terms</a>
            <a href="#contact" className="text-sm text-gray-200 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
