import React, { useState, useEffect } from 'react';
import { fetchData, updateData, deleteData } from '@/services/user.service';
import { PrinterIcon, TrashIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

const DataVerifikasi = () => {
  const auth = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const studentResponse = await fetchData('/student', auth.token);
        setData(studentResponse.data);

        const userResponse = await fetchData('/user', auth.token);
        setUserData(userResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, [auth]);

  const [userData, setUserData] = useState([]);

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
    const printContent = `
      <div>
        <h3>No. Registrasi: ${item.users_id}</h3>
        <p>No. WA: ${item.phone_santri}</p>
        <p>Nama: ${item.name}</p>
        <p>Jurusan: ${item.jurusan}</p>
        <p>Asal Sekolah: ${item.asal_sekolah}</p>
        <p>Status: ${item.status}</p>
      </div>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
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

  const handleCheckboxChange = (id) => {
    setSelectedItems(prevState =>
      prevState.includes(id)
        ? prevState.filter(itemId => itemId !== id)
        : [...prevState, id]
    );
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      const promises = selectedItems.map(itemId =>
        updateData(`/student/${itemId}`, { status: newStatus }, auth.token)
      );
      await Promise.all(promises);
      const updatedData = await fetchData('/student', auth.token);
      setData(updatedData.data);
      setSelectedItems([]);
      setNewStatus('');
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const filteredData = data.filter(item =>
    (item.users_id && item.users_id.toString().includes(searchTerm)) ||
    (item.phone_santri && item.phone_santri.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.dob && item.dob.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.biaya && item.biaya.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.asal_sekolah && item.asal_sekolah.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.jurusan && item.jurusan.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.status && item.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusText = (status) => {
    if (status === 'Diterima') return 'Diterima';
    if (status === 'Lulus Bersyarat') return 'Lulus Bersyarat';
    return 'Tidak Diterima';
  };

  const getStatusClass = (status) => {
    if (status === 'Diterima') return 'bg-green-100 text-green-700';
    if (status === 'Lulus Bersyarat') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
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
          <div className="pl-10">
            <select
              id="statusSelect"
              className="border rounded border-gray-400 px-2 py-1"
              value={newStatus}
              onChange={handleStatusChange}
            >
              <option value="" className="text-gray-700">Ubah Status Verifikasi</option>
              <option value="Diterima" className="text-green-800">Diterima</option>
              <option value="Lulus Bersyarat" className="text-orange-800">Lulus Bersyarat</option>
              <option value="Tidak Diterima" className="text-red-800">Tidak Diterima</option>
            </select>
            <button
              className="ml-4 bg-black text-white px-3 py-1 rounded-lg"
              onClick={handleSaveStatus}
              disabled={selectedItems.length === 0 || newStatus === ''}
            >
              Simpan
            </button>
          </div>
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
            <th className="px-4 py-4 border-b">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems(currentItems.map(item => item.id));
                  } else {
                    setSelectedItems([]);
                  }
                }}
                checked={selectedItems.length === currentItems.length && currentItems.length > 0}
              />
            </th>
            <th className="px-4 py-4 border-b">No. Registrasi</th>
            <th className="px-4 py-4 border-b">No. WA</th>
            <th className="px-4 py-4 border-b">Nama</th>
            <th className="px-4 py-4 border-b">Jurusan</th>
            <th className="px-4 py-4 border-b">Asal Sekolah</th>
            <th className="px-4 py-4 border-b">Status</th>
            <th className="px-4 py-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td className="px-4 py-4 border-b">{item.users_id}</td>
                <td className="px-4 py-4 border-b">{item.phone_santri}</td>
                <td className="px-4 py-4 border-b">{item.name}</td>
                <td className="px-4 py-4 border-b">{item.jurusan}</td>
                <td className="px-4 py-4 border-b">{item.asal_sekolah}</td>
                <td className="px-4 py-4 border-b">
                  <span className={`inline-block px-4 py-2 text-xs font-medium rounded-full ${getStatusClass(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="px-4 py-4 border-b flex justify-center space-x-2">
                  <button
                    className="text-blue-800 hover:text-blue-900"
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
              <td className="px-4 py-4 border-b" colSpan="8">
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
            key={index + 1}
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

export default DataVerifikasi;