import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthApi } from '../../LoginRegister/api/AuthApi';

const WebDetail = () => {
  const { apiRequest } = useContext(AuthApi);
  const { id } = useParams();

  const [web, setWeb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [techStack, setTechStack] = useState('');
  const [price, setPrice] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [carouselFiles, setCarouselFiles] = useState([]);

  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => { fetchWebDetail(); }, []);

  const fetchWebDetail = async () => {
    setLoading(true);
    try {
      const res = await apiRequest(`admin/weblist/${id}`, 'GET');
      const detail = res.data.weblist_detail || {};

      setWeb({
        ...res.data,
        weblist_images: res.data.weblist_images || [],
        weblist_detail: detail
      });

      setDescription(detail.description || '');
      setFeatures(detail.features ? JSON.parse(detail.features).join(', ') : '');
      setTechStack(detail.tech_stack || '');
      setPrice(detail.price || '');
      setWebsiteLink(detail.website_link || '');
    } catch {
      showError('Gagal mengambil detail web.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDetail = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
await apiRequest(`admin/weblist/${id}/detail`, 'POST', {
  title: web.title,
  category_id: web.category_id,
  description,
  features: features ? features.split(',').map(f => f.trim()) : [],
  tech_stack: techStack,
  price,
  website_link: websiteLink
});


      showSuccess('Detail web berhasil diupdate.');
      fetchWebDetail();
    } catch (error) {
      showError(error?.data?.message || 'Gagal update detail.');
    } finally {
      setSubmitLoading(false);
    }
  };


  const handleDeleteCarousel = async (imageId) => {
    if (!window.confirm('Yakin mau menghapus gambar ini?')) return;

    setDeleteLoadingId(imageId);

    try {
      await apiRequest(`admin/weblist/images/${imageId}`, 'DELETE');
      showSuccess('Gambar carousel berhasil dihapus.');
      fetchWebDetail();
    } catch (error) {
      showError(error?.data?.message || 'Gagal menghapus gambar carousel.');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const showSuccess = (msg) => { setPopupMessage(msg); setShowPopup(true); };
  const showError = (msg) => { setPopupMessage(`Error: ${msg}`); setShowPopup(true); };
  const closePopup = () => { setShowPopup(false); setPopupMessage(''); };

  if (loading || !web) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Detail Web: {web.title}</h1>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm p-6 text-center bg-white rounded-lg shadow-lg">
            <p className="mb-4">{popupMessage}</p>
            <button onClick={closePopup} className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-600">OK</button>
          </div>
        </div>
      )}

      {/* Form Update Detail */}
      <form onSubmit={handleUpdateDetail} className="flex flex-col max-w-xl p-6 mx-auto mb-8 space-y-4 bg-white rounded shadow">
        <textarea placeholder="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} className="h-24 p-2 border rounded" />
        <textarea placeholder="Fitur (pisahkan dengan koma)" value={features} onChange={(e) => setFeatures(e.target.value)} className="h-24 p-2 border rounded" />
        <input type="text" placeholder="Tech Stack" value={techStack} onChange={(e) => setTechStack(e.target.value)} className="p-2 border rounded" />
        <input type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border rounded" />
        <input type="url" placeholder="Website Link" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} className="p-2 border rounded" />
        <button type="submit" disabled={submitLoading} className={`px-4 py-2 text-white rounded ${submitLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}>
          {submitLoading ? 'Loading...' : 'Update Detail'}
        </button>
      </form>

      {/* Tampilkan Carousel */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {web.weblist_images?.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">Belum ada gambar carousel.</p>
        ) : (
          web.weblist_images.map((img) => (
            <div key={img.id} className="relative p-4 bg-white rounded shadow">
              <img src={img.image_path} alt="Carousel" className="object-cover w-full h-48 mb-4 rounded" />
              <button
                onClick={() => handleDeleteCarousel(img.id)}
                disabled={deleteLoadingId === img.id}
                className={`absolute px-2 py-1 text-xs text-white rounded top-2 right-2 ${deleteLoadingId === img.id ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}>
                {deleteLoadingId === img.id ? 'Deleting...' : 'Hapus'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WebDetail;
