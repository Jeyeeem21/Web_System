import React, { useState } from 'react';
import Button from './button';
import Modal from './Modal';
import SidePanel from './SidePanel';
import { Car, Home, Grid, Phone, ShoppingCart, MoreVertical } from 'lucide-react';

const Navbar = ({ onOrderClick, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.location.pathname === '/') {
        const sections = ['home', 'features', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.slice(1);
      if (path === '/cars') {
        setActiveSection('cars');
      } else if (hash) {
        setActiveSection(hash);
      } else if (path === '/') {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const getNavLinkClass = (section) => {
    return `transition-colors font-medium ${
      activeSection === section 
        ? 'text-indigo-600 font-semibold'
        : 'text-gray-700 hover:text-indigo-600'
    }`;
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 xl:px-32 py-5 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between flex-1 md:flex-initial">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MyBrand</h1>

          {/* mobile dropdown trigger */}
          <div className="relative md:hidden ml-4">
            <Button
              label={<MoreVertical size={20} />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="primary"
              className="!px-3 !py-2"
            />

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <Button
                    label="Open Modal"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsModalOpen(true);
                    }}
                    variant="primary"
                    className="w-full text-left"
                  />
                  <Button
                    label="Open Side Panel"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPanelOpen(true);
                    }}
                    variant="primary"
                    className="w-full text-left"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-x-8 hidden md:flex items-center">
          <a href="#home" onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('home'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ window.scrollTo({top:0, behavior:'smooth'}); },120); } }} className={getNavLinkClass('home')}>Home</a>
          <a href="#features" onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('features'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/#features'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ const el = document.getElementById('features'); if(el) el.scrollIntoView({behavior:'smooth'}); },120); } }} className={getNavLinkClass('features')}>Features</a>
          <a href="/cars" onClick={(e)=>{ e.preventDefault(); history.pushState(null,'','/cars'); window.dispatchEvent(new PopStateEvent('popstate')); }} className={getNavLinkClass('cars')}>Cars</a>
          <a href="#contact" onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/#contact'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); },120); } }} className={getNavLinkClass('contact')}>Contact</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            label={'Order'}
            variant={'primary'}
            className={'px-8 py-4 text-center text-lg'}
            onClick={() => { history.pushState(null, '', '/cars'); window.dispatchEvent(new PopStateEvent('popstate')); }}
          />

          <div className="relative">
            <Button
              label={<MoreVertical size={20} />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="primary"
              className="!px-3 !py-2"
            />

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <Button
                    label="Open Modal"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsModalOpen(true);
                    }}
                    variant="primary"
                    className="w-full text-left"
                  />
                  <Button
                    label="Open Side Panel"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPanelOpen(true);
                    }}
                    variant="primary"
                    className="w-full text-left"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile footer icon bar (icon-only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 border-t">
        <div className="w-full flex justify-between items-center px-6 py-3 max-w-none">
          <button 
            aria-label="Home" 
            onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('home'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ window.scrollTo({top:0, behavior:'smooth'}); },120); } }} 
            className={`p-2 rounded-md hover:text-indigo-700 bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:outline-none appearance-none ${activeSection === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'}`}
            style={{background: activeSection === 'home' ? 'rgb(238 242 255)' : 'transparent', boxShadow:'none'}}
          >
            <Home size={22} />
          </button>

          <button 
            aria-label="Features" 
            onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('features'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/#features'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ const el = document.getElementById('features'); if(el) el.scrollIntoView({behavior:'smooth'}); },120); } }} 
            className={`p-2 rounded-md hover:text-indigo-700 bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:outline-none appearance-none ${activeSection === 'features' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'}`}
            style={{background: activeSection === 'features' ? 'rgb(238 242 255)' : 'transparent', boxShadow:'none'}}
          >
            <Grid size={22} />
          </button>

          <button 
            aria-label="Cars" 
            onClick={(e)=>{ e.preventDefault(); history.pushState(null,'','/cars'); window.dispatchEvent(new PopStateEvent('popstate')); }} 
            className={`p-2 rounded-md hover:text-indigo-700 bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:outline-none appearance-none ${activeSection === 'cars' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'}`}
            style={{background: activeSection === 'cars' ? 'rgb(238 242 255)' : 'transparent', boxShadow:'none'}}
          >
            <Car size={22} />
          </button>

          <button 
            aria-label="Contact" 
            onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/#contact'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); },120); } }} 
            className={`p-2 rounded-md hover:text-indigo-700 bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:outline-none appearance-none ${activeSection === 'contact' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600'}`}
            style={{background: activeSection === 'contact' ? 'rgb(238 242 255)' : 'transparent', boxShadow:'none'}}
          >
            <Phone size={22} />
          </button>

          <button
            aria-label="Cart"
            onClick={(e) => {
              e.preventDefault();
              history.pushState(null, '', '/cars');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="p-2 rounded-md text-indigo-600 hover:text-indigo-700 bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:outline-none appearance-none"
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            <ShoppingCart size={22} />
          </button>

          {/* <button aria-label="More" onClick={() => setIsPanelOpen(true)} className="p-2 rounded-md text-indigo-600 hover:text-indigo-700 bg-transparent border-0 shadow-none ring-0 focus:ring-0 focus:outline-none appearance-none" style={{background:'transparent', boxShadow:'none'}}>
            <MoreVertical size={22} />
          </button> */}
        </div>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SidePanel open={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </>
  );
};

export default Navbar;
