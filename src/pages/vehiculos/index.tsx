import { Badge, Card, CardSection, Modal, rem } from "@mantine/core";
import BaseTable from "../../components/base-table/BaseTable";
import { useVehiculosPaginated } from "../../hooks/vehiculo/vehiculo.hooks";
import { useState } from "react";
import { TableConfig } from "../../common/types/tableConfig";
import { VehiculoResponseDto } from "../../models/vehiculo/vehiculo.model";
import { formatDate } from "../../common/utils/date.utils";
import { IconListDetails, IconPdf, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AddOrEditVehiculo from "./components/AddCar";
import AddOrEditEvento from "./components/AddEvents";
import vehiculoService from "../../services/vehiculo/vehiculo.service";

export const VehiculosPage = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEvent, { open: openEvent, close: closeModal }] =
    useDisclosure(false);
  const [vehiculoId, setVehiculoId] = useState("");
  const [pageSettings, setPageSettings] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const { data, isLoading, mutate } = useVehiculosPaginated(
    pageSettings.currentPage,
    pageSettings.pageSize
  );

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPageSettings({ currentPage: newPage, pageSize: newPageSize });
  };

  const downloadReport = async (vehiculoId: string) => {
    const blob = await vehiculoService.downloadReport(vehiculoId);
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-carfax.pdf";
  
    // Append the anchor to the body, click it, and then remove it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    // Release the Blob URL
    URL.revokeObjectURL(url);
  }

  const tableConfig: TableConfig<VehiculoResponseDto> = {
    titleTable: "Vehiculos",
    data: {
      items: data?.value.items ?? [],
      totalRecords: data?.value.totalRecords,
      pageNumber: data?.value.pageNumber,
      pageSize: data?.value.pageSize,
      totalPages: data?.value.totalPages,
    },
    isLoading,
    onClick: (rowData: VehiculoResponseDto) => {
      navigate(`/vehiculos/${rowData.id}`);
    },
    filters: [],
    headers: [
      {
        key: "matricula",
        name: "Matrícula",
      },
      {
        key: "marca",
        name: "Marca",
      },
      {
        key: "modelo",
        name: "Modelo",
      },
      {
        key: "anio",
        name: "Año",
      },
      {
        key: "cantidadMillas",
        name: "Cantidad de millas",
      },
      {
        key: "motor",
        name: "Motor",
      },
      {
        key: "cantidadPasajeros",
        name: "Cantidad de pasajeros",
      },
      {
        key: "createdDate",
        name: "Fecha de creación",
        renderComponent: (rowData: VehiculoResponseDto) => {
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
        text: "Agrear vehículo",
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
        handler: (rowData: VehiculoResponseDto) => {
          navigate(`/vehiculos/${rowData.id}`);
        },
      },
      {
        color: "blue",
        icon: <IconPlus style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "Agregar evento",
        text: "Agregar evento",
        handler: (rowData: VehiculoResponseDto) => {
          setVehiculoId(rowData.id);
          openEvent();
        },
      },
      {
        color: "yellow",
        icon: <IconPdf style={{ width: rem(14), height: rem(14) }} />,
        toolTip: "Descargar reporte Carfax",
        text: "Descargar reporte Carfax",
        handler: (rowData: VehiculoResponseDto) => {
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
            title={"Agregar nuevo vehículo"}
            centered
          >
            <AddOrEditVehiculo
              vehiculoToEdit={undefined}
              onVehiculoCreated={() => {
                close();
                mutate();
              }}
            />
          </Modal>
          <Modal
            opened={openedEvent}
            onClose={closeModal}
            size={"xl"}
            title={"Agregar nuevo vehículo"}
            centered
          >
            <AddOrEditEvento
              vehiculoId={vehiculoId}
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

export default VehiculosPage;
