import apiInstance from "../../common/api/httpClient.axios";
import { GeneralResponse } from "../../models/base.model";
import { SendEmailWithAttachmentRequest, SendOtpDto, ValidateOtpDto } from "../../models/validation/validation.model";

class ValidationService {
    public async sendOtp(
      request: SendOtpDto
    ): Promise<GeneralResponse> {
      const res = await apiInstance.post<GeneralResponse>(
        `/api/Validation/Otp/Send`,
        request
      );
      return res.data;
    }

    public async validateOtp(
        request: ValidateOtpDto
      ): Promise<GeneralResponse> {
        const res = await apiInstance.post<GeneralResponse>(
          `/api/Validation/Otp/Validate`,
          request
        );
        return res.data;
      }

      public async sendEmailWithAttachments(
        request: SendEmailWithAttachmentRequest
      ): Promise<GeneralResponse> {
        const res = await apiInstance.post<GeneralResponse>(
          `/api/Send/Email`,
          request
        );
        return res.data;
      }
  } 
  
  export default new ValidationService();
  