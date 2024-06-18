import { response } from "express";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  JsonController,
} from "routing-controllers";

import { ITicketCreateRequest } from "../dto/ITicketCreateRequest";
import { TicketService } from "../view/TicketService";
import { ITicketUpdateRequest } from "../dto/ITicketUpdateRequest";
import { ITicketCloseRequest } from "../dto/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../dto/ITicketSendEmailNotificationRequest";
import { Inject, Service } from "typedi";
import { TicketNotFoundError } from "@app/error/TicketNotFound";
import { ITicketList } from "../dto/ITicketList";
import { ITicketGetTicketByStatusRequest } from "../dto/ITicketGetTicketByStatusRequest";
import { ICloseTicketById } from "../dto/ICloseTicketById";
import { IMessage } from "../dto/IMessage";
import { GenericGetTicketResponse } from "../dto/GenericGetTicketResponse";
import { TicketUpdateStatus } from "../enum/TicketUpdateStatus";
import { ISendMailRespone } from "../dto/ISendMailRespone";

@Service()
@JsonController("/tickets")
export class TicketController {
  @Inject()
  private ticketService: TicketService;

  @Get("/")
  async listAllTicket(): Promise<GenericGetTicketResponse<ITicketList[]>> {
    const data = await this.ticketService.useListAllTicket();
    return {
      message: "Ticket fetch successfully",
      ticket: data,
    };
  }

  @Post("/")
  async createTicket(@Body() ticket: ITicketCreateRequest): Promise<IMessage> {
    const create = await this.ticketService.createTicket(ticket);
    if (!create.data) {
      throw new TicketNotFoundError("Ticket not found !");
    }
    return { message: "Ticket created successfully" };
  }

  @Get("/status/:status")
  async getTicketByStatus(
    @Param("status") status: string
  ): Promise<GenericGetTicketResponse<ITicketGetTicketByStatusRequest[]>> {
    const fetchTicketByStatus = await this.ticketService.listTicketByStatus(
      status
    );
    return {
      message: "Ticket fetch successfully",
      ticket: fetchTicketByStatus.data,
    };
  }

  @Put("/:id")
  async updateStatus(
    @Body() ticket: ITicketUpdateRequest,
    @Param("id") id: number
  ): Promise<IMessage> {
    const update: ITicketUpdateRequest = {
      status: ticket.updateStatus,
      recipient: ticket.recipient,
      recipient_name: ticket.recipient_name,
      id: id,
    } as ITicketUpdateRequest;
    const updateStatus = await this.ticketService.updateStatusTicket(
      id,
      update
    );
    if (updateStatus.message == TicketUpdateStatus.NOT_FOUND) {
      throw new TicketNotFoundError("Ticket not found !");
    }
    if (updateStatus.message == TicketUpdateStatus.SUCCESS) {
      return {
        message: "Ticket updated successfully",
      };
    }
    return { message: "Already accepted" };
  }

  @Put("/close/:id")
  async close(
    @Body() ticket: ITicketCloseRequest,
    @Param("id") id: number
  ): Promise<ICloseTicketById> {
    const update: ITicketCloseRequest = {
      status: ticket.updateStatus,
      solve: ticket.solve,
      id: id,
    } as ITicketCloseRequest;
    console.log(update);
    const closeTicket = await this.ticketService.closeTicketById(id, {
      data: update,
    });

    if (closeTicket.message == TicketUpdateStatus.NOT_FOUND) {
      throw new TicketNotFoundError("Ticket not found !");
    }
    if (closeTicket.message == TicketUpdateStatus.SUCCESS) {
      return {
        message: "Ticket updated successfully",
        ticket: closeTicket.ticket,
      };
    }
    return { message: "Already closed" };
  }

  @Post("/sendemail")
  async sendMailNotification(
    @Body() ticket: ITicketSendEmailNotificationRequest
  ): Promise<ISendMailRespone> {
    const sendemail = await this.ticketService.useSendEmail(ticket);
    return sendemail;
  }
}
