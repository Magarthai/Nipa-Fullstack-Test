export interface ITicketEntity {
  id: number;
  name: string;
  email: string;
  detail: string;
  selectTopic: string;
  img: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  recipient: string;
  recipient_name: string;
  solve: string;
  count?: string;
}
