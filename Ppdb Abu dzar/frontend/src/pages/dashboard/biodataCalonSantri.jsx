import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@material-tailwind/react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { fetchData, postData } from '@/services/user.service';
import { CustomToast, Toast } from './../../utils/Toast';
import { useReactToPrint } from 'react-to-print';
import { Dropdown } from 'primereact/dropdown';
import Select from "react-select";


const optionJenisKelamin = [
    { label: 'Laki-laki', value: 0 },
    { label: 'Perempuan', value: 1 },
];

const optionStatusKeluarga = [
    { label: 'Anak', value: 'anak' },
    { label: 'Anak Angkat', value: 'anak angkat' },
];

const optionJenisTempatTinggal = [
    { label: 'Apartement', value: 'Apartement' },
    { label: 'Rumah', value: 'Rumah' },
    { label: 'Ruko', value: 'Ruko' },
];

const optionTransoptasi = [
    { label: 'Mobil', value: 'Mobil' },
    { label: 'Motor', value: 'Motor' },
];

const validationSchema = yup.object({
    name: yup.string().required().trim(),
    no_kk: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required(),
    nik_siswa: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required(),
    nisn: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        // .positive("the value must be positive")
        .required(),
    kota_lahir: yup.string().required().trim(),
    jenis_kelamin: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        // .positive("the value must be positive")
        .required(),
    phone_santri: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        // .positive("the value must be positive")
        .required()
        .test(
            "len",
            "phone number must be at least 10 digits",
            (val) => val && val.toString().length >= 10
        ),
    asal_sekolah: yup.string().required().trim(),
    anak_ke: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required(),
    jumlah_saudara: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required(),
    tinggi_badan: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required(),
    berat_badan: yup
        .number()
        .integer("the value must be an integer")
        // .transform((value) => (isNaN(value) ? undefined : value))
        .positive("the value must be positive")
        .required(),
    status_dalam_keluarga: yup.string().required().trim(),
    riwayat_penyakit: yup.string().required().trim(),
    jenis_tempat_tinggal: yup.string().required().trim(),
    transportasi: yup.string().required().trim(),
    dob: yup.date(),



    // photo: yup.mixed().required(), //'mixed': jika berbentuk file, memakai 'mixed'
});

const BiodataCalonSantri = ({ auth, studentData, onUpdate }) => {
    const [oldJenisKelamin, setOldJenisKelamin] = useState(null);
    const [oldStatusKeluarga, setOldStatusKeluarga] = useState(null);
    const [oldJenisTempatTinggal, setOldJenisTempatTinggal] = useState(null);
    const [oldTransportasi, setOldTransportasi] = useState(null);
    const [loading, setLoading] = useState(true);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // const [isPrint, setIsPrint] = useState(false)
    const [values, setValues] = useState({
        id: "",
        no_kk: "",
        nik_siswa: "",
        name: "",
        nisn: "",
        dob: "",
        kota_lahir: "",
        jenis_kelamin: "",
        phone_santri: "",
        asal_sekolah: "",
        anak_ke: "",
        jumlah_saudara: "",
        tinggi_badan: "",
        berat_badan: "",
        status_dalam_keluarga: "",
        riwayat_penyakit: "",
        jenis_tempat_tinggal: "",
        transportasi: "",
    });

    const initialValues = {
        id: values.id,
        no_kk: values.no_kk,
        nik_siswa: values.nik_siswa,
        name: values.name,
        nisn: values.nisn,
        dob: values.dob,
        kota_lahir: values.kota_lahir,
        jenis_kelamin: values.jenis_kelamin,
        phone_santri: values.phone_santri,
        asal_sekolah: values.asal_sekolah,
        anak_ke: values.anak_ke,
        jumlah_saudara: values.jumlah_saudara,
        tinggi_badan: values.tinggi_badan,
        berat_badan: values.berat_badan,
        status_dalam_keluarga: values.status_dalam_keluarga,
        riwayat_penyakit: values.riwayat_penyakit,
        jenis_tempat_tinggal: values.jenis_tempat_tinggal,
        transportasi: values.transportasi,
    }

    // useEffect(() => {
    //     const getStudentById = async () => {
    //         try {
    //             const response = await fetchData('student/' + auth.userId, auth.token);
    //             console.log(response.data);
    //             setValues({
    //                 ...values,
    //                 id: response.data.id,
    //                 name: response.data.name,
    //                 // email: response.data.email,
    //                 no_kk: response.data.no_kk,
    //                 nik_siswa: response.data.nik_siswa,
    //                 name: response.data.name,
    //                 nisn: response.data.nisn,
    //                 dob: response.data.dob,
    //                 kota_lahir: response.data.kota_lahir,
    //                 jenis_kelamin: response.data.jenis_kelamin,
    //                 phone_santri: response.data.phone_santri,
    //                 asal_sekolah: response.data.asal_sekolah,
    //                 anak_ke: response.data.anak_ke,
    //                 jumlah_saudara: response.data.jumlah_saudara,
    //                 tinggi_badan: response.data.tinggi_badan,
    //                 berat_badan: response.data.berat_badan,
    //                 status_dalam_keluarga: response.data.status_dalam_keluarga,
    //                 riwayat_penyakit: response.data.riwayat_penyakit,
    //                 jenis_tempat_tinggal: response.data.jenis_tempat_tinggal,
    //                 transportasi: response.data.transportasi,
    //                 // password: response.data.password,
    //             });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getStudentById()
    // }, []);

    useEffect(() => {
        if (studentData && auth) {
            setValues({
                ...values,
                id: studentData.id,
                name: studentData.name,
                no_kk: studentData.no_kk,
                nik_siswa: studentData.nik_siswa,
                nisn: studentData.nisn,
                dob: studentData.dob,
                kota_lahir: studentData.kota_lahir,
                jenis_kelamin: studentData.jenis_kelamin,
                phone_santri: studentData.phone_santri,
                asal_sekolah: studentData.asal_sekolah,
                anak_ke: studentData.anak_ke,
                jumlah_saudara: studentData.jumlah_saudara,
                tinggi_badan: studentData.tinggi_badan,
                berat_badan: studentData.berat_badan,
                status_dalam_keluarga: studentData.status_dalam_keluarga,
                riwayat_penyakit: studentData.riwayat_penyakit,
                jenis_tempat_tinggal: studentData.jenis_tempat_tinggal,
                transportasi: studentData.transportasi,
            });

            setOldJenisKelamin({
                value: studentData.jenis_kelamin,
                label: studentData.jenis_kelamin === 0 ? "Laki-laki" : studentData.jenis_kelamin === 1 ? "Perempuan" : "Pilih Jenis Kelamin",
            });

            setOldStatusKeluarga({
                value: studentData.status_dalam_keluarga === "anak" ? "Anak" : "Anak Angkat",
                label: studentData.status_dalam_keluarga,
            });

            setOldJenisTempatTinggal({
                value: studentData.jenis_tempat_tinggal,
                label: studentData.jenis_tempat_tinggal,
            });

            setOldTransportasi({
                value: studentData.transportasi,
                label: studentData.transportasi,
            });

            setLoading(false);

        }
    }, [studentData, auth]);
    // console.log(values.id);
    // console.log(auth);
    const onSubmit = async (values) => {
        console.log(values);
        // const postDataToAPI = async () => {
        try {
            const dataToPost = {
                no_kk: values.no_kk,
                nik_siswa: values.nik_siswa,
                name: values.name,
                nisn: values.nisn,
                dob: values.dob,
                kota_lahir: values.kota_lahir,
                jenis_kelamin: values.jenis_kelamin,
                phone_santri: values.phone_santri,
                asal_sekolah: values.asal_sekolah,
                anak_ke: values.anak_ke,
                jumlah_saudara: values.jumlah_saudara,
                tinggi_badan: values.tinggi_badan,
                berat_badan: values.berat_badan,
                status_dalam_keluarga: values.status_dalam_keluarga,
                riwayat_penyakit: values.riwayat_penyakit,
                jenis_tempat_tinggal: values.jenis_tempat_tinggal,
                transportasi: values.transportasi,
            };

            return await postData(`student/${values.id}`, dataToPost, auth.token)
                // return await postData(`student/46`, dataToPost, auth.token)
                .then(
                    (response) => {
                        console.log(response);
                        // Notifification success
                        CustomToast({ message: "Biodata Calon Santri Success!", type: "success" });

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
            // setIsPrint(true);
        } catch (err) {
            CustomToast({ message: "Add Failed", type: "error" });
            console.log(err);
            console.log(err.response.data.message);
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
                                <div className=" flex my-4">
                                    <h3 className='font-bold text-2xl grow'>
                                        Data Diri
                                    </h3>
                                    <Button
                                        variant='outlined'
                                        className='mr-3'
                                        onClick={handlePrint}
                                    // disabled={!isPrint}
                                    // {isPrint && 'disabled'}
                                    >Print</Button>
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
                                        <label htmlFor="no_kk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No.KK<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="number" name="no_kk" id="no_kk" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Nomer Kartu Keluarga"
                                            value={values.no_kk}
                                            onChange={(e) =>
                                                setValues({ ...values, no_kk: e.target.value })
                                            }
                                        />
                                        <ErrorMessage name="no_kk">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                    <div>
                                        <label htmlFor="nik_siswa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIK Siswa<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="number" name="nik_siswa" id="nik_siswa" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi NIK Siswa  (Lihat di KK)"
                                            value={values.nik_siswa}
                                            onChange={(e) =>
                                                setValues({ ...values, nik_siswa: e.target.value })
                                            }
                                        />
                                        <ErrorMessage name="nik_siswa">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Calon Siswa<span className='text-pink-600 font-black'> *</span></label>
                                        <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi Nama Siswa"
                                            value={values.name}
                                            onChange={(e) =>
                                                setValues({ ...values, name: e.target.value })
                                            }
                                        />
                                        <ErrorMessage name="name">
                                            {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                        </ErrorMessage>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="nisn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NISN<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="nisn" id="nisn" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi NISN"
                                                    value={values.nisn}
                                                    onChange={(e) =>
                                                        setValues({ ...values, nisn: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="nisn">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Lahir<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="date" name="dob" id="dob" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Kartu Keluarga"
                                                    value={values.dob}
                                                    onChange={(e) =>
                                                        setValues({ ...values, dob: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="dob">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="kota_lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kota Lahir<span className='text-pink-600 font-black'> *</span></label>
                                            <Field type="text" name="kota_lahir" id="kota_lahir" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Isi Kota Lahir"
                                                value={values.kota_lahir}
                                                onChange={(e) =>
                                                    setValues({ ...values, kota_lahir: e.target.value })
                                                }
                                            />
                                            <ErrorMessage name="kota_lahir">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="jenis_kelamin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin<span className='text-pink-600 font-black'> *</span></label>
                                                {/* <Field type="number" name="jenis_kelamin" id="jenis_kelamin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Isi NISN"
                                            required /> */}
                                                <Select
                                                    options={optionJenisKelamin}
                                                    name="jenis_kelamin"
                                                    defaultValue={oldJenisKelamin}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            jenis_kelamin: e.value,
                                                        })
                                                    }
                                                />

                                                {/* <Dropdown
                                            value={values.jenis_kelamin == 1 ? 'Perempuan' : 'Laki-laki'}
                                            onChange={(e) => {
                                                // console.log(e.value)
                                                setValues({
                                                    ...values,
                                                    jenis_kelamin: e.value.code,
                                                })
                                            }}
                                            options={optionJenisKelamin} optionLabel="name"
                                            editable placeholder="Select Jenis Kelamin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}


                                                <ErrorMessage name="jenis_kelamin">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="phone_santri" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No. Handphone<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="phone_santri" id="phone_santri" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Nomer Handphone"
                                                    value={values.phone_santri}
                                                    onChange={(e) =>
                                                        setValues({ ...values, phone_santri: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="phone_santri">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="asal_sekolah" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asal Sekolah<span className='text-pink-600 font-black'> *</span></label>
                                            <Field type="text" name="asal_sekolah" id="asal_sekolah" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Isi Asal Sekolah"
                                                value={values.asal_sekolah}
                                                onChange={(e) =>
                                                    setValues({ ...values, asal_sekolah: e.target.value })
                                                }
                                            />
                                            <ErrorMessage name="asal_sekolah">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="anak_ke" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Anak Ke<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="anak_ke" id="anak_ke" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Anak ke berapa"
                                                    value={values.anak_ke}
                                                    onChange={(e) =>
                                                        setValues({ ...values, anak_ke: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="anak_ke">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="jumlah_saudara" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah Saudara<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="jumlah_saudara" id="jumlah_saudara" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Jumlah Saudara"
                                                    value={values.jumlah_saudara}
                                                    onChange={(e) =>
                                                        setValues({ ...values, jumlah_saudara: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="jumlah_saudara">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="tinggi_badan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tinggi Badan<span className='text-pink-600 font-black'> *</span></label>
                                            <Field type="number" name="tinggi_badan" id="tinggi_badan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Isi Tinggi Badan"
                                                value={values.tinggi_badan}
                                                onChange={(e) =>
                                                    setValues({ ...values, tinggi_badan: e.target.value })
                                                }
                                            />
                                            <ErrorMessage name="tinggi_badan">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div>
                                                <label htmlFor="berat_badan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Berat Badan<span className='text-pink-600 font-black'> *</span></label>
                                                <Field type="number" name="berat_badan" id="berat_badan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Isi Berat Badan"
                                                    value={values.berat_badan}
                                                    onChange={(e) =>
                                                        setValues({ ...values, berat_badan: e.target.value })
                                                    }
                                                />
                                                <ErrorMessage name="berat_badan">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="status_dalam_keluarga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status Dalam Keluarga<span className='text-pink-600 font-black'> *</span></label>
                                                <Select
                                                    options={optionStatusKeluarga}
                                                    name="status_dalam_keluarga"
                                                    defaultValue={oldStatusKeluarga}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            status_dalam_keluarga: e.value,
                                                        })
                                                    }
                                                />
                                                {/* <Dropdown value={values.status_dalam_keluarga}
                                            onChange={(e) => {
                                                // console.log(e.value)
                                                setValues({
                                                    ...values,
                                                    status_dalam_keluarga: e.value.code,
                                                })
                                            }}
                                            options={optionStatusKeluarga} optionLabel="name"
                                            editable placeholder="Select Status Dalam Keluarga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                                <ErrorMessage name="status_dalam_keluarga">
                                                    {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                                </ErrorMessage>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="riwayat_penyakit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Riwayat Penyakit<span className='text-pink-600 font-black'> *</span></label>
                                            <Field type="text" name="riwayat_penyakit" id="riwayat_penyakit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Isi Riwayat Penyakit (Jika ada)"
                                                value={values.riwayat_penyakit}
                                                onChange={(e) =>
                                                    setValues({ ...values, riwayat_penyakit: e.target.value })
                                                }
                                            />
                                            <ErrorMessage name="riwayat_penyakit">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                </div>
                                <div className=" flex my-4">
                                    <h3 className='font-bold text-2xl grow'>
                                        Lain-lain
                                    </h3>
                                </div>
                                <div className="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <div>
                                            <label htmlFor="jenis_tempat_tinggal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Tempat Tinggal<span className='text-pink-600 font-black'> *</span></label>
                                            <Select
                                                options={optionJenisTempatTinggal}
                                                name="jenis_tempat_tinggal"
                                                defaultValue={oldJenisTempatTinggal}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        jenis_tempat_tinggal: e.value,
                                                    })
                                                }
                                            />
                                            {/* <Dropdown value={values.jenis_tempat_tinggal}
                                        onChange={(e) => {
                                            // console.log(e.value)
                                            setValues({
                                                ...values,
                                                jenis_tempat_tinggal: e.value.name,
                                            })
                                        }}
                                        options={optionJenisTempatTinggal} optionLabel="name"
                                        editable placeholder="Select Jenis tempat Tinggal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                            <ErrorMessage name="jenis_tempat_tinggal">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label htmlFor="transportasi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transportasi<span className='text-pink-600 font-black'> *</span></label>
                                            <Select
                                                options={optionTransoptasi}
                                                name="transportasi"
                                                defaultValue={oldTransportasi}
                                                onChange={(e) =>
                                                    setValues({
                                                        ...values,
                                                        transportasi: e.value,
                                                    })
                                                }
                                            />
                                            {/* <Dropdown value={values.transportasi ?? 'Pilih Transportasi'} */}
                                            {/* <Dropdown value={values.transportasi}
                                        onChange={(e) => {
                                            // console.log(e.value)
                                            setValues({
                                                ...values,
                                                transportasi: e.value.name,
                                            })
                                        }}
                                        options={optionTransoptasi} optionLabel="name"
                                        editable placeholder="Select Transportasi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                                            <ErrorMessage name="transportasi">
                                                {(error) => (<span className="text-sm text-pink-600 ms-3">{error}</span>)}
                                            </ErrorMessage>
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

export default BiodataCalonSantri