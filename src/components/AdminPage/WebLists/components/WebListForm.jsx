import React from 'react';

const WebListForm = ({
  title, setTitle,
  categoryId, setCategoryId,
  categories,
  imageFile, setImageFile,
  handleSubmit,
  editId
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md p-6 mx-auto mb-8 space-y-4 bg-white rounded shadow">
      <input
        type="text"
        placeholder="Judul Gambar"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Pilih Kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="p-2 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600"
      >
        {editId ? 'Update Gambar' : 'Upload Gambar'}
      </button>
    </form>
  );
};

export default WebListForm;
