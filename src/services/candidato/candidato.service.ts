import apiInstance from "../../common/axios/httpClient.axios";
import { Candidato } from "../../models/candidato/candidato.model";

class CandidatoService {
  public async insertCandidato(candidato: Candidato): Promise<any> {
    const res = await apiInstance.post<any>("/Candidato", candidato);
    return res.data;
  }

  public async getAllCandidatos(): Promise<Candidato[]> {
    const res = await apiInstance.get<Candidato[]>("/Candidato");
    return res.data;
  }
}

export default new CandidatoService();
