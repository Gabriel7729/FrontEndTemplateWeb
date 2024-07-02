import { useState } from "react";
import personaService from "../../services/persona/persona.service";
import { Button, FileButton, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const PersonasPage = () => {
    const [file, setFile] = useState<File | null>(null);
  
    const handleCreatePerson = async (cedula: File | null) => {
        try {
            setFile(cedula);
            if (!cedula) return;

            notifications.show({
                id: "create-person-cedula",
                message: `Creando Persona...`,
                color: "blue",
                loading: true,
                autoClose: false,
              });

            const persona = await personaService.createPersonByCedula(cedula);

            notifications.update({
                id: "create-person-cedula",
                message: `Persona ${persona.nombres} creada exitosamente`,
                color: "green",
                icon: <IconCheck />,
                loading: false,
                autoClose: true,
              });
        } catch (error) {
            notifications.update({
                id: "create-person-cedula",
                message: `Ha ocurrido un error al crear la persona`,
                color: "red",
                icon: <IconX />,
                loading: false,
                autoClose: true,
              });
            console.error(error);
        }
    }

  return (
<>
      <Group justify="center">
        <FileButton onChange={handleCreatePerson} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
};

export default PersonasPage;
