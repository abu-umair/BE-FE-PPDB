import React, { useCallback, useEffect, useState } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import UpdateProfile from './updateProfile';
import { useSelector } from 'react-redux';
import { fetchData } from '@/services/user.service';
import UpdatePassword from './updatePassword';

function MyProfile() {
    const auth = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetchData('user/' + auth.userId, auth.token);
            setUserData(response.data);
        } catch (error) {
            console.log(error);
        }
        console.log(auth);
    }, [auth]);

    useEffect(() => {
        fetchUserData();
    }, [auth, fetchUserData]);

    const handleDataUpdate = () => {
        fetchUserData();
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="w-full  bg-white p-6 rounded-lg shadow">
                    <TabView>
                        <TabPanel header="Edit Profile" leftIcon="fa-solid fa-user-pen mr-2">
                            <UpdateProfile auth={auth} userData={userData} onUpdate={handleDataUpdate} />
                        </TabPanel>
                        <TabPanel header="Ganti Password" leftIcon="fa-solid fa-unlock-keyhole mr-2">
                            <UpdatePassword auth={auth} userData={userData} onUpdate={handleDataUpdate} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    )
}

export default MyProfile