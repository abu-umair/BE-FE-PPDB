import React, { useState, useEffect } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { fetchData } from '@/services/user.service';
import { useSelector } from 'react-redux';

export function HomeUser() {
  const auth = useSelector((state) => state.user);
  const [santriDiterima, setSantriDiterima] = useState(0);
  const [santriTidakDiterima, setSantriTidakDiterima] = useState(0);
  const [totalPendaftar, setTotalPendaftar] = useState(0);
  const [activeTab, setActiveTab] = useState('Mengapa Abudzar ?');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData('/student', auth.token);
        const data = response.data;

        const diterima = data.filter(santri =>
          santri.verifikasi === 'Lulus' || santri.verifikasi === 'Lulus Bersyarat'
        ).length;
        const tidakDiterima = data.filter(santri =>
          santri.verifikasi === 'Tidak Lulus'
        ).length;

        setSantriDiterima(diterima);
        setSantriTidakDiterima(tidakDiterima);
        setTotalPendaftar(data.length);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, [auth]);

  const tabContents = {
    'Mengapa Abudzar ?': (
      <>
        <p>Sekolah Islam Abu Dzar merupakah sekolah sunnah swasta bermanhaj salaf yang berada di bawah naungan Yayasan Abu Dzar, dikembangkan berdasarkan prinsip-prinsip pendidikan ramah anak yang berlandaskan Al-Quran dan As-Sunnah sesuai dengan pemahaman Salaful Ummah, dimana diharapkan dapat melahirkan genarasi sholih dan sholihah, beraqidah lurus, berakhlak mulia, cerdas dan bermanfaat serta memiliki wawasan yang luas dan mampu mengamalkan nilai-nilai Islami.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 justify-items-center">
          <div className="video-responsive">
            <iframe className="rounded-lg" width="350" height="200" src="https://www.youtube.com/embed/YnHHy9cm6GM?si=oF8a6eqyU4PWqyKh" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
          <div className="video-responsive">
            <iframe className="rounded-lg" width="350" height="200" src="https://www.youtube.com/embed/Jx8MHjy0P-c?si=7z83DsAjwf5_7AMf" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </>
    ),
    'Profil Abudzar': "Bermula dari keinginan untuk bisa menyekolahkan anak-anak kaum muslimin ke lembaga pendidikan/sekolah yang memberikan pendidikan aqidah dan prinsip-prinsip dasar islam menurut pemahan salaful ummah sejak usia dini, disatu sisi, dan ketidak tersediaan lembaga pendidikan/sekolah yang dibutuhkan tersebut disekitar BSD dan Bintaro, disisi lain, maka pada tahun 2007 Yayasan Abu Dzar sepakat untuk memulai dengan mendidirikan Taman Kanak-kanak yang diberi nama TK Islam Abu Dzar.",
    'Informasi Seputar PPDB': "Kuota Penerimaan Peserta Didik Baru Sekolah Islam Abu Dzar Tahun Pelajaran 2024/2025."
  };

  return (
    <div className="mt-8 mb-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-3 grid grid-cols-1 gap-6">
          <Card className="overflow-hidden shadow rounded-lg">
            <CardBody className="p-8">
              <Typography
                variant="h5"
                color="black"
                align="center"
                className="mb-4 text-center"
              >
                Assalamu'alaykum Warohmatullahi Wabarokatuh
              </Typography>
              <Typography
                variant="h4"
                color="black"
                align="center"
                className="font-normal text-center"
              >
                Selamat Datang di Panel PPDB Sekolah Islam Abu Dzar
              </Typography>
            </CardBody>
          </Card>

          <Card className="overflow-hidden shadow rounded-lg">
            <CardBody className="p-8">
              <div className="border-b-2 border-gray-300">
                <div className="flex justify-between text-center text-sm font-medium text-gray-700">
                  {Object.keys(tabContents).map((tab, index) => (
                    <button
                      key={index}
                      className={`flex-1 py-2 ${activeTab === tab ? 'border-b-2 border-black text-black' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 text-gray-600">
                {tabContents[activeTab]}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HomeUser;



