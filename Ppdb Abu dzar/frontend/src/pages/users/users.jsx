import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button as MaterialButton,
} from "@material-tailwind/react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData, deleteData } from '@/services/user.service';
import { Dialog } from "primereact/dialog";
import { Toolbar } from "primereact/toolbar";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import AddUser from "./addUser";
import EditUser from "./editUser";
import ViewUser from "./viewUser";
import { CustomToast, Toast } from './../../utils/Toast';
import { Dropdown } from 'primereact/dropdown';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showViewMode, setShowViewMode] = useState(false);
  const [showAddMode, setShowAddMode] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [first, setFirst] = useState(0);
  const auth = useSelector((state) => state.user);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchData('user', auth.token);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const baseUrl = "https://beppdb.evolusidigital.id/storage/";

  const actionsBodyTemplate = (rowData) => {
    return (
      <div className="space-x-2 flex justify-center">
        <MaterialButton color="green" size="sm" className="rounded-md" onClick={() => {
          setShowViewMode(true);
          setSelectedUserId(rowData.id);
        }}>
          <i className="pi pi-eye"></i>
        </MaterialButton>
        <MaterialButton color="blue" size="sm" className="rounded-md" onClick={() => {
          setShowEditMode(true);
          setSelectedUserId(rowData.id);
        }}>
          <i className="pi pi-pencil"></i>
        </MaterialButton>
        <MaterialButton color="red" size="sm" className="rounded-md" onClick={() => deleteUserConfirm(rowData.id)}>
          <i className="pi pi-trash"></i>
        </MaterialButton>
      </div>
    );
  };

  const deleteUserConfirm = (userId) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-trash',
      accept: () => deleteUser(userId),
    });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await deleteData('user/' + userId, auth.token);
      if (response) {
        CustomToast({ message: "Delete User Success!", type: "success" });
        getAllUsers();
      }
    } catch (error) {
      CustomToast({ message: "Delete User Failed", type: "error" });
      console.log(error);
    }
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center gap-2">
        <Avatar src={`${baseUrl}${rowData.image}`} alt="avatar" size="sm" />
        <Typography>{rowData.name}</Typography>
      </div>
    );
  };

  const lastLoginBodyTemplate = (rowData) => {
    return (
      <Typography>{new Date(rowData.updated_at).toLocaleString()}</Typography>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <MaterialButton color="black" size="sm" className="rounded-md flex items-center space-x-2" onClick={() => setShowAddMode(true)}>
        <i className="pi pi-plus"></i> <span className="capitalize">Tambah user</span>
      </MaterialButton>
    );
  };

  const onRowsPerPageChange = (e) => {
    setRowsPerPage(e.value);
    setFirst(0);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRowsPerPage(event.rows);
  };

  const handlePrevious = () => {
    if (first > 0) {
      setFirst(first - rowsPerPage);
    }
  };

  const handleNext = () => {
    if (first + rowsPerPage < users.length) {
      setFirst(first + rowsPerPage);
    }
  };

  const handlePageChange = (pageNumber) => {
    setFirst((pageNumber - 1) * rowsPerPage);
  };

  const currentPage = Math.floor(first / rowsPerPage) + 1;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  const renderPageNumbers = () => {
    const maxPageNumbers = 5;
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
    let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
    let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbers);

    if (endPage - startPage + 1 < maxPageNumbers) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
      } else {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
      }
    }

    const pageNumbers = [];
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className={`px-3 py-1 mx-1 rounded ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start" className="mx-1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end" className="mx-1">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`px-3 py-1 mx-1 rounded ${currentPage === totalPages ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto py-4">
      <Toast />
      <div className="mx-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="text-gray-700">Show</label>
            <Dropdown id="itemsPerPage" value={rowsPerPage} options={[5, 10, 25, 50]} onChange={onRowsPerPageChange} className="p-dropdown-sm" />
            <label htmlFor="itemsPerPage" className="text-gray-700">entries</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-4 py-2 pl-10"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg"
              onClick={() => setShowAddMode(true)}
            >
              <i className="pi pi-plus"></i> <span className="capitalize">Tambah user</span>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Typography>Loading...</Typography>
          </div>
        ) : (
          <>
            <DataTable value={users.slice(first, first + rowsPerPage)} paginator={false} rows={rowsPerPage} rowsPerPageOptions={[5, 10, 25]} tableStyle={{ minWidth: '50rem' }} globalFilter={globalFilter}>
              <Column header="No" body={(data, options) => first + options.rowIndex + 1}></Column>
              <Column field="name" header="Nama Lengkap" body={nameBodyTemplate} sortable></Column>
              <Column field="email" header="Email" sortable></Column>
              <Column field="lastLogin" header="Last Login" body={lastLoginBodyTemplate} sortable></Column>
              <Column header="Action" body={actionsBodyTemplate}></Column>
            </DataTable>
            <div className="flex justify-center my-4">
              <button
                className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {renderPageNumbers()}
              <button
                className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Dialog header="View User Data" visible={showViewMode} style={{ width: '50vw' }} onHide={() => setShowViewMode(false)}>
        <ViewUser userId={selectedUserId} />
      </Dialog>
      <Dialog header="Tambah Admin" visible={showAddMode} style={{ width: '50vw' }} onHide={() => setShowAddMode(false)}>
        <AddUser setUserAdded={() => {
          setShowAddMode(false);
          getAllUsers();
        }} />
      </Dialog>
      <Dialog header="Edit User" visible={showEditMode} style={{ width: '50vw' }} onHide={() => setShowEditMode(false)}>
        <EditUser userId={selectedUserId} setUserEdited={() => {
          setShowEditMode(false);
          getAllUsers();
        }} />
      </Dialog>
      <ConfirmDialog />
    </div>
  );
}

export default Users;