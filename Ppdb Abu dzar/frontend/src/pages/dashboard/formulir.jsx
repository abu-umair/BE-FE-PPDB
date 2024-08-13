import React, { useCallback, useEffect, useState } from 'react';
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

  const fetchStudentData = useCallback(async () => {
    try {
      const response = await fetchData('student/' + auth.userId, auth.token);
      setStudentData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [auth]);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetchData('user/' + auth.userId, auth.token);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [auth]);

  useEffect(() => {
    fetchStudentData();
    fetchUserData();
  }, [auth, fetchStudentData, fetchUserData]);

  const handleDataUpdate = () => {
    fetchStudentData();
    fetchUserData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className='w-full p-6 md:p-8 rounded-lg shadow mb-5 bg-green-600'>
        <h3 className='text-xl md:text-3xl text-white text-center md:text-left'>
          Mohon Diisi Data Formulir yang Valid untuk Kepentingan DAPODIK
        </h3>
      </div>
      <div className="w-full bg-white p-4 rounded-lg shadow">
        <div className="overflow-x-auto">
          <TabView scrollable>
            <TabPanel header="Biodata Calon Santri" leftIcon="pi pi-user mr-2">
              <BiodataCalonSantri auth={auth} studentData={studentData} onUpdate={handleDataUpdate} />
            </TabPanel>
            <TabPanel header="Biodata Orang Tua" leftIcon="pi pi-users mr-2">
              <BiodataOrangTua auth={auth} userData={userData} onUpdate={handleDataUpdate} />
            </TabPanel>
            <TabPanel header="Alamat" leftIcon="pi pi-map-marker mr-2">
              <Alamat auth={auth} userData={userData} onUpdate={handleDataUpdate} />
            </TabPanel>
            <TabPanel header="Upload File" leftIcon="pi pi-upload mr-2">
              <UploadFile auth={auth} studentData={studentData} onUpdate={handleDataUpdate} />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Formulir;