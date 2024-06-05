export interface PersonaDto {
  tipoDocumento: string;
  documento: string;
  nombres: string;
  apellidos: string;
  birthDate: Date;
  sexo: string;
  felicidadAcumulada: number;
}

export interface PersonaEventoDto {
  tipo: string;
  descripcion: string;
  fechaInicio: Date;
  duracion: number;
  estado: string;
  personaId: string;
}

export interface PersonaResponseDto {
  id: string;
  tipoDocumento: string;
  documento: string;
  nombres: string;
  apellidos: string;
  birthDate: Date;
  sexo: string;
  felicidadAcumulada: number;
  createdDate: Date;
  eventos: PersonaEventoResponseDto[];
}

export interface PersonaEventoResponseDto {
  id: string;
  tipo: string;
  descripcion: string;
  fechaInicio: Date;
  duracion: number;
  estado: string;
  personaId: string;
  createdDate: Date;
}
