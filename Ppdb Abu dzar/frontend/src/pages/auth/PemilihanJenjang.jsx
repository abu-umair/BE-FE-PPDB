import { Button } from '@material-tailwind/react'
import AuthService from "./../../services/auth.service";
import { CustomToast, Toast } from './../../utils/Toast';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PemilihanJenjang = ({ formData, onNext }) => {
    // const [selectedData, setSelectedData] = useState('');
    const navigate = useNavigate();


    const handleDaftarClick = async (value, jenjang) => {

        try {

            const response = await AuthService.register(
                formData.name,
                formData.email,
                formData.password,
                formData.photo,
                value,
                jenjang,
            );

            const id = response.user ? response.user.id : null;

            if (id) {
                let updatedFormData = { ...formData, biaya: value, jenjang: jenjang, id: id };
                console.log(updatedFormData);
                onNext(updatedFormData);
                CustomToast({ message: "Sign Up Success!", type: "success" });

            } else {
                throw new Error('ID not found in the response');
            }


        } catch (err) {
            console.log(err);

            CustomToast({ message: "Register Failed", type: "error" });


        }


    };

    return (
        <div className='bg-gray-900 '>
            <Toast />
            <div className="section w-full">
                <div className="container mx-auto w-full">
                    <div className="text-center text-4xl font-bold text-white pt-10">
                        Pilih Jenjang Pendidikan Santri
                    </div>
                    <div className="flex justify-center overflow-hidden">
                        <div className="flex flex-wrap mt-14">
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB TK A</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(450000, 'tk a')} >Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'tk a')} >Daftar</Button> */}
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB TK B</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(450000, 'tk b')} >Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'tk b')} >Daftar</Button> */}
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB SD</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(500000, 'sd')}>Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'sd')} >Daftar</Button> */}
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB SMP PKBM Pondok</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(600000, 'smp pkbm pondok')}>Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'smp pkbm pondok')} >Daftar</Button> */}
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB SMA PKBM Pondok</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(600000, 'sma pkbm pondok')}>Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'sma pkbm pondok')} >Daftar</Button> */}
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB SMP PKBM Putri</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(500000, 'smp pkbm putri')}>Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'smp pkbm putri')} >Daftar</Button> */}
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>PPDB SMA PKBM Putri</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(500000, 'sma pkbm putri')}>Daftar</Button>
                                    {/* <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(10000, 'sma pkbm putri')} >Daftar</Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PemilihanJenjang