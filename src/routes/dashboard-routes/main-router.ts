import { IconCar, IconCode, IconUser } from "@tabler/icons-react";
import { RouteConfig } from "../../common/types/route.type";
import VehiculosPage from "../../pages/vehiculos";
import VehiculosDetallePage from "../../pages/vehiculos/details";
import PersonasPage from "../../pages/personas";
import PersonasCitizienPage from "../../pages/personas/citizien";
import ValidationPage from "../../pages/validation";
import SendEmailPage from "../../pages/validation/sendEmailView";

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
    label: "Personas",
    icon: IconUser,
    initiallyOpened: false,
    accessRoles: ["admin"],
    links: [
      {
        label: "Registro de Personas",
        link: "/personas",
        element: PersonasPage,
      },
      {
        label: "Personas Padron",
        link: "/personas/padron",
        element: PersonasCitizienPage,
      }
    ],
  },
  {
    label: "Validaciones",
    icon: IconCode,
    initiallyOpened: false,
    accessRoles: ["admin"],
    links: [
      {
        label: "Envio de OTP",
        link: "/validaciones/otp",
        element: ValidationPage,
      },
      {
        label: "Correo",
        link: "/envio/correo",
        element: SendEmailPage,
      }
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
