import { Service, Inject, Container } from "typedi";
import { ITicketCreateRequest } from "../controller/ITicketCreateRequest";
import { ITicketCloseRequest } from "../repository/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../repository/ITicketSendEmailNotificationRequest";
import { ITicketUpdateRequest } from "../repository/ITicketUpdateRequest";
import { TicketRepository } from "../repository/TicketRepository";
import { ITicketGetTicketByStatusRequest } from "./ITicketGetTicketByStatusRequest";
import { TicketStatus } from "../repository/TicketStatus";
const nodemailer = require("nodemailer");
import db from "../../../db/db";
import { ListTicketDataReturn } from "../repository/ListTicketDataReturn";
@Service()
export class TicketService {
  @Inject()
  private ticketRepositorys: TicketRepository;

  async useListAllTicket() {
    const data = await this.ticketRepositorys.listAllTicket();
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
    const ticketData: any = await this.ticketRepositorys.updateStatusTicket(
      data
    );
    const updateData = {
      status: data.status,
      recipient: 1,
      recipient_name: "test",
    };
    console.log(updateData);
    if (!ticketData) {
      return { message: "Not found" };
    } else {
      console.log(ticketData);
      if (ticketData.recipient == "" || ticketData.recipient == "") {
        const updatedTicket = await db("ticket")
          .where({ id: data.id })
          .update(updateData);
        console.log("test");
        return {
          message: "Success",
        };
      } else {
        return { message: "Already accepted" };
      }
    }
  }

  async useCloseTicket(data: ITicketCloseRequest) {
    const TicketData = await this.ticketRepositorys.closeTicket(data);
    const update = {
      status: data.status,
      solve: data.solve,
    };
    console.log(TicketData);
    if (!TicketData) {
      return { message: "Not found" };
    } else {
      if (TicketData.status === TicketStatus.ACCEPTED) {
        console.log("check");
        const updatedTicket = await db("ticket")
          .where({ id: data.id })
          .update(update);
        return {
          message: "Success",
          ticket: updatedTicket,
        };
      } else {
        return { message: "Already closed" };
      }
    }
  }

  async useSendEmail(data: ITicketSendEmailNotificationRequest) {
    const sendEmail = await this.ticketRepositorys.sendMailNotification(data);
    return sendEmail;
  }
}
