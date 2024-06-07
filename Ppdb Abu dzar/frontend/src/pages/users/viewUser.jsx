import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '@/services/user.service';
import { ProfileInfoCard } from '@/widgets/cards';

const initialUserInfo = {
    name: '',
    email: '',
    image: '',
    updated_at: ''
};

const ViewUser = (props) => {
    const auth = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const getUserById = async () => {
        try {
            const response = await fetchData('user/' + props.userId, auth.token);
            console.log(response.data, "dataqu");
            setUserInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserById();
    }, []);

    const baseUrl = "http://localhost:8000/storage/";

    return (
        <div>
            <ProfileInfoCard
                title="Profile Information"
                description={<img src={`${baseUrl}${userInfo.image}`} alt="Profile" className="w-50 h-40"/>}
                details={{
                    "Name": userInfo.name,
                    "Email": userInfo.email,
                    "Role": userInfo.roles,
                    "Created At": userInfo.created_at,
                    "Updated At": userInfo.updated_at
                }}
            />
        </div>
    );
};

export default ViewUser;