import React, { useState, useEffect } from 'react';
import { fetchData } from '@/services/user.service';
import { MagnifyingGlassIcon, ArrowsPointingOutIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import Papa from 'papaparse';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

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

  const handleExportCSV = () => {
    const csvData = [
      {
        "No. Registrasi": "No. Registrasi",
        "Nik Siswa": "Nik Siswa",
        "NISN": "NISN",
        "No. KK": "No. KK",
        "Nama": "Nama",
        "Jenjang": "Jenjang",
        "Jenis Kelamin": "Jenis Kelamin",
        "No. HP": "No. HP",
        "Asal Sekolah": "Asal Sekolah",
        "Anak ke": "Anak ke",
        "Berat badan": "Berat badan",
        "Jenis Tempat Tinggal": "Jenis Tempat Tinggal",
        "Jumlah Saudara": "Jumlah Saudara",
        "Kota lahir": "Kota lahir",
        "Riwayat Penyakit": "Riwayat Penyakit",
        "Status dalam keluarga": "Status dalam keluarga",
        "Transportasi": "Transportasi"
      },
      ...data.map((item) => ({
        "No. Registrasi": item.users_id,
        "Nik Siswa": item.nik_siswa || '-',
        "NISN": item.nisn || '-',
        "No. KK": item.no_kk || '-',
        "Nama": item.name || '-',
        "Jenjang": item.jenjang || '-',
        "Jenis Kelamin": item.jenis_kelamin === 0 ? 'Laki-laki' : 'Perempuan',
        "No. HP": item.phone_santri || '-',
        "Asal Sekolah": item.asal_sekolah || '-',
        "Anak ke": item.anak_ke || '-',
        "Berat badan": item.berat_badan || '-',
        "Jenis Tempat Tinggal": item.jenis_tempat_tinggal || '-',
        "Jumlah Saudara": item.jumlah_saudara || '-',
        "Kota lahir": item.kota_lahir || '-',
        "Riwayat Penyakit": item.riwayat_penyakit || '-',
        "Status dalam keluarga": item.status_dalam_keluarga || '-',
        "Transportasi": item.transportasi || '-'
      }))
    ];

    const csv = Papa.unparse(csvData, {
      delimiter: ",",
      header: true,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'biodata_siswa.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportWaliCSV = () => {
    const csvDataWali = [
      {
        "NIK Ayah": "NIK Ayah",
        "Nama Ayah": "Nama Ayah",
        "Kota Lahir Ayah": "Kota Lahir Ayah",
        "Tanggal Lahir Ayah": "Tanggal Lahir Ayah",
        "No. HP Ayah": "No. HP Ayah",
        "Pekerjaan Ayah": "Pekerjaan Ayah",
        "Penghasilan Ayah": "Penghasilan Ayah",
        "NIK Ibu": "NIK Ibu",
        "Nama Ibu": "Nama Ibu",
        "Kota Lahir Ibu": "Kota Lahir Ibu",
        "Tanggal Lahir Ibu": "Tanggal Lahir Ibu",
        "No. HP Ibu": "No. HP Ibu",
        "Pekerjaan Ibu": "Pekerjaan Ibu",
        "Penghasilan Ibu": "Penghasilan Ibu",
        "Alamat": "Alamat"
      },
      ...data.map((item) => ({
        "NIK Ayah": item.user?.nik_ayah || '-',
        "Nama Ayah": item.user?.name || '-',
        "Kota Lahir Ayah": item.user?.kota_lahir_ayah || '-',
        "Tanggal Lahir Ayah": item.user?.dob_ayah || '-',
        "No. HP Ayah": item.user?.phone_ayah || '-',
        "Pekerjaan Ayah": item.user?.pekerjaan_ayah || '-',
        "Penghasilan Ayah": item.user?.penghasilan_ayah || '-',
        "NIK Ibu": item.user?.nik_ibu || '-',
        "Nama Ibu": item.user?.name_ibu || '-',
        "Kota Lahir Ibu": item.user?.kota_lahir_ibu || '-',
        "Tanggal Lahir Ibu": item.user?.dob_ibu || '-',
        "No. HP Ibu": item.user?.phone_ibu || '-',
        "Pekerjaan Ibu": item.user?.pekerjaan_ibu || '-',
        "Penghasilan Ibu": item.user?.penghasilan_ibu || '-',
        "Alamat": `${item.user?.address || '-'} ${item.user?.kelurahan || '-'} ${item.user?.kecamatan || '-'} ${item.user?.kabupaten_kota || '-'} ${item.user?.provinsi || '-'}`
      }))
    ];
  
    const csv = Papa.unparse(csvDataWali, {
      delimiter: ",",
      header: true,
    });
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'biodata_wali.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };  

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
    (item.jenjang && item.jenjang.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof item.jenis_kelamin === 'string' && item.jenis_kelamin.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.phone_santri && item.phone_santri.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.asal_sekolah && item.asal_sekolah.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const baseUrl = "https://beppdb.evolusidigital.id/storage/";

  // Determine pagination range
  const getPaginationRange = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      let pages = [1];

      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);

      return pages;
    }

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  const paginationRange = getPaginationRange();

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
        <div className="flex items-center space-x-4">
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
          <button
            className="flex items-center bg-[#282464] text-white px-4 py-2 rounded"
            onClick={handleExportCSV}
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Data Santri
          </button>
          <button
            className="flex items-center bg-[#4CAF50] text-white px-4 py-2 rounded"
            onClick={handleExportWaliCSV}
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Data Wali
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            <th className="px-4 py-4 border-b">No. Registrasi</th>
            <th className="px-4 py-4 border-b">Siswa</th>
            <th className="px-4 py-4 border-b">Jenjang</th>
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
                <td className="px-4 py-4 border-b">{item.jenjang}</td>
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
        {paginationRange.map((page, index) =>
          page === '...' ? (
            <span key={index} className="mx-1 px-3 py-1">...</span>
          ) : (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-900 text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
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
                  { label: "Jenjang", value: selectedItem.jenjang },
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