export interface ITicketCreateRequest {
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  created_at: Date;
  status: string;
  file: string;
}
