import React from 'react';
import Button from './button';
import { Car } from 'lucide-react';

const Navbar = ({ onOrderClick, onCartClick }) => {
  return (
    <nav className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 xl:px-32 py-5 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MyBrand</h1>
      <div className="space-x-8 hidden md:flex items-center">
  <a href="#home" onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('home'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ window.scrollTo({top:0, behavior:'smooth'}); },120); } }} className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Home</a>
  <a href="#features" onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('features'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/#features'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ const el = document.getElementById('features'); if(el) el.scrollIntoView({behavior:'smooth'}); },120); } }} className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Features</a>
        <a href="/cars" onClick={(e)=>{ e.preventDefault(); history.pushState(null,'','/cars'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Cars</a>
  <a href="#contact" onClick={(e)=>{ e.preventDefault(); if(window.location.pathname === '/'){ const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); } else { history.pushState(null,'', '/#contact'); window.dispatchEvent(new PopStateEvent('popstate')); setTimeout(()=>{ const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); },120); } }} className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Contact</a>
      </div>
      <div className="flex items-center gap-4">
  <Button label={<><Car className="inline mr-2" size={18} />Cart</>} onClick={onCartClick} variant={'cart'} />
         <Button
          label={'Order'}
          variant={'primary'}
          className={'px-8 py-4 text-center text-lg'}
          onClick={() => { history.pushState(null, '', '/cars'); window.dispatchEvent(new PopStateEvent('popstate')); }}
        />
  
      </div>
    </nav>
  );
};

export default Navbar;
