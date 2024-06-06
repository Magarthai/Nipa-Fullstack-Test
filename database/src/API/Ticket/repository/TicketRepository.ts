import { ITicketCreateRequest } from "../controller/ITicketCreateRequest";
import { ITicketUpdateRequest } from "./ITicketUpdateRequest";
import { ITicketCloseRequest } from "./ITicketCloseRequest";
import { ITicketSendEmailNotificationRequest } from "./ITicketSendEmailNotificationRequest";
import { ListTicketDataReturn } from "./ListTicketDataReturn";
const nodemailer = require("nodemailer");
const db = require("../../../db/db");
export class TicketRepository {
  async getAllTicket() {
    try {
      const data = await db("ticket");
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getTicketByStatus(status: string) {
    try {
      const data = await db("ticket")
        .where("status", status)
        .orderBy("updated_at", "desc");

      // const data = await Ticket.find({ status: status }).sort({
      //   updatedAt: -1,
      // });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getTicketByRecipient(id: string) {
    try {
      const data = await db("ticket")
        .where("recipient", id)
        .orderBy("updated_at", "desc");
      // const data = await Ticket.find({ recipient: id }).sort({
      //   updatedAt: -1,
      // });
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateStatusTicket(data: ITicketUpdateRequest) {
    try {
      const updateData = {
        status: data.status,
        recipient: data.recipient,
        recipient_name: data.recipient,
      };
      const ticketData = await db("ticket").where("id", data.id).first();
      //const ticketData = await Ticket.findOne(filter);

      if (!ticketData) {
        return { message: "Not found" };
      } else {
        if (
          ticketData.recipient === undefined ||
          ticketData.recipient === null
        ) {
          const updatedTicket = await db("ticket")
            .return(ListTicketDataReturn)
            .where({ id: data.id })
            .update(updateData);
          // const updatedTicket = await Ticket.updateOne(filter, updateData);
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
      const update = {
        status: data.status,
        solve: data.solve,
      };
      const ticketData = await db("ticket").where("id", data.id).first();
      // const ticketData = await Ticket.findOne(filter);

      if (!ticketData) {
        return { message: "Not found" };
      } else {
        if (ticketData.status === "accepted") {
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
      console.log(ticket);
      const data = {
        name: ticket.name,
        email: ticket.email,
        detail: ticket.detail,
        selectTopic: ticket.selectTopic,
        img: ticket.file,
      };

      const create = await db("ticket").insert([data]);
      // .returning(["name", "id"]);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nipafullstacktest@gmail.com",
          pass: "csqj mgrh mqev sxmf",
        },
      });

      const time = new Date(create.createdAt).toLocaleString();
      const option = {
        from: "nipafullstacktest@gmail.com",
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
