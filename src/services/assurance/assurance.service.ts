import apiInstance from "../../common/axios/httpClient.axios";
import {
  EventRecordPhotoRequest,
  EventRecordRequest,
} from "../../models/assurance/assurance.model";

class AssuranceService {
  public async insertEventRecord(
    eventRecordRequest: EventRecordRequest
  ): Promise<any> {
    const res = await apiInstance.post<any>(`/EventRecord`, eventRecordRequest);
    return res.data;
  }

  public async uploadPhoto(
    eventRecordPhotoRequest: EventRecordPhotoRequest
  ): Promise<any> {
    const formData = new FormData();
    formData.append("photo", eventRecordPhotoRequest.photo);
    const res = await apiInstance.post<any>(
      `/EventRecord/uploadphoto`,
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

export default new AssuranceService();
