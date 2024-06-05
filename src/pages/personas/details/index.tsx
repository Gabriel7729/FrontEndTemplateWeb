import { useEffect, useState } from "react";
import { Card, CardSection, Text, Table, Grid, Badge, Title, Loader, Center } from "@mantine/core";
import personaService from "../../../services/persona/persona.service";
import { PersonaResponseDto } from "../../../models/persona/persona.model";
import { useParams } from "react-router-dom";

const PersonasDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const [persona, setPersona] = useState<PersonaResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await personaService.getById(id ?? "");
        setPersona(response.value);
      } catch (error) {
        setError("Failed to fetch persona details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersona();
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
          <Title order={2} mb="lg">Detalle de Persona</Title>
          {persona && (
            <Grid>
              <Grid.Col span={4}>
                <Text>
                  <strong>Tipo de Documento:</strong> {persona.tipoDocumento}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Documento:</strong> {persona.documento}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Nombres:</strong> {persona.nombres}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Apellidos:</strong> {persona.apellidos}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Fecha de Nacimiento:</strong> {new Date(persona.birthDate).toLocaleDateString()}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Sexo:</strong> {persona.sexo}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Felicidad Acumulada:</strong> {persona.felicidadAcumulada}
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text>
                  <strong>Fecha de Creación:</strong> {new Date(persona.createdDate).toLocaleDateString()}
                </Text>
              </Grid.Col>
            </Grid>
          )}
        </CardSection>
        <CardSection style={{ padding: "2rem" }}>
          <Title order={3} mb="lg">Eventos de la Persona</Title>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Fecha de Inicio</th>
                <th>Duración</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {persona?.eventos.map((evento) => (
                <tr key={evento.id}>
                  <td>{evento.id}</td>
                  <td>{evento.tipo}</td>
                  <td>{evento.descripcion}</td>
                  <td>{new Date(evento.fechaInicio).toLocaleDateString()}</td>
                  <td>{evento.duracion} horas</td>
                  <td>
                    <Badge color={evento.estado === "Completado" ? "green" : "red"}>
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

export default PersonasDetallePage;
