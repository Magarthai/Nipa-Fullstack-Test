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
import { ObjectId } from "mongodb";
import { ITicketCloseRequest } from "../repository/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../repository/ITicketSendEmailNotificationRequest";

@JsonController("/tickets")
export class TicketController {
  ticketService: TicketService;
  constructor() {
    this.ticketService = new TicketService();
  }
  @Get("/")
  async getAllTicket(@Res() response: any) {
    try {
      const data = await this.ticketService.useGetAllTicket();
      console.log("test");
      return response.send({
        message: "Ticket fetch successfully",
        ticket: data,
      });
    } catch (err) {
      throw err;
    }
  }

  @Post("/")
  async createTicket(@Body() ticket: ITicketCreateRequest) {
    try {
      const create = await this.ticketService.useCreateTicket(ticket);
      if (create.data) {
        return response.send(create.data);
      } else {
        return response.send("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  }

  @Get("/status/:status")
  async getTicketByStatus(
    @Param("status") status: string,
    @Res() response: any
  ) {
    try {
      console.log(status);
      const fetchTicketByStatus = await this.ticketService.useGetTicketByStatus(
        status
      );
      return response.send({
        message: "Ticket fetch successfully",
        ticket: fetchTicketByStatus,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get("/:id")
  async getTicketByRecipient(@Param("id") id: string, @Res() response: any) {
    try {
      const fetchTicketById = await this.ticketService.useGetTicketByRecipient(
        id
      );
      return response.send({
        message: "Ticket fetch successfully",
        ticket: fetchTicketById,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put("/:id")
  async update(
    @Body() ticket: ITicketUpdateRequest,
    @Param("id") id: string,
    @Res() response: any
  ) {
    try {
      const update: ITicketUpdateRequest = {
        status: ticket.updateStatus,
        recipient: ticket.recipientId,
        recipient_name: ticket.recipient,
        id: id,
      } as ITicketUpdateRequest;
      const updateStatus = await this.ticketService.useUpdateStatusTicket(
        update
      );
      if (updateStatus.message == "Not found") {
        return response.status(404).send({ error: "Ticket not found" });
      } else if (updateStatus.message == "Success") {
        return response.send({
          message: "Ticket updated successfully",
          ticket: updateStatus.ticket,
        });
      } else {
        return response.send({ message: "Already accepted" });
      }
    } catch (err) {
      throw err;
    }
  }

  @Put("/close/:id")
  async close(
    @Body() ticket: ITicketCloseRequest,
    @Param("id") id: string,
    @Res() response: any
  ) {
    try {
      const filter = { _id: new ObjectId(id) };

      const update: ITicketCloseRequest = {
        status: ticket.updateStatus,
        solve: ticket.solve,
        id: id,
      } as ITicketCloseRequest;
      const closeTicket = await this.ticketService.useCloseTicket(update);

      if (closeTicket.message == "Not found") {
        return response.status(404).send({ error: "Ticket not found" });
      } else if (closeTicket.message == "Success") {
        return response.send({
          message: "Ticket updated successfully",
          ticket: closeTicket.ticket,
        });
      } else {
        return response.send({ message: "Already closed" });
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
      return response.status(500).send({ error: "Failed to update ticket" });
    }
  }

  @Post("/sendemail")
  async sendMailNotification(
    @Body() ticket: ITicketSendEmailNotificationRequest,
    @Res() response: any
  ) {
    try {
      const closeTicket = await this.ticketService.useSendEmail(ticket);
      return response.status.closeTicket;
    } catch (err) {
      console.error("Error updating ticket:", err);
      return response.status(500).send({ error: "Failed to update ticket" });
    }
  }
}
