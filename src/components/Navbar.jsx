import React from 'react';
import Button from './button';

const Navbar = ({ onOrderClick, onCartClick }) => {
  return (
    <nav className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 xl:px-32 py-5 bg-white shadow-md sticky top-0 z-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MyBrand</h1>
      <div className="space-x-8 hidden md:flex items-center">
         <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Home</a>
        <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Features</a>
       
        <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">Contact</a>
      </div>
      <div className="flex items-center gap-4">
        <Button label={'Cart List'} onClick={onCartClick} variant={'cart'} />
        <Button label={'Order'} onClick={onOrderClick} variant={'primary'} />
      </div>
    </nav>
  );
};

export default Navbar;
