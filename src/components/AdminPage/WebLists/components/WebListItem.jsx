import React from 'react';

const WebListItem = ({ image, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <img
        src={`${image.image_path}`}
        alt={image.title}
        className="object-cover w-full h-48 mb-4 rounded"
      />
      <h3 className="mb-2 text-lg font-semibold">{image.title}</h3>

      {/* ✅ Tampilkan Nama Kategori */}
      <p className="mb-2 text-sm text-gray-600">
        Category: {image.category?.name || 'Unknown'}
      </p>

      {/* ✅ Tampilkan Uploader Admin */}
      {image.admin && (
        <div className="flex items-center mb-2 space-x-2">
          <img
            src={image.admin.profile_picture ? `${image.admin.profile_picture}` : '/images/default-profile.png'}
            alt="Uploader"
            className="object-cover w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-700">{image.admin.name}</span>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(image)}
          className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(image.id)}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default WebListItem;
