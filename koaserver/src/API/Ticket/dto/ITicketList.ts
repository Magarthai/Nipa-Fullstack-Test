export interface ITicketList {
  id: number;
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  created_at: Date;
  recipient: string | null;
  recipient_name: string | null;
  updated_at: Date;
  solve: string;
  status: string;
}
