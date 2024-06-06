import { IconCar } from "@tabler/icons-react";
import { RouteConfig } from "../../common/types/route.type";
import VehiculosPage from "../../pages/vehiculos";
import VehiculosDetallePage from "../../pages/vehiculos/details";
import { FileUploadPage } from "../../pages/files";

export const MainRouter: RouteConfig[] = [
  {
    label: "Vehiculos",
    icon: IconCar,
    initiallyOpened: false,
    accessRoles: ["admin"],
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
    label: "Archivos",
    icon: IconCar,
    initiallyOpened: false,
    accessRoles: ["admin"],
    links: [
      {
        label: "Subir Archivos",
        link: "/archivos",
        element: FileUploadPage,
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
