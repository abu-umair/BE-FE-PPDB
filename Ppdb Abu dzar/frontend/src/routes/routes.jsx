import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Users } from "@/pages/users/users";
import HomeUser from "./../pages/dashboard/home-user";
import HasilKelulusan from "@/pages/dashboard/hasil-kelulusan";
import Formulir from "@/pages/dashboard/formulir";
import Pengumuman from "@/pages/dashboard/pengumuman";
import ChatAdmin from "@/pages/dashboard/chatAdmin";

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
        icon: <UserCircleIcon {...icon} />,
        name: "Users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
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
        icon: <UserCircleIcon {...icon} />,
        name: "pengumuman",
        path: "/pengumuman",
        element: <Pengumuman />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "formulir",
        path: "/formulir",
        element: <Formulir />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "hasil kelulusan",
        path: "/hasil-kelulusan",
        element: <HasilKelulusan />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
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
