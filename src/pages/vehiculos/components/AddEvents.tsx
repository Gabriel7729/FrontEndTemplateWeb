import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  TextInput,
  Box,
  Button,
  Group,
  Grid,
  Text,
  Select,
} from "@mantine/core";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import {
  VehiculoEventoDto,
  VehiculoEventoResponseDto,
} from "../../../models/vehiculo/vehiculo.model";
import vehiculoService from "../../../services/vehiculo/vehiculo.service";
import { ResponseModel } from "../../../models/base.model";
import { zodResolver } from "../../../common/utils/zod.utils";
import { IconCheck, IconX } from "@tabler/icons-react";

interface AddOrEditEventoProps {
  onEventoCreated: () => void;
  eventoToEdit?: VehiculoEventoResponseDto;
  vehiculoId: string;
}

const eventoSchema = z.object({
  tipo: z.string().min(1, { message: "Tipo is required" }),
  descripcion: z.string().min(1, { message: "Descripción is required" }),
  estado: z.string().min(1, { message: "Estado is required" }),
  vehiculoId: z.string().min(1, { message: "Vehiculo ID is required" }),
});

const AddOrEditEvento: React.FC<AddOrEditEventoProps> = ({
  onEventoCreated,
  eventoToEdit,
  vehiculoId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const zodValidateEvento = zodResolver<VehiculoEventoDto>(eventoSchema);

  const tipos = [
    { value: "Mantenimiento", label: "Mantenimiento" },
    { value: "Reparación", label: "Reparación" },
    { value: "Inspección", label: "Inspección" },
  ];

  const estados = [
    { value: "Pendiente", label: "Pendiente" },
    { value: "Completado", label: "Completado" },
    { value: "Cancelado", label: "Cancelado" },
  ];

  const handleSubmit = async (values: VehiculoEventoDto) => {
    try {
      let response: ResponseModel<VehiculoEventoResponseDto> | undefined = undefined;

      notifications.show({
        id: "create-update-evento",
        message: `${eventoToEdit ? "Actualizando" : "Creando"} Evento...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      setIsLoading(true);

      if (eventoToEdit) {
        values.vehiculoId = vehiculoId;
        response = await vehiculoService.addEvent(values);
      } else {
        response = await vehiculoService.addEvent(values);
      }

      setIsLoading(false);
      notifications.update({
        id: "create-update-evento",
        message: `Evento "${response?.value.tipo}" ${
          eventoToEdit ? "actualizado" : "creado"
        } exitosamente!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
      onEventoCreated();
    } catch (error) {
      setIsLoading(false);
      notifications.update({
        id: "create-update-evento",
        message: `Ha ocurrido un error ${
          eventoToEdit ? "actualizando" : "creando"
        } el evento.`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });

      console.error("Ha ocurrido un error creando el evento", error);
    }
  };

  const defaultValues: VehiculoEventoDto = {
    tipo: "",
    descripcion: "",
    estado: "",
    vehiculoId: vehiculoId,
  };

  return (
    <Box mt={"lg"}>
      <Formik
        initialValues={eventoToEdit || defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        validate={zodValidateEvento}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <Text fw={"bold"} c={"#F18835"} mb={"lg"}>
              Información del Evento
            </Text>

            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field name="tipo">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      data={tipos}
                      label="Tipo"
                      placeholder="Seleccione el tipo"
                      error={touched.tipo && errors.tipo}
                      onChange={(value) => form.setFieldValue("tipo", value)}
                      value={field.value}
                      withAsterisk
                    />
                  )}
                </Field>
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="estado">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      data={estados}
                      label="Estado"
                      placeholder="Seleccione el estado"
                      error={touched.estado && errors.estado}
                      onChange={(value) => form.setFieldValue("estado", value)}
                      value={field.value}
                      withAsterisk
                    />
                  )}
                </Field>
              </Grid.Col>
            </Grid>
            <Grid mb={"sm"} grow>
              <Grid.Col span={12}>
                <Field
                  name="descripcion"
                  as={TextInput}
                  label="Descripción"
                  placeholder="Descripción"
                  error={touched.descripcion && errors.descripcion}
                  withAsterisk
                />
              </Grid.Col>
            </Grid>

            <Group mt="xl" justify="flex-end">
              <Button
                disabled={!isValid}
                loading={isLoading}
                color={"#f18835"}
                type="submit"
              >
                {eventoToEdit ? "Editar" : "Crear"}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOrEditEvento;
