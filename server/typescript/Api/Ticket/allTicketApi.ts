const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
import { Error } from "mongoose";
const firebaseConfig = require("../../../config/firebase");
const firebaseApp = initializeApp(firebaseConfig);
const nodemailer = require("nodemailer");
const db = getFirestore(firebaseApp);
const Ticket = require("../../../models/Ticket.model");

import express, { Express, Request, Response } from "express";
const createTicket = async (req: Request, res: Response) => {
  try {
    const body = {
      name: req.body.name,
      email: req.body.email,
      detail: req.body.detail,
      selectTopic: req.body.selectTopic,
      img: req.body.file,
    };

    const createdTicket = await Ticket.create(body);
    const email = req.body?.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nipafullstacktest@gmail.com",
        pass: "csqj mgrh mqev sxmf",
      },
    });
    const time = new Date(createdTicket.createdAt).toLocaleString();
    const option = {
      from: "nipafullstacktest@gmail.com",
      to: `${req.body.email}`,
      subject: `[ได้รับเรื่องแล้ว]`,
      html: `
        
        <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
        <h1 style="margin: 20px;">สวัสดีคุณ ${req.body.name} ขอบคุณที่แจ้งเรื่องเข้ามา</h1>
        <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${req.body.selectTopic}</p>
        <p style="margin-left: 20px">วันที่แจ้ง : ${time}</p>
        <p style="margin-left: 20px">รายละเอียด : ${req.body.detail}</p>
        `,
    };
    res.json({ message: "Ticket created successfully", ticket: createdTicket });
  } catch (err) {
    console.log("Create ticket: ", err);
  }
};

const getTicket = async (req: Request, res: Response) => {
  try {
    const fetchTicket = await Ticket.find().sort({ updatedAt: -1 });
    res.json({ message: "Ticket fetch successfully", ticket: fetchTicket });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

const getTicketQuery = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    const fetchTicket = await Ticket.find({ status: status }).sort({
      updatedAt: -1,
    });
    res.json({ message: "Ticket fetch successfully", ticket: fetchTicket });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

const getTicketByAdmin = async (req: Request, res: Response) => {
  try {
    const recipientId = req.params.id;
    const fetchTicket = await Ticket.find({ recipient: recipientId });
    res.json({ message: "Ticket fetch successfully", ticket: fetchTicket });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

const updateStatusTicket = async (req: Request, res: Response) => {
  try {
    const filter = { _id: req.params.id };

    const update = {
      status: req.body.updateStatus,
      recipient: req.body.recipientId,
      recipient_name: req.body.recipient,
    };

    const fetchTicket = await Ticket.findOne(filter);

    if (!fetchTicket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    if (fetchTicket.recipient === undefined || fetchTicket.recipient === null) {
      const updatedTicket = await Ticket.updateOne(filter, update);
      res.json({
        message: "Ticket updated successfully",
        ticket: updatedTicket,
      });
    } else {
      res.json({ message: "Already accepted" });
    }
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

const closeTicket = async (req: Request, res: Response) => {
  try {
    const filter = { _id: req.params.id };
    console.log(filter);
    const update = {
      status: req.body.updateStatus,
      solve: req.body.solve,
    };
    const fetchTicket = await Ticket.findOne(filter);

    if (!fetchTicket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    if (fetchTicket.status === "accepted") {
      const updatedTicket = await Ticket.updateOne(filter, update);
      res.json({
        message: "Ticket updated successfully",
        ticket: updatedTicket,
      });
    } else {
      res.json({ message: "Already closed" });
    }
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

const sendMail = async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nipafullstacktest@gmail.com",
      pass: "csqj mgrh mqev sxmf",
    },
  });
  const option = {
    from: "nipafullstacktest@gmail.com",
    to: `${req.body.email}`,
    subject: `[ปัญหาของคุณที่แจ้งเข้ามา ${req.body.status}]`,
    html: `
    
    <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
    <h1 style="margin: 20px;">สวัสดีคุณ ${req.body.name}</h1>
    <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${req.body.topic}</p>
    <p style="margin-left: 20px">วันที่แจ้ง : ${req.body.time}</p>
    <p style="margin-left: 20px">ผู้ที่รับเรื่อง : ${req.body.recipient}</p>
    <p style="margin-left: 20px">อัพเดตสถานะ : ${req.body.status}</p>
    <p style="margin-left: 20px">รายละเอียด : ${req.body.solve}</p>
    `,
  };

  transporter.sendMail(option, (err: string, info: { response: string }) => {
    if (err) {
      console.log("err", err);
      return res.status(200).json({
        RespCode: 400,
        RespMessage: "bad",
        RespError: err,
      });
    } else {
      console.log("Send: " + info.response);
      return res.status(200).json({
        RespCode: 200,
        RespMessage: "good",
      });
    }
  });
};

module.exports = {
  createTicket,
  getTicket,
  updateStatusTicket,
  closeTicket,
  sendMail,
  getTicketByAdmin,
  getTicketQuery,
};
