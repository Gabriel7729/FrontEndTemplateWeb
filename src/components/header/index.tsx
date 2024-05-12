import {
  Avatar,
  Badge,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconSettings,
  IconTrash
} from "@tabler/icons-react";
import classes from "./Header.module.css";

interface DashboardProps {
  title: string;
}
export const Header = ({ title }: DashboardProps) => {
  return (
    <>
      <Group>
        <Title size="h4" style={{ color: "#F28D38" }}>
          {title}
        </Title>
      </Group>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group wrap="nowrap">
              <div>
                <Group>
                  <Text fz="8px" tt="uppercase" fw={700} c="dimmed">
                    Karlyn
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
                  karlyn@gmail.com
                </Text>
              </div>
              <Avatar
                variant="filled"
                color="rgba(241, 136, 53, 1)"
                radius="sm"
              >
                K
              </Avatar>
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Aplicación</Menu.Label>
          <Menu.Item leftSection={<IconSettings stroke={1.3} />}>
            <Text size="sm">Configuración</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Otros</Menu.Label>
          <Menu.Item color="red" leftSection={<IconTrash stroke={1.3} />}>
            <Text size="sm">Salir</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default Header;
