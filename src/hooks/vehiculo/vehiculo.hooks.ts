import useSWR from "swr";
import { ResponsePaginatedModel } from "../../models/base.model";
import { VehiculoResponseDto } from "../../models/vehiculo/vehiculo.model";
import { fetcher } from "../../common/api/fetcher.swr";

export const useVehiculosPaginated = (
  pageNumner: number = 1,
  pageSize: number = 10
) => {
  const { data, error, mutate } = useSWR<ResponsePaginatedModel<VehiculoResponseDto>>(
    `/Vehiculos/Paginated?pageNumber=${pageNumner}&pageSize=${pageSize}`,
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  return {
    data,
    mutate,
    isLoading: !error && !data,
    error,
  };
};