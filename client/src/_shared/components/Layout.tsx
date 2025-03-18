// src/_shared/components/Layout.tsx
import { AppShell, NavLink, Button } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../../modules/auth/redux/slices/authSlice";

export default function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <div
          style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}
        >
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Dashboard"
          onClick={() => navigate("/dashboard")}
          active={location.pathname === "/dashboard"}
        />
        <NavLink
          label="Pedidos"
          onClick={() => navigate("/orders")}
          active={location.pathname === "/orders"}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
