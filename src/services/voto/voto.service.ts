import apiInstance from "../../common/axios/httpClient.axios";
import { Voto } from "../../models/voto/voto.model";

class VotoService {
    public async insertVoto(voto: Voto): Promise<any> {
      const res = await apiInstance.post<any>('/Voto', voto);
      return res.data;
    }
  }
  
  export default new VotoService();