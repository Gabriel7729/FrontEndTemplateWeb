import apiInstance from "../../common/api/httpClient.axios";
import { TravelDto } from "../../models/travel/travel.model";

class TravelService {
  public async create(travel: TravelDto): Promise<any> {
    const res = await apiInstance.post<any>(`/Travel`, travel);
    return res.data;
  }

  public async downloadReport(travelId: string): Promise<Blob> {
    const res = await apiInstance.post<Blob>(
      `/Travel/${travelId}/Receipt`,
      {},
      {
        responseType: "blob",
      }
    );
    return res.data;
  }
}

export default new TravelService();
