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
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hasil Kelulusan</h2>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Nama
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {dataKelulusan.map((siswa, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="py-4 px-6">
                    {siswa.nama}
                  </td>
                  <td className={`py-4 px-6 ${siswa.status === "Lulus" ? "text-green-600" : "text-red-600"}`}>
                    {siswa.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HasilKelulusan;