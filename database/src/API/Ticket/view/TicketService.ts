import { ITicketCreateRequest } from "../controller/ITicketCreateRequest";
import { ITicketCloseRequest } from "../repository/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../repository/ITicketSendEmailNotificationRequest";
import { ITicketUpdateRequest } from "../repository/ITicketUpdateRequest";
import { TicketRepository } from "../repository/TicketRepository";
import { ITicketGetTicketByStatusRequest } from "./ITicketGetTicketByStatusRequest";
const nodemailer = require("nodemailer");

export class TicketService {
  ticketRepositorys: TicketRepository;
  constructor() {
    this.ticketRepositorys = new TicketRepository();
  }
  async useGetAllTicket() {
    const data = await this.ticketRepositorys.getAllTicket();
    return data;
  }
  async useCreateTicket(ticket: ITicketCreateRequest) {
    const data = await this.ticketRepositorys.createTicket(ticket);
    return { message: "success", data: data };
  }

  async useGetTicketByStatus(status: string) {
    const data = await this.ticketRepositorys.getTicketByStatus(status);
    return { message: "success", data: data };
  }

  async useGetTicketByRecipient(id: string) {
    const data = await this.ticketRepositorys.getTicketByRecipient(id);
    return { message: "success", data: data };
  }

  async useUpdateStatusTicket(data: ITicketUpdateRequest) {
    const update = await this.ticketRepositorys.updateStatusTicket(data);
    return update;
  }

  async useCloseTicket(data: ITicketCloseRequest) {
    const update = await this.ticketRepositorys.closeTicket(data);
    return update;
  }

  async useSendEmail(data: ITicketSendEmailNotificationRequest) {
    const sendEmail = await this.ticketRepositorys.sendMailNotification(data);
    return sendEmail;
  }
}
