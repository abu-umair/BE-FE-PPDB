import React, { useState } from 'react';
import { postData } from '@/services/user.service';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PengumumanAdmin = () => {
  const auth = useSelector((state) => state.user);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('message', text);
    if (file) formData.append('file', file);

    try {
      const response = await postData('/announcement', formData, auth.token, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Pengumuman berhasil dibuat!');
      setText('');
      setFile(null);
      console.log('Pengumuman berhasil dikirim:', response);
    } catch (error) {
      toast.error('Kesalahan saat mengirim pengumuman.');
      console.error('Kesalahan saat mengirim pengumuman:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Tulis Pengumuman</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ReactQuill
          theme="snow"
          value={text}
          onChange={setText}
          modules={{
            toolbar: [
              [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              [{ 'align': [] }],
              ['clean']
            ],
          }}
          placeholder="Tulis pesan Anda"
        />
        <input type="file" onChange={handleFileChange} />
        {file && (
          <div className="flex items-center space-x-2">
            <span>{file.name}</span>
            <button
              type="button"
              onClick={handleFileDelete}
              className="text-red-500"
            >
              Hapus
            </button>
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default PengumumanAdmin;
