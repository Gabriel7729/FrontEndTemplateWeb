import apiInstance from "../../common/api/httpClient.axios";
import { PersonaResponseDto } from "../../models/persona/persona.model";

class PersonaService {
    public async createPersonByCedula(
      cedula: File
    ): Promise<PersonaResponseDto> {
        const formData = new FormData();
        formData.append("file", cedula);
      const res = await apiInstance.post<PersonaResponseDto>(
        `/Amazon/Rekognition/Cedula/Data`,
        formData,
          {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
          }
      );
      return res.data;
    }
  }
  
  export default new PersonaService();
  