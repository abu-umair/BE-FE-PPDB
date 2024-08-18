import { fetchData } from '@/services/user.service';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";


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
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-full mx-auto bg-white p-4 sm:p-6 rounded-lg shadow sm:px-32 sm:py-32">
          <img src="/img/kopnota.png" alt="" className="mx-auto w-full sm:w-auto" />

          <h2 className="text-center text-xl sm:text-2xl my-12 sm:my-24 font-bold">
            Pengumuman Hasil Seleksi <br /> PPDB Tahun Ajaran 2025 - 2026
          </h2>

          <div className="my-5">
            <p className="my-3">
              Berdasarkan hasil tes seleksi Sekolah Islam Abu Dzar TA 2024-2025 calon
              peserta didik dengan identitas :
            </p>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pr-2">Nama</td>
                  <td>: {data.name ?? '-'}</td>
                </tr>
                <tr>
                  <td className="pr-2">No. Pendaftaran</td>
                  <td>: {data.id}</td>
                </tr>
                <tr>
                  <td className="pr-2">Asal Sekolah</td>
                  <td>: {data.asal_sekolah ?? '-'}</td>
                </tr>
                <tr>
                  <td className="pr-2">Dinyatakan</td>
                  <td className="font-bold">
                    : {data.verifikasi ?? 'Mohon ditunggu'}
                  </td>
                </tr>
              </tbody>
            </table>
            {data.verifikasi === "Lulus" || data.verifikasi === "Lulus Bersyarat" ? (
                  <>
                    <p className='font-bold my-3 mt-10'>Silahkan login ke akun <b>Adzys</b></p>
                    <table className='font-bold space-y-5'>
                      <div>
                        <tr>
                          <NavLink to="https://adzsys.abudzar.or.id/login" target="_blank">
                            <Button className="bg-[#4CAF50]">Login Adzys</Button>
                          </NavLink>
                        </tr>
                      </div>
                    </table>
                  </>
                ) : ''}
          </div>

          <div>
            <p className="font-bold my-3">Perhatian</p>
            <ul className="font-bold space-y-2 list-disc pl-5">
              <li>
                Pendaftar yang lulus seleksi wajib melakukan pembayaran uang masuk
                pada <b>Adzys</b>
              </li>
              <li>
                Pendaftar yang telah diterima wajib melakukan pembayaran uang masuk
                pada tanggal 25 Oktober 2024 sampai dengan 5 November 2024.
              </li>
              <li>
                Pendaftar yang tidak melakukan pembayaran uang masuk sesuai tanggal
                yang ditentukan dianggap mengundurkan diri.
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  )
}
export default HasilKelulusan;