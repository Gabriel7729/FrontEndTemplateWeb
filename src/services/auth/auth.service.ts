import apiInstance from "../../common/api/httpClient.axios";
import { LoginRequest, LoginResponse } from "../../models/auth/auth.model";
import { ResponseModel } from "../../models/base.model";

class AuthService {
  public async login(
    loginRequest: LoginRequest
  ): Promise<ResponseModel<LoginResponse>> {
    const res = await apiInstance.post<ResponseModel<LoginResponse>>(
      `/Auth/Login`,
      loginRequest
    );
    return res.data;
  }
}

export default new AuthService();
