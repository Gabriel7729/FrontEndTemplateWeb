import { useState } from "react";
import { Button, FileButton, Group, Text, Card, Grid, Badge } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import personaService from "../../../services/persona/persona.service";
import { Padron } from "../../../models/persona/persona.model";

export const PersonasCitizienPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [padron, setPadron] = useState<Padron | null>(null);

    const handleCreatePerson = async (cedula: File | null) => {
        try {
            setFile(cedula);
            if (!cedula) return;

            notifications.show({
                id: "find-person-cedula",
                message: `Encontrando Persona...`,
                color: "blue",
                loading: true,
                autoClose: false,
            });

            const persona = await personaService.getCedulaFromPadronAsync(cedula);
            setPadron(persona);
            notifications.update({
                id: "find-person-cedula",
                message: `Persona ${persona.NOMBRES} encontrada exitosamente`,
                color: "green",
                icon: <IconCheck />,
                loading: false,
                autoClose: true,
            });
        } catch (error) {
            notifications.update({
                id: "find-person-cedula",
                message: `Ha ocurrido un error al intentar encontrar a la persona`,
                color: "red",
                icon: <IconX />,
                loading: false,
                autoClose: true,
            });
            console.error(error);
        }
    };

    const padronDetails = padron && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section withBorder inheritPadding py="xs">
                <Text fw={500} size="lg">Detalles de la Persona</Text>
            </Card.Section>
            <Grid>
                {Object.entries(padron).map(([key, value]) => (
                    <Grid.Col span={6} key={key}>
                        <Text size="sm" fw={500}>{key}:</Text>
                        <Text size="sm">{value}</Text>
                    </Grid.Col>
                ))}
            </Grid>
        </Card>
    );

    return (
        <>
            <Group align="center" mt="xl">
                <FileButton onChange={handleCreatePerson} accept="image/png,image/jpeg">
                    {(props) => <Button {...props}>Upload image</Button>}
                </FileButton>
            </Group>

            {file && (
                <Text size="sm" mt="sm">
                    Picked file: {file.name}
                </Text>
            )}

            {padron && (
                <Group align="center" mt="xl">
                    {padronDetails}
                </Group>
            )}
        </>
    );
};

export default PersonasCitizienPage;
