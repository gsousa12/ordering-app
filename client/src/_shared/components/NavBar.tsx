import React from "react";
import { NavLink } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Pedidos", path: "/orders" },
  ];

  return (
    <nav>
      {links.map((link) => (
        <NavLink
          key={link.path}
          label={link.label}
          active={location.pathname === link.path}
          onClick={() => navigate(link.path)}
        />
      ))}
    </nav>
  );
};

export default AppNavbar;
