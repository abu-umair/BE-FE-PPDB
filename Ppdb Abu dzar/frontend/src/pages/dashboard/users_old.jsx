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
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import auth from "@/services/auth-header";
// import userService from "@/services/user.service";
import { useSelector } from "react-redux";
import { fetchData, postData } from '@/services/user.service';

export function Users() {

  const [users, setUsers] = useState([]);

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

  const statusBodyTemplate = (rowData) => {
    return (
      <div className="space-x-2">

        <Button color="blue" size="sm" className="rounded-full" onClick={() => console.log(rowData.id)}>
          <i className="pi pi-pencil"></i>
        </Button>
        <Button color="red" size="sm" className="rounded-full" onClick={() => console.log(rowData.id)}>
          <i className="pi pi-trash"></i>
        </Button>
      </div>
    );
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div>

            <DataTable className="mx-5" value={users} tableStyle={{ minWidth: '50rem' }} >
              <Column field="name" header="Name" className="py-3 px-5 border-b border-blue-gray-50"></Column>
              <Column field="email" header="Email Address" className="py-3 px-5 border-b border-blue-gray-50"></Column>
              {/* <Column field="category" header="Category" className="py-3 px-5 border-b border-blue-gray-50"></Column>
              <Column field="quantity" header="Quantity" className="py-3 px-5 border-b border-blue-gray-50"></Column> */}
              {/* <Column header="Action" body={actionBodyTemplate}></Column> */}
              <Column header="Status" body={statusBodyTemplate} className="py-3 px-5 border-b border-blue-gray-50"></Column>
            </DataTable>
          </div>
        </CardBody>
      </Card>

    </div>
  );
}

export default Users;
