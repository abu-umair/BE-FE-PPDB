import {
  HomeIcon,
  TableCellsIcon,
  InformationCircleIcon,
  NewspaperIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  ServerStackIcon,
  RectangleStackIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  DeviceTabletIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { Home } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Users } from "@/pages/users/users";
import HomeUser from "./../pages/dashboard/home-user";
import HasilKelulusan from "@/pages/dashboard/hasilKelulusan";
import Formulir from "@/pages/dashboard/formulir";
import Pengumuman from "@/pages/dashboard/pengumuman";
import ChatAdmin from "@/pages/dashboard/chatAdmin";
import BiodataSiswa from "@/pages/dashboard/biodataSiswa";
import DataFormulir from "@/pages/dashboard/dataFormulir";
import DataVerifikasi from "@/pages/dashboard/dataVerifikasi";
import PengumumanAdmin from "@/pages/dashboard/pengumumanAdmin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Pengumuman",
        path: "/kirim-pengumuman",
        element: <PengumumanAdmin />,
      },
      {
        icon: <DeviceTabletIcon {...icon} />,
        name: "Formulir",
        path: "/data-formulir",
        element: <DataFormulir />,
      },
      {
        icon: <CheckBadgeIcon {...icon} />,
        name: "Verifikasi",
        path: "/data-verifikasi",
        element: <DataVerifikasi />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Biodata siswa",
        path: "/biodata-siswa",
        element: <BiodataSiswa />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Data Admin",
        path: "/data-admin",
        element: <Users />,
      },
    ],
  },
  {
    layout: "user",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <HomeUser />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "pengumuman",
        path: "/pengumuman",
        element: <Pengumuman />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "formulir",
        path: "/formulir",
        element: <Formulir />,
      },
      {
        icon: <CheckCircleIcon {...icon} />,
        name: "hasil kelulusan",
        path: "/hasil-kelulusan",
        element: <HasilKelulusan />,
      },
      {
        icon: <DevicePhoneMobileIcon {...icon} />,
        name: "chat admin",
        path: "/chat-admin",
        element: <ChatAdmin />,
      }
    ],
  },
  
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
