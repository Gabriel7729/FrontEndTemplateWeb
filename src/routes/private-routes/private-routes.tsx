import { Navigate } from "react-router-dom";
import { Center, Loader } from "@mantine/core";

export const PrivateRoutes = ({ children }: any) => {
  const isLoading = false;
  const loggedUser = true;
  if (isLoading)
    return (
      <Center className="center-div">
        <Loader />
      </Center>
    );

  return loggedUser ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
