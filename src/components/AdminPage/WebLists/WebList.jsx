import React from "react";
import WebListForm from "./components/WebListForm";
import WebListItem from "./components/WebListItem";
import Popup from "./components/Popup";
import useWebList from "./components/useWebList";

const WebList = () => {
  const {
    images,
    categories,
    title,
    setTitle,
    categoryId,
    setCategoryId,
    imageFile,
    setImageFile,
    editId,
    handleSubmit,
    handleEdit,
    handleDelete,
    popupMessage,
    showPopup,
    closePopup,
  } = useWebList();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Data Gambar 🎨
      </h1>

      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}

      <WebListForm
        title={title}
        setTitle={setTitle}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        imageFile={imageFile}
        setImageFile={setImageFile}
        handleSubmit={handleSubmit}
        editId={editId}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {images.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">
            Belum ada gambar.
          </p>
        ) : (
          images.map((img) => (
            <WebListItem
              key={img.id}
              image={img}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WebList;
