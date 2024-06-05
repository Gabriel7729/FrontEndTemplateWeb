export interface VehiculoDto {
    matricula: string;
    marca: string;
    modelo: string;
    anio: string;
    cantidadMillas: string;
    motor: string;
    cantidadPasajeros: string;
}

export interface VehiculoResponseDto {
    id: string;
    matricula: string;
    marca: string;
    modelo: string;
    anio: string;
    cantidadMillas: string;
    motor: string;
    cantidadPasajeros: string;
    createdDate: Date;
    eventos: VehiculoEventoResponseDto[];
}

export interface VehiculoEventoDto {
    tipo: string;
    descripcion: string;
    estado: string;
    vehiculoId: string;
}

export interface VehiculoEventoResponseDto {
    id: string;
    tipo: string;
    descripcion: string;
    estado: string;
    vehiculoId: string;
}