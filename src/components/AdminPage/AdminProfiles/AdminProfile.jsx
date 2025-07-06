import React, { useEffect, useState, useContext } from 'react';
import { AuthApi } from '../../LoginRegister/api/AuthApi';
import { toast } from 'react-toastify';

const AdminProfile = () => {
  const { apiRequest } = useContext(AuthApi);
  const [form, setForm] = useState({
    name: '',
    email: '',
    profile_picture: '',
    bio: '',
    phone: '',
    address: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Ambil data profil terbaru dari API
const fetchProfile = async () => {
  try {
    const response = await apiRequest('admin/profile', 'GET');

    // Cek apakah datanya dibungkus dalam 'data'
    const userData = response.data ? response.data : response;

    setForm({
      name: userData.name,
      email: userData.email,
      profile_picture: userData.profile_picture,
      bio: userData.bio || '',
      phone: userData.phone || '',
      address: userData.address || '',
    });
    setLoading(false);
  } catch (error) {
    console.error('❌ Gagal mengambil data profil:', error);
    toast.error('❌ Gagal mengambil data profil.');
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setForm({ ...form, profile_picture: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('bio', form.bio);
    formData.append('phone', form.phone);
    formData.append('address', form.address);
    if (form.profile_picture instanceof File) {
      formData.append('profile_picture', form.profile_picture);
    }

    try {
      await apiRequest('admin/profile/update', 'POST', formData, true);
      toast.success('✅ Profil berhasil diperbarui.');
      fetchProfile(); // Ambil data terbaru setelah update
    } catch (error) {
      console.error('❌ Gagal update profil:', error);
      toast.error('❌ Gagal update profil.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Profil Admin</h1>

      <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto space-y-4 bg-white rounded shadow">
        <div className="flex justify-center">
          <img
            src={previewImage || (form.profile_picture ? `${form.profile_picture}` : '/images/default-profile.png')}
            alt="Profile"
            className="object-cover w-32 h-32 mb-4 rounded-full"
          />
        </div>

        <input type="file" onChange={handleImageChange} className="p-2 border rounded" />

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nama"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          disabled
          className="w-full p-2 bg-gray-200 border rounded cursor-not-allowed"
          placeholder="Email"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Bio"
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Telepon"
        />

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Alamat"
        />

        <button type="submit" className="w-full py-2 text-white bg-purple-500 rounded hover:bg-purple-600">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
