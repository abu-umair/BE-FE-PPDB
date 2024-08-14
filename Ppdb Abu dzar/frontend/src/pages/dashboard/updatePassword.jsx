import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { CustomToast, Toast } from './../../utils/Toast';
import { fetchData, postData } from '@/services/user.service';
import { useReactToPrint } from 'react-to-print';
import { Dropdown } from 'primereact/dropdown';


const validationSchema = yup.object({
    password: yup.string().required().trim().min(6),
    password_now: yup.string().required().trim().min(6),

});

const UpdatePassword = ({ auth, userData, onUpdate }) => {
    console.log(userData);
    const componentRef = useRef();
    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState({
        id: "",
        email: "",
        password_now: "",
        password: "",
    });

    const initialValues = {
        id: values.id,
        name: values.name,
        email: values.email,
        password_now: values.password_now,
        password: values.password,
    }

    useEffect(() => {
        if (userData && auth) {
            setValues({
                ...values,
                id: userData.id,
                name: userData.name,
                email: userData.email,
                password_now: userData.password_now,
                password: userData.password,
            });
            setLoading(false);

        }

    }, [userData, auth]);

    const onSubmit = async (values) => {
        console.log(values);
        console.log(auth.token);
        // const postDataToAPI = async () => {
        try {
            const dataToPost = {
                name: values.name,
                email: values.email,
                password_now: values.password_now,
                password: values.password,
            };

            return await postData(`user/${auth.userId}`, dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "User Success!", type: "success" });

                        setTimeout(() => {
                            // navigate(-1);
                            // props.setUserAdded();
                            window.location.reload();
                        }, 2000);
                        onUpdate()
                    },
                    (error) => {
                        console.log(error);
                        if (error.response.data.message === 'Password tidak sesuai') {
                            CustomToast({ message: "Password tidak sesuai", type: "error" });
                        }
                    }
                );
        } catch (err) {
            CustomToast({ message: "Update Password Failed", type: "error" });
            // console.log(err);

            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
        }
        // console.log(response);
    }
    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {props => {
                return (
                    <Form method='POST' ref={componentRef} className='mx-4'>
                        <Toast />
                        {loading ? (
                            <p></p>
                        ) : (
                            <>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="password_now" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Lama</label>
                                        <Field type="text" name="password_now" id="password_now" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Password Lama"
                                            value={values.password_now}
                                            onChange={(e) =>
                                                setValues({ ...values, password_now: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="password_now">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Baru</label>
                                        <Field type="text" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Password Baru"
                                            value={values.password}
                                            onChange={(e) =>
                                                setValues({ ...values, password: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="password">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>

                                <div className=" flex my-4">
                                    {/* <Button
                                        variant='outlined'
                                        className='mr-3'
                                        onClick={handlePrint}>Print</Button> */}
                                    <Button
                                        className="ml-auto bg-[#282464]"
                                        type="submit"
                                        disabled={props.isSubmitting || !props.isValid}
                                        loading={props.isSubmitting ? true : false}
                                    >
                                        {props.isSubmitting ? "Loading" : "Simpan"}
                                    </Button>
                                </div>
                            </>
                        )}


                    </Form>)
            }}
        </Formik>
    )
}

export default UpdatePassword