import { ITicketCreateRespone } from "../repository/ITicketCreateRespone";

export interface ITicketCreateServiceRespone {
  message: string;
  data?: ITicketCreateRespone;
}
