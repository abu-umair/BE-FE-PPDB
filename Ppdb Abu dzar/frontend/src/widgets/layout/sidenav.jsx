import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useSelector } from "react-redux";
import { fetchData } from "@/services/user.service";
import { useEffect, useState, useRef } from "react";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  // const [loading, setLoading] = useState(true);
  // const [enabledPaths, setEnabledPaths] = useState(['/formulir', '/hasil-kelulusan']);
  const [enabledPaths, setEnabledPaths] = useState(false);
  const [statusPayment, setStatusPayment] = useState(null);
  const auth = useSelector((state) => state.user);
  const sidenavRef = useRef(null);

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  useEffect(() => {
    const getStudentById = async () => {
      try {
        const response = await fetchData('student/' + auth.userId, auth.token);
        console.log(response.data);
        setStatusPayment(response.data.status_payment);
      } catch (error) {
        console.log(error);
      }
    };
    getStudentById()
  }, [auth.userId, auth.token]);

  useEffect(() => {
    // console.log(statusPayment);
    if (statusPayment === 'paid' || statusPayment === 'capture' || statusPayment === 'settlement') {
      // setEnabledPaths(['/formulir', '/hasil-kelulusan']);
      setEnabledPaths(true);
    } else {
      // setEnabledPaths([]);
      setEnabledPaths(false);
    }
  }, [statusPayment]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        setOpenSidenav(dispatch, false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center">
          {/* <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography> */}
          <img src="/img/logo-abudzar.png" height={50} width={50} alt="" className="mx-auto" />
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          auth.roles === 'ADMIN' ?
            layout === 'dashboard' &&
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? "black"
                            : "blue-gray"
                        }
                        // color={
                        //   isActive
                        //     ? sidenavColor
                        //     : sidenavType === "dark"
                        //       ? "white"
                        //       : "blue-gray"
                        // }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            :
            layout === 'user' &&
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  {
                    // console.log(enabledPaths)
                    enabledPaths === true ?
                      <NavLink to={`/${layout}${path}`}>
                        {({ isActive }) => (
                          <Button
                            variant={isActive ? "gradient" : "text"}
                            // disabled={!enabledPaths.includes(path)}
                            color={
                              isActive
                                ? "black"
                                : "blue-gray"
                            }
                            // color={
                            //   isActive
                            //     ? sidenavColor
                            //     : sidenavType === "dark"
                            //       ? "white"
                            //       : "blue-gray"
                            // }
                            className="flex items-center gap-4 px-4 capitalize"
                            fullWidth
                          >
                            {icon}
                            <Typography
                              color="inherit"
                              className="font-medium capitalize"
                            >
                              {name}
                            </Typography>
                          </Button>
                        )}
                      </NavLink> :
                      path === '/hasil-kelulusan' || path === '/formulir' ?
                        <Button
                          disabled
                          // variant={isActive ? "gradient" : "text"}
                          // disabled={!enabledPaths.includes(path)}
                          color={"blue-gray"}
                          // color={
                          //   isActive
                          //     ? sidenavColor
                          //     : sidenavType === "dark"
                          //       ? "white"
                          //       : "blue-gray"
                          // }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                        :
                        <NavLink NavLink to={`/${layout}${path}`}>
                          {({ isActive }) => (
                            <Button
                              variant={isActive ? "gradient" : "text"}
                              // disabled={!enabledPaths.includes(path)}
                              color={
                                isActive
                                  ? "black"
                                  : "blue-gray"
                              }
                              // color={
                              //   isActive
                              //     ? sidenavColor
                              //     : sidenavType === "dark"
                              //       ? "white"
                              //       : "blue-gray"
                              // }
                              className="flex items-center gap-4 px-4 capitalize"
                              fullWidth
                            >
                              {icon}
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                {name}
                              </Typography>
                            </Button>
                          )}
                        </NavLink>
                  }
                </li>
              ))}
            </ul>
        ))}
      </div>
    </aside >
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "PPDB Abu Dzar",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
