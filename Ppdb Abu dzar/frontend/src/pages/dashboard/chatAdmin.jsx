import React from 'react';

const ChatAdmin = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 shadow-md">
        <h1 className="text-xl font-semibold">Chat Admin</h1>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 p-4">
          <div className="flex-1 overflow-y-auto">
            {/* Tempat untuk pesan chat */}
            <div className="p-4 m-4 bg-gray-200 rounded-lg shadow">
              Ini adalah pesan contoh.
            </div>
            {/* Tambahkan lebih banyak pesan di sini */}
          </div>
          <div className="mt-4">
            <form className="flex">
              <input
                type="text"
                placeholder="Ketik pesan..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;