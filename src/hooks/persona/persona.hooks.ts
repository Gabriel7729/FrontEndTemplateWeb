import useSWR from "swr";
import { ResponsePaginatedModel } from "../../models/base.model";
import { fetcher } from "../../common/api/fetcher.swr";
import { PersonaResponseDto } from "../../models/persona/persona.model";

export const usePersonaPaginated = (
  pageNumner: number = 1,
  pageSize: number = 10
) => {
  const { data, error, mutate } = useSWR<ResponsePaginatedModel<PersonaResponseDto>>(
    `/Persona/Paginated?pageNumber=${pageNumner}&pageSize=${pageSize}`,
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