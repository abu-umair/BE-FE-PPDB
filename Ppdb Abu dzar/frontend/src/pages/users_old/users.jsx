import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  button,
  Button as MaterialButton,
  select,
  Alert,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useRef, useState } from "react";
import auth from "@/services/auth-header";
// import userService from "@/services/user.service";
import { useSelector } from "react-redux";
import { fetchData, postData, deleteData } from '@/services/user.service';
import { Dialog } from "primereact/dialog";
import ViewUser from "./viewUser";
import { Toolbar } from "primereact/toolbar";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// import { Toast } from 'primereact/toast';
import { CustomToast, Toast } from './../../utils/Toast';
import { Button } from 'primereact/button';
import AddUser from "./addUser";
import EditUser from "./editUser";

export function Users() {
  const [users, setUsers] = useState([]);
  const [showViewMode, setShowViewMode] = useState(false);
  const [showAddMode, setShowAddMode] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const auth = useSelector((state) => state.user);

  const getAllUsers = async () => {
    try {
      const response = await fetchData('user', auth.token);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    // const postDataToAPI = async () => {
    //   try {
    //     const dataToPost = {
    //       // Masukkan data yang ingin Anda kirim
    //     };

    //     const response = await postData('your_post_endpoint', dataToPost, auth.token);
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    getAllUsers();
    // postDataToAPI();

  }, []);


  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <MaterialButton color="cyan" size="sm" className="rounded-md">
          <i className="pi pi-upload"></i>
        </MaterialButton>
        {/* <MaterialButton color="green" size="sm" className="rounded-md">
          <i className="pi pi-eye"></i>
        </MaterialButton> */}

      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <MaterialButton color="green" size="sm" className="rounded-md items-center flex space-x-2" onClick={() => setShowAddMode(true)}>
        <i className="pi pi-plus"></i> <span className="capitalize">Add User</span>
      </MaterialButton>
    )
  };

  const actionsBodyTemplate = (rowData) => {
    return (
      <div className="space-x-2">
        {/* <MaterialButton color="green" size="sm" className="rounded-md" onClick={() => console.log(rowData.id)}>
          <i className="pi pi-eye"></i>
        </MaterialButton> */}
        <MaterialButton color="green" size="sm" className="rounded-md"
          onClick={() => {
            setShowViewMode(true),
              setSelectedUserId(rowData.id)
          }}>
          <i className="pi pi-eye"></i>
        </MaterialButton>
        <MaterialButton color="blue" size="sm" className="rounded-md" onClick={() => {
          setShowEditMode(true),
            setSelectedUserId(rowData.id)
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
      defaultFocus: 'reject',
      rejectClassName: 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-70',
      acceptClassName: 'focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700',
      // accept: () => console.log(userId)
      accept: () =>
        deleteUser(userId)
      // reject
    });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await deleteData('user/' + userId, auth.token);
      if (response) {
        CustomToast({ message: "Delete User Success!", type: "success" });
        getAllUsers()
        // console.log(response.data);
      }
    } catch (error) {
      CustomToast({ message: "Delete User Failed", type: "error" });
      console.log(error);
    }
  };




  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Toast />
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="mx-5">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <DataTable className="" stripedRows value={users} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} >
              <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
              <Column field="name" header="Name" sortable className="py-3 px-5 border-b border-blue-gray-50"></Column>
              <Column field="email" header="Email Address" sortable className="py-3 px-5 border-b border-blue-gray-50"></Column>
              <Column header="Action" body={actionsBodyTemplate} style={{ width: '15%' }} className="py-3 px-5 border-b border-blue-gray-50"></Column>
            </DataTable>
          </div>
          {/* poppup */}
          <Dialog header="View User Data" visible={showViewMode} style={{ width: '50vw' }} onHide={() => setShowViewMode(false)}>
            <ViewUser userId={selectedUserId} />
          </Dialog>
          <Dialog header="Add New User"
            visible={showAddMode}
            style={{ width: '50vw' }}
            onHide={() => setShowAddMode(false)}>
            <AddUser setUserAdded={() => {
              setShowAddMode(false),
                getAllUsers();
            }} />
          </Dialog>
          <Dialog header="Edit User"
            visible={showEditMode}
            style={{ width: '50vw' }}
            onHide={() => setShowEditMode(false)}>
            <EditUser userId={selectedUserId} setUserEdited={() => {
              setShowEditMode(false),
                getAllUsers();
            }} />
          </Dialog>
          {/* <Toast ref={toast} /> */}
          <ConfirmDialog />
        </CardBody>
      </Card>

    </div>
  );
}

export default Users;
