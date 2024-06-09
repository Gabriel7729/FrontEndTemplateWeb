import { useState } from "react";
import { Button, FileButton, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import personaService from "../../../services/persona/persona.service";
import { BuscadoResponseDto } from "../../../models/persona/persona.model";

export const PersonasBuscarPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [buscadoResponse, setBuscadoResponse] = useState<
    BuscadoResponseDto | undefined
  >();

  const handlerFindPerson = async (photo: File | null) => {
    try {
      setFile(photo);
      if (!photo) return;

      notifications.show({
        id: "create-person-photo",
        message: `Buscando Persona...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      const persona = await personaService.findBuscadoPerson(photo);

      setBuscadoResponse(persona);

      notifications.update({
        id: "create-person-photo",
        message: `Buscado ${persona.faceId} encontrado exitosamente`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "create-person-photo",
        message: `Ha ocurrido un error al encontrar al buscado`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error(error);
    }
  };

  return (
    <>
      <Group justify="center">
        <FileButton onChange={handlerFindPerson} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {buscadoResponse && (
        <>
          <Text size="sm" ta="center" mt="sm">
            Buscado encontrado: {buscadoResponse.faceId}
          </Text>
          <Text size="sm" ta="center" mt="sm">
            External Image Id: {buscadoResponse.externalImageId}
          </Text>
          <Text size="sm" ta="center" mt="sm">
            Confidence: {buscadoResponse.confidence}
          </Text>
        </>
      )}

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
};

export default PersonasBuscarPage;
