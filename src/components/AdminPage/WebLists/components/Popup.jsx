import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
