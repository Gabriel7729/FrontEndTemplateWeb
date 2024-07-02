import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  Flex,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { SendOtpDto, ValidateOtpDto } from "../../models/validation/validation.model";
import validationService from "../../services/validation/validation.service";

export const ValidationPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);

  const handleSendOtp = async () => {
    try {
      notifications.show({
        id: "send-otp",
        message: "Sending OTP...",
        color: "blue",
        loading: true,
        autoClose: false,
      });

      const sendOtp: SendOtpDto = {
        sentTo: email,
      };

      await validationService.sendOtp(sendOtp);
      setIsOtpSent(true);

      notifications.update({
        id: "send-otp",
        message: `OTP sent to ${email} successfully`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "send-otp",
        message: `Failed to send OTP to ${email}`,
        color: "red",
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error(error);
    }
  };

  const handleValidateOtp = async () => {
    try {
      notifications.show({
        id: "validate-otp",
        message: "Validating OTP...",
        color: "blue",
        loading: true,
        autoClose: false,
      });

      const validateOtp: ValidateOtpDto = {
        sentTo: email,
        code: otp,
      };

      await validationService.validateOtp(validateOtp);
      setIsOtpValidated(true);

      notifications.update({
        id: "validate-otp",
        message: "OTP validated successfully",
        color: "green",
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });
    } catch (error) {
      notifications.update({
        id: "validate-otp",
        message: "Failed to validate OTP",
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
      {!isOtpSent ? (
        <>
          <TextInput
          w={"35%"}
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            required
          />
          <Button onClick={handleSendOtp}>Send OTP</Button>
        </>
      ) : !isOtpValidated ? (
        <>
          <TextInput
          w={"35%"}
            label="OTP"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(event) => setOtp(event.currentTarget.value)}
            required
          />
          <Button onClick={handleValidateOtp}>Validate OTP</Button>
        </>
      ) : (
        <Text c="green">OTP has been validated successfully!</Text>
      )}
    </Flex>
  );
};

export default ValidationPage;
