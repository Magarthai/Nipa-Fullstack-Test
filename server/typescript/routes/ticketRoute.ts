import express from "express";

const multer = require('multer');
// const expressTicket = require("express");
const route = express.Router()

const {
    createTicket,
    getTicket,
    updateStatusTicket,
    closeTicket,
    sendMail,
    getTicketByAdmin,
    getTicketQuery,
} = require("../Api/ticket/allTicketApi");

route.post('/createTicket', createTicket);
route.get('/ticket', getTicket);
route.get('/tickets/byId/:id', getTicketByAdmin);
route.get('/tickets/byStatus/:status', getTicketQuery);
route.put('/tickets/byId/:id', updateStatusTicket);
route.put('/tickets/byId/:id/close', closeTicket);
route.post('/sendemail', sendMail);

module.exports = route;
