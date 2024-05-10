import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

export function Home() {
  return (
    <div className="mt-12">
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-5xl font-semibold">86</Typography>
            <Typography className="text-gray-700 text-sm">Santri yg diterima</Typography>
          </CardBody>
        </Card>
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-5xl font-semibold">10</Typography>
            <Typography className="text-gray-700 text-sm">Santri yg tidak diterima</Typography>
          </CardBody>
        </Card>
        <Card className="p-6 border border-blue-gray-100 shadow-sm">
          <CardBody className="flex flex-col items-center justify-center">
            <Typography className="text-5xl font-semibold">250</Typography>
            <Typography className="text-gray-700 text-sm">Pendaftar</Typography>
          </CardBody>
        </Card>
      </div>
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div> */}
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
