import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./routes/app-router";

function App() {
  return (
    <MantineProvider defaultColorScheme="light">{<AppRouter />}</MantineProvider>
  );
}

export default App;
