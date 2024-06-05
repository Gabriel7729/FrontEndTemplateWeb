import {
  AppShell,
  Burger,
  Group,
  Image,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logos/image.png";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import { MainRouter, generateRoutes } from "./main-router";
import { findCurrentRoute } from "../../common/utils/route.utils";

export const DashboardRoutes = (): JSX.Element => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const flattenedRoutes = generateRoutes(MainRouter, "admin");

  const currentRoute = findCurrentRoute(flattenedRoutes, location.pathname);

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
          <Header
            title={currentRoute ? currentRoute.title : ""}
            link={currentRoute ? currentRoute.path : "/"}
          />
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
          <UnstyledButton
            className="noFocusOutline"
            onClick={() => {
              navigate("/");
            }}
          >
            <Group>
              <Image radius="md" h={40} w="auto" fit="contain" src={Logo} />
              <Text c="white" fw="700">
                HappyPerson
              </Text>
            </Group>
          </UnstyledButton>
          <Navbar />
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>
        <Routes>
          {flattenedRoutes.map((route, index) => (
            <Route
              key={"route" + index}
              path={route.path}
              Component={route.element}
            />
          ))}
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardRoutes;
