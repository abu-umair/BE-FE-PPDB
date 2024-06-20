import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchData, postData } from '@/services/user.service';
import { CustomToast, Toast } from './../../utils/Toast';
import { useReactToPrint } from 'react-to-print';
import { Dropdown } from 'primereact/dropdown';

import * as yup from "yup";


const validationSchema = yup.object({
    address: yup.string().required().trim(),
    kelurahan: yup.string().required().trim(),
    kecamatan: yup.string().required().trim(),
    kabupaten_kota: yup.string().required().trim(),
    provinsi: yup.string().required().trim(),
    zip_code: yup.string().required().trim(),
});

const Alamat = ({ auth, userData, onUpdate }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // console.log(auth);
    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        address: "",
        kelurahan: "",
        kecamatan: "",
        kabupaten_kota: "",
        provinsi: "",
        zip_code: "",

    });

    const initialValues = {
        id: values.id,
        name: values.name,
        email: values.email,
        address: values.address,
        kelurahan: values.kelurahan,
        kecamatan: values.kecamatan,
        kabupaten_kota: values.kabupaten_kota,
        provinsi: values.provinsi,
        zip_code: values.zip_code,

    }

    useEffect(() => {
        if (userData && auth) {
            setValues({
                ...values,
                id: userData.id,
                name: userData.name,
                email: userData.email,
                address: userData.address,
                kelurahan: userData.kelurahan,
                kecamatan: userData.kecamatan,
                kabupaten_kota: userData.kabupaten_kota,
                provinsi: userData.provinsi,
                zip_code: userData.zip_code,

            });
        }
    }, [userData, auth]);

    const onSubmit = async (values) => {
        console.log(values);
        // const postDataToAPI = async () => {
        try {
            const dataToPost = {
                name: values.name,
                email: values.email,
                address: values.address,
                kelurahan: values.kelurahan,
                kecamatan: values.kecamatan,
                kabupaten_kota: values.kabupaten_kota,
                provinsi: values.provinsi,
                zip_code: values.zip_code,
            };

            return await postData(`user/${auth.userId}`, dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "Add User Success!", type: "success" });

                        // setTimeout(() => {
                        //     // navigate(-1);
                        //     // props.setUserAdded();
                        //     window.location.reload();
                        // }, 2000);
                        onUpdate();
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
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {props => {
                return (
                    <Form method='POST' ref={componentRef} className='mx-4'>
                        <Toast />
                        <div className=" flex my-4">
                            <h3 className='font-bold text-2xl grow'>
                                Data Alamat
                            </h3>
                            <Button
                                variant='outlined'
                                className='mr-3'
                                onClick={handlePrint}>Print</Button>
                            <Button
                                className=""
                                type="submit"
                                disabled={props.isSubmitting || !props.isValid}
                                loading={props.isSubmitting ? true : false}
                            >
                                {props.isSubmitting ? "Loading" : "Simpan"}
                            </Button>
                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat Lengkap</label>
                                <Field type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Isi Alamat Lengkap"
                                    required
                                    value={values.address}
                                    onChange={(e) =>
                                        setValues({ ...values, address: e.target.value })
                                    } />
                                <ErrorMessage name="address">
                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                </ErrorMessage>
                            </div>
                            <div>
                                <label htmlFor="kelurahan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelurahan</label>
                                <Field type="text" name="kelurahan" id="kelurahan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Isi Kelurahan"
                                    value={values.kelurahan}
                                    onChange={(e) =>
                                        setValues({ ...values, kelurahan: e.target.value })
                                    }
                                    required />
                                <ErrorMessage name="kelurahan">
                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <div>
                                        <label htmlFor="kecamatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kecamatan</label>
                                        <Field type="text" name="kecamatan" id="kecamatan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi NISN"
                                            value={values.kecamatan}
                                            onChange={(e) =>
                                                setValues({ ...values, kecamatan: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="kecamatan">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="kabupaten_kota" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kabupaten / Kota</label>
                                        <Field type="text" name="kabupaten_kota" id="kabupaten_kota" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Kota / Kabupaten"
                                            value={values.kabupaten_kota}
                                            onChange={(e) =>
                                                setValues({ ...values, kabupaten_kota: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="kabupaten_kota">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <div>
                                        <label htmlFor="provinsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Provinsi</label>
                                        <Field type="text" name="provinsi" id="provinsi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Provinsi"
                                            value={values.provinsi}
                                            onChange={(e) =>
                                                setValues({ ...values, provinsi: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="provinsi">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="zip_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Pos</label>
                                        <Field type="text" name="zip_code" id="zip_code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Kode Pos"
                                            value={values.zip_code}
                                            onChange={(e) =>
                                                setValues({ ...values, zip_code: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="zip_code">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Form>)
            }}
        </Formik>
    )
}

export default Alamat