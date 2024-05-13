import {
  Box,
  Button,
  Card,
  CardSection,
  Container,
  FileInput,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import assuranceService from "../../services/assurance/assurance.service";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export const Home = () => {
  const form = useForm({
    initialValues: {
      documentType: "",
      document: "",
      firstName: "",
      lastName: "",
      registrationDate: new Date(),
      licensePlate: "",
      registration: "",
      address: "",
      injured: 0,
      dead: 0,
      eventDate: new Date(),
      photo: null,
      status: "",
      note: "",
    },
  });

  const handleSubmit = async (values: any) => {
    console.log(values);

    try {
      notifications.show({
        id: "create-assurance",
        message: `Creating report...`,
        color: "blue",
        loading: true,
        autoClose: false,
      });

      const photoFile = values.photo;

      const photo = await assuranceService.uploadPhoto({ photo: photoFile });
      values.photo = `${photo.photoId}`;
      await assuranceService.insertEventRecord({ ...values });

      notifications.update({
        id: "create-assurance",
        message: `Report created successfully!`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "create-transaction",
        message: `An error has occurred creating the report. Please try again.`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error(error);
    }

    // Add your submit logic here
  };

  return (
    <div>
      <Card>
        <CardSection style={{ padding: "2rem" }}>
          <Container>
            <Box maw={340} mx="auto">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Select
                  mt="md"
                  withAsterisk
                  label="Document Type"
                  placeholder="Select document type"
                  data={[
                    { value: "Cedula", label: "Cedula" },
                    { value: "Pasaporte", label: "Pasaporte" },
                  ]}
                  {...form.getInputProps("documentType")}
                />

                <TextInput
                  mt="md"
                  withAsterisk
                  label="Document"
                  placeholder="Enter document"
                  {...form.getInputProps("document")}
                />

                <TextInput
                  mt="md"
                  withAsterisk
                  label="First Name"
                  placeholder="Enter first name"
                  {...form.getInputProps("firstName")}
                />

                <TextInput
                  mt="md"
                  withAsterisk
                  label="Last Name"
                  placeholder="Enter last name"
                  {...form.getInputProps("lastName")}
                />

                <DatePickerInput
                  mt="md"
                  label="Registration Date"
                  placeholder="Pick date"
                  {...form.getInputProps("registrationDate")}
                />

                <TextInput
                  mt="md"
                  withAsterisk
                  label="License Plate"
                  placeholder="Enter license plate"
                  {...form.getInputProps("licensePlate")}
                />

                <TextInput
                  mt="md"
                  withAsterisk
                  label="Registration"
                  placeholder="Enter registration"
                  {...form.getInputProps("registration")}
                />

                <TextInput
                  mt="md"
                  withAsterisk
                  label="Address"
                  placeholder="Enter address"
                  {...form.getInputProps("address")}
                />

                <NumberInput
                  mt="md"
                  withAsterisk
                  label="Injured"
                  placeholder="Enter number of injured"
                  {...form.getInputProps("injured")}
                />

                <NumberInput
                  mt="md"
                  withAsterisk
                  label="Dead"
                  placeholder="Enter number of dead"
                  {...form.getInputProps("dead")}
                />

                <DatePickerInput
                  mt="md"
                  label="Event Date"
                  placeholder="Pick date"
                  {...form.getInputProps("eventDate")}
                />

                <FileInput
                  mt="md"
                  label="Photo"
                  description="Enter photo"
                  placeholder="Enter photo"
                  {...form.getInputProps("photo")}
                />

                <Select
                  mt="md"
                  withAsterisk
                  label="Status"
                  placeholder="Select status"
                  data={[
                    { value: "pending", label: "Pending" },
                    { value: "under_review", label: "Under Review" },
                    { value: "approved", label: "Approved" },
                    { value: "denied", label: "Denied" },
                    { value: "settled", label: "Settled" },
                  ]}
                  {...form.getInputProps("status")}
                />

                <Textarea
                  mt="md"
                  withAsterisk
                  label="Note"
                  placeholder="Enter note"
                  autosize
                  minRows={2}
                  {...form.getInputProps("note")}
                />

                <Group mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Box>
          </Container>
        </CardSection>
      </Card>
    </div>
  );
};

export default Home;
