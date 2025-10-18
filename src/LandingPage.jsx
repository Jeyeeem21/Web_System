
import React from 'react';
import Navbar from './components/Navbar';
import Button from './components/button';
import Hero from './components/Hero';
import Card from './components/Card';
import "./App.css";
import Footer from './components/Footer';
import Contact from './components/Contact';

function LandingPage() {
  const handleOrder = () => alert('Order clicked');
  const handleCart = () => alert('Cart clicked');

  const features = [
    { title: 'Wide Selection', icon: '🚗', description: 'Browse hundreds of cars from trusted sellers and dealers across the country.' },
    { title: 'Easy Financing', icon: '�', description: 'Flexible financing options and transparent loan terms to fit your budget.' },
    { title: 'Trusted Inspections', icon: '🔍', description: 'Pre-purchase inspections and vehicle history reports for peace of mind.' },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar onOrderClick={handleOrder} onCartClick={handleCart} />
      <Hero />

      <section id="features" className="w-full py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <p className="text-gray-600 text-lg">Powerful features designed to accelerate your development process</p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <Card key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white text-center py-20 px-6 md:px-12">
        <div className="w-full">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Launch Your Next Project?</h3>
          <p className="mb-10 text-lg text-indigo-100">Join thousands of developers who trust our modern UI components to build exceptional experiences.</p>
          <div className="flex items-center justify-center">
          <Button label={'Explore Cars'} variant={'white'} />
          </div>
        </div>
      </section>

  <Contact />
  <Footer />
    </div>
  );
}

export default LandingPage;
