const express = require("express");
const multer = require('multer');
const {
    createTicket,
    getTicket,
    getFilterTicket,
    updateStatusTicket,
    closeTicket,
    sendMail,
    getTicketByAdmin,
    getTicketQuery,
} = require("../controllers/Ticket.crlt");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/createTicket', createTicket);
router.get('/getTicket', getTicket);
router.post('/getTicketByAdmin', getTicketByAdmin);
router.post('/getFilterTicket', getFilterTicket);
router.put('/updateStatusTicket/:parameter', updateStatusTicket);
router.put('/closeTicket/:parameter', closeTicket);
router.post('/sendemail', sendMail);
router.post('/getTicketQuery', getTicketQuery);

module.exports = router;
