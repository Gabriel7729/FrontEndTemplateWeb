import { IconCar } from "@tabler/icons-react";
import { RouteConfig } from "../../common/types/route.type";
import VehiculosPage from "../../pages/vehiculos";
import VehiculosDetallePage from "../../pages/vehiculos/details";
import PersonasPage from "../../pages/personas";
import PersonasDetallePage from "../../pages/personas/details";

export const MainRouter: RouteConfig[] = [
  {
    label: "Vehiculos",
    icon: IconCar,
    initiallyOpened: false,
    accessRoles: [],
    links: [
      {
        label: "Administración de Vehiculos",
        link: "/vehiculos",
        element: VehiculosPage,
      },
      {
        label: "Detalle de Vehiculos",
        link: "/vehiculos/:id",
        element: VehiculosDetallePage,
        notShowInMenu: true,
      },
    ],
  },
  {
    label: "Personas",
    icon: IconCar,
    initiallyOpened: false,
    accessRoles: ["admin"],
    links: [
      {
        label: "Administración de Personas",
        link: "/personas",
        element: PersonasPage,
      },
      {
        label: "Detalle de Personas",
        link: "/personas/:id",
        element: PersonasDetallePage,
        notShowInMenu: true,
      },
    ],
  },
];

export const generateRoutes = (routes: RouteConfig[], role: string) => {
  return routes.flatMap((route) =>
    route.links
      .filter((link) => link.public || route.accessRoles.includes(role))
      .map((link) => ({
        title: route.label,
        path: link.link,
        element: link.element,
        accessRoles: route.accessRoles,
      }))
  );
};
