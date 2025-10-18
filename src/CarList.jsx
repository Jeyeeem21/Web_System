import React from 'react';
import CarCard from './components/CarCard';
import cars from './data/cars';

const CarList = () => {
  const handleSelect = (car, qty) => {
    // navigate to order page with query params
    const params = new URLSearchParams({ carId: car.id, qty });
    history.pushState(null, '', '/order?' + params.toString());
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="cars" className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-8">Available Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map(car => (
            <CarCard key={car.id} car={car} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarList;
