export interface ITicketCreateRespone {
  id: number;
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  status: string;
  file: string;
  created_at: Date;
  updated_at: Date;
  createdAt: Date;
}
