import "@mantine/core/styles.css";
import "./App.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { AppRouter } from "./routes/app-router";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <Notifications />
      {<AppRouter />}
    </MantineProvider>
  );
}

export default App;
