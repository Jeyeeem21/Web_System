import React from 'react';
import CarCard from './components/CarCard';

const sampleCars = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2019, price: 13999, mileage: 42000, color: 'Silver', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg' },
  { id: 2, make: 'Honda', model: 'Civic', year: 2018, price: 14999, mileage: 38000, color: 'Black', image: 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg' },
  { id: 3, make: 'Ford', model: 'Mustang', year: 2016, price: 22999, mileage: 55000, color: 'Red', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg' },
  { id: 4, make: 'BMW', model: '3 Series', year: 2020, price: 27999, mileage: 22000, color: 'White', image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg' },
];

const CarList = () => {
  const handleAddToCart = (car) => {
    alert(`${car.make} ${car.model} added to cart`);
  };

  return (
    <section id="cars" className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-8">Available Cars</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCars.map(car => (
            <CarCard key={car.id} car={car} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarList;
