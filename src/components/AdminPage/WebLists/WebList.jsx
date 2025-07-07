import React, { useState, useEffect, useContext } from 'react';
import { AuthApi } from '../../LoginRegister/api/AuthApi';
import { useNavigate } from 'react-router-dom';

// Popup Komponen
const Popup = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
      <p className="mb-4">{message}</p>
      <button onClick={onClose} className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600">OK</button>
    </div>
  </div>
);

// Form Komponen
const WebListForm = ({ title, setTitle, categoryId, setCategoryId, categories, imageFile, setImageFile, handleSubmit, editId, loading }) => (
  <form onSubmit={handleSubmit} className="flex flex-col max-w-md p-6 mx-auto mb-8 space-y-4 bg-white rounded shadow">
    <input type="text" placeholder="Judul Gambar" value={title} onChange={(e) => setTitle(e.target.value)} className="p-2 border rounded" />
    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="p-2 border rounded">
      <option value="">Pilih Kategori</option>
      {categories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
    </select>
    <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="p-2 border rounded" />

    <button type="submit" disabled={loading} className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'}`}>
      {loading ? 'Loading...' : editId ? 'Update Gambar' : 'Upload Gambar'}
    </button>
  </form>
);

// Item Komponen
const WebListItem = ({ image, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white rounded shadow">
      <img src={image.image_path} alt={image.title} className="object-cover w-full h-48 mb-4 rounded" />
      <h3 className="mb-2 text-lg font-semibold">{image.title}</h3>
      <p className="mb-2 text-sm text-gray-600">Category: {image.category?.name || 'Unknown'}</p>

      {image.admin && (
        <div className="flex items-center mb-2 space-x-2">
          <img src={image.admin.profile_picture || '/images/default-profile.png'} alt="Uploader" className="object-cover w-8 h-8 rounded-full" />
          <span className="text-sm text-gray-700">{image.admin.name}</span>
        </div>
      )}

      <div className="flex space-x-2">
        <button onClick={() => onEdit(image)} className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
        <button onClick={() => onDelete(image.id)} className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Hapus</button>
        <button onClick={() => navigate(`/admin/weblists/${image.id}`)} className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600">Detail</button>
      </div>
    </div>
  );
};

// Custom Hook
const useWebList = () => {
  const { apiRequest } = useContext(AuthApi);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await apiRequest('admin/weblists', 'GET');
      setImages(res.data);
    } catch {
      showError('Gagal mengambil gambar.');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await apiRequest('admin/categories', 'GET');
      setCategories(res.data);
    } catch {
      showError('Gagal mengambil kategori.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return showError('Judul gambar tidak boleh kosong.');
    if (!categoryId) return showError('Kategori harus dipilih.');
    if (!editId && !imageFile) return showError('File gambar harus diupload saat menambah.');

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category_id', categoryId);
    if (imageFile) formData.append('image', imageFile);
    formData.append('description', '');
    formData.append('features', '[]');
    formData.append('tech_stack', '');
    formData.append('price', '');
    formData.append('website_link', '');

    try {
      if (editId) {
        await apiRequest(`admin/weblists/${editId}?_method=PUT`, 'POST', formData, true);
        showSuccess('Gambar berhasil diupdate.');
      } else {
        await apiRequest('admin/weblists', 'POST', formData, true);
        showSuccess('Gambar berhasil diupload.');
      }
      resetForm();
      fetchImages();
    } catch (error) {
      showError(error?.data?.message || 'Gagal upload/update gambar.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin mau menghapus gambar ini?')) return;

    setLoading(true);
    try {
      await apiRequest(`admin/weblists/${id}`, 'DELETE');
      showSuccess('Gambar berhasil dihapus.');
      fetchImages();
    } catch (error) {
      showError(error?.data?.message || 'Gagal menghapus gambar.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image) => {
    setEditId(image.id);
    setTitle(image.title);
    setCategoryId(image.category_id);
    setImageFile(null);
  };

  const resetForm = () => {
    setTitle('');
    setCategoryId('');
    setImageFile(null);
    setEditId(null);
  };

  const showSuccess = (msg) => { setPopupMessage(msg); setShowPopup(true); };
  const showError = (msg) => { setPopupMessage(`Error: ${msg}`); setShowPopup(true); };
  const closePopup = () => { setShowPopup(false); setPopupMessage(''); };

  return {
    images, categories, title, setTitle, categoryId, setCategoryId, imageFile, setImageFile,
    editId, handleSubmit, handleDelete, handleEdit,
    popupMessage, showPopup, closePopup, loading
  };
};

// Komponen Utama
const WebList = () => {
  const {
    images, categories, title, setTitle, categoryId, setCategoryId, imageFile, setImageFile,
    editId, handleSubmit, handleEdit, handleDelete, popupMessage, showPopup, closePopup, loading
  } = useWebList();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Data Gambar 🎨</h1>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      <WebListForm
        title={title} setTitle={setTitle} categoryId={categoryId} setCategoryId={setCategoryId}
        categories={categories} imageFile={imageFile} setImageFile={setImageFile}
        handleSubmit={handleSubmit} editId={editId} loading={loading}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {images.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">Belum ada gambar.</p>
        ) : (
          images.map((img) => <WebListItem key={img.id} image={img} onEdit={handleEdit} onDelete={handleDelete} />)
        )}
      </div>
    </div>
  );
};

export default WebList;
