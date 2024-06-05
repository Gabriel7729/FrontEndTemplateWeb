import { useEffect, useState } from "react";
import { Card, CardSection, Text, Table, Grid, Badge, Title, Loader, Center } from "@mantine/core";
import vehiculoService from "../../../services/vehiculo/vehiculo.service";
import { VehiculoResponseDto } from "../../../models/vehiculo/vehiculo.model";
import { useParams } from "react-router-dom";

const VehiculosDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const [vehiculo, setVehiculo] = useState<VehiculoResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const response = await vehiculoService.getById(id ?? "");
        setVehiculo(response.value);
      } catch (error) {
        setError("Failed to fetch vehicle details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehiculo();
  }, [id]);

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return <Text c="red">{error}</Text>;
  }

  return (
    <div>
      <Card style={{ height: "calc(100vh - 97px)" }}>
        <CardSection style={{ padding: "2rem" }}>
          <Title order={2} mb="lg">Detalle de Vehículo</Title>
          {vehiculo && (
            <Grid>
              <Grid.Col span={4}>
                <Text>
                  <strong>Matricula:</strong> {vehiculo.matricula}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Marca:</strong> {vehiculo.marca}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Modelo:</strong> {vehiculo.modelo}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Año:</strong> {vehiculo.anio}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Cantidad de Millas:</strong> {vehiculo.cantidadMillas}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Motor:</strong> {vehiculo.motor}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Cantidad de Pasajeros:</strong> {vehiculo.cantidadPasajeros}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Fecha de Creación:</strong> {new Date(vehiculo.createdDate).toLocaleDateString()}
                </Text>
              </Grid.Col>
            </Grid>
          )}
        </CardSection>
        <CardSection style={{ padding: "2rem" }}>
          <Title order={3} mb="lg">Eventos del Vehículo</Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {vehiculo?.eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.id}</td>
                  <td>{evento.tipo}</td>
                  <td>{evento.descripcion}</td>
                  <td>
                    <Badge color={evento.estado === "Active" ? "green" : "red"}>
                      {evento.estado}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardSection>
      </Card>
    </div>
  );
};

export default VehiculosDetallePage;
