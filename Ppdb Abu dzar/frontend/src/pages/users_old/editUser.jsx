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



const validationSchema = yup.object({
    name: yup.string().required().trim(),
    email: yup.string().required().email().trim(),
    password: yup.string().nullable().trim().min(6),
    photo: yup.mixed().nullable(), //'mixed': jika berbentuk file, memakai 'mixed'
});

const EditUser = (props) => {
    const auth = useSelector((state) => state.user);
    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
    });

    const getUserById = async () => {
        try {
            const response = await fetchData('user/' + props.userId, auth.token);
            console.log(response.data);
            setValues({
                ...values,
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                // password: response.data.password,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserById()
    }, []);

    const initialValues = {
        name: values.name,
        email: values.email,
        password: values.password,
        photo: values.photo,
    };

    const onSubmit = async (values) => {
        console.log(values);
        // const postDataToAPI = async () => {
        try {
            let dataToPost = { name: values.name, email: values.email };

            if (values.password) {
                dataToPost = { ...dataToPost, password: values.password };
            }

            if (values.photo) {
                dataToPost = { ...dataToPost, image: values.photo };
            }

            return await postData('user/' + props.userId, dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "Update User Success!", type: "success" });

                        setTimeout(() => {
                            // navigate(-1);
                            props.setUserEdited();
                            // window.location.reload();
                        }, 2000);
                    },
                    // (error) => {
                    //     console.log(error);
                    // }
                );
        } catch (err) {
            CustomToast({ message: "Update User Failed", type: "error" });
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
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {props => {
                        return (
                            <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                                {/* <input type="text" name="name" id="" value={values.name} /> */}
                                <div className="mb-1 flex flex-col gap-6">
                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Your Name
                                    </Typography>
                                    <Field name="name">
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                size="lg"
                                                placeholder="Muhammad Ridwan"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="name">
                                        {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                                    </ErrorMessage>

                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Your email
                                    </Typography>
                                    <Field name="email">
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="name@mail.com"
                                                size="lg"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="email">
                                        {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                                    </ErrorMessage>

                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Password
                                    </Typography>
                                    <Field name="password">
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                type="password"
                                                size="lg"
                                                placeholder="********"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="password">
                                        {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                                    </ErrorMessage>

                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                        Upload Photo
                                    </Typography>
                                    <div className="grid grid-cols-1 space-y-2">
                                        {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label> */}
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                                <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
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
                                            <span>File type: doc,pdf,types of images</span>
                                        </p>
                                    </div>
                                    <ErrorMessage name="password">
                                        {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                                    </ErrorMessage>



                                </div>

                                <Button
                                    color="red"
                                    className="mt-6"
                                    fullWidth
                                    type="submit"
                                    disabled={props.isSubmitting || !props.isValid}
                                    loading={props.isSubmitting ? true : false}
                                >
                                    {props.isSubmitting ? "Please Wait" : "Edit User"}

                                </Button>


                            </Form>)
                    }}
                </Formik>
            </div>

        </div>
    )
}

export default EditUser