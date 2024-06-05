import { Badge, Card, CardSection, Modal, rem } from "@mantine/core";
import BaseTable from "../../components/base-table/BaseTable";
import { usePersonaPaginated } from "../../hooks/persona/persona.hooks";
import { useState } from "react";
import { TableConfig } from "../../common/types/tableConfig";
import { PersonaResponseDto } from "../../models/persona/persona.model";
import { formatDate } from "../../common/utils/date.utils";
import { IconListDetails, IconPdf, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AddOrEditPersona from "./components/AddPersona";
import personaService from "../../services/persona/persona.service";
import AddOrEditEvento from "./components/AddEvents";

export const PersonasPage = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEvent, { open: openEvent, close: closeModal }] = useDisclosure(false);
  const [personaId, setPersonaId] = useState("");
  const [pageSettings, setPageSettings] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const { data, isLoading, mutate } = usePersonaPaginated(
    pageSettings.currentPage,
    pageSettings.pageSize
  );

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPageSettings({ currentPage: newPage, pageSize: newPageSize });
  };

  const downloadReport = async (personaId: string) => {
    const blob = await personaService.downloadReport(personaId);
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-felicidad.pdf";

    // Append the anchor to the body, click it, and then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the Blob URL
    URL.revokeObjectURL(url);
  }

  const tableConfig: TableConfig<PersonaResponseDto> = {
    titleTable: "Personas",
    data: {
      items: data?.value.items ?? [],
      totalRecords: data?.value.totalRecords,
      pageNumber: data?.value.pageNumber,
      pageSize: data?.value.pageSize,
      totalPages: data?.value.totalPages,
    },
    isLoading,
    onClick: (rowData: PersonaResponseDto) => {
      navigate(`/personas/${rowData.id}`);
    },
    filters: [],
    headers: [
      {
        key: "tipoDocumento",
        name: "Tipo de Documento",
      },
      {
        key: "documento",
        name: "Documento",
      },
      {
        key: "nombres",
        name: "Nombres",
      },
      {
        key: "apellidos",
        name: "Apellidos",
      },
      {
        key: "birthDate",
        name: "Fecha de Nacimiento",
        renderComponent: (rowData: PersonaResponseDto) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {formatDate(rowData.birthDate, "dd/MM/yyyy")}
            </Badge>
          );
        },
      },
      {
        key: "sexo",
        name: "Sexo",
      },
      {
        key: "felicidadAcumulada",
        name: "Felicidad Acumulada",
      },
      {
        key: "createdDate",
        name: "Fecha de Creación",
        renderComponent: (rowData: PersonaResponseDto) => {
          return (
            <Badge
              size="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {formatDate(rowData.createdDate, "dd/MM/yyyy")}
            </Badge>
          );
        },
      },
    ],
    buttonOptions: [
      {
        icon: <IconPlus />,
        type: "action",
        text: "Agregar Persona",
        show: true,
        handler: () => {
          open();
        },
      },
    ],
    actions: [
      {
        icon: <IconListDetails style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "Ver detalles",
        text: "Ver detalles",
        handler: (rowData: PersonaResponseDto) => {
          navigate(`/personas/${rowData.id}`);
        },
      },
      {
        color: "blue",
        icon: <IconPlus style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "Agregar evento",
        text: "Agregar evento",
        handler: (rowData: PersonaResponseDto) => {
          setPersonaId(rowData.id);
          openEvent();
        },
      },
      {
        color: "yellow",
        icon: <IconPdf style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "Descargar reporte de felicidad",
        text: "Descargar reporte de felicidad",
        handler: (rowData: PersonaResponseDto) => {
          downloadReport(rowData.id);
        },
      }
    ],
  };
  return (
    <div>
      <Card style={{ height: "calc(100vh - 97px)" }}>
        <CardSection style={{ padding: "2rem" }}>
          <BaseTable config={tableConfig} handlePageChange={handlePageChange} />
          <Modal
            opened={opened}
            onClose={close}
            size={"xl"}
            title={"Agregar nueva persona"}
            centered
          >
            <AddOrEditPersona
              personaToEdit={undefined}
              onPersonaCreated={() => {
                close();
                mutate();
              }}
            />
          </Modal>
          <Modal
            opened={openedEvent}
            onClose={closeModal}
            size={"xl"}
            title={"Agregar nuevo evento"}
            centered
          >
            <AddOrEditEvento
              personaId={personaId}
              eventoToEdit={undefined}
              onEventoCreated={() => {
                closeModal();
              }}
            />
          </Modal>
        </CardSection>
      </Card>
    </div>
  );
};

export default PersonasPage;
