import { Routes, Route } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
    Sidenav,
    DashboardNavbar,
    Configurator,
    Footer,
} from "@/widgets/layout";
import routes from "@/routes/routes";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/user.service";
import { useSelector } from "react-redux";

export function MenuUser() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);

    const auth = useSelector((state) => state.user);
    useEffect(() => {
        const getStudentById = async () => {
            try {
                const response = await fetchData('student/' + auth.userId, auth.token);
                console.log(response.data);
                // let status = response.data.status_payment === null ? true : false;
                // let status = response.data.status_payment === 'pending' || response.data.status_payment === 'expire' || response.data.status_payment === 'deny' || response.data.status_payment === 'cancel' || response.data.status_payment === null || data.status_payment === '' ? true : false;
                // let status = response.data.status_payment != 'capture' || response.data.status_payment != 'paid' ? true : false;
                let status = response.data.status_payment === 'capture' || response.data.status_payment === 'paid' ? false : true;
                setStatus(status);
            } catch (error) {
                console.log(error);
            }
        };
        getStudentById()
        setLoading(false);
    }, []);

    useEffect(() => {
        setVisible(status)
    }, [status]);

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <ExclamationTriangleIcon
                strokeWidth={2}
                className="h-8 w-8 text-inherit text-orange-700"
            />
            <span className="font-bold white-space-nowrap">Selesaikan pembayaran formulir !</span>
        </div>
    );

    return (
        loading ? (
            <p></p>
        ) : (
            <>
                {visible &&
                    <div className="card flex justify-content-center">
                        <Dialog
                            header={headerElement}
                            visible={visible}
                            // style={{ width: '30vw' }}
                            onHide={() => { if (!visible) return; setVisible(false); }}
                        >
                            <p className="m-0">
                                Anda belum menyelesaikan pembayaran formulir.<br />
                                Sementara fitur menu yang ada di dashboard di non-aktifkan sampai anda membayar biaya formulir.<br />
                                Syukron wa baarakallahu fiikum.
                            </p>
                        </Dialog>
                    </div>
                }
                <div className="min-h-screen bg-blue-gray-50/50">
                    <Sidenav
                        routes={routes}
                        brandImg={
                            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                        }
                    />
                    <div className="p-4 xl:ml-80">
                        <DashboardNavbar />
                        {/* <Configurator />
                <IconButton
                    size="lg"
                    color="white"
                    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                    ripple={false}
                    onClick={() => setOpenConfigurator(dispatch, true)}
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                </IconButton> */}
                        <Routes>
                            {routes.map(
                                ({ layout, pages }) =>
                                    layout === "user" &&
                                    pages.map(({ path, element }) => (
                                        <Route exact path={path} element={element} />
                                    ))
                            )}
                        </Routes>
                        <div className="text-blue-gray-600">
                            <Footer />
                        </div>
                    </div>
                </div>
            </>
        )
    );
}


export default MenuUser;
