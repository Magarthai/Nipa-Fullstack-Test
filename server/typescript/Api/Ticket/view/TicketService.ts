import { ITicketCreateRequest } from "../controller/ITicketCreateRequest";
import { ITicketCloseRequest } from "../repository/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../repository/ITicketSendEmailNotificationRequest";
import { ITicketUpdateRequest } from "../repository/ITicketUpdateRequest";
import { TicketRepository } from "../repository/TicketRepository";
import { ITicketGetTicketByStatusRequest } from "./ITicketGetTicketByStatusRequest";
const nodemailer = require("nodemailer");
const TicketRepositorys = new TicketRepository();
export class TicketService {
  async useGetAllTicket() {
    const data = await TicketRepositorys.getAllTicket;
    return data;
  }
  async useCreateTicket(ticket: ITicketCreateRequest) {
    const data = await TicketRepositorys.createTicket(ticket);
    return { message: "success", data: data };
  }

  async useGetTicketByStatus(status: string) {
    const data = await TicketRepositorys.getTicketByStatus(status);
    return { message: "success", data: data };
  }

  async useGetTicketByRecipient(id: string) {
    const data = await TicketRepositorys.getTicketByRecipient(id);
    return { message: "success", data: data };
  }

  async useUpdateStatusTicket(data: ITicketUpdateRequest) {
    const update = TicketRepositorys.updateStatusTicket(data);
    return update;
  }

  async useCloseTicket(data: ITicketCloseRequest) {
    const update = TicketRepositorys.closeTicket(data);
    return update;
  }

  async useSendEmail(data: ITicketSendEmailNotificationRequest) {
    const sendEmail = TicketRepositorys.sendMailNotification(data);
    return sendEmail;
  }
}
