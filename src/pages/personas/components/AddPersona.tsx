// src/components/AddOrEditPersona.tsx
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
  PersonaDto,
  PersonaResponseDto,
} from "../../../models/persona/persona.model";
import personaService from "../../../services/persona/persona.service";
import { ResponseModel } from "../../../models/base.model";
import { zodResolver } from "../../../common/utils/zod.utils";
import { IconCalendar, IconCheck, IconX } from "@tabler/icons-react";

interface AddOrEditPersonaProps {
  onPersonaCreated: () => void;
  personaToEdit?: PersonaResponseDto;
}

const personaSchema = z.object({
  tipoDocumento: z
    .string()
    .min(1, { message: "Tipo de documento es requerido" }),
  documento: z.string().min(1, { message: "Documento es requerido" }),
  nombres: z.string().min(1, { message: "Nombres es requerido" }),
  apellidos: z.string().min(1, { message: "Apellidos es requerido" }),
  birthDate: z.date().refine((date) => date instanceof Date, {
    message: "Fecha de nacimiento es requerida",
  }),
  sexo: z.string().min(1, { message: "Sexo es requerido" }),
  felicidadAcumulada: z
    .number()
    .min(0, { message: "Felicidad acumulada es requerida" }),
});

const AddOrEditPersona: React.FC<AddOrEditPersonaProps> = ({
  onPersonaCreated,
  personaToEdit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const zodValidatePersona = zodResolver<PersonaDto>(personaSchema);

  const sexos = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const handleSubmit = async (values: PersonaDto) => {
    try {
      let response: ResponseModel<PersonaResponseDto> | undefined = undefined;

      notifications.show({
        id: "create-update-persona",
        message: `${personaToEdit ? "Actualizando" : "Creando"} Persona...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      setIsLoading(true);

      if (personaToEdit) {
        // Update logic here
        // response = await personaService.update(values);
      } else {
        response = await personaService.create(values);
      }

      setIsLoading(false);
      notifications.update({
        id: "create-update-persona",
        message: `Persona "${response?.value.documento}" ${
          personaToEdit ? "actualizada" : "creada"
        } exitosamente!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
      onPersonaCreated();
    } catch (error) {
      setIsLoading(false);
      notifications.update({
        id: "create-update-persona",
        message: `Ha ocurrido un error ${
          personaToEdit ? "actualizando" : "creando"
        } los datos de la persona.`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });

      console.error("Ha ocurrido un error creando la persona", error);
    }
  };

  const defaultValues: PersonaDto = {
    tipoDocumento: "",
    documento: "",
    nombres: "",
    apellidos: "",
    birthDate: new Date(),
    sexo: "",
    felicidadAcumulada: 0,
  };

  return (
    <Box mt={"lg"}>
      <Formik
        initialValues={personaToEdit || defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        validate={zodValidatePersona}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <Text fw={"bold"} c={"#F18835"} mb={"lg"}>
              Información de la Persona
            </Text>

            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field
                  name="tipoDocumento"
                  as={TextInput}
                  label="Tipo de Documento"
                  placeholder="Tipo de Documento"
                  error={touched.tipoDocumento && errors.tipoDocumento}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Field
                  name="documento"
                  as={TextInput}
                  label="Documento"
                  placeholder="Documento"
                  error={touched.documento && errors.documento}
                  withAsterisk
                />
              </Grid.Col>
            </Grid>
            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field
                  name="nombres"
                  as={TextInput}
                  label="Nombres"
                  placeholder="Nombres"
                  error={touched.nombres && errors.nombres}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Field
                  name="apellidos"
                  as={TextInput}
                  label="Apellidos"
                  placeholder="Apellidos"
                  error={touched.apellidos && errors.apellidos}
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
                          form.touched.birthDate && form.errors.birthDate
                            ? form.errors.birthDate
                            : undefined
                        }
                        onChange={(value) => {
                          form.setFieldValue("birthDate", value);
                        }}
                        rightSection={<IconCalendar />}
                      />
                    );
                  }}
                </Field>
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="sexo">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      data={sexos}
                      label="Sexo"
                      placeholder="Seleccione el sexo"
                      error={touched.sexo && errors.sexo}
                      onChange={(value) => form.setFieldValue("sexo", value)}
                      value={field.value}
                      withAsterisk
                    />
                  )}
                </Field>
              </Grid.Col>
            </Grid>

            <Group mt="xl" justify="flex-end">
              <Button
                disabled={!isValid}
                loading={isLoading}
                color={"#f18835"}
                type="submit"
              >
                {personaToEdit ? "Editar" : "Crear"}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOrEditPersona;
