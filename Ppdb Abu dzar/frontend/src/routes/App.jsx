import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import PemilihanJenjang from "@/pages/auth/PemilihanJenjang";
import AkunLogin from "@/pages/auth/AkunLogin";

function App() {
  return (
    // <Routes>
    //   <Route path="/dashboard/*" element={<Dashboard />} />
    //   <Route path="/auth/*" element={<Auth />} />
    //   <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    // </Routes>
    <Routes>
      <Route element={<PrivateRoute />}>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="pemilihan-jenjang" element={<PemilihanJenjang />} />
        <Route path="akun-login" element={<AkunLogin />} />
      </Route>
    </Routes>
  );
}

export default App;
