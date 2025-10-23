import React from 'react';
import Button from './button';

const Modal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="w-full max-w-lg mx-4">
        <div className="bg-white rounded-lg shadow-xl transform transition duration-300 ease-out animate-modal-in">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sample Modal</h3>
              <Button onClick={onClose} variant="primary" label="X" />
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="Your name" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="you@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" className="mt-1 block w-full border rounded-md px-3 py-2" defaultValue={1} min={1} />
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={onClose} variant="primary" label="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
