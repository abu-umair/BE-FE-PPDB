import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchData, postData } from '@/services/user.service';
import { ProfileInfoCard } from '@/widgets/cards';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { CustomToast, Toast } from './../../utils/Toast';


const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
}

const validationSchema = yup.object({
    name: yup.string().required().trim(),
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim().min(6),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Password must match"),
    photo: yup.mixed().required(), //'mixed': jika berbentuk file, memakai 'mixed'
});

const AddUser = (props) => {
    const auth = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState(initialValues);

    useEffect(() => {
    }, []);

    const onSubmit = async (values) => {
        console.log(values);
        // const postDataToAPI = async () => {
        try {
            const dataToPost = {
                name: values.name,
                email: values.email,
                password: values.password,
                image: values.photo,
                roles: "ADMIN",
            };

            return await postData('user', dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "Add User Success!", type: "success" });

                        setTimeout(() => {
                            // navigate(-1);
                            props.setUserAdded();
                            // window.location.reload();
                        }, 2000);
                    },
                    // (error) => {
                    //   console.log(error);
                    // }
                );
        } catch (err) {
            CustomToast({ message: "Add User Failed", type: "error" });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        // console.log(response);
    }



    return (
        <div>
            <Toast />
            <div className="w-full flex flex-col items-center justify-center">

                {/* <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Add New User</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
                </div> */}
                <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {props => {
                        return (
                            <Form method='POST'>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                        <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Muhammad Ridwan" required />
                                        <ErrorMessage name="name">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="contoh@gmail.com" required />
                                        <ErrorMessage name="email">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <Field type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                                        <ErrorMessage name="password">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                        <Field type="password" name="confirmPassword" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                                        <ErrorMessage name="confirmPassword">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className="mb-1 flex flex-col gap-6">

                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Upload Photo
                                    </Typography>
                                    <div className="grid grid-cols-1 space-y-2">
                                        {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label> */}
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                        <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                                    </div>
                                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                                </div>
                                                <input name="photo" accept="image/png, image/jpg, image/jpeg" type="file" className="hidden" onChange={(e) =>
                                                    props.setFieldValue(
                                                        "photo",
                                                        e.target.files[0]
                                                    )
                                                } />
                                            </label>
                                        </div>
                                        <p className="text-sm text-gray-300">
                                            {/* <span>File type: doc,pdf,types of images</span> */}
                                            <span>File type: types of images</span>
                                        </p>
                                    </div>




                                </div>

                                <Button
                                    className="ml-2 px-4 py-2 bg-[#4CAF50] hover:bg-green-900 text-white font-medium rounded"
                                    fullWidth
                                    type="submit"
                                    disabled={props.isSubmitting || !props.isValid}
                                    loading={props.isSubmitting ? true : false}
                                >
                                    {props.isSubmitting ? "Loading" : "Simpan"}

                                </Button>


                            </Form>)
                    }}
                </Formik>
            </div>

        </div>
    )
}

export default AddUser