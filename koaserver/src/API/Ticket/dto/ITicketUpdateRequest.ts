export interface ITicketUpdateRequest {
  id?: string;
  status: string;
  recipient: string;
  recipient_name: string;
  updateStatus: string;
  recipientId: string;
}

export interface GenericResponse<T> {
  message: string;
  data: T;
}
