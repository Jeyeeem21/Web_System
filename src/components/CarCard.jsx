import React from 'react';
import Button from './button';

const CarCard = ({ car, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold">{car.year} {car.make} {car.model}</h4>
        <p className="text-sm text-gray-500">{car.mileage} miles • {car.color}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
          <Button label={'Add to cart'} variant={'primary'} onClick={() => onAddToCart(car)} />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
