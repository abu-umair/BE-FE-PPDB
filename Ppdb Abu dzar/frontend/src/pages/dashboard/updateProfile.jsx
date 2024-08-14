import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { CustomToast, Toast } from './../../utils/Toast';
import { fetchData, postData } from '@/services/user.service';
import { useReactToPrint } from 'react-to-print';
import { Dropdown } from 'primereact/dropdown';
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/solid";


const validationSchema = yup.object({
    name: yup.string().required().trim(),
    nik_ayah: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .nullable(),
    pekerjaan_ayah: yup.string().nullable().trim(),
    kota_lahir_ayah: yup.string().nullable().trim(),
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
    name_ibu: yup.string().nullable().trim(),
    nik_ibu: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .nullable(),
    pekerjaan_ibu: yup.string().nullable().trim(),
    kota_lahir_ibu: yup.string().nullable().trim(),
    phone_ibu: yup
        .number()
        .integer("the value must be an integer")
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .nullable(),
    address: yup.string().required().trim(),
    kelurahan: yup.string().required().trim(),
    kecamatan: yup.string().required().trim(),
    kabupaten_kota: yup.string().required().trim(),
    provinsi: yup.string().required().trim(),
    zip_code: yup.string().required().trim(),
    image: yup.mixed().required(),
});

const UpdateProfile = ({ auth, userData, onUpdate }) => {
    const componentRef = useRef();
    const [loading, setLoading] = useState(true);
    const [imageUpload, setImageUpload] = useState(null);

    const filePicekerRef = useRef(null);

    function previewFileImage(e) {
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
        setValues({ ...values, image: selectedFile })

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setImageUpload(readerEvent.target.result);
            }

            // else if (selectedFile.type.includes("video")) {
            //     setVideoPreview(readerEvent.target.result);
            // }
        };
    }
    const handleImageClick = () => {
        filePicekerRef.current.click();
    };


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
        address: "",
        kelurahan: "",
        kecamatan: "",
        kabupaten_kota: "",
        provinsi: "",
        zip_code: "",
        image: "",

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
        address: values.address,
        kelurahan: values.kelurahan,
        kecamatan: values.kecamatan,
        kabupaten_kota: values.kabupaten_kota,
        provinsi: values.provinsi,
        zip_code: values.zip_code,
        image: values.image,

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
                address: userData.address,
                kelurahan: userData.kelurahan,
                kecamatan: userData.kecamatan,
                kabupaten_kota: userData.kabupaten_kota,
                provinsi: userData.provinsi,
                zip_code: userData.zip_code,
                image: userData.image,

            });
            setLoading(false);

        }

    }, [userData, auth]);

    const onSubmit = async (values) => {
        console.log(values);
        console.log(auth.token);
        // const postDataToAPI = async () => {
        try {
            console.log(values.image);
            if (imageUpload != null) {
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
                    address: values.address,
                    kelurahan: values.kelurahan,
                    kecamatan: values.kecamatan,
                    kabupaten_kota: values.kabupaten_kota,
                    provinsi: values.provinsi,
                    zip_code: values.zip_code,
                    image: values.image,
                }
                return await postData(`user/${auth.userId}`, dataToPost, auth.token)
                    .then(
                        (response) => {
                            console.log(response);
                            // Notifification success
                            CustomToast({ message: "User Success!", type: "success" });

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
            } else {
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
                            CustomToast({ message: "User Success!", type: "success" });

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
            }


        } catch (err) {
            CustomToast({ message: "Add User Failed", type: "error" });
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
                                <div className="flex flex-col lg:flex-row">
                                    <div className="w-full lg:w-1/4 p-2">
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex flex-col space-y-4">
                                                <div
                                                    className="preview bg-gray-300 cursor-pointer relative"
                                                    onClick={handleImageClick}
                                                >
                                                    <PencilSquareIcon
                                                        strokeWidth={2}
                                                        className="w-8 text-black rounded-2xl absolute right-2 top-2"
                                                    />
                                                    {imageUpload != null ? (
                                                        <img src={imageUpload} className="rounded-2xl w-full" />
                                                    ) : userData.image != null ? (
                                                        <img
                                                            src={
                                                                "https://beppdb.evolusidigital.id/storage/" +
                                                                userData.image
                                                            }
                                                            className="w-full rounded-2xl"
                                                        />
                                                    ) : (
                                                        <PhotoIcon
                                                            strokeWidth={2}
                                                            className="w-full rounded-2xl"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <input
                                                        name="image"
                                                        className="hidden"
                                                        id="large_size"
                                                        type="file"
                                                        ref={filePicekerRef}
                                                        accept="image/*"
                                                        onChange={previewFileImage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-3/4 p-2">
                                        <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Nama Lengkap
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nama Lengkap Ayah"
                                                    value={values.name}
                                                    onChange={(e) =>
                                                        setValues({ ...values, name: e.target.value })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="name">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="phone_ayah"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    No. Handphone
                                                </label>
                                                <Field
                                                    type="number"
                                                    name="phone_ayah"
                                                    id="phone_ayah"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Handphone Ayah"
                                                    value={values.phone_ayah}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            phone_ayah: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="phone_ayah">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Email
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Email"
                                                    value={values.email}
                                                    onChange={(e) =>
                                                        setValues({ ...values, email: e.target.value })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="email">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="dob_ayah"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Tanggal Lahir
                                                </label>
                                                <Field
                                                    type="date"
                                                    name="dob_ayah"
                                                    id="dob_ayah"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Kartu Keluarga"
                                                    value={values.dob_ayah}
                                                    onChange={(e) =>
                                                        setValues({ ...values, dob_ayah: e.target.value })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="dob_ayah">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="address"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Alamat Lengkap
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Alamat Lengkap"
                                                    required
                                                    value={values.address}
                                                    onChange={(e) =>
                                                        setValues({ ...values, address: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="address">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="kelurahan"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Kelurahan
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="kelurahan"
                                                    id="kelurahan"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Kelurahan"
                                                    value={values.kelurahan}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            kelurahan: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="kelurahan">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="kecamatan"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Kecamatan
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="kecamatan"
                                                    id="kecamatan"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Kecamatan"
                                                    value={values.kecamatan}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            kecamatan: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="kecamatan">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="kabupaten_kota"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Kabupaten / Kota
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="kabupaten_kota"
                                                    id="kabupaten_kota"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Kota / Kabupaten"
                                                    value={values.kabupaten_kota}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            kabupaten_kota: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="kabupaten_kota">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 mb-6 md:grid-cols-1 lg:grid-cols-2">
                                            <div>
                                                <label
                                                    htmlFor="provinsi"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Provinsi
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="provinsi"
                                                    id="provinsi"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Provinsi"
                                                    value={values.provinsi}
                                                    onChange={(e) =>
                                                        setValues({ ...values, provinsi: e.target.value })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="provinsi">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="zip_code"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Kode Pos
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="zip_code"
                                                    id="zip_code"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Kode Pos"
                                                    value={values.zip_code}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            zip_code: e.target.value,
                                                        })
                                                    }
                                                    required
                                                />
                                                <ErrorMessage name="zip_code">
                                                    {(error) => (
                                                        <span className="text-sm text-pink-600 ms-3">
                                                            {error}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div className="flex my-4">
                                            <Button
                                                className="ml-auto"
                                                type="submit"
                                                disabled={props.isSubmitting || !props.isValid}
                                                loading={props.isSubmitting ? true : false}
                                            >
                                                {props.isSubmitting ? "Loading" : "Simpan"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>


                            </>
                        )}


                    </Form>)
            }}
        </Formik>
    )
}

export default UpdateProfile