import React, { useState, useEffect } from 'react';
import { fetchData, deleteData, postData } from '@/services/user.service';
import { PrinterIcon, TrashIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DataFormulir = () => {
  const auth = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);

  // States for date filtering
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

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

  const handleDelete = async () => {
    try {
      await deleteData(`/student/${itemToDelete}`, auth.token);
      setData(data.filter(item => item.id !== itemToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handlePrint = (item) => {
    const headerPrint = '/img/kop-surat.png';
    const sudahBayarImage = '/img/sudah-bayar.png';
    const belumBayarImage = '/img/belum-bayar.png';
    const ttdUrl = '/img/ttd.png';

    const isPaidStatus = ['settlement', 'capture', 'paid'].includes(item.status_payment);
    const statusImage = isPaidStatus ? sudahBayarImage : belumBayarImage;
    const statusText = isPaidStatus ? 'Sudah Bayar' : 'Belum Bayar';

    const printContent = `
      <style>
         @page {
          size: landscape;
          margin: 20px; /* Margins untuk halaman cetak */
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 1000px; /* Sesuaikan lebar */
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
          padding: 20px 0;
        }
        .header img {
          max-width: 1000px;
        }
        .header h1 {
          margin: 0;
          font-size: 1.8em;
        }
        .content {
          text-align: left;
          margin-bottom: 20px;
        }
        .content h4 {
          text-align: center; /* Teks judul di tengah */
          margin: 0 0 20px 0; /* Margin untuk h4 */
        }
        .content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .content th, .content td {
          padding: 10px;
          text-align: left;
          border: none; /* Hapus border */
        }
        .content th {
          font-weight: bold;
        }
        .status {
          text-align: left; /* Rata kiri */
          margin-top: 20px;
          display: inline-block; /* Untuk tata letak inline */
          width: 40%; /* Lebar untuk tata letak inline */
        }
        .status img {
          max-width: 100px;
          display: block;
          margin: 0 0 10px 0;
        }
        .status p {
          font-weight: bold;
          color: ${['settlement', 'capture', 'paid'].includes(item.status_payment) ? 'green' : 'red'};
        }
        .signature {
          text-align: right; /* Rata kanan */
          margin-top: 20px;
          display: inline-block; /* Untuk tata letak inline */
          width: 40%; /* Lebar untuk tata letak inline */
        }
        .signature img {
          max-width: 200px;
          display: block;
          margin: 0 auto 10px auto;
        }
      </style>
      <div class="container">
        <div class="header">
          <img src="${headerPrint}" alt="Kop Surat" />
        </div>
        <div class="content">
          <h4>Bukti Pembelian Formulir Pendaftaran Calon Santri Baru</h4>
          <table>
            <tr>
              <th>No. Registrasi</th>
              <td>${item.users_id}</td>
            </tr>
            <tr>
              <th>No. HP</th>
              <td>${item?.user?.phone_ayah}</td>
            </tr>
            <tr>
              <th>Nama</th>
              <td>${item.name}</td>
            </tr>
            <tr>
              <th>Biaya</th>
              <td>${item.biaya}</td>
            </tr>
            <tr>
              <th>Asal Sekolah</th>
              <td>${item.asal_sekolah}</td>
            </tr>
          </table>
        </div>
        <div class="status">
          <img src="${statusImage}" alt="${statusText}" />
          <p>${statusText}</p>
        </div>
        <div class="signature">
          <p>Tangerang Selatan, ${new Date().toLocaleDateString()}</p>
          <img src="${ttdUrl}" alt="Tanda Tangan" />
          <p><strong>Panitia PSB</strong></p>
        </div>
      </div>
    `;

    const printWindow = window.open('', '', 'height=800,width=1100');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
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

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setSelectedItems(!selectedAll ? data.map((item) => item.id) : []);
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleStatusChange = async () => {
    const newStatusValue = newStatus === 'sudah bayar' ? 'capture' : 'cancel';
    try {
      await Promise.all(
        selectedItems.map((id) =>
          postData(`/student/${id}`, { status_payment: newStatusValue }, auth.token)
        )
      );
      setData(
        data.map((item) =>
          selectedItems.includes(item.id)
            ? { ...item, status_payment: newStatusValue }
            : item
        )
      );
      setSelectedItems([]);
      setSelectedAll(false);
    } catch (error) {
      console.error('Error updating data', error);
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.created_at);
      const isWithinDateRange =
        (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

      return (
        isWithinDateRange &&
        (
          (item.users_id && item.users_id.toString().includes(searchTerm)) ||
          (item?.user?.phone_ayah && item?.user?.phone_ayah.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item?.user?.name && item?.user?.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.biaya && item.biaya.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.asal_sekolah && item.asal_sekolah.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.status_payment && item.status_payment.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    });

    setFilteredData(filtered);
  }, [data, searchTerm, startDate, endDate]);

  // Logic for displaying current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Pagination logic
  const paginationRange = () => {
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      let pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage > 3) {
        pages = ['...', ...pages];
      }

      if (currentPage < totalPages - 2) {
        pages = [...pages, '...'];
      }

      return [1, ...pages, totalPages];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

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
        <div className="relative flex items-center space-x-2">
          <span className="text-gray-700">Filter By:</span>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            isClearable
            placeholderText="Select date range"
            className="border rounded px-4 py-2"
          />
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
        <div className="flex items-center">
              <Select
                options={[
                  { value: 'sudah bayar', label: 'Sudah Bayar' },
                  { value: 'belum bayar', label: 'Belum Bayar' }
                ]}
                onChange={(selectedOption) => setNewStatus(selectedOption.value)}
                value={{ value: newStatus, label: newStatus ? newStatus : 'Select Status' }}
                placeholder="Select Status"
                isClearable
                className="min-w-[150px]"
              />
              <button
                className="ml-2 px-4 py-2 bg-[#4CAF50] hover:bg-green-900 text-white font-medium rounded"
                onClick={handleStatusChange}
                disabled={!selectedItems.length || !newStatus}
              >
                Update status
              </button>
            </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            <th className="px-4 py-4 border-b">
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={handleSelectAll}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
            </th>
            <th className="px-4 py-4 border-b">No. Registrasi</th>
            <th className="px-4 py-4 border-b">No.hp</th>
            <th className="px-4 py-4 border-b">Nama Siswa/i</th>
            <th className="px-4 py-4 border-b">Nama Wali</th>
            <th className="px-4 py-4 border-b">Biaya</th>
            <th className="px-4 py-4 border-b">Asal Sekolah</th>
            <th className="px-4 py-4 border-b">Status</th>
            <th className="px-4 py-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F7F6FE]'}>
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </td>
                <td className="px-4 py-4 border-b">{item.users_id}</td>
                <td className="px-4 py-4 border-b">{item?.user?.phone_ayah}</td>
                <td className="px-4 py-4 border-b">{item.name}</td>
                <td className="px-4 py-4 border-b">{item?.user?.name}</td>
                <td className="px-4 py-4 border-b">{item.biaya}</td>
                <td className="px-4 py-4 border-b">{item.asal_sekolah}</td>
                <td className="px-4 py-4 border-b">
                  <span
                    className={`inline-block px-4 py-2 text-xs font-medium rounded-full ${
                      ['settlement', 'capture', 'paid'].includes(item.status_payment)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {['settlement', 'capture', 'paid'].includes(item.status_payment)
                      ? 'Sudah Bayar'
                      : 'Belum Bayar'}
                  </span>
                </td>
                <td className="px-4 py-4 border-b flex justify-center space-x-2">
                  <button
                    className="text-[#282464] hover:text-blue-900"
                    onClick={() => handlePrint(item)}
                  >
                    <PrinterIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-800 hover:text-red-900"
                    onClick={() => {
                      setItemToDelete(item.id);
                      setShowModal(true);
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
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
        {paginationRange().map((page, index) =>
          page === '...' ? (
            <span key={index} className="mx-1 px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-[#282464] text-white' : 'bg-gray-300 text-black'}`}
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFormulir;