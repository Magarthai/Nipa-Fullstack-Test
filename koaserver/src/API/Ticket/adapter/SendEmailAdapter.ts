import { Service } from "typedi";
import { ITicketSendEmailNotificationRequest } from "../dto/ITicketSendEmailNotificationRequest";
import { ITicketCreateRequest } from "../dto/ITicketCreateRequest";
import { ITicketUpdateRespone } from "../dto/ITicketUpdateRespone";
import { IFindTicketByIDRespone } from "../dto/IFindTicketByIDRespone";
const nodemailer = require("nodemailer");
@Service()
export class SendEmailDefination {
  async sendUpdateEmailNotification(data: ITicketSendEmailNotificationRequest) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NOTIFICATION,
        pass: process.env.PASS_NOTIFICATION,
      },
    });
    const option = {
      from: process.env.EMAIL_NOTIFICATION,
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

    transporter.sendMail(option, (err: string) => {
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

  async sendCreateTicketNotification(data: IFindTicketByIDRespone) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_NOTIFICATION,
        pass: process.env.PASS_NOTIFICATION,
      },
    });

    const time = new Date(data.created_at).toLocaleString();
    const option = {
      from: "kmutthealthcareunit@gmail.com",
      to: `${data.email}`,
      subject: `[ได้รับเรื่องแล้ว]`,
      html: `

      <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
      <h1 style="margin: 20px;">สวัสดีคุณ ${data.name} ขอบคุณที่แจ้งเรื่องเข้ามา</h1>
      <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${data.selectTopic}</p>
      <p style="margin-left: 20px">วันที่แจ้ง : ${time}</p>
      <p style="margin-left: 20px">รายละเอียด : ${data.detail}</p>
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
  }
}
