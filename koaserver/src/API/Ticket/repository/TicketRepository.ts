import { ITicketCreateRequest } from "../dto/ITicketCreateRequest";
import { ITicketUpdateRequest } from "../dto/ITicketUpdateRequest";
import { ITicketCloseRequest } from "../dto/ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "../dto/ITicketSendEmailNotificationRequest";
import { ListTicketDataReturn } from "../dto/ListTicketDataReturn";
import dotenv from "dotenv";
dotenv.config();
const nodemailer = require("nodemailer");
import db from "../../../db/db";
import { Service } from "typedi";
import { TicketStatus } from "../enum/TicketStatus";
import { Knex } from "knex";
@Service()
export class TicketRepository {
  database: any;
  constructor() {
    this.database = db("ticket");
  }
  async listAllTicket() {
    const data = await this.database.clone();
    console.log(data);
    return data;
  }
  async getTicketByStatus(status: string) {
    try {
      const data = await this.database
        .clone()
        .where("status", status)
        .orderBy("updated_at", "desc");
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getTicketByRecipient(id: string) {
    try {
      const data = await this.database
        .clone()
        .where("recipient", id)
        .orderBy("updated_at", "desc");
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateStatusTicket(data: ITicketUpdateRequest) {
    try {
      console.log(data.id);
      const ticketData = await db("ticket").where("id", data.id).first();
      console.log("check");
      return ticketData;
    } catch (err) {
      throw err;
    }
  }

  async closeTicket(data: ITicketCloseRequest) {
    try {
      const ticketData = await this.database
        .clone()
        .where("id", data.id)
        .first();

      console.log(ticketData);
      return ticketData;
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
    return { RespCode: 200 };
  }

  async createTicket(ticket: ITicketCreateRequest) {
    try {
      console.log(ticket);
      const data = {
        name: ticket.name,
        email: ticket.email,
        detail: ticket.detail,
        selectTopic: ticket.selectTopic,
        img: ticket.file,
      };
      console.log(data);
      const create = await this.database
        .clone()
        .insert([data])
        .returning([ListTicketDataReturn]);
      console.log(create);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "kmutthealthcareunit@gmail.com",
          pass: "vqos ixxk pscf bqwm",
        },
      });

      const time = new Date(create.create_at).toLocaleString();
      const option = {
        from: "kmutthealthcareunit@gmail.com",
        to: `${ticket.email}`,
        subject: `[ได้รับเรื่องแล้ว]`,
        html: `

      <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
      <h1 style="margin: 20px;">สวัสดีคุณ ${ticket.name} ขอบคุณที่แจ้งเรื่องเข้ามา</h1>
      <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${ticket.selectTopic}</p>
      <p style="margin-left: 20px">วันที่แจ้ง : ${time}</p>
      <p style="margin-left: 20px">รายละเอียด : ${ticket.detail}</p>
      `,
      };

      transporter.sendMail(option, (err: string, info: any) => {
        if (err) {
          console.log("err", err);
          return {
            RespCode: 400,
            RespMessage: "bad",
            RespError: err,
          };
        } else {
          console.log("Send: " + info.response);
          return {
            RespCode: 200,
            RespMessage: "good",
          };
        }
      });

      return create;
    } catch (err) {
      throw err;
    }
  }
}
