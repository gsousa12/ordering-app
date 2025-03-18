import React from "react";
import { Button, Group, Text } from "@mantine/core";
import { useAppDispatch } from "../redux/hooks";
import { logoutUser } from "../../modules/auth/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header>
      <Group align="center" style={{ height: "100%" }}>
        <Text size="xl">Restaurante Manager</Text>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </Group>
    </header>
  );
};

export default AppHeader;
