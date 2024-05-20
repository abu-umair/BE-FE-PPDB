import React from 'react';

const Formulir = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulir Pendaftaran</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input type="text" id="nama" name="nama" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
            <input type="date" id="tanggalLahir" name="tanggalLahir" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="jenisKelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
            <select id="jenisKelamin" name="jenisKelamin" className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm">
              <option value="">Pilih satu...</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Kirim</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulir;