const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const firebaseConfig = require('../config/firebase');
const firebaseApp = initializeApp(firebaseConfig);
const nodemailer = require('nodemailer');
const db = getFirestore(firebaseApp);
const Ticket = require('../models/Ticket.model');
const createTicket = async (req, res) => {
    try {
        const body = {
            name: req.body.name,
            email: req.body.email,
            detail: req.body.detail,
            selectTopic: req.body.selectTopic,
            img: req.body.file, 
        };

        const createdTicket = await Ticket.create(body);
        
        res.json({ message: "Ticket created successfully", ticket: createdTicket });
        console.log("Ticket created successfully");
    } catch (err) {
        console.error("Error creating ticket:", err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

const getTicket = async (req, res) => {
    try {
        const fetchTicket = await Ticket.find().sort({ updatedAt: -1 });
        res.json({ message: "Ticket fetch successfully", ticket: fetchTicket });
        console.log("Ticket created successfully");
    } catch (err) {
        console.error("Error creating ticket:", err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

const getTicketQuery = async (req, res) => {
    try {
        const status = req.body.status
        const fetchTicket = await Ticket.find({status: status}).sort({ updatedAt: -1 });
        res.json({ message: "Ticket fetch successfully", ticket: fetchTicket });
        console.log("Ticket created successfully");
    } catch (err) {
        console.error("Error creating ticket:", err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

const getTicketByAdmin = async (req, res) => {
    try {
        console.log(req.body.id,"XD")
        const fetchTicket = await Ticket.find({recipient: req.body.id});
        res.json({ message: "Ticket fetch successfully", ticket: fetchTicket });
        console.log("Ticket created successfully");
    } catch (err) {
        console.error("Error creating ticket:", err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

const getFilterTicket = async (req, res) => {
    try {
        const status = req.body.status
        const filterTicket = await Ticket.find({
            status: status
        });
        res.json({ message: "Ticket fetch successfully", ticket: filterTicket });
        console.log("Ticket fetch successfully");
    } catch (err) {
        console.error("Error creating ticket:", err);
        res.status(500).json({ error: "Failed to create ticket" });
    }
};

const updateStatusTicket = async (req, res) => {
    try {
        const filter = { _id: req.params.parameter.slice(1) };
        console.log(filter);

        const update = {
            status: req.body.updateStatus,
            recipient: req.body.recipientId
        };

        const fetchTicket = await Ticket.findOne(filter); 

        if (!fetchTicket) {
            res.status(404).json({ error: "Ticket not found" });
            return;
        }

        if (fetchTicket.recipient === undefined || fetchTicket.recipient === null) { 
            const updatedTicket = await Ticket.updateOne(filter, update);
            res.json({ message: "Ticket updated successfully", ticket: updatedTicket });
            console.log("Ticket updated successfully");
        } else {
            res.json({ message: "Already accepted" });
            console.log("Ticket already accepted");
        }
    } catch (err) {
        console.error("Error updating ticket:", err);
        res.status(500).json({ error: "Failed to update ticket" });
    }
};


const closeTicket = async (req, res) => {
    try {
        const filter = { _id: req.params.parameter.slice(1) };
        console.log(filter);

        const update = {
            status: req.body.updateStatus,
            solve: req.body.solve
        };
        console.log(update);
        const fetchTicket = await Ticket.findOne(filter); 

        if (!fetchTicket) {
            res.status(404).json({ error: "Ticket not found" });
            return;
        }
        console.log(fetchTicket.status)
        if (fetchTicket.status === "accepted") { 
            const updatedTicket = await Ticket.updateOne(filter, update);
            res.json({ message: "Ticket updated successfully", ticket: updatedTicket });
            console.log("Ticket updated successfully");
        } else {
            console.log("Already closed")
            res.json({ message: "Already closed" });
            console.log("Ticket already accepted");
        }
    } catch (err) {
        console.error("Error updating ticket:", err);
        res.status(500).json({ error: "Failed to update ticket" });
    }
};

const sendMail = async (req, res) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nipafullstacktest@gmail.com',
        pass: 'csqj mgrh mqev sxmf'
    }
})
const option = {
    from: 'nipafullstacktest@gmail.com',
    to: `${req.body.email}`,
    subject: 'Test Nodemailer',
    html: `
    
        <img style="width: 300px;" src="https://cdn.discordapp.com/attachments/445928139021877259/1226566889216675890/Logo-EPc-2_-_Copy.png?ex=66253c6e&is=6612c76e&hm=f736d22ba75f77beb89bd98dcf300f9d185f781f0298d68ad4300eca996904bb&" alt="">
    <h1 style="margin: 20px;">สวัสดีคุณ ${req.body.name}</h1>
    <p style="margin-left: 20px">หัวข้อที่แจ้ง : ${req.body.topic}</p>
    <p style="margin-left: 20px">วันที่แจ้ง : ${req.body.time}</p>
    <p style="margin-left: 20px">ผู้ที่รับเรื่อง : ${req.body.recipient}</p>
    <p style="margin-left: 20px">อัพเดตสถานะ : ${req.body.status}</p>
    `
}

transporter.sendMail(option, (err, info) => {
    if(err) {
        console.log('err', err)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            RespError: err
        })
    }
    else {
        console.log('Send: ' + info.response)
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'good',
        })
    }
})
}

module.exports = {
    createTicket,
    getTicket,
    getFilterTicket,
    updateStatusTicket,
    closeTicket,
    sendMail,
    getTicketByAdmin,
    getTicketQuery
};
