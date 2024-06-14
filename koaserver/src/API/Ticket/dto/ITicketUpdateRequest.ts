export interface ITicketUpdateRequest {
  id?: number;
  status: string;
  recipient: string;
  recipient_name: string;
  solve: string;
  updateStatus?: string;
}

export interface GenericResponse<T> {
  message: string;
  data: T;
}
