export interface ITicketList {
  id: number;
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  created_at: Date;
  recipient: string;
  recipient_name: string;
  updated_at: Date;
  status: string;
}
