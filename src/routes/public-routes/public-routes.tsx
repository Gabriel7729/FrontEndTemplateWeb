import { Navigate } from "react-router-dom";
import { Center, Loader } from "@mantine/core";
export const PublicRoutes = ({ children }: any) => {
  
  const isLoading = false;
  const loggedUser = false;
  if (isLoading)
    return (
      <Center className="center-div">
        <Loader />
      </Center>
    );

  return !loggedUser ? children : <Navigate to="/" />;
};

export default PublicRoutes;
