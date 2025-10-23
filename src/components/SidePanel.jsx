import React from 'react';
import Button from './button';

const SidePanel = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-end md:justify-end items-end md:items-stretch">
      <div className="pointer-events-auto w-full md:w-96 bg-white rounded-t-lg md:rounded-none shadow-xl transform transition duration-300 ease-out animate-panel-in md:animate-panel-in-right">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Side Panel</h3>
            <Button onClick={onClose} variant="primary" label="Close" />
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">This is a simple side panel. On mobile it slides up from the bottom.</p>
            <div className="mt-4">
              <Button label="Action" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
