import React from 'react';
import Button from './button';

const Hero = () => {
  return (
    <section id='home' className="w-full flex flex-col md:flex-row items-center justify-between px-0 py-0 min-h-screen">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-20 md:py-32 gap-12">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          Find Your Next Car with{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Confidence</span>
        </h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Browse reliable listings, compare prices, get financing, and book
          inspections — everything you need to buy your next vehicle in one place.
        </p>
        <Button
          label={'Browse Cars'}
          variant={'primary'}
          className={'px-8 py-4 text-lg'}
          onClick={() => { history.pushState(null, '', '/cars'); window.dispatchEvent(new PopStateEvent('popstate')); }}
        />
      </div>
  <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="Car"
          className="rounded-3xl shadow-2xl w-full max-w-xl hover:scale-105 transition-transform duration-500"
        />
        </div>
      </div>
    </section>
  );
};

export default Hero;
