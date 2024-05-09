import { chartsConfig } from "@/configs";

const pieChart = {
  type: "pie",
  height: 220,
  series: [44, 55, 13, 43, 22, 10],
  options: {
    ...chartsConfig,
    colors: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3"],
    labels: ['TK', 'SD', 'SMP', 'SMA', 'Pondok SMP', 'Pondok SMA'],
    responsive: [
      {
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  }
}

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};

// const dailySalesChart = {
//   type: "line",
//   height: 220,
//   series: [
//     {
//       name: "Sales",
//       data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
//     },
//   ],
//   options: {
//     ...chartsConfig,
//     colors: ["#0288d1"],
//     stroke: {
//       lineCap: "round",
//     },
//     markers: {
//       size: 5,
//     },
//     xaxis: {
//       ...chartsConfig.xaxis,
//       categories: [
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     },
//   },
// };

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "2021",
        "2022",
        "2023",
        "2024",
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Santri",
      data: [50, 40, 300, 220],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Info Kuota",
    description: "Total Info Keseluruhan",
    footer: "updated 3 min ago",
    chart: pieChart,
  },
  {
    color: "white",
    title: "Statistik Terakhir",
    description: "Melihat Statistik terakhir",
    footer: "campaign sent 2 days ago",
    chart: websiteViewsChart,
  },
  // {
  //   color: "white",
  //   title: "Statistik Pertahun",
  //   description: "Melihat Statistik pertahun",
  //   footer: "updated 4 min ago",
  //   chart: dailySalesChart,
  // },
  {
    color: "white",
    title: "Statistik Pertahun",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
