import { error } from "console";
import { response } from "express";
import { ObjectId } from "mongodb";
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
const Tickets = require("../../models/Ticket.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
export interface ITicket {
  name: string | undefined;
  detail: string | undefined;
  email: string | undefined;
  selectTopic: string | undefined;
  img: string | undefined;
  status: string | undefined;
  solve: number | undefined;
  recipient: number | undefined;
  recipient_name: number | undefined;
  recipientId: string | undefined;
  updateStatus: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

@JsonController()
export class TicketController {
  @Get("/tickets")
  async getAllTicket(@Body() ticket: ITicket, @Res() response: any) {
    try {
      const fetchTicket = await Tickets.find().sort({ updatedAt: -1 });
      return response.send({
        message: "Ticket fetch successfully",
        ticket: fetchTicket,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get("/tickets/status/:status")
  async getTicketByStatus(
    @Param("status") status: string,
    @Res() response: any
  ) {
    try {
      console.log(status);
      const fetchTicketByStatus = await Tickets.find({ status: status }).sort({
        updatedAt: -1,
      });
      console.log(fetchTicketByStatus);
      return response.send({
        message: "Ticket fetch successfully",
        ticket: fetchTicketByStatus,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get("/tickets/:id")
  async getTicketByRecipient(@Param("id") id: string, @Res() response: any) {
    try {
      const fetchTicketById = await Tickets.find({ recipient: id }).sort({
        updatedAt: -1,
      });
      return response.send({
        message: "Ticket fetch successfully",
        ticket: fetchTicketById,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Post("/tickets")
  async store(@Body() ticket: ITicket, @Res() response: any) {
    try {
      console.log(ticket);
      const createTicket = await Tickets.create(ticket);
      console.log(createTicket);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kmutthealthcareunit@gmail.com",
          pass: "vqos ixxk pscf bqwm",
        },
      });
      const time = new Date(ticket.createdAt).toLocaleString();
      const option = {
        from: "kmutthealthcareunit@gmail.com",
        to: `${ticket.email}`,
        subject: `[ได้รับเรื่องแล้ว]`,
        html: `
            
            <img style="width: 300px;" src="https://th.bing.com/th/id/OIP.gtRCd_V8FQmHtwdpYB2XSwHaGP?rs=1&pid=ImgDetMain" alt="">
            <h1 style="margin: 20px;">สวัสดีคุณ ${ticket.name} ขอบคุณที่แจ้งเรื่องเข้ามา</h1>
            <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${ticket.selectTopic}</p>
            <p style="margin-left: 20px">วันที่แจ้ง : ${time}</p>
            <p style="margin-left: 20px">รายละเอียด : ${ticket.detail}</p>
            `,
      };

      transporter.sendMail(
        option,
        (err: string, info: { response: string }) => {
          if (err) {
            console.log("err", err);
            return response.status(200).json({
              RespCode: 400,
              RespMessage: "bad",
              RespError: err,
            });
          } else {
            console.log("Send: " + info.response);
            return response.status(200).json({
              RespCode: 200,
              RespMessage: "good",
            });
          }
        }
      );

      return response.send({
        message: "Ticket created successfully",
        ticket: ticket,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put("/tickets/:id")
  async update(
    @Body() ticket: ITicket,
    @Param("id") id: string,
    @Res() response: any
  ) {
    try {
      const update = {
        status: ticket.updateStatus,
        recipient: ticket.recipientId,
        recipient_name: ticket.recipient,
      };
      console.log(update);
      const filter = { _id: new ObjectId(id) };
      console.log(id);
      const fetchTicket = await Tickets.findOne(filter);
      console.log(fetchTicket);
      if (!fetchTicket) {
        console.log("test3");
        return response.status(404).send({ error: "Ticket not found" });
      }

      if (
        fetchTicket.recipient === undefined ||
        fetchTicket.recipient === null
      ) {
        const updatedTicket: ITicket = await Tickets.updateOne(filter, update);
        console.log(updatedTicket);
        return response.send({
          message: "Ticket updated successfully",
          ticket: updatedTicket,
        });
      } else {
        console.log("test");
        return response.send({ message: "Already accepted" });
      }
    } catch (err) {
      return err;
    }
  }

  @Put("/tickets/close/:id")
  async close(
    @Body() ticket: ITicket,
    @Param("id") id: string,
    @Res() response: any
  ) {
    try {
      const filter = { _id: new ObjectId(id) };

      const update = {
        status: ticket.updateStatus,
        solve: ticket.solve,
      };
      const fetchTicket = await Tickets.findOne(filter);

      if (!fetchTicket) {
        return response.status(404).send({ error: "Ticket not found" });
      }

      if (fetchTicket.status === "accepted") {
        const updatedTicket = await Tickets.updateOne(filter, update);
        return response.send({
          message: "Ticket updated successfully",
          ticket: updatedTicket,
        });
      } else {
        return response.send({ message: "Already closed" });
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
      return response.status(500).send({ error: "Failed to update ticket" });
    }
  }
}
