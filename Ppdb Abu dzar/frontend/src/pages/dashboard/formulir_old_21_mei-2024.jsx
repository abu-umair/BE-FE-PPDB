import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TabView, TabPanel } from 'primereact/tabview';
import BiodataCalonSantri from './biodataCalonSantri';
import BiodataOrangTua from './biodataOrangTua';
import Alamat from './alamat';
import UploadFile from './uploadFile';
import { fetchData } from '@/services/user.service';

const Formulir = () => {
  const auth = useSelector((state) => state.user);
  const [studentData, setStudentData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getStudentById = async () => {
      try {
        const response = await fetchData('student/' + auth.userId, auth.token);
        // console.log(response.data);
        setStudentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentById()

    const getUserById = async () => {
      try {
        const response = await fetchData('user/' + auth.userId, auth.token);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserById()
  }, [auth]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="w-full  bg-white p-6 rounded-lg shadow">
        <TabView>
          <TabPanel header="Biodata Calon Santri" leftIcon="pi pi-user mr-2">
            <BiodataCalonSantri auth={auth} studentData={studentData} />
          </TabPanel>
          <TabPanel header="Biodata Orang Tua" leftIcon="pi pi-users mr-2">
            <BiodataOrangTua auth={auth} userData={userData} />
          </TabPanel>
          <TabPanel header="Alamat" leftIcon="pi pi-map-marker mr-2">
            <Alamat auth={auth} userData={userData} />
          </TabPanel>
          <TabPanel header="Upload File" leftIcon="pi pi-upload mr-2">
            <UploadFile auth={auth} studentData={studentData} />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Formulir;