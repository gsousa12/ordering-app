import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Provider } from "react-redux";
import App from "./App";
import "@mantine/core/styles.css"; // Importa estilos globais do Mantine
import { store } from "./_shared/redux/store/store";

const theme = createTheme({
  /** Defina configurações de tema personalizadas aqui, se necessário */
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
