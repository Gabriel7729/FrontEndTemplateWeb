import {
  Avatar,
  Badge,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { getFirstLetter } from "../../common/utils/utils";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  title: string;
  link: string;
}
export const Header = ({ title, link }: DashboardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Group>
        <UnstyledButton
          className="noFocusOutline"
          color="#F28D38"
          onClick={() => {
            navigate(link);
          }}
        >
          <Title size="h4" style={{ color: "#F28D38" }}>
            {title}
          </Title>
        </UnstyledButton>
      </Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group wrap="nowrap">
              <div>
                <Group>
                  <Text fz="8px" tt="uppercase" fw={700} c="dimmed">
                    Gabriel De La Rosa
                  </Text>
                  <Badge
                    variant="light"
                    size="xs"
                    color="green"
                    style={{ marginLeft: "-0.5rem" }}
                  >
                    Admin
                  </Badge>
                </Group>

                <Text fz="10px" fw={500} className={classes.name}>
                  admin@est.intec.edu.do
                </Text>
              </div>
              <Avatar
                tt="uppercase"
                variant="filled"
                color="rgba(241, 136, 53, 1)"
                radius="sm"
              >
                {getFirstLetter("Gabriel De La Rosa")}
              </Avatar>
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Usuario</Menu.Label>
          <Menu.Item
            onClick={() => {
              navigate("/usuario/cuenta");
            }}
            leftSection={<IconSettings stroke={1.3} />}
          >
            <Text size="sm">Configuración</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Otros</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={<IconLogout stroke={1.3} />}
            onClick={() => {}}
          >
            <Text size="sm">Cerrar Sesión</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default Header;
