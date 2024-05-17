import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomToast, Toast } from './../../utils/Toast';
import { fetchData, postData } from '@/services/user.service';
import { PhotoIcon } from "@heroicons/react/24/solid";
import * as yup from "yup";



const validationSchema = yup.object({
    pas_photo: yup.mixed().required(),
    kk: yup.mixed().required(),
    akta_lahir: yup.mixed().required(),
});

const UploadFile = ({ auth, studentData }) => {
    const [pasPhoto, setPasPhoto] = useState(null);
    const [photoKartuKeluarga, setPhotoKartuKeluarga] = useState(null);
    const [photoAktaLahir, setPhotoAktaLahir] = useState(null);
    // const [videoPreview, setVideoPreview] = useState(null);
    const filePicekerRef = useRef(null);

    function previewFilePasPhoto(e) {
        setFieldValue(
            "pas_photo",
            e.target.files[0]
        );
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
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
        setFieldValue(
            "kk",
            e.target.files[0]
        )
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
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
        setFieldValue(
            "akta_lahir",
            e.target.files[0]
        )
        // Reading New File (open file Picker Box)
        const reader = new FileReader();
        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e.target.files[0];
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
        if (studentData) {
            setValues({
                ...values,
                id: studentData.id,
                name: studentData.name,
                pas_photo: studentData.pas_photo,
                kk: studentData.kk,
                akta_lahir: studentData.akta_lahir,
                users_id: studentData.users_id,
            });
        }
    }, [studentData]);
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
                        //     props.setUserAdded();
                        //     // window.location.reload();
                        // }, 2000);
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
    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {props => {
                return (
                    <Form method='POST'>
                        <Toast />
                        <div className=" flex my-4 flex-row-reverse">
                            <Button
                                className=""
                                type="submit"
                                disabled={props.isSubmitting || !props.isValid}
                                loading={props.isSubmitting ? true : false}
                            >
                                {props.isSubmitting ? "Loading" : "Simpan"}
                            </Button>
                        </div>
                        <div className='grid grid-cols-2 gap-36'>
                            <div className='flex flex-col space-y-3'>
                                <Typography variant="small" color="blue-gray" className=" font-medium">
                                    Upload Pas Photo
                                </Typography>
                                <div className='flex flex-row space-x-4'>
                                    <div className='preview max-w-xs 2px bg-gray-300 rounded-md px-9 py-4'>
                                        {pasPhoto != null ?
                                            <img src={pasPhoto}
                                                className="w-20" />
                                            :
                                            <PhotoIcon
                                                strokeWidth={2}
                                                className="w-20"
                                            />
                                        }

                                    </div>
                                    <div className='flex flex-col  w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Upload file png/jpg, berukuran kurang dari 1 Mb</label>
                                        <input name='pas_photo'
                                            className="block border-none w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="large_size"
                                            type="file"
                                            ref={filePicekerRef}
                                            accept="image/*"
                                            onChange={previewFilePasPhoto} />
                                        {/* <button className="btn" 
                                onClick={() => filePicekerRef.current.click()}>Choose</button> */}
                                    </div>
                                    {/* <div className="preview">
                                {pasPhoto != null && <img src={pasPhoto} alt="" />}
                                {videoPreview != null && <video controls src={videoPreview}></video>}
                            </div> */}
                                </div>
                            </div>

                            <div className='flex flex-col space-y-3'>
                                <Typography variant="small" color="blue-gray" className=" font-medium">
                                    Upload Photo Kartu Keluarga
                                </Typography>
                                <div className='flex flex-row space-x-4'>
                                    <div className='preview max-w-xs 2px bg-gray-300 rounded-md px-9 py-4'>
                                        {photoKartuKeluarga != null ?
                                            <img src={photoKartuKeluarga}
                                                className="w-20" />
                                            :
                                            <PhotoIcon
                                                strokeWidth={2}
                                                className="w-20"
                                            />
                                        }

                                    </div>
                                    <div className='flex flex-col  w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Upload file png/jpg, berukuran kurang dari 1 Mb</label>
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
                                <div className='flex flex-row space-x-4'>
                                    <div className='preview max-w-xs 2px bg-gray-300 rounded-md px-9 py-4'>
                                        {photoAktaLahir != null ?
                                            <img src={photoAktaLahir}
                                                className="w-20" />
                                            :
                                            <PhotoIcon
                                                strokeWidth={2}
                                                className="w-20"
                                            />
                                        }

                                    </div>
                                    <div className='flex flex-col  w-full'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Upload file png/jpg, berukuran kurang dari 1 Mb</label>
                                        <input name='akta_lahir'
                                            className="block border-none w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            id="large_size"
                                            type="file"
                                            ref={filePicekerRef}
                                            accept="image/*"
                                            onChange={previewFileAktaLahir} />
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

                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Upload Pas Photo
                            </Typography>
                            <div className="grid grid-cols-1 space-y-2">
                                {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label> */}
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                        <div className="h-full w-full text-center flex flex-col items-center justify-center   ">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                            </div>
                                            <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                        </div>
                                        <input name="pas_photo" accept="image/png, image/jpg, image/jpeg" type="file" className="hidden" onChange={(e) =>
                                            props.setFieldValue(
                                                "pas_photo",
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

                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Upload Photo Kartu Keluarga
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
                                        <input name="kk" accept="image/png, image/jpg, image/jpeg" type="file" className="hidden" onChange={(e) =>
                                            props.setFieldValue(
                                                "kk",
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

                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                Upload Photo Akta Lahir
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
                                        <input name="akta_lahir" accept="image/png, image/jpg, image/jpeg" type="file" className="hidden" onChange={(e) =>
                                            props.setFieldValue(
                                                "akta_lahir",
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

                    </Form>)
            }}
        </Formik>
    )
}

export default UploadFile