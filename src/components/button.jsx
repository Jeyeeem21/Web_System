import React from 'react';

const VARIANT_CLASSES = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold',
  ghost: 'text-gray-700 hover:text-indigo-600 transition-colors font-medium px-3 py-2 rounded-md border border-gray-200 bg-transparent',
  cart: 'bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium',
  white: 'bg-white text-indigo-600 font-bold px-10 py-4 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-lg',
};

const Button = ({ label, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const base = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`.trim()}>
      {label}
    </button>
  );
};

export default Button;
