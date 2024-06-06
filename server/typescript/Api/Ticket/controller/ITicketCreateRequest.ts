export interface ITicketCreateRequest {
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  createdAt: Date;
}
