import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';

const ChatAdmin = () => {

  return (
    <div className="flex flex-col ">
      <div className="p-4 shadow-md">
        <h1 className="text-xl font-semibold">Chat Admin</h1>
      </div>
      {/* <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 p-4">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 m-4 bg-gray-200 rounded-lg shadow ">
              <h3 className='text-3xl mb-10'>Hubungi admin PPDB ABU DZAR untuk lebih Jelas</h3>
              <a href="https://wa.me/6289604080904?text=Halo%20Admin!">
                <Button className='text-2xl' type='submit' fullWidth >Chat Admin</Button>
              </a>
            </div>
          </div>

        </div>
      </div> */}
      <div className="section w-full ">
        <div className="container mx-auto w-full">
          <div className="flex justify-center overflow-hidden">
            <div className="flex flex-wrap  ">
              <div className="My-card basis-1/2 px-24 my-5 ">
                <div className=" bg-white rounded-xl py-7 px-6" >
                  <span className='mx-60'>
                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                    <h4 className='text-center text-3xl'>TK Islam</h4>
                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                  </span>
                  <a href="https://wa.link/olsje0" target="_blank">
                    <Button className='mt-6 text-2xl' type='submit' fullWidth >Chat admin</Button>
                  </a>
                </div>
              </div>
              <div className="My-card basis-1/2 px-24 my-5 ">
                <div className=" bg-white rounded-xl py-7 px-6" >
                  <span className='mx-60'>
                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                    <h4 className='text-center text-3xl'>SD Islam</h4>
                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                  </span>
                  <a href="https://wa.link/0wzbyq" target="_blank">
                    <Button className='mt-6 text-2xl' type='submit' fullWidth >Chat admin</Button>
                  </a>
                </div>
              </div>
              <div className="My-card basis-1/2 px-24 my-5 ">
                <div className=" bg-white rounded-xl py-7 px-6" >
                  <span className='mx-60'>
                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                    <h4 className='text-center text-3xl'>SMP & SMA Islam</h4>
                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                  </span>
                  <a href="https://wa.link/s5a25j" target="_blank">
                    <Button className='mt-6 text-2xl' type='submit' fullWidth >Chat admin</Button>
                  </a>
                </div>
              </div>
              <div className="My-card basis-1/2 px-24 my-5 ">
                <div className=" bg-white rounded-xl py-7 px-6" >
                  <span className='mx-60'>
                    <img src="/img/abudzar.png" alt="" className='mx-auto my-5' />
                    <h4 className='text-center text-3xl'>Pondok Tahfizh Plus IT</h4>
                    <h6 className='text-center text-gray-500'>Abu Dzar</h6>
                  </span>
                  <a href="https://wa.link/augf4c" target="_blank">
                    <Button className='mt-6 text-2xl' type='submit' fullWidth >Chat admin</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;