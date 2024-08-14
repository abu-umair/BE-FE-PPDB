import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomToast, Toast } from './../../utils/Toast';
import { fetchData, postData } from '@/services/user.service';
import { PhotoIcon } from "@heroicons/react/24/solid";
import * as yup from "yup";



const validationSchema = yup.object({
    pas_photo: yup.mixed()
        .nullable()
        .test(
            'fileSize',
            'Ukuran file terlalu besar, maksimal 1 MB',
            value => !value || (value && value.size <= 1024 * 1024)
        ),
    kk: yup.mixed()
        .nullable()
        .test(
            'fileSize',
            'Ukuran file terlalu besar, maksimal 1 MB',
            value => !value || (value && value.size <= 1024 * 1024)
        ),
    akta_lahir: yup.mixed()
        .nullable()
        .test(
            'fileSize',
            'Ukuran file terlalu besar, maksimal 1 MB',
            value => !value || (value && value.size <= 1024 * 1024)
        ),
});

const UploadFile = ({ auth, studentData, onUpdate }) => {
    const [pasPhoto, setPasPhoto] = useState(null);
    const [photoKartuKeluarga, setPhotoKartuKeluarga] = useState(null);
    const [photoAktaLahir, setPhotoAktaLahir] = useState(null);
    // const [videoPreview, setVideoPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    const filePicekerRef = useRef(null);

    function previewFilePasPhoto(e) {
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
        setValues({ ...values, pas_photo: selectedFile })

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setPasPhoto(readerEvent.target.result);
            }

            // else if (selectedFile.type.includes("video")) {
            //     setVideoPreview(readerEvent.target.result);
            // }
        };
    }

    function previewFileKartuKeluarga(e) {
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
        setValues({ ...values, kk: selectedFile })

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setPhotoKartuKeluarga(readerEvent.target.result);
            }
            // else if (selectedFile.type.includes("video")) {
            //     setVideoPreview(readerEvent.target.result);
            // }
        };
    }

    function previewFileAktaLahir(e) {

        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
        setValues({ ...values, akta_lahir: selectedFile })

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setPhotoAktaLahir(readerEvent.target.result);
            }
            // else if (selectedFile.type.includes("video")) {
            //     setVideoPreview(readerEvent.target.result);
            // }
        };
    }

    const [values, setValues] = useState({
        id: "",
        name: "",
        pas_photo: "",
        kk: "",
        akta_lahir: "",
        users_id: ""
    });

    const initialValues = {
        id: values.id,
        name: values.name,
        pas_photo: values.pas_photo,
        kk: values.kk,
        akta_lahir: values.akta_lahir,
        users_id: values.users_id,
    }

    useEffect(() => {
        if (studentData && auth) {
            setValues({
                ...values,
                id: studentData.id,
                name: studentData.name,
                pas_photo: studentData.pas_photo,
                kk: studentData.kk,
                akta_lahir: studentData.akta_lahir,
                users_id: studentData.users_id,
            });

            setLoading(false);
        }

        console.log(studentData.akta_lahir);
    }, [studentData, auth]);
    // console.log(auth);
    const onSubmit = async (values) => {
        console.log(values);
        // const postDataToAPI = async () => {
        try {
            const dataToPost = {
                name: values.name,
                pas_photo: values.pas_photo,
                kk: values.kk,
                akta_lahir: values.akta_lahir,
                users_id: values.users_id,
            };

            return await postData(`student/${values.id}`, dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "Add Success!", type: "success" });

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
            CustomToast({ message: "Add Failed", type: "error" });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        // console.log(response);
    }

    const baseUrl = "https://beppdb.evolusidigital.id/storage/";

    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {props => {
                return (
                    <Form method='POST'>
                        <Toast />
                        {loading ? (
                            <p>Loading</p>
                        ) : (
                            <>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12'>
                                    <div className='flex flex-col space-y-3'>
                                        <Typography variant="small" color="blue-gray" className=" font-medium">
                                            Upload Pas Photo
                                        </Typography>
                                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                                            <div className='preview w-full max-w-xs bg-gray-300 rounded-md p-4'>
                                                {pasPhoto != null ?
                                                    <img src={pasPhoto}
                                                        className="w-20 rounded-sm mx-auto" />
                                                    : studentData.pas_photo != null ?
                                                        <img src={"https://beppdb.evolusidigital.id/storage/" + studentData.pas_photo}
                                                            className="w-20 rounded-sm mx-auto" />
                                                        :
                                                        <PhotoIcon
                                                            strokeWidth={2}
                                                            className="w-20 rounded-sm mx-auto"
                                                        />
                                                }

                                            </div>
                                            <div className='flex flex-col  w-full'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Upload file png/jpg, berukuran kurang dari 1 Mb </label>
                                                <input name='pas_photo'
                                                    className="block border-none w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                    id="large_size"
                                                    type="file"
                                                    ref={filePicekerRef}
                                                    accept="image/*"
                                                    onChange={previewFilePasPhoto} />

                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col space-y-3'>
                                        <Typography variant="small" color="blue-gray" className=" font-medium">
                                            Upload Photo Kartu Keluarga
                                        </Typography>
                                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                                            <div className='preview w-full max-w-xs bg-gray-300 rounded-md p-4'>
                                                {photoKartuKeluarga != null ?
                                                    <img src={photoKartuKeluarga}
                                                        className="w-20 rounded-sm mx-auto" />
                                                    : studentData.kk != null ?
                                                        <img src={"https://beppdb.evolusidigital.id/storage/" + studentData.kk}
                                                            className="w-20 rounded-sm mx-auto" />
                                                        :

                                                        <PhotoIcon
                                                            strokeWidth={2}
                                                            className="w-20 rounded-sm mx-auto"
                                                        />
                                                }

                                            </div>
                                            <div className='flex flex-col  w-full'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Upload file png/jpg, berukuran kurang dari 1 Mb </label>
                                                <input name='kk'
                                                    className="block border-none w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                    id="large_size"
                                                    type="file"
                                                    ref={filePicekerRef}
                                                    accept="image/*"
                                                    onChange={previewFileKartuKeluarga} />
                                                {/* <button className="btn" 
                                onClick={() => filePicekerRef.current.click()}>Choose</button> */}
                                            </div>
                                            {/* <div className="preview">
                                {photoKartuKeluarga != null && <img src={photoKartuKeluarga} alt="" />}
                                {videoPreview != null && <video controls src={videoPreview}></video>}
                            </div> */}
                                        </div>
                                    </div>

                                    <div className='flex flex-col space-y-3'>
                                        <Typography variant="small" color="blue-gray" className=" font-medium">
                                            Upload Photo Akta Lahir
                                        </Typography>
                                        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                                            <div className='preview w-full max-w-xs bg-gray-300 rounded-md p-4'>
                                                {photoAktaLahir != null ?
                                                    <img src={photoAktaLahir}
                                                        className="w-20 rounded-sm mx-auto" />
                                                    : studentData.akta_lahir != null ?
                                                        <img src={"https://beppdb.evolusidigital.id/storage/" + studentData.akta_lahir}
                                                            className="w-20 rounded-sm mx-auto" />
                                                        :
                                                        <PhotoIcon
                                                            strokeWidth={2}
                                                            className="w-20 rounded-sm mx-auto"
                                                        />
                                                }

                                            </div>
                                            <div className='flex flex-col  w-full'>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Upload file png/jpg, berukuran kurang dari 1 Mb </label>
                                                <input name='akta_lahir'
                                                    className="block border-none w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                    id="large_size"
                                                    type="file"
                                                    ref={filePicekerRef}
                                                    accept="image/*"
                                                    onChange={
                                                        previewFileAktaLahir
                                                    }
                                                // onChange={(e) => previewFileAktaLahir(e, setFieldValue)}
                                                />
                                                {/* <button className="btn" 
                                onClick={() => filePicekerRef.current.click()}>Choose</button> */}
                                            </div>
                                            {/* <div className="preview">
                                {photoAktaLahir != null && <img src={photoAktaLahir} alt="" />}
                                {videoPreview != null && <video controls src={videoPreview}></video>}
                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col-reverse md:flex-row md:justify-end my-4">
                                    <Button
                                        className=""
                                        type="submit"
                                        disabled={props.isSubmitting || !props.isValid}
                                        loading={props.isSubmitting ? true : false}
                                    >
                                        {props.isSubmitting ? "Loading" : "Simpan"}
                                    </Button>
                                </div>
                            </>)}



                    </Form>)
            }}
        </Formik>
    )
}

export default UploadFile