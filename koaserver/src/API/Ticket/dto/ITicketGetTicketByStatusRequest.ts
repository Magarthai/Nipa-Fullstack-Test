export interface ITicketGetTicketByStatusRequest {
  id: number;
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  recipient: string;
  recipient_name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
