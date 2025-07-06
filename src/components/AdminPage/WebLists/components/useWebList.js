import { useState, useEffect, useContext } from 'react';
import { AuthApi } from "../../../LoginRegister/api/AuthApi";

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

  useEffect(() => {
    fetchImages();
    fetchCategories();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await apiRequest('admin/weblists', 'GET');
      setImages(response.data);
    } catch (error) {
      showErrorPopup('Gagal mengambil gambar.');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiRequest('admin/categories', 'GET');
      setCategories(response.data);
    } catch (error) {
      showErrorPopup('Gagal mengambil kategori.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return showErrorPopup('Judul gambar tidak boleh kosong.');
    if (!categoryId) return showErrorPopup('Kategori harus dipilih.');
    if (!imageFile && !editId) return showErrorPopup('File gambar harus diupload.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category_id', categoryId);
    if (imageFile) formData.append('image', imageFile);

    try {
      if (editId) {
        await apiRequest(`admin/weblists/${editId}?_method=PUT`, 'POST', formData, true);
        showSuccessPopup('Gambar berhasil diupdate.');
      } else {
        await apiRequest('admin/weblists', 'POST', formData, true);
        showSuccessPopup('Gambar berhasil diupload.');
      }
      resetForm();
      fetchImages();
    } catch (error) {
      if (error?.data?.message) {
        showErrorPopup(error.data.message);
      } else {
        showErrorPopup('Gagal upload/update gambar.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest(`admin/weblists/${id}`, 'DELETE');
      showSuccessPopup('Gambar berhasil dihapus.');
      fetchImages();
    } catch (error) {
      if (error?.data?.message) {
        showErrorPopup(error.data.message);
      } else {
        showErrorPopup('Gagal menghapus gambar.');
      }
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

  const showSuccessPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
  };

  const showErrorPopup = (message) => {
    setPopupMessage(`Error: ${message}`);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return {
    images, categories, title, setTitle, categoryId, setCategoryId,
    imageFile, setImageFile, editId, handleSubmit, handleDelete,
    handleEdit, popupMessage, showPopup, closePopup
  };
};

export default useWebList;
