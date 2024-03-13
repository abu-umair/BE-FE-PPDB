import { Button } from '@material-tailwind/react'
import React from 'react'

const PemilihanJenjang = () => {
    return (
        <div className='bg-gray-900 '>
            <div className="section ">
                <div className="container mx-auto">
                    <div className="text-center text-4xl font-bold text-white pt-10">
                        Pilih Jenjang Pendidikan Santri
                    </div>
                    <div className="flex flex-wrap mt-14">
                        <div className="My-card basis-1/2 px-24 my-5 ">
                            <div className=" bg-white rounded-xl py-7 px-6" >
                                <span className='mx-60'>
                                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                    <h4 className='text-center text-3xl'>TK Islam</h4>
                                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                </span>
                                <Button className='mt-6 text-2xl' type='submit' fullWidth>Daftar</Button>
                            </div>
                        </div>
                        <div className="My-card basis-1/2 px-24 my-5 ">
                            <div className=" bg-white rounded-xl py-7 px-6" >
                                <span className='mx-60'>
                                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                    <h4 className='text-center text-3xl'>SD Islam</h4>
                                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                </span>
                                <Button className='mt-6 text-2xl' type='submit' fullWidth>Daftar</Button>
                            </div>
                        </div>
                        <div className="My-card basis-1/2 px-24 my-5 ">
                            <div className=" bg-white rounded-xl py-7 px-6" >
                                <span className='mx-60'>
                                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                    <h4 className='text-center text-3xl'>SMP & SMA Islam</h4>
                                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                </span>
                                <Button className='mt-6 text-2xl' type='submit' fullWidth>Daftar</Button>
                            </div>
                        </div>
                        <div className="My-card basis-1/2 px-24 my-5 ">
                            <div className=" bg-white rounded-xl py-7 px-6" >
                                <span className='mx-60'>
                                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                                    <h4 className='text-center text-3xl'>Pondok Tahfizh Plus IT</h4>
                                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                                </span>
                                <Button className='mt-6 text-2xl' type='submit' fullWidth>Daftar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PemilihanJenjang