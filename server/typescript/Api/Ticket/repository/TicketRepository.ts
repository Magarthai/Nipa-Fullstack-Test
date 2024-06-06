import { stat } from "fs";
import { ITicketCreateRequest } from "../controller/ITicketCreateRequest";
import { ITicketUpdateRequest } from "./ITicketUpdateRequest";
import { ITicketCloseRequest } from "./ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "./ITicketSendEmailNotificationRequest";
import { ObjectId } from "mongodb";
const nodemailer = require("nodemailer");
const Ticket = require("../../../../models/Ticket.model");

export class TicketRepository {
  async getAllTicket() {
    try {
      const data = await Ticket.find().sort({ updatedAt: -1 });
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getTicketByStatus(status: string) {
    try {
      const data = await Ticket.find({ status: status }).sort({
        updatedAt: -1,
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getTicketByRecipient(id: string) {
    try {
      const data = await Ticket.find({ recipient: id }).sort({
        updatedAt: -1,
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateStatusTicket(data: ITicketUpdateRequest) {
    try {
      const filter = { _id: new ObjectId(data.id) };
      const updateData = {
        status: data.status,
        recipient: data.recipient,
        recipient_name: data.recipient,
      };

      const ticketData = await Ticket.findOne(filter);

      if (!ticketData) {
        return { message: "Not found" };
      } else {
        if (
          ticketData.recipient === undefined ||
          ticketData.recipient === null
        ) {
          const updatedTicket = await Ticket.updateOne(filter, updateData);
          return {
            message: "Success",
            ticket: updatedTicket,
          };
        } else {
          return { message: "Already accepted" };
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async closeTicket(data: ITicketCloseRequest) {
    try {
      const filter = { _id: data.id };
      const update = {
        status: data.status,
        solve: data.solve,
      };

      const ticketData = await Ticket.findOne(filter);

      if (!ticketData) {
        return { message: "Not found" };
      } else {
        if (ticketData.status === "accepted") {
          const updatedTicket = await Ticket.updateOne(filter, update);
          return {
            message: "Success",
            ticket: updatedTicket,
          };
        } else {
          return { message: "Already closed" };
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async sendMailNotification(data: ITicketSendEmailNotificationRequest) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NOTIFICATION,
        pass: process.env.PASS_NOTIFICATION,
      },
    });
    const option = {
      from: "nipafullstacktest@gmail.com",
      to: `${data.email}`,
      subject: `[ปัญหาของคุณที่แจ้งเข้ามา ${data.status}]`,
      html: `
      
      <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
      <h1 style="margin: 20px;">สวัสดีคุณ ${data.name}</h1>
      <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${data.topic}</p>
      <p style="margin-left: 20px">วันที่แจ้ง : ${data.time}</p>
      <p style="margin-left: 20px">ผู้ที่รับเรื่อง : ${data.recipient}</p>
      <p style="margin-left: 20px">อัพเดตสถานะ : ${data.status}</p>
      <p style="margin-left: 20px">รายละเอียด : ${data.solve}</p>
      `,
    };

    transporter.sendMail(option, (err: string, info: { response: string }) => {
      if (err) {
        return {
          RespCode: 400,
          RespMessage: "bad",
          RespError: err,
        };
      } else {
        return {
          RespCode: 200,
          RespMessage: "good",
        };
      }
    });
  }

  async createTicket(ticket: ITicketCreateRequest) {
    try {
      const create: ITicketCreateRequest = await Ticket.create(ticket);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_NOTIFICATION,
          pass: process.env.PASS_NOTIFICATION,
        },
      });

      const time = new Date(create.createdAt).toLocaleString();
      const option = {
        from: process.env.EMAIL_NOTIFICATION,
        to: `${create.email}`,
        subject: `[ได้รับเรื่องแล้ว]`,
        html: `
      
      <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
      <h1 style="margin: 20px;">สวัสดีคุณ ${create.name} ขอบคุณที่แจ้งเรื่องเข้ามา</h1>
      <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${create.selectTopic}</p>
      <p style="margin-left: 20px">วันที่แจ้ง : ${time}</p>
      <p style="margin-left: 20px">รายละเอียด : ${create.detail}</p>
      `,
      };

      const status = transporter.sendMail(option);

      return status;
    } catch (err) {
      throw err;
    }
  }
}
