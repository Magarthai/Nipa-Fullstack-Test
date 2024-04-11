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
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/createTicket', createTicket);
router.get('/getTicket', authMiddleware,isAdmin, getTicket);
router.post('/getTicketByAdmin', authMiddleware,isAdmin, getTicketByAdmin);
router.post('/getFilterTicket', getFilterTicket);
router.put('/updateStatusTicket/:parameter', authMiddleware,isAdmin, updateStatusTicket);
router.put('/closeTicket/:parameter', authMiddleware,isAdmin, closeTicket);
router.post('/sendemail', sendMail);
router.post('/getTicketQuery', authMiddleware,isAdmin, getTicketQuery);

module.exports = router;
