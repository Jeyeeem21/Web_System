import React from 'react';
import CarList from './CarList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const CarsPage = () => {
  const handleOrder = () => alert('Order clicked');
  const handleCart = () => alert('Cart clicked');

  return (
    <div className="bg-white min-h-screen w-full text-black">
      <Navbar onOrderClick={handleOrder} onCartClick={handleCart} />
      <CarList />
      <Footer />
    </div>
  );
};

export default CarsPage;
