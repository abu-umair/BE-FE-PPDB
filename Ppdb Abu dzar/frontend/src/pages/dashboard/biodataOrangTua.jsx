import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { CustomToast, Toast } from './../../utils/Toast';
import { fetchData, postData } from '@/services/user.service';
import { useReactToPrint } from 'react-to-print';
import { Dropdown } from 'primereact/dropdown';

const optionPenghasilanAyah = [
    { name: '< 2.000.000' },
    { name: '> 2.000.000' },
];

const optionPenghasilanIbu = [
    { name: '< 2.000.000' },
    { name: '> 2.000.000' },
];



const validationSchema = yup.object({
    name: yup.string().required().trim(),
    nik_ayah: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required("nik ayah is a required field")
        .test(
            "len",
            "nik ayah must be at least 16 digits",
            (val) => val && val.toString().length >= 16
        ),
    pekerjaan_ayah: yup.string().required().trim(),
    kota_lahir_ayah: yup.string().required().trim(),
    phone_ayah: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required("phone is a required field")
        .test(
            "len",
            "phone number must be at least 10 digits",
            (val) => val && val.toString().length >= 10
        ),
    penghasilan_ayah: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required("penghasil ayah is a required field")
        .test(
            "len",
            "penghasilan ayah must be at least 7 digits",
            (val) => val && val.toString().length >= 7
        ),
    pendidikan_ayah: yup.string().required().trim(),
    name_ibu: yup.string().required().trim(),
    nik_ibu: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required("nik ibu is a required field")
        .test(
            "len",
            "nik ibu must be at least 16 digits",
            (val) => val && val.toString().length >= 16
        ),
    pekerjaan_ibu: yup.string().required().trim(),
    kota_lahir_ibu: yup.string().required().trim(),
    phone_ibu: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required("phone is a required field")
        .test(
            "len",
            "phone number must be at least 10 digits",
            (val) => val && val.toString().length >= 10
        ),
    penghasilan_ibu: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required("penghasil ibu is a required field"),
    pendidikan_ibu: yup.string().required().trim(),
});

const BiodataOrangTua = ({ auth, userData, onUpdate }) => {
    const componentRef = useRef();
    const [loading, setLoading] = useState(true);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [values, setValues] = useState({
        id: "",
        name: "",
        email: "",
        nik_ayah: "",
        pekerjaan_ayah: "",
        dob_ayah: "",
        kota_lahir_ayah: "",
        penghasilan_ayah: "",
        phone_ayah: "",
        name_ibu: "",
        nik_ibu: "",
        pekerjaan_ibu: "",
        dob_ibu: "",
        kota_lahir_ibu: "",
        penghasilan_ibu: "",
        phone_ibu: "",
        pendidikan_ibu: "",
        pendidikan_ayah: "",
    });

    const initialValues = {
        id: values.id,
        name: values.name,
        email: values.email,
        nik_ayah: values.nik_ayah,
        pekerjaan_ayah: values.pekerjaan_ayah,
        dob_ayah: values.dob_ayah,
        kota_lahir_ayah: values.kota_lahir_ayah,
        penghasilan_ayah: values.penghasilan_ayah,
        phone_ayah: values.phone_ayah,
        name_ibu: values.name_ibu,
        nik_ibu: values.nik_ibu,
        pekerjaan_ibu: values.pekerjaan_ibu,
        dob_ibu: values.dob_ibu,
        kota_lahir_ibu: values.kota_lahir_ibu,
        penghasilan_ibu: values.penghasilan_ibu,
        phone_ibu: values.phone_ibu,
        pendidikan_ibu: values.pendidikan_ibu,
        pendidikan_ayah: values.pendidikan_ayah,
    }

    useEffect(() => {
        if (userData && auth) {
            setValues({
                ...values,
                id: userData.id,
                name: userData.name,
                email: userData.email,
                nik_ayah: userData.nik_ayah,
                pekerjaan_ayah: userData.pekerjaan_ayah,
                dob_ayah: userData.dob_ayah,
                kota_lahir_ayah: userData.kota_lahir_ayah,
                penghasilan_ayah: userData.penghasilan_ayah,
                phone_ayah: userData.phone_ayah,
                name_ibu: userData.name_ibu,
                nik_ibu: userData.nik_ibu,
                pekerjaan_ibu: userData.pekerjaan_ibu,
                dob_ibu: userData.dob_ibu,
                kota_lahir_ibu: userData.kota_lahir_ibu,
                penghasilan_ibu: userData.penghasilan_ibu,
                phone_ibu: userData.phone_ibu,
                pendidikan_ibu: userData.pendidikan_ibu,
                pendidikan_ayah: userData.pendidikan_ayah,

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
                nik_ayah: values.nik_ayah,
                pekerjaan_ayah: values.pekerjaan_ayah,
                dob_ayah: values.dob_ayah,
                kota_lahir_ayah: values.kota_lahir_ayah,
                penghasilan_ayah: values.penghasilan_ayah,
                phone_ayah: values.phone_ayah,
                name_ibu: values.name_ibu,
                nik_ibu: values.nik_ibu,
                pekerjaan_ibu: values.pekerjaan_ibu,
                dob_ibu: values.dob_ibu,
                kota_lahir_ibu: values.kota_lahir_ibu,
                penghasilan_ibu: values.penghasilan_ibu,
                phone_ibu: values.phone_ibu,
                pendidikan_ibu: values.pendidikan_ibu,
                pendidikan_ayah: values.pendidikan_ayah,
            };

            return await postData(`user/${auth.userId}`, dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "Biodata Orang Tua Success!", type: "success" });

                        // setTimeout(() => {
                        //     // navigate(-1);
                        //     // props.setUserAdded();
                        //     window.location.reload();
                        // }, 2000);
                        onUpdate()
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (err) {
            CustomToast({ message: "Biodata Orang Tua Failed", type: "error" });
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
                            <p>Loading</p>
                        ) : (
                            <>
                                <div className="flex flex-col-reverse md:flex-row md:justify-end my-4">
                                    <h3 className='font-bold text-2xl grow'>
                                        Data Ayah
                                    </h3>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Ayah<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Nama Lengkap Ayah"
                                            value={values.name}
                                            onChange={(e) =>
                                                setValues({ ...values, name: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="name">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="nik_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK Ayah<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="number" name="nik_ayah" id="nik_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={values.nik_ayah}
                                            placeholder="Isi NIK Ayah  (Lihat di KK)"
                                            onChange={(e) =>
                                                setValues({ ...values, nik_ayah: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="nik_ayah">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="pekerjaan_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pekerjaan<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="text" name="pekerjaan_ayah" id="pekerjaan_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Pekerjaan Ayah"
                                                    value={values.pekerjaan_ayah}
                                                    onChange={(e) =>
                                                        setValues({ ...values, pekerjaan_ayah: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="pekerjaan_ayah">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="dob_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="date" name="dob_ayah" id="dob_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Kartu Keluarga"
                                                    value={values.dob_ayah}
                                                    onChange={(e) =>
                                                        setValues({ ...values, dob_ayah: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="dob_ayah">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="kota_lahir_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kota Lahir Ayah<span className='text-pink-600 font-black'> *</span></label>
                                            <Field type="text" name="kota_lahir_ayah" id="kota_lahir_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Isi Kota Lahir Ayah"
                                                value={values.kota_lahir_ayah}
                                                onChange={(e) =>
                                                    setValues({ ...values, kota_lahir_ayah: e.target.value })
                                                }
                                                required />
                                            <ErrorMessage name="kota_lahir_ayah">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="penghasilan_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penghasilan<span className='text-pink-600 font-black'> *</span></label>
                                                {/* <Dropdown value={values.penghasilan_ayah}
                                                    onChange={(e) => {
                                                        // console.log(e.value)
                                                        setValues({
                                                            ...values,
                                                            penghasilan_ayah: e.value.name,
                                                        })
                                                    }}
                                                    options={optionPenghasilanAyah} optionLabel="name"
                                                    editable placeholder="Select Penghasilan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                                <Field type="number" name="penghasilan_ayah" id="penghasilan_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Penghasilan Ayah"
                                                    value={values.penghasilan_ayah}
                                                    onChange={(e) =>
                                                        setValues({ ...values, penghasilan_ayah: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="penghasilan_ayah">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="phone_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Handphone<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="phone_ayah" id="phone_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Handphone Ayah"
                                                    value={values.phone_ayah}
                                                    onChange={(e) =>
                                                        setValues({ ...values, phone_ayah: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="phone_ayah">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="pendidikan_ayah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pendidikan Ayah<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="text" name="pendidikan_ayah" id="pendidikan_ayah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Pendidikan Ayah"
                                            value={values.pendidikan_ayah}
                                            onChange={(e) =>
                                                setValues({ ...values, pendidikan_ayah: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="pendidikan_ayah">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className=" flex my-4">
                                    <h3 className='font-bold text-2xl grow'>
                                        Data Ibu
                                    </h3>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Ibu<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="text" name="name_ibu" id="name_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Nama Lengkap Ibu"
                                            value={values.name_ibu}
                                            onChange={(e) =>
                                                setValues({ ...values, name_ibu: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="name_ibu">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="nik_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK Ibu<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="number" name="nik_ibu" id="nik_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi NIK Ibu  (Lihat di KK)"
                                            value={values.nik_ibu}
                                            onChange={(e) =>
                                                setValues({ ...values, nik_ibu: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="nik_ibu">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="pekerjaan_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pekerjaan<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="text" name="pekerjaan_ibu" id="pekerjaan_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Pekerjaan Ibu"
                                                    value={values.pekerjaan_ibu}
                                                    onChange={(e) =>
                                                        setValues({ ...values, pekerjaan_ibu: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="pekerjaan_ibu">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="dob_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="date" name="dob_ibu" id="dob_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Kartu Keluarga"
                                                    value={values.dob_ibu}
                                                    onChange={(e) =>
                                                        setValues({ ...values, dob_ibu: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="dob_ibu">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="kota_lahir_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kota Lahir Ibu<span className='text-pink-600 font-black'> *</span></label>
                                            <Field type="text" name="kota_lahir_ibu" id="kota_lahir_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Isi Kota Lahir Ibu"
                                                value={values.kota_lahir_ibu}
                                                onChange={(e) =>
                                                    setValues({ ...values, kota_lahir_ibu: e.target.value })
                                                }
                                                required />
                                            <ErrorMessage name="kota_lahir_ibu">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="penghasilan_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penghasilan<span className='text-pink-600 font-black'> *</span></label>
                                                {/* <Dropdown value={values.penghasilan_ibu}
                                                    onChange={(e) => {
                                                        // console.log(e.value)
                                                        setValues({
                                                            ...values,
                                                            penghasilan_ibu: e.value.name,
                                                        })
                                                    }}
                                                    options={optionPenghasilanIbu} optionLabel="name"
                                                    editable placeholder="Select Penghasilan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                                <Field type="number" name="penghasilan_ibu" id="penghasilan_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Penghasilan Ibu"
                                                    value={values.penghasilan_ibu}
                                                    onChange={(e) =>
                                                        setValues({ ...values, penghasilan_ibu: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="penghasilan_ibu">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="phone_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Handphone<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="phone_ibu" id="phone_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Handphone"
                                                    value={values.phone_ibu}
                                                    onChange={(e) =>
                                                        setValues({ ...values, phone_ibu: e.target.value })
                                                    }
                                                    required />
                                                <ErrorMessage name="phone_ibu">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="pendidikan_ibu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pendidikan Ibu<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="text" name="pendidikan_ibu" id="pendidikan_ibu" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Pendidikan Ibu"
                                            value={values.pendidikan_ibu}
                                            onChange={(e) =>
                                                setValues({ ...values, pendidikan_ibu: e.target.value })
                                            }
                                            required />
                                        <ErrorMessage name="pendidikan_ibu">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className="flex flex-col-reverse md:flex-row md:justify-end my-4">
                                    <Button
                                        variant='outlined'
                                        className='mt-2 md:mt-0 mr-0 md:mr-3'
                                        onClick={handlePrint}>Print</Button>
                                    <Button
                                        className="bg-[#282464]"
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

export default BiodataOrangTua