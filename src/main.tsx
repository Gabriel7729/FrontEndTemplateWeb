import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/dates/styles.css";
import { BrowserRouter as Router } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    // Manejar la actualización, por ejemplo, mostrar una notificación al usuario
    console.log('Nueva versión disponible. Actualiza para obtener la última versión.');
  },
  onOfflineReady() {
    // Manejar el modo offline, por ejemplo, mostrar una notificación al usuario
    console.log('La aplicación está lista para funcionar sin conexión.');
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
