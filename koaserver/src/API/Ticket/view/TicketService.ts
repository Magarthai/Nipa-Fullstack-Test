import { Service, Inject } from "typedi";
import { ITicketCreateRequest } from "../dto/ITicketCreateRequest";
import { ITicketCloseRequest } from "../dto/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../dto/ITicketSendEmailNotificationRequest";
import {
  ITicketUpdateRequest,
  GenericResponse,
} from "../dto/ITicketUpdateRequest";
import { TicketRepository } from "../repository/TicketRepository";
import { ITicketGetTicketByStatusRequest } from "../dto/ITicketGetTicketByStatusRequest";
import { TicketStatus } from "../enum/TicketStatus";
import { ITicketList } from "../dto/ITicketList";
import { ITicketEntity } from "@app/API/Dashboard/dto/ITicketEntity";
import { TicketNotFoundError } from "@app/error/TicketNotFound";
import { SendEmailDefination } from "../adapter/SendEmailAdapter";
import { ICloseTicketById } from "../dto/ICloseTicketById";
import { IMessage } from "../dto/IMessage";
import { ITicketCreateServiceRespone } from "../dto/ITicketCreateServiceRespone";
import { TicketUpdateStatus } from "../enum/TicketUpdateStatus";
import { ISendMailRespone } from "../dto/ISendMailRespone";
import { TicketStatusError } from "@app/error/TicketStatusError";
@Service()
export class TicketService {
  @Inject()
  private ticketRepositorys: TicketRepository;

  @Inject()
  private sendEmailDefination: SendEmailDefination;

  async useListAllTicket(): Promise<ITicketList[]> {
    const data = await this.ticketRepositorys.listAllTicket();
    return data;
  }
  async createTicket(
    ticket: ITicketCreateRequest
  ): Promise<ITicketCreateServiceRespone> {
    const data = await this.ticketRepositorys.createTicket(ticket);
    const sendEmail =
      await this.sendEmailDefination.sendCreateTicketNotification(ticket);
    return { message: "success", data: data };
  }

  async listTicketByStatus(
    status: string
  ): Promise<GenericResponse<ITicketGetTicketByStatusRequest[]>> {
    const listStatus = [
      TicketStatus.ACCEPTED,
      TicketStatus.PENDING,
      TicketStatus.REJECT,
      TicketStatus.SUCCESS,
    ];
    const check = listStatus.find((list) => list == status);
    if (!check) {
      throw new TicketStatusError();
    }
    const data = await this.ticketRepositorys.listTicketByStatus(status);

    return { message: "success", data: data };
  }

  async getTicketById(ticketId: number): Promise<ITicketEntity> {
    const result = await this.ticketRepositorys.findTicketByID(ticketId);
    if (!result) {
      throw new TicketNotFoundError();
    }
    return result;
  }

  async updateStatusTicket(
    ticketId: number,
    data: ITicketUpdateRequest
  ): Promise<IMessage> {
    const ticketData = await this.getTicketById(ticketId);
    if (ticketData.recipient != null || ticketData.recipient_name != null) {
      return { message: "Already accepted" };
    }

    await this.ticketRepositorys.updateStatusTicket(data);

    return {
      message: "Success",
    };
  }

  async closeTicketById(
    id: number,
    closingTicket: {
      data: ITicketCloseRequest;
    }
  ): Promise<ICloseTicketById> {
    const { data } = closingTicket;
    const TicketData = await this.ticketRepositorys.findTicketByID(id);
    if (!TicketData) {
      return { message: TicketUpdateStatus.NOT_FOUND };
    }
    const update = {
      status: data.status,
      solve: data.solve,
    };
    if (TicketData.status != TicketStatus.ACCEPTED) {
      return { message: TicketUpdateStatus.ALREADY_CLOSE };
    }
    const updatedTicket = await this.ticketRepositorys.updateTicketById(
      data.id,
      update
    );
    return {
      message: TicketUpdateStatus.SUCCESS,
      ticket: updatedTicket,
    };
  }

  async useSendEmail(
    data: ITicketSendEmailNotificationRequest
  ): Promise<ISendMailRespone> {
    const sendEmail =
      await this.sendEmailDefination.sendUpdateEmailNotification(data);

    return sendEmail;
  }
}
