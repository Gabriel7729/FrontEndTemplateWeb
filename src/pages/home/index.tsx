import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardSection, Container, Group, NumberInput, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import CandidatoService from '../../services/candidato.service';
import VotoService from '../../services/voto.service';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Candidato } from '../../models/candidato/candidato.model';
import { Voto } from '../../models/voto/voto.model';

const Home = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      cedula: '',
      nombre: '',
      apellido: '',
      candidatoVotado: '',
    },
  });

  useEffect(() => {
    const fetchCandidatos = async () => {
      const data = await CandidatoService.getAllCandidatos();
      setCandidatos(data);
    };

    const checkIfVoted = () => {
      const userVoted = document.cookie.split('; ').find(row => row.startsWith('userVoted='))?.split('=')[1];
      setHasVoted(userVoted === 'true');
    };

    fetchCandidatos();
    checkIfVoted();
  }, []);

  const handleSubmit = async (values: Voto) => {
    try {
      notifications.show({
        id: 'create-vote',
        message: 'Submitting your vote...',
        color: 'blue',
        loading: true,
        autoClose: false,
      });

      await VotoService.insertVoto(values);

      notifications.update({
        id: 'create-vote',
        message: 'Vote submitted successfully!',
        color: 'green',
        icon: <IconCheck />,
        loading: false,
        autoClose: true,
      });

      document.cookie = 'userVoted=true; path=/; max-age=31536000; Secure; SameSite=Strict';
      setHasVoted(true);
    } catch (error) {
      notifications.update({
        id: 'create-vote',
        message: 'An error occurred while submitting your vote. Please try again.',
        color: 'red',
        icon: <IconX />,
        loading: false,
        autoClose: true,
      });
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <CardSection style={{ padding: '2rem' }}>
          <Title order={2}>Candidatos y Votos</Title>
          {candidatos.map((candidato) => (
            <Box key={candidato.id} mb="sm">
              <strong>{candidato.nombre}</strong> ({candidato.partido}): {candidato.cantidadVotos} votos
            </Box>
          ))}
        </CardSection>
      </Card>

      {!hasVoted && (
        <Card mt="xl">
          <CardSection style={{ padding: '2rem' }}>
            <Container>
              <Box maw={340} mx="auto">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput
                    mt="md"
                    withAsterisk
                    label="Cedula"
                    placeholder="Enter your cedula"
                    {...form.getInputProps('cedula')}
                  />
                  <TextInput
                    mt="md"
                    withAsterisk
                    label="Nombre"
                    placeholder="Enter your name"
                    {...form.getInputProps('nombre')}
                  />
                  <TextInput
                    mt="md"
                    withAsterisk
                    label="Apellido"
                    placeholder="Enter your last name"
                    {...form.getInputProps('apellido')}
                  />
                  <Select
                    mt="md"
                    withAsterisk
                    label="Candidato Votado"
                    placeholder="Select a candidate"
                    data={candidatos.map((candidato) => ({ value: candidato.nombre, label: candidato.nombre }))}
                    {...form.getInputProps('candidatoVotado')}
                  />
                  <Group mt="md">
                    <Button type="submit">Submit</Button>
                  </Group>
                </form>
              </Box>
            </Container>
          </CardSection>
        </Card>
      )}
    </Container>
  );
};

export default Home;
