import apiInstance from "../../common/api/httpClient.axios";
import { ResponseModel } from "../../models/base.model";
import { PersonaDto, PersonaResponseDto, PersonaEventoDto, PersonaEventoResponseDto } from "../../models/persona/persona.model";

class PersonaService {
  public async create(
    request: PersonaDto
  ): Promise<ResponseModel<PersonaResponseDto>> {
    const res = await apiInstance.post<ResponseModel<PersonaResponseDto>>(
      `/Persona`,
      request
    );
    return res.data;
  }

  public async getById(
    personaId: string
  ): Promise<ResponseModel<PersonaResponseDto>> {
    const res = await apiInstance.get<ResponseModel<PersonaResponseDto>>(
      `/Persona/${personaId}`
    );
    return res.data;
  }

  public async addEvent(
    request: PersonaEventoDto
  ): Promise<ResponseModel<PersonaEventoResponseDto>> {
    const res = await apiInstance.post<ResponseModel<PersonaEventoResponseDto>>(
      `/Persona/Evento`,
      request
    );
    return res.data;
  }

  public async downloadReport(
    personaId: string
  ): Promise<Blob> {
    const res = await apiInstance.post<Blob>(
      `/Persona/${personaId}/Felicidad/Report`,
        {},
        {
            responseType: "blob",
        }
    );
    return res.data;
  }
}

export default new PersonaService();
