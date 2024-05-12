import { Card, CardSection, Text } from "@mantine/core";

export const Home = () => {
  return (
    <div >
      <Card style={{ height: 'calc(100vh - 97px)'}}>
        <CardSection style={{padding: "2rem"}}><Text size="15px">Bienvenido a PacaStock</Text></CardSection>
      </Card>
    </div>
  );
};

export default Home;
