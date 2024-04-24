import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Notfound } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import PemilihanJenjang from "@/pages/auth/PemilihanJenjang";
import AkunLogin from "@/pages/auth/AkunLogin";
import Master from "@/pages/auth/Master";
import PrivateRouteUser from "./PrivateRouteUser";
import MenuUser from "@/layouts/MenuUser";

function App() {
  return (
    // <Routes>
    //   <Route path="/dashboard/*" element={<Dashboard />} />
    //   <Route path="/auth/*" element={<Auth />} />
    //   <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    // </Routes>
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>
      <Route element={<PrivateRouteUser />}>
        <Route path="/menuuser" element={<MenuUser />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="sign-in" element={<SignIn />} />
        {/* <Route path="sign-up" element={<SignUp />} /> */}
        <Route path="sign-up" element={<Master />} />
        <Route path="pemilihan-jenjang" element={<PemilihanJenjang />} />
        <Route path="akun-login" element={<AkunLogin />} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/asdf" replace />} /> */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
