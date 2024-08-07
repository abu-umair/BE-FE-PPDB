import React, { useState, useEffect } from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { fetchData } from '@/services/user.service';
import { useSelector } from 'react-redux';
import Chart from "react-apexcharts";

export function Home() {
  const auth = useSelector((state) => state.user);
  const [santriDiterima, setSantriDiterima] = useState(0);
  const [santriTidakDiterima, setSantriTidakDiterima] = useState(0);
  const [totalPendaftar, setTotalPendaftar] = useState(0);
  const [quotaChartData, setQuotaChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
        toolbar: {
          show: true,
        }
      },
      labels: [],
      legend: {
        position: 'bottom',
      },
      dataLabels: {
        enabled: true,
        formatter(val) {
          return `${val.toFixed(2)}%`;
        }
      },
    }
  });
  const [lastFiveMonthsStats, setLastFiveMonthsStats] = useState({
    series: [{ name: 'Pendaftar', data: [] }],
    options: {
      chart: {
        type: 'bar',
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        }
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        enabled: false
      },
    }
  });
  const [yearlyStats, setYearlyStats] = useState({
    series: [{ name: 'Pendaftar', data: [] }],
    options: {
      chart: { type: 'line' },
      xaxis: { categories: [] },
    }
  });

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

        const jenjangCounts = data.reduce((acc, curr) => {
          const jenjang = curr.jenjang || "Belum memilih";
          acc[jenjang] = (acc[jenjang] || 0) + 1;
          return acc;
        }, {});

        setQuotaChartData({
          series: Object.values(jenjangCounts),
          options: {
            ...quotaChartData.options,
            labels: Object.keys(jenjangCounts),
          }
        });

        const currentDate = new Date();
        const lastFiveMonthsData = [];
        const months = [];

        for (let i = 4; i >= 0; i--) {
          const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          const monthString = month.toLocaleString('default', { month: 'short' });
          months.push(monthString);
          lastFiveMonthsData.push(data.filter(santri => {
            const createdAt = new Date(santri.created_at);
            return createdAt.getFullYear() === month.getFullYear() && createdAt.getMonth() === month.getMonth();
          }).length);
        }

        setLastFiveMonthsStats({
          series: [{ name: 'Pendaftar', data: lastFiveMonthsData }],
          options: {
            ...lastFiveMonthsStats.options,
            xaxis: { categories: months }
          },
        });

        const yearlyData = Array(4).fill(0);
        const years = [2023, 2024, 2025, 2026];

        data.forEach(santri => {
          const year = new Date(santri.created_at).getFullYear();
          const index = years.indexOf(year);
          if (index !== -1) yearlyData[index]++;
        });

        setYearlyStats({
          series: [{ name: 'Pendaftar', data: yearlyData }],
          options: { ...yearlyStats.options, xaxis: { categories: years } },
        });

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, [auth]);

  return (
    <div className="mt-12">
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-5xl font-semibold">{santriDiterima}</Typography>
            <Typography className="text-gray-700 text-sm">Santri yg diterima</Typography>
          </CardBody>
        </Card>
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-5xl font-semibold">{santriTidakDiterima}</Typography>
            <Typography className="text-gray-700 text-sm">Santri yg tidak diterima</Typography>
          </CardBody>
        </Card>
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-5xl font-semibold">{totalPendaftar}</Typography>
            <Typography className="text-gray-700 text-sm">Pendaftar</Typography>
          </CardBody>
        </Card>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-lg font-semibold">Info Kuota</Typography>
            <Chart
              options={quotaChartData.options}
              series={quotaChartData.series}
              type="pie"
              width="380"
            />
          </CardBody>
        </Card>
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-lg font-semibold">Statistik 5 Bulan Terakhir</Typography>
            <Chart
              options={lastFiveMonthsStats.options}
              series={lastFiveMonthsStats.series}
              type="bar"
              width="380"
            />
          </CardBody>
        </Card>
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-lg font-semibold">Statistik Pertahun</Typography>
            <Chart
              options={yearlyStats.options}
              series={yearlyStats.series}
              type="line"
              width="380"
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
