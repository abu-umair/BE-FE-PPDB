import React from 'react';

const Pengumuman = () => {
  return (
    <div className="min-h-20 bg-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <img src="/img/pengumuman.png" alt="Announcement Icon" className="mx-auto mb-4" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Assalamualaikum warahmatullahi wabarakatuh
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 mx-auto">
              Yth Bapak/Ibu Calon Walimurid dan Walisantri Sekolah Islam Abudzar
            </p>
          </div>
          <div className="px-4 py-5 sm:px-6 text-center">
            <div className="text-sm text-gray-500">
              Mengingatkan kembali bagi yang belum melengkapi pengisian formulir diharapkan dapat melengkapi formulir sebelum berkas diserahkan ke panitia PPDB TA 2024-2025. Bagi yang mengalami kendala dipersilahkan menghubungi PIC Panitia PPDB Unit Masing masing.
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Semoga Allah Azza Wa Jalla memudahkan semua urusan kita. Demikian yang dapat kami sampaikan, syukron wa jazaakumullahu khayran.
            </div>
          </div>
          <div className="px-4 py-5 sm:px-6 text-center">
            <p className="text-sm text-gray-500">
              Wassalamualaikum warahmatullahi wabarakatuh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengumuman;