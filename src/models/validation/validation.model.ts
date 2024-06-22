export interface SendOtpDto {
    sentTo: string;
}

export interface SendEmailWithAttachmentRequest {
    email: string;
}

export interface ValidateOtpDto {
    sentTo: string;
    code: string;
}