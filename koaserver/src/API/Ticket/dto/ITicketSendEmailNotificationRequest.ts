export interface ITicketSendEmailNotificationRequest {
  email: string;
  status: string;
  name: string;
  topic: string;
  time: string;
  recipient: string;
  solve: string;
  created_at: Date;
  selectTopic: string;
  detail: string;
}