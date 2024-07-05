import { Button } from '@material-tailwind/react'
import AuthService from "./../../services/auth.service";
import { CustomToast, Toast } from './../../utils/Toast';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PemilihanJenjang = ({ formData, onNext }) => {
    // const [selectedData, setSelectedData] = useState('');
    const navigate = useNavigate();


    const handleDaftarClick = async (value, jenjang) => {
        // console.log(value);
        // console.log(jenjang);
        try {
            const updatedFormData = { ...formData, selectedData: value, biaya: value, jenjang: jenjang };
            await AuthService.register(
                updatedFormData.name,
                updatedFormData.email,
                updatedFormData.password,
                updatedFormData.photo,
                updatedFormData.biaya,
                updatedFormData.jenjang,
            ).then(
                (response) => {
                    console.log(response);

                    // Notifification success
                    // CustomToast({ message: "Sign Success!", type: "success" });

                    // setSelectedData(value);
                    // onNext({ ...formData, selectedData }); // Passing data to the next form
                    // const updatedFormData = { ...formData, selectedData: value };
                    onNext(updatedFormData);
                },
                (error) => {
                    console.log(error);
                    // if (error.response.data.message.email[0] === "The email has already been taken.") {
                    if (error.response.data.message.email[0] === "The email has already been taken.") {
                        CustomToast({ message: "Email yang dimasukkan sudah digunakan", type: "error" });
                    }
                    setTimeout(() => {
                        navigate("/");
                    }, 2500);
                    // console.log(error.response.data.message.email === "The email has already been taken.");

                }
            );
        } catch (err) {
            console.log(err);

            CustomToast({ message: "Register Failed", type: "error" });

            // setTimeout(() => {
            //     window.location.reload();
            // }, 2000);
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
                                        <h4 className='text-center text-3xl'>TK Islam</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(1000, 'tk')} >Daftar</Button>
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>SD Islam</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(2000, 'sd')}>Daftar</Button>
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>SMP & SMA Islam</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(3000, 'smp-sma')}>Daftar</Button>
                                </div>
                            </div>
                            <div className="My-card basis-1/2 px-24 my-5 ">
                                <div className=" bg-white rounded-xl py-7 px-6" >
                                    <span className='mx-60'>
                                        <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                        <h4 className='text-center text-3xl'>Pondok Tahfizh Plus IT</h4>
                                        <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                    </span>
                                    <Button className='mt-6 text-2xl' type='submit' fullWidth onClick={() => handleDaftarClick(1000, 'pondok')}>Daftar</Button>
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