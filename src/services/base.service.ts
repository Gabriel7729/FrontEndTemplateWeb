import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiInstance from "../common/api/httpClient.axios";
import {
  ResponseModel,
  ResponseListModel,
  ResponsePaginatedModel,
} from "../models/base.model";

class BaseService<T> {
  public api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL: apiInstance.defaults.baseURL + baseURL,
    });

    // Setup interceptors
    this.api.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: any): Promise<never> {
    const errorMessage = error.message || "An error occurred";
    const errorObject = new Error(errorMessage);
    return Promise.reject(errorObject);
  }

  public async getPaginated(url: string): Promise<ResponsePaginatedModel<T>> {
    const res = await this.api.get<ResponsePaginatedModel<T>>(url);
    return res.data;
  }

  public async getList(url: string): Promise<ResponseListModel<T>> {
    const res = await this.api.get<ResponseListModel<T>>(url);
    return res.data;
  }

  public async post(url: string, data: any): Promise<ResponseModel<T>> {
    const res = await this.api.post<ResponseModel<T>>(url, data);
    return res.data;
  }

  public async put(url: string, data: any): Promise<ResponseModel<T>> {
    const res = await this.api.put<ResponseModel<T>>(url, data);
    return res.data;
  }

  public async delete(url: string): Promise<ResponseModel<T>> {
    const res = await this.api.delete<ResponseModel<T>>(url);
    return res.data;
  }
}

export default BaseService;
