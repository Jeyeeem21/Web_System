import React, { useState } from 'react';

const CarCard = ({ car, onSelect }) => {
  const [qty, setQty] = useState(1);
  return (
    <div onClick={() => onSelect(car, qty)} className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer">
      <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold">{car.year} {car.make} {car.model}</h4>
        <p className="text-sm text-gray-500">{car.mileage} miles • {car.color}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
          <input type="number" min={1} value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)||1))} className="w-20 border border-gray-200 rounded px-2 py-1 text-sm" onClick={(e)=>e.stopPropagation()} />
        </div>
      </div>
    </div>
  );
};

export default CarCard;
