import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  TextInput,
  Box,
  Button,
  Group,
  Grid,
  Text,
  NumberInput,
  Select,
  Stepper,
} from "@mantine/core";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { IconCalendar, IconCheck, IconX } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import { zodResolver } from "@mantine/form";
import { TravelDto } from "../../models/travel/travel.model";
import travelService from "../../services/travel/travel.service";
import { getErrorValidationMessage } from "../../common/utils/zod.utils";
import PayPalPaymentForm from "./components/PaypalPaymentForm";

interface AddOrEditTravelProps {
  //   onTravelCreated: () => void;
  //   travelToEdit?: TravelDto;
}

const travelSchema = z.object({
  tipoDocumento: z
    .string()
    .min(1, { message: "Tipo de Documento is required" }),
  documento: z.string().min(1, { message: "Documento is required" }),
  nombres: z.string().min(1, { message: "Nombres is required" }),
  apellidos: z.string().min(1, { message: "Apellidos is required" }),
  direccion: z.string().min(1, { message: "Direccion is required" }),
  telefono: z.string().min(1, { message: "Telefono is required" }),
  fechadelViaje: z.date({ message: "Fecha del Viaje is required" }),
  fechaRegistro: z.date({ message: "Fecha de Registro is required" }),
  estado: z.string().min(1, { message: "Estado is required" }),
  montoPagado: z.number().min(0, { message: "Monto Pagado is required" }),
});

const AddOrEditTravel: React.FC<AddOrEditTravelProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState(0);
  const [createdTravel, setCreatedTravel] = useState<TravelDto | null>(null);
  const zodValidateTravel = zodResolver<TravelDto>(travelSchema);

  const tiposDocumento = [
    { value: "DNI", label: "DNI" },
    { value: "Passport", label: "Passport" },
    // Add other document types as needed
  ];

  const estados = [
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Cancelled", label: "Cancelled" },
    // Add other states as needed
  ];

  const handleSubmit = async (values: TravelDto) => {
    try {
      notifications.show({
        id: "create-update-travel",
        message: `Creando Viaje...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      setIsLoading(true);

      const response = await travelService.create(values);
      setCreatedTravel(values); // Store the created travel data

      setIsLoading(false);
      notifications.update({
        id: "create-update-travel",
        message: `Viaje creado exitosamente!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
      nextStep(); // Move to the next step after successful creation
    } catch (error) {
      setIsLoading(false);
      notifications.update({
        id: "create-update-travel",
        message: `Ha ocurrido un error creando el viaje.`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });

      console.error("Ha ocurrido un error creando el viaje", error);
    }
  };

  const downloadReceipt = async (travelId: string) => {
    try {
      const response = await travelService.downloadReport("7ca1931b-59ca-407c-3317-08dc9adb7662");
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `receipt-${travelId}.pdf`);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
      console.error("Ha ocurrido un error creando el viaje", error);
    }
  };

  const defaultValues: TravelDto = {
    tipoDocumento: "",
    documento: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    fechadelViaje: new Date(),
    fechaRegistro: new Date(),
    estado: "",
    montoPagado: 0,
  };

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Box mt={"lg"}>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Datos del viaje"
          description="Ingrese los datos del viaje"
        >
          <Formik
            initialValues={defaultValues}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
            validate={zodValidateTravel}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={true}
          >
            {({ handleSubmit, errors, touched, isValid }) => (
              <Form onSubmit={handleSubmit}>
                <Text fw={"bold"} c={"#F18835"} mb={"lg"}>
                  Información del Viaje
                </Text>

                <Grid mb={"sm"} grow>
                  <Grid.Col span={6}>
                    <Field name="tipoDocumento">
                      {({ field, form }: any) => (
                        <Select
                          {...field}
                          data={tiposDocumento}
                          label="Tipo de Documento"
                          placeholder="Seleccione el tipo de documento"
                          error={touched.tipoDocumento && errors.tipoDocumento}
                          onChange={(value) =>
                            form.setFieldValue("tipoDocumento", value)
                          }
                          value={field.value}
                          withAsterisk
                        />
                      )}
                    </Field>
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
                    <Field
                      name="direccion"
                      as={TextInput}
                      label="Dirección"
                      placeholder="Dirección"
                      error={touched.direccion && errors.direccion}
                      withAsterisk
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Field
                      name="telefono"
                      as={TextInput}
                      label="Teléfono"
                      placeholder="Teléfono"
                      error={touched.telefono && errors.telefono}
                      withAsterisk
                    />
                  </Grid.Col>
                </Grid>
                <Grid mb={"sm"} grow>
                  <Grid.Col span={6}>
                    <Field name="fechadelViaje">
                      {({ field, form }: any) => {
                        return (
                          <DateInput
                            {...field}
                            valueFormat="DD MMM YYYY"
                            label="Fecha del Viaje"
                            placeholder="Seleccione la fecha del viaje"
                            error={
                              form.touched.fechadelViaje &&
                              form.errors.fechadelViaje
                                ? getErrorValidationMessage(
                                    form.errors.fechadelViaje
                                  )
                                : undefined
                            }
                            onChange={(value: any) => {
                              form.setFieldValue("fechadelViaje", value);
                            }}
                            rightSection={<IconCalendar />}
                          />
                        );
                      }}
                    </Field>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Field name="fechaRegistro">
                      {({ field, form }: any) => {
                        return (
                          <DateInput
                            {...field}
                            valueFormat="DD MMM YYYY"
                            label="Fecha de Registro"
                            placeholder="Seleccione la fecha de registro"
                            error={
                              form.touched.fechaRegistro &&
                              form.errors.fechaRegistro
                                ? getErrorValidationMessage(
                                    form.errors.fechaRegistro
                                  )
                                : undefined
                            }
                            onChange={(value: any) => {
                              form.setFieldValue("fechaRegistro", value);
                            }}
                            rightSection={<IconCalendar />}
                          />
                        );
                      }}
                    </Field>
                  </Grid.Col>
                </Grid>
                <Grid mb={"sm"} grow>
                  <Grid.Col span={6}>
                    <Field name="estado">
                      {({ field, form }: any) => (
                        <Select
                          {...field}
                          data={estados}
                          label="Estado"
                          placeholder="Seleccione el estado"
                          error={touched.estado && errors.estado}
                          onChange={(value) =>
                            form.setFieldValue("estado", value)
                          }
                          value={field.value}
                          withAsterisk
                        />
                      )}
                    </Field>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Field
                      name="montoPagado"
                      as={NumberInput}
                      label="Monto Pagado"
                      placeholder="Monto Pagado"
                      error={touched.montoPagado && errors.montoPagado}
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
                    {"Crear"}
                  </Button>
                </Group>
              </Form>
            )}
          </Formik>
        </Stepper.Step>

        <Stepper.Step label="Pago con PayPal" description="Realizar pago">
          {createdTravel && (
            <PayPalPaymentForm
              orderNumber={createdTravel.documento}
              firstName={createdTravel.nombres}
              lastName={createdTravel.apellidos}
              strDireccion={createdTravel.direccion}
              totalPayment={createdTravel.montoPagado}
            />
          )}
        </Stepper.Step>

        <Stepper.Completed>
          Completo, puede regresar al paso anterior
        </Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        {/* {active > 0 && <Button variant="default" onClick={prevStep}>Back</Button>} */}
        {/* {active === 0 && <Button onClick={nextStep}>Next step</Button>} */}
        <Button
          onClick={() => {
            downloadReceipt("7ca1931b-59ca-407c-3317-08dc9adb7662");
          }}
        >
          Receipt
        </Button>
      </Group>
    </Box>
  );
};

export default AddOrEditTravel;
