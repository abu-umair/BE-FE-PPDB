import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '@/services/user.service';


const Pengumuman = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);


  const auth = useSelector((state) => state.user);

  useEffect(() => {
    const getPemberitahuan = async () => {
      try {
        const response = await fetchData('announcement', auth.token);
        console.log(response.data);
        setData(response.data);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    };
    getPemberitahuan()
  }, [auth.userId, auth.token]);

  return (

    loading ? (
      <p>Loading</p>
    ) : (
      <div className="min-h-20 bg-gray-100 p-8 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 text-center">
              {/* <img src="/img/pengumuman.png" alt="Announcement Icon" className="mx-auto mb-4" /> */}
              <img src={"https://beppdb.evolusidigital.id/storage/" + data.file_path} alt="" className='mx-auto my-5 w-1/4' />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Assalamualaikum warahmatullahi wabarakatuh
              </h3>
              <p className="mt-1 max-w-2xl text-gray-900 text-sm mx-auto">
                Yth Bapak/Ibu Calon Walimurid dan Walisantri Sekolah Islam Abudzar
              </p>
            </div>
            <div className="px-4 py-5 sm:px-6 text-center">
              {/* <div className="text-sm text-gray-500 ">
                {data.message}
              </div> */}
              <div className="text-sm text-gray-900 capitalize" dangerouslySetInnerHTML={{ __html: data.message }} />
            </div>
            <div className="px-4 py-5 sm:px-6 text-center">
              <p className="text-sm text-gray-900">
                Wassalamualaikum warahmatullahi wabarakatuh
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Pengumuman;