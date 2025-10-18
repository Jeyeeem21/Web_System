import React, { useState, useEffect } from 'react';
import cars from './data/cars';
import Button from './components/button';

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const OrderPage = () => {
  const query = useQuery();
  const carId = Number(query.get('carId')) || null;
  const qty = Number(query.get('qty')) || 1;
  const car = cars.find(c => c.id === carId) || null;

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(()=>{
    // if no car, redirect home
    if(!car) {
      history.pushState(null,'','/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  },[car]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: POST to your backend
    alert(`Order placed for ${qty} x ${car.make} ${car.model} by ${form.name}`);
    history.pushState(null,'','/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if(!car) return null;

  const total = car.price * qty;
  const canSubmit = form.name.trim() !== '' && form.email.trim() !== '';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Order: {car.year} {car.make} {car.model}</h2>
        <div className="space-x-3">
          <Button label={'Back'} variant={'primary'} onClick={() => history.back()} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-black ">
        <div className="md:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>

              <div className="pt-4">
                <Button type="submit" label={'Place Order'} variant={'primary'} className={canSubmit ? '' : 'opacity-60 pointer-events-none'} />
              </div>
            </form>
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-4">
            <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-40 object-cover rounded-md mb-4" />
            <h4 className="font-semibold">{car.year} {car.make} {car.model}</h4>
            <p className="text-sm text-black">{car.mileage.toLocaleString()} miles • {car.color}</p>
            <div className="mt-4">
              <div className="text-sm text-black">Quantity</div>
              <div className="text-lg font-bold">{qty}</div>
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="text-sm text-black">Price each</div>
              <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
              <div className="text-sm text-black">Total</div>
              <div className="text-2xl font-extrabold">${total.toLocaleString()}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrderPage;
