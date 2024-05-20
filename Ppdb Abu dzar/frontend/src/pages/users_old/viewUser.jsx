import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchData, postData } from '@/services/user.service';
import { ProfileInfoCard } from '@/widgets/cards';
import { Tooltip } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';

const initialUserInfo = {
    name: '',
    email: '',
    phone: ''
}

const ViewUser = (props) => {
    const auth = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const getUserById = async () => {
        try {
            const response = await fetchData('user/' + props.userId, auth.token);
            // console.log(response.data);
            setUserInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserById();
    }, []);

    return (
        <div>
            <ProfileInfoCard
                title="Profile Information"
                description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                details={{
                    "name": userInfo.name,
                    phone: userInfo.phone ?? '-',
                    email: userInfo.email,
                    location: "USA",
                    social: (
                        <div className="flex items-center gap-4">
                            <i className="fa-brands fa-facebook text-blue-700" />
                            <i className="fa-brands fa-twitter text-blue-400" />
                            <i className="fa-brands fa-instagram text-purple-500" />
                        </div>
                    ),
                }}
            />

        </div>
    )
}

export default ViewUser