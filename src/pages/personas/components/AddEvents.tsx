// src/components/AddOrEditEvento.tsx
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
import { DateInput } from "@mantine/dates";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import {
  PersonaEventoDto,
  PersonaEventoResponseDto,
} from "../../../models/persona/persona.model";
import personaService from "../../../services/persona/persona.service";
import { ResponseModel } from "../../../models/base.model";
import { zodResolver } from "../../../common/utils/zod.utils";
import { IconCalendar, IconCheck, IconX } from "@tabler/icons-react";

interface AddOrEditEventoProps {
  onEventoCreated: () => void;
  eventoToEdit?: PersonaEventoResponseDto;
  personaId: string;
}

const eventoSchema = z.object({
  tipo: z.string().min(1, { message: "Tipo es requerido" }),
  descripcion: z.string().min(1, { message: "Descripción es requerida" }),
  fechaInicio: z.date().refine((date) => date instanceof Date, {
    message: "Fecha de inicio es requerida",
  }),
  duracion: z.number().min(1, { message: "Duración es requerida" }),
  estado: z.string().min(1, { message: "Estado es requerido" }),
  personaId: z.string().min(1, { message: "ID de Persona es requerido" }),
});

const AddOrEditEvento: React.FC<AddOrEditEventoProps> = ({
  onEventoCreated,
  eventoToEdit,
  personaId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const zodValidateEvento = zodResolver<PersonaEventoDto>(eventoSchema);

  const tipos = [
    { value: "Feliz", label: "Feliz" },
    { value: "Triste", label: "Triste" },
    { value: "Neutral", label: "Neutral" },
  ];

  const estados = [
    { value: "Pendiente", label: "Pendiente" },
    { value: "Completado", label: "Completado" },
    { value: "Cancelado", label: "Cancelado" },
  ];

  const handleSubmit = async (values: PersonaEventoDto) => {
    try {
      let response: ResponseModel<PersonaEventoResponseDto> | undefined =
        undefined;

      notifications.show({
        id: "create-update-evento",
        message: `${eventoToEdit ? "Actualizando" : "Creando"} Evento...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      setIsLoading(true);

      if (eventoToEdit) {
        values.personaId = personaId;
        response = await personaService.addEvent(values);
      } else {
        response = await personaService.addEvent(values);
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

  const defaultValues: PersonaEventoDto = {
    tipo: "",
    descripcion: "",
    fechaInicio: new Date(),
    duracion: 1,
    estado: "",
    personaId: personaId,
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
            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field name="date">
                  {({ field, form }: any) => {
                    return (
                      <DateInput
                        {...field}
                        valueFormat="DD MMM YYYY"
                        label="Fecha de Nacimiento"
                        placeholder="Fecha de Nacimiento"
                        error={
                          form.touched.fechaInicio && form.errors.fechaInicio
                            ? form.errors.fechaInicio
                            : undefined
                        }
                        onChange={(value) => {
                          form.setFieldValue("fechaInicio", value);
                        }}
                        rightSection={<IconCalendar />}
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
              <Grid.Col span={6}>
                <Field
                  name="duracion"
                  as={TextInput}
                  type="number"
                  label="Duración (en horas)"
                  placeholder="Duración"
                  error={touched.duracion && errors.duracion}
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
