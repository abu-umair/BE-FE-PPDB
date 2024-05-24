import React from 'react';

const HasilKelulusan = () => {
  // Contoh data, gantikan dengan data dinamis sesuai aplikasi Anda
  const dataKelulusan = [
    { nama: "Ahmad", status: "Lulus" },
    { nama: "Budi", status: "Tidak Lulus" },
    { nama: "Citra", status: "Lulus" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow px-32 py-32">
        <img src="/img/kopnota.png" alt="" className='mx-auto' />

        <h2 className='text-center text-2xl my-24 font-bold'>Pengumuman Hasil Seleksi <br /> PPDB Tahun Ajaran 2024 - 2025</h2>
        <div className='my-5'>
          <p className='my-3'>Berdasarkan hasil tes seleksi Sekolah Islam Abu Dzar TA 2024–2025 calon peserta didik dengan identitas :</p>
          <table>
            <tr>
              <td>Nama</td>
              <td> : Muhammad Ridwan</td>
            </tr>
            <tr>
              <td>No. Pendaftaran</td>
              <td> : 991</td>
            </tr>
            <tr>
              <td>Asal Sekolah</td>
              <td> : Bina Sarana</td>
            </tr>
            <tr>
              <td>Dinyatakan</td>
              <td className='font-bold'> : LULUS</td>
            </tr>
          </table>
        </div>
        <p className='font-bold my-3'>Perhatian</p>
        <ul className='font-bold space-y-2 list-disc'>
          <li>Pendaftar yang telah diterima wajib melakukan pembayaran uang masuk pada tanggal 27 Oktober 2024 sampai dengan 5 November 2024.</li>
          <li>Pendaftar yang tidak melakukan pembayaran uang masuk sesuai tanggal yang ditentukan dianggap mengundurkan diri.</li>
        </ul>
      </div>
    </div>
  )
}
export default HasilKelulusan;