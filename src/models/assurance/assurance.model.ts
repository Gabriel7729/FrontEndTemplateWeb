export interface EventRecordRequest {
  documentType: string;
  document: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
  licensePlate: string;
  registration: string;
  address: string;
  injured: number;
  dead: number;
  eventDate: Date;
  photo: string;
  status: string;
  note: string;
}

export interface EventRecordPhotoRequest {
  photo: File;
}
