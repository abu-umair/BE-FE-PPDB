import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';

const ChatAdmin = () => {

  return (
    <div className="flex flex-col h-screen ">
      <div className="p-4 shadow-md">
        <h1 className="text-xl font-semibold">Chat Admin</h1>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 p-4">
          <div className="flex-1 overflow-y-auto">
            {/* Tempat untuk pesan chat */}
            <div className="p-4 m-4 bg-gray-200 rounded-lg shadow ">
              <h3 className='text-3xl mb-10'>Hubungi admin PPDB ABU DZAR untuk lebih Jelas</h3>
              <a href="https://wa.me/6289604080904?text=Halo%20Admin!">
                <Button className='text-2xl' type='submit' fullWidth >Chat Admin</Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;