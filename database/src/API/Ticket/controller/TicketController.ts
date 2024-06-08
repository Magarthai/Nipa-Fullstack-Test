import { response } from "express";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Res,
  Req,
  CookieParam,
} from "routing-controllers";

import { ITicketCreateRequest } from "./ITicketCreateRequest";
import { TicketService } from "../view/TicketService";
import { ITicketUpdateRequest } from "../repository/ITicketUpdateRequest";
import { ITicketCloseRequest } from "../repository/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../repository/ITicketSendEmailNotificationRequest";
import Container, { Inject, Service } from "typedi";

@JsonController("/tickets")
export class TicketController {
  ticketService = Container.get(TicketService);

  @Get("/")
  async listAllTicket() {
    const data = await this.ticketService.useListAllTicket();
    console.log("test");
    return {
      message: "Ticket fetch successfully",
      ticket: data,
    };
  }

  @Post("/")
  async createTicket(@Body() ticket: ITicketCreateRequest) {
    const create = await this.ticketService.useCreateTicket(ticket);
    if (create.data) {
      return { message: "Ticket created successfully" };
    } else {
      return "something went wrong";
    }
  }

  @Get("/status/:status")
  async getTicketByStatus(@Param("status") status: string) {
    console.log(status);
    const fetchTicketByStatus = await this.ticketService.useGetTicketByStatus(
      status
    );
    return {
      message: "Ticket fetch successfully",
      ticket: fetchTicketByStatus,
    };
  }

  @Get("/:id")
  async getTicketByRecipient(@Param("id") id: string) {
    const fetchTicketById = await this.ticketService.useGetTicketByRecipient(
      id
    );
    return {
      message: "Ticket fetch successfully",
      ticket: fetchTicketById,
    };
  }

  @Put("/:id")
  async updateStatus(
    @Body() ticket: ITicketUpdateRequest,
    @Param("id") id: string
  ) {
    const update: ITicketUpdateRequest = {
      status: ticket.updateStatus,
      recipient: ticket.recipientId,
      recipient_name: ticket.recipient,
      id: id,
    } as ITicketUpdateRequest;
    const updateStatus = await this.ticketService.useUpdateStatusTicket(update);
    if (updateStatus.message == "Not found") {
      return response.status(404).send({ error: "Ticket not found" });
    } else if (updateStatus.message == "Success") {
      return {
        message: "Ticket updated successfully",
      };
    } else {
      return { message: "Already accepted" };
    }
  }

  @Put("/close/:id")
  async close(@Body() ticket: ITicketCloseRequest, @Param("id") id: string) {
    const update: ITicketCloseRequest = {
      status: ticket.updateStatus,
      solve: ticket.solve,
      id: id,
    } as ITicketCloseRequest;
    const closeTicket = await this.ticketService.useCloseTicket(update);

    if (closeTicket.message == "Not found") {
      return { error: "Ticket not found" };
    } else if (closeTicket.message == "Success") {
      return {
        message: "Ticket updated successfully",
        ticket: closeTicket.ticket,
      };
    } else {
      return { message: "Already closed" };
    }
  }

  @Post("/sendemail")
  async sendMailNotification(
    @Body() ticket: ITicketSendEmailNotificationRequest
  ) {
    const sendemail = await this.ticketService.useSendEmail(ticket);
    return sendemail;
  }
}
