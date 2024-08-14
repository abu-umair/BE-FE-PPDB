import { Button } from '@material-tailwind/react';
import { NavLink } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import React, { useEffect, useRef, useState } from 'react';

const AkunLogin = ({ selectedData }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [loading, setLoading] = useState(true);


    console.log(selectedData);


    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    useEffect(() => {
        if (selectedData) {
            setLoading(false);
        }
    }, [selectedData]);

    return (

        <div ref={componentRef}>
            {loading ? (
                <p>Loading</p>
            ) : (<div className='bg-black pt-5 px-3 md:h-screen py-7'>
                <div className="container mx-auto md:flex md:my-auto">
                    <div className="flex bg-[#F4F4FF] flex-wrap md:flex-nowrap rounded-md space-y-5 py-5 px-5 md:space-y-0 md:space-x-5">
                        <div className="w-full space-y-5 md:w-2/3">
                            <div className="w-full h-full space-y-5 bg-white rounded-lg py-6">
                                <img src="/img/logo-abudzar.png" alt="" className='mx-auto' />
                                <h3 className='text-center text-4xl font-bold'>Akun login PPDB</h3>
                                <div className="flex space-x-3 justify-center ">
                                    <div className="flex flex-col space-y-3">
                                        <h5 className='text-gray-500 font-semibold'>User ID</h5>
                                        <h5 className='text-gray-500 font-semibold'>Password</h5>
                                        <h5 className='text-gray-500 font-semibold'>Nama</h5>
                                    </div>
                                    <div className="flex flex-col space-y-3 ">
                                        <p className='font-semibold'>ADZ-{selectedData.id}</p>
                                        <p className='font-semibold'>{selectedData.password}</p>
                                        <p className='font-semibold'>{selectedData.name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap w-full bg-white rounded-lg px-5 pt-5 space-y-2 md:space-y-0">
                                    <div className="w-full md:w-1/2 md:px-4  ">
                                        <Button
                                            className=""
                                            fullWidth type="submit"
                                            variant='outlined'
                                            onClick={handlePrint}
                                        >
                                            PRINT
                                        </Button>
                                    </div>
                                    <div className="w-full md:w-1/2 md:px-4">
                                        <NavLink to={'/sign-in'}>
                                            <Button
                                                className=""
                                                fullWidth type="submit"
                                            >
                                                LOGIN
                                            </Button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="w-full space-y-5 px-5 py-5 bg-white rounded-lg ">
                                <h3 className='text-3xl font-bold'>Pembayaran</h3>
                                <div className="flex space-x-3 ">
                                    <div className="flex flex-col space-y-3">
                                        <h5 className='md:text-2xl font-semibold'>Virtual Account</h5>
                                        <div className="flex flex-col space-y-3">
                                            <div className='flex'>
                                                <div>&#x2022; </div>
                                                <h5 className='ms-3 md:text-2xl'><b>Muamalat:</b> 9021002024013315</h5>
                                            </div>
                                            <div className='flex'>
                                                <div>&#x2022; </div>
                                                <h5 className='ms-3 md:text-2xl'><b>BSI:</b> 36142200955</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="w-full space-y-5 md:w-full">
                            <div className="w-full space-y-5 px-5 py-5 bg-white rounded-lg ">
                                <h3 className='text-3xl font-bold'>Perhatian!</h3>
                                <div className="flex space-x-3 ">
                                    <div className="flex flex-col space-y-3">
                                        <div className='flex'>
                                            <div>&#x2022; </div>
                                            <h5 className='ms-3 md:text-2xl '>Ingat dan simpan data Email, Password dan No Rekening Virtual</h5>
                                        </div>
                                        <div className='flex'>
                                            <div>&#x2022; </div>
                                            <h5 className='ms-3 md:text-2xl '>Tambahan biaya {formatToRupiah(6000)} adalah biaya administrasi fasilitas Virtual Account</h5>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full space-y-5 px-5 py-5 bg-white rounded-lg ">
                                <div className="flex space-x-3 ">
                                    <div className="flex flex-col space-y-3">
                                        <h5 className='ms-3 md:text-2xl'>silahkan transfer Biaya Pendaftaran sebesar <b>{formatToRupiah(selectedData.biaya)}</b> dengan menggunakan salah satu Nomor Virtual Account tersebut agar bisa meneruskan proses pendaftaran santri baru di <b>Pondok Tahfizh Plus IT.</b></h5>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="flex flex-wrap w-full bg-white rounded-lg px-5 py-5 space-y-2 md:space-y-0">
                                <div className="w-full md:w-1/2 md:px-4  ">
                                    <Button
                                        className=""
                                        fullWidth type="submit"
                                        variant='outlined'
                                        onClick={handlePrint}
                                    >
                                        PRINT
                                    </Button>
                                </div>
                                <div className="w-full md:w-1/2 md:px-4">
                                    <NavLink to={'/sign-in'}>
                                        <Button
                                            className=""
                                            fullWidth type="submit"
                                        >
                                            LOGIN
                                        </Button>
                                    </NavLink>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>)}

        </div>
    )
}

export default AkunLogin