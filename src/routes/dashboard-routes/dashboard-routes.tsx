import { AppShell, Burger, Group, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Route, Routes, useLocation } from "react-router-dom";
import Logo from "../../assets/logos/Isologo-Full Color.png";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { mainRouter } from "./main-router";

export const DashboardRoutes = (): JSX.Element => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const currentRoute = mainRouter.find(
    (route) => route.path === location.pathname
  );

  return (
    <AppShell
      layout="alt"
      header={{ height: 65 }}
      navbar={{ width: 257, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" style={{ padding: "14px" }}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Header title={currentRoute ? currentRoute.title : ""} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="#102234">
        <Group>
          <Burger
            color="white"
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Image radius="md" h={40} w="auto" fit="contain" src={Logo} />
          <Text c="white" fw="700">
            PacaStock
          </Text>
          <Navbar />
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>
        <Routes>
          {mainRouter.map((route, index) => (
            <Route
              key={"route" + index}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardRoutes;
