// src/components/AddOrEditVehiculo.tsx
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
    VehiculoDto,
  VehiculoResponseDto,
} from "../../../models/vehiculo/vehiculo.model";
import vehiculoService from "../../../services/vehiculo/vehiculo.service";
import { ResponseModel } from "../../../models/base.model";
import { zodResolver } from "../../../common/utils/zod.utils";
import { IconCheck, IconX } from "@tabler/icons-react";

interface AddOrEditVehiculoProps {
  onVehiculoCreated: () => void;
  vehiculoToEdit?: VehiculoResponseDto;
}

const vehiculoSchema = z.object({
  matricula: z.string().min(1, { message: "Matricula is required" }),
  marca: z.string().min(1, { message: "Marca is required" }),
  modelo: z.string().min(1, { message: "Modelo is required" }),
  anio: z.string().min(1, { message: "Anio is required" }),
  cantidadMillas: z.string().min(1, { message: "Cantidad de Millas is required" }),
  motor: z.string().min(1, { message: "Motor is required" }),
  cantidadPasajeros: z.string().min(1, { message: "Cantidad de Pasajeros is required" }),
});

const AddOrEditVehiculo: React.FC<AddOrEditVehiculoProps> = ({
  onVehiculoCreated,
  vehiculoToEdit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const zodValidateVehiculo = zodResolver<VehiculoDto>(vehiculoSchema);

  const marcas = [
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Chevrolet', label: 'Chevrolet' },
    { value: 'Nissan', label: 'Nissan' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes-Benz', label: 'Mercedes-Benz' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Mazda', label: 'Mazda' },
    { value: 'Subaru', label: 'Subaru' },
    { value: 'Lexus', label: 'Lexus' },
    { value: 'Jaguar', label: 'Jaguar' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Ferrari', label: 'Ferrari' },
    { value: 'Lamborghini', label: 'Lamborghini' },
    { value: 'Bentley', label: 'Bentley' },
    { value: 'Rolls-Royce', label: 'Rolls-Royce' },
    { value: 'Aston Martin', label: 'Aston Martin' },
    { value: 'Mitsubishi', label: 'Mitsubishi' },
    { value: 'Suzuki', label: 'Suzuki' },
    { value: 'Peugeot', label: 'Peugeot' },
    { value: 'Renault', label: 'Renault' },
    { value: 'Citroen', label: 'Citroen' },
    { value: 'Fiat', label: 'Fiat' },
    { value: 'Alfa Romeo', label: 'Alfa Romeo' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Mini', label: 'Mini' },
    { value: 'Land Rover', label: 'Land Rover' },
    { value: 'Jeep', label: 'Jeep' },
    { value: 'Chrysler', label: 'Chrysler' },
    { value: 'Dodge', label: 'Dodge' },
    { value: 'Ram', label: 'Ram' },
    { value: 'Buick', label: 'Buick' },
    { value: 'Cadillac', label: 'Cadillac' },
    { value: 'GMC', label: 'GMC' },
    { value: 'Infiniti', label: 'Infiniti' },
    { value: 'Lincoln', label: 'Lincoln' },
    { value: 'Maserati', label: 'Maserati' },
    { value: 'Acura', label: 'Acura' },
    { value: 'Genesis', label: 'Genesis' },
    { value: 'Saab', label: 'Saab' },
    { value: 'Lotus', label: 'Lotus' },
    { value: 'McLaren', label: 'McLaren' },
    { value: 'Bugatti', label: 'Bugatti' },
    { value: 'Pagani', label: 'Pagani' },
    { value: 'Koenigsegg', label: 'Koenigsegg' }
  ];

  const anios = Array.from({ length: 30 }, (_, i) => {
    const year = (new Date().getFullYear() - i).toString();
    return { value: year, label: year };
  });

  const handleSubmit = async (values: VehiculoDto) => {
    try {
      let response: ResponseModel<VehiculoResponseDto> | undefined = undefined;

      notifications.show({
        id: "create-update-vehiculo",
        message: `${vehiculoToEdit ? "Actualizando" : "Creando"} Vehículo...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      setIsLoading(true);

      if (vehiculoToEdit) {
        // values.id = vehiculoToEdit.id;
        // response = await vehiculoService.(``, values);
      } else {
        response = await vehiculoService.create(values);
      }

      setIsLoading(false);
      notifications.update({
        id: "create-update-vehiculo",
        message: `Vehículo "${response?.value.matricula}" ${
          vehiculoToEdit ? "actualizado" : "creado"
        } exitosamente!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
      onVehiculoCreated();
    } catch (error) {
      setIsLoading(false);
      notifications.update({
        id: "create-update-vehiculo",
        message: `Ha ocurrido un error ${
          vehiculoToEdit ? "actualizando" : "creando"
        } los datos del vehículo.`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });

      console.error("Ha ocurrido un error creando el vehículo", error);
    }
  };

  const defaultValues: VehiculoDto = {
    // id: "",
    matricula: "",
    marca: "",
    modelo: "",
    anio: "",
    cantidadMillas: "",
    motor: "",
    cantidadPasajeros: "",
  };

  return (
    <Box mt={"lg"}>
      <Formik
        initialValues={vehiculoToEdit || defaultValues}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        validate={zodValidateVehiculo}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={true}
      >
        {({ handleSubmit, errors, touched, isValid }) => (
          <Form onSubmit={handleSubmit}>
            <Text fw={"bold"} c={"#F18835"} mb={"lg"}>
              Información del Vehículo
            </Text>

            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field
                  name="matricula"
                  as={TextInput}
                  label="Matricula"
                  placeholder="Matricula"
                  error={touched.matricula && errors.matricula}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="marca">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      data={marcas}
                      label="Marca"
                      placeholder="Seleccione la marca"
                      error={touched.marca && errors.marca}
                      onChange={(value) => form.setFieldValue("marca", value)}
                      value={field.value}
                      withAsterisk
                    />
                  )}
                </Field>
              </Grid.Col>
            </Grid>
            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field
                  name="modelo"
                  as={TextInput}
                  label="Modelo"
                  placeholder="Modelo"
                  error={touched.modelo && errors.modelo}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Field name="anio">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      data={anios}
                      label="Año"
                      placeholder="Seleccione el año"
                      error={touched.anio && errors.anio}
                      onChange={(value) => form.setFieldValue("anio", value)}
                      value={field.value}
                      withAsterisk
                    />
                  )}
                </Field>
              </Grid.Col>
            </Grid>
            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field
                  name="cantidadMillas"
                  as={TextInput}
                  label="Cantidad de Millas"
                  placeholder="Cantidad de Millas"
                  error={touched.cantidadMillas && errors.cantidadMillas}
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Field
                  name="motor"
                  as={TextInput}
                  label="Motor"
                  placeholder="Motor"
                  error={touched.motor && errors.motor}
                  withAsterisk
                />
              </Grid.Col>
            </Grid>
            <Grid mb={"sm"} grow>
              <Grid.Col span={6}>
                <Field
                  name="cantidadPasajeros"
                  as={TextInput}
                  label="Cantidad de Pasajeros"
                  placeholder="Cantidad de Pasajeros"
                  error={touched.cantidadPasajeros && errors.cantidadPasajeros}
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
                {vehiculoToEdit ? "Editar" : "Crear"}
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddOrEditVehiculo;
