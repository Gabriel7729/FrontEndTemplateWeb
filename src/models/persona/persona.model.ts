export interface PersonaResponseDto {
    documento: string;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    estado: string;
}

export interface BuscadoResponseDto {
    faceId: string;
    externalImageId: string;
    confidence: string;
}