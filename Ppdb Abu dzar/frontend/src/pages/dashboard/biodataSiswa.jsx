import React, { useState, useEffect } from 'react';
import { fetchData } from '@/services/user.service';
import { MagnifyingGlassIcon, ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

const BiodataSiswa = () => {
  const auth = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageModal, setImageModal] = useState({ show: false, imageUrl: '' });
  const [activeTab, setActiveTab] = useState('siswa'); // State to manage active tab

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData('/student', auth.token);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, [auth]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDetailClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleImageClick = (imageUrl) => {
    setImageModal({ show: true, imageUrl });
  };

  const filteredData = data.filter(item =>
    (item.users_id && item.users_id.toString().includes(searchTerm)) ||
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.marhalah && item.marhalah.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof item.jenis_kelamin === 'string' && item.jenis_kelamin.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.phone_santri && item.phone_santri.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.asal_sekolah && item.asal_sekolah.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const baseUrl = "http://localhost:8000/storage/";

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-700">Show</label>
          <select
            id="itemsPerPage"
            className="border rounded px-2 py-1"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span className="text-gray-700">entries</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-4 py-2 pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-gray-500" />
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            <th className="px-4 py-4 border-b">No. Registrasi</th>
            <th className="px-4 py-4 border-b">Siswa</th>
            <th className="px-4 py-4 border-b">Marhalah</th>
            <th className="px-4 py-4 border-b">Jenis Kelamin</th>
            <th className="px-4 py-4 border-b">No. HP</th>
            <th className="px-4 py-4 border-b">Kartu Keluarga</th>
            <th className="px-4 py-4 border-b">Akta Lahir</th>
            <th className="px-4 py-4 border-b">Detail</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-4 border-b">{item.users_id}</td>
                <td className="px-4 py-4 border-b flex items-center justify-center">
                  <img src={`${baseUrl}${item.pas_photo}`} alt="profile" className="w-10 h-10 rounded-full mr-2" />
                  {item.name}
                </td>
                <td className="px-4 py-4 border-b">{item.marhalah}</td>
                <td className="px-4 py-4 border-b">
                  {item.jenis_kelamin === 0 ? 'Laki-laki' : item.jenis_kelamin === 1 ? 'Perempuan' : ''}
                </td>
                <td className="px-4 py-4 border-b">{item.phone_santri}</td>
                <td className="px-4 py-4 border-b">
                  <button
                    className="px-4 py-2 bg-transparent text-black border-solid rounded-full border-black border-2 font-medium"
                    onClick={() => handleImageClick(`${baseUrl}${item.kk}`)}
                  >
                    Lihat
                  </button>
                </td>
                <td className="px-4 py-4 border-b">
                  <button
                    className="px-4 py-2 bg-transparent text-black border-solid rounded-full border-black border-2 font-medium"
                    onClick={() => handleImageClick(`${baseUrl}${item.akta_lahir}`)}
                  >
                    Lihat
                  </button>
                </td>
                <td className="px-4 py-4 border-b">
                  <button
                    className="text-gray-600 hover:underline"
                    onClick={() => handleDetailClick(item)}
                  >
                    <ArrowsPointingOutIcon className="h-6 w-6 text-black" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border-b" colSpan="8">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700'}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700'}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg p-6 w-3/4 max-w-4xl overflow-y-auto" style={{ maxHeight: '80vh' }}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              onClick={() => setShowModal(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-6">Detail Siswa</h2>
            <div className="border-b border-gray-300 mb-4 flex">
              <button
                className={`px-4 py-2 transition-colors duration-300 ${activeTab === 'siswa' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                onClick={() => setActiveTab('siswa')}
              >
                Biodata Siswa
              </button>
              <button
                className={`px-4 py-2 ml-2 transition-colors duration-300 ${activeTab === 'orangtua' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'}`}
                onClick={() => setActiveTab('orangtua')}
              >
                Biodata Orang Tua
              </button>
            </div>
            {activeTab === 'siswa' && (
              <div className="grid grid-cols-3 gap-4 text-sm text-left text-gray-600">
                {[
                  { label: "No. Registrasi", value: selectedItem.users_id },
                  { label: "NIK Siswa", value: selectedItem.nik_siswa },
                  { label: "NISN", value: selectedItem.nisn },
                  { label: "Nama", value: selectedItem.name },
                  { label: "No. KK", value: selectedItem.no_kk },
                  { label: "Anak ke-", value: selectedItem.anak_ke },
                  { label: "Jumlah Saudara", value: selectedItem.jumlah_saudara },
                  { label: "Marhalah", value: selectedItem.marhalah },
                  { label: "Jenis Kelamin", value: selectedItem.jenis_kelamin === 0 ? 'Laki-laki' : selectedItem.jenis_kelamin === 1 ? 'Perempuan' : '-' },
                  { label: "Tempat/Tgl Lahir", value: `${selectedItem.kota_lahir} ${selectedItem.dob}` },
                  { label: "No. HP", value: selectedItem.phone_santri },
                  { label: "Asal Sekolah", value: selectedItem.asal_sekolah },
                  { label: "Tinggi Badan", value: selectedItem.tinggi_badan },
                  { label: "Berat Badan", value: selectedItem.berat_badan },
                  { label: "Jenis Tempat Tinggal", value: selectedItem.jenis_tempat_tinggal },
                  { label: "Riwayat Penyakit", value: selectedItem.riwayat_penyakit },
                  { label: "Status dalam Keluarga", value: selectedItem.status_dalam_keluarga },
                  { label: "Transportasi", value: selectedItem.transportasi }
                ].map((row, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.label}</span>
                    <span className="mt-1">{row.value || '-'}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'orangtua' && (
              <div className="grid grid-cols-3 gap-4 text-sm text-left text-gray-600">
                {[
                  { label: "NIK Ayah", value: selectedItem.user.nik_ayah },
                  { label: "Nama Ayah", value: selectedItem.user.name },
                  { label: "Email", value: selectedItem.user.email },
                  { label: "Pekerjaan Ayah", value: selectedItem.user.pekerjaan_ayah },
                  { label: "Tempat/Tanggal Lahir Ayah", value: `${selectedItem.user.kota_lahir_ayah} ${selectedItem.user.dob_ayah}` },
                  { label: "No. Hp Ayah", value: selectedItem.user.phone_ayah },
                  { label: "NIK Ibu", value: selectedItem.user.nik_ibu },
                  { label: "Nama Ibu", value: selectedItem.user.name_ibu },
                  { label: "Tempat/Tanggal Lahir Ibu", value: `${selectedItem.user.kota_lahir_ibu} ${selectedItem.user.dob_ibu}` },
                  { label: "Pekerjaan Ibu", value: selectedItem.user.pekerjaan_ibu },
                  { label: "No. Hp Ibu", value: selectedItem.user.phone_ibu },
                  { label: "Alamat Orang Tua", value: `${selectedItem.user.address} ${selectedItem.user.kelurahan} ${selectedItem.user.kecamatan} ${selectedItem.user.kabupaten_kota} ${selectedItem.user.provinsi}` }
                ].map((row, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.label}</span>
                    <span className="mt-1">{row.value || '-'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {imageModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Image Preview</h2>
            <div className="flex justify-center">
              <img src={imageModal.imageUrl} alt="Preview" className="max-h-screen" />
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setImageModal({ show: false, imageUrl: '' })}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataSiswa;