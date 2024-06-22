import { useState } from "react";
import {
  Button,
  TextInput,
  Flex,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { SendEmailWithAttachmentRequest } from "../../models/validation/validation.model";
import validationService from "../../services/validation/validation.service";

export const SendEmailPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSendEmail = async () => {
    try {
      notifications.show({
        id: "send-email",
        message: "Sending email...",
        color: "blue",
        loading: true,
        autoClose: false,
      });

      const sendEmailRequest: SendEmailWithAttachmentRequest = {
        email: email,
      };

      await validationService.sendEmailWithAttachments(sendEmailRequest);
      setIsEmailSent(true);

      notifications.update({
        id: "send-email",
        message: `Email sent to ${email} successfully`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "send-email",
        message: `Failed to send email to ${email}`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error(error);
    }
  };

  return (
    <Flex direction="column" align="center" mt="xl" gap="xl">
      {!isEmailSent ? (
        <>
          <TextInput
            w={"35%"}
            label="Email"
            placeholder="Enter the recipient's email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
          />
          <Button onClick={handleSendEmail}>Send Email</Button>
        </>
      ) : (
        <Text c="green">Email has been sent successfully!</Text>
      )}
    </Flex>
  );
};

export default SendEmailPage;
