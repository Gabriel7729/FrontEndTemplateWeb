import apiInstance from "../../common/api/httpClient.axios";
import { ResponseModel } from "../../models/base.model";
import {
  VehiculoDto,
  VehiculoEventoDto,
  VehiculoEventoResponseDto,
  VehiculoResponseDto,
} from "../../models/vehiculo/vehiculo.model";

class VehiculoService {
  public async create(
    request: VehiculoDto
  ): Promise<ResponseModel<VehiculoResponseDto>> {
    const res = await apiInstance.post<ResponseModel<VehiculoResponseDto>>(
      `/Vehiculos`,
      request
    );
    return res.data;
  }

  public async getById(
    vehiculoId: string
  ): Promise<ResponseModel<VehiculoResponseDto>> {
    const res = await apiInstance.get<ResponseModel<VehiculoResponseDto>>(
      `/Vehiculos/${vehiculoId}`
    );
    return res.data;
  }

  public async addEvent(
    request: VehiculoEventoDto
  ): Promise<ResponseModel<VehiculoEventoResponseDto>> {
    const res = await apiInstance.post<ResponseModel<VehiculoEventoResponseDto>>(
      `/Vehiculos/Eventos`,
      request
    );
    return res.data;
  }

  public async downloadReport(
    vehiculoId: string
  ): Promise<Blob> {
    const res = await apiInstance.post<Blob>(
      `/Vehiculos/${vehiculoId}/Carfax/Report`,
        {},
        {
            responseType: "blob",
        }
    );
    return res.data;
  }
}

export default new VehiculoService();
