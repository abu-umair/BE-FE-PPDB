import { fetchData } from '@/services/user.service';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HasilKelulusan = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);


  const auth = useSelector((state) => state.user);

  useEffect(() => {
    const getStudentById = async () => {
      try {
        const response = await fetchData('student/' + auth.userId, auth.token);
        console.log(response.data.status);
        console.log(response.data.nisn);
        setData(response.data);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    };
    getStudentById()
  }, [auth.userId, auth.token]);

  // useEffect(() => {
  //   if (status === 0 || status === 1) {
  //     setLoading(false);
  //   }
  // }, [status]);

  return (
    loading ? (
      <p>Loading</p>
    ) : (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow px-32 py-32">
          <img src="/img/kopnota.png" alt="" className='mx-auto' />

          <h2 className='text-center text-2xl my-24 font-bold'>Pengumuman Hasil Seleksi <br /> PPDB Tahun Ajaran 2024 - 2025</h2>
          <div className='my-5'>
            <p className='my-3'>Berdasarkan hasil tes seleksi Sekolah Islam Abu Dzar TA 2024-2025 calon peserta didik dengan identitas :</p>
            <table>
              <tr>
                <td>Nama</td>
                <td> : {data.name ?? 'Silakan di isi data formulirnya'}</td>
              </tr>
              <tr>
                <td>No. Pendaftaran</td>
                <td> : {data.id}</td>
              </tr>
              <tr>
                <td>Asal Sekolah</td>
                <td> : {data.asal_sekolah ?? 'Silakan di isi data formulirnya'}</td>
              </tr>
              <tr>
                <td>Dinyatakan</td>
                <td className='font-bold'> :  {data.status == 0 ? 'Tidak Lulus' : data.status == null ? 'Mohon ditunggu' : 'Lulus'}</td>
              </tr>
            </table>
          </div>
          <p className='font-bold my-3'>Perhatian</p>
          <ul className='font-bold space-y-2 list-disc'>
            <li>Pendaftar yang telah diterima wajib melakukan pembayaran uang masuk pada tanggal 27 Oktober 2024 sampai dengan 5 November 2024.</li>
            <li>Pendaftar yang tidak melakukan pembayaran uang masuk sesuai tanggal yang ditentukan dianggap mengundurkan diri.</li>
          </ul>
        </div>
      </div>
    )
  )
}
export default HasilKelulusan;