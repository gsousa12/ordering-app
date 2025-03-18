import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Anchor,
  Container,
  Group,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../_shared/redux/hooks";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title>Login</Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Entrar
          </Button>
        </form>
        <Group mt="md">
          <Anchor size="sm" onClick={() => console.log("Esqueci a senha")}>
            Esqueci a senha
          </Anchor>
          <Anchor size="sm" onClick={() => console.log("Criar conta")}>
            Criar conta
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
};

export default Login;
