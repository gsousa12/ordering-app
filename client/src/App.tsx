import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import AppHeader from "./_shared/components/Header";

import { useAppSelector } from "./_shared/redux/hooks";
import AppNavbar from "./_shared/components/NavBar";
import Dashboard from "./modules/dashboard/pages/Dashboard";
import Orders from "./modules/orders/pages/Orders";
import useAuth from "./modules/auth/hooks/useAuth";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <div style={{ display: "flex" }}>
      <AppNavbar />
      <div style={{ flex: 1 }}>
        <AppHeader />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
