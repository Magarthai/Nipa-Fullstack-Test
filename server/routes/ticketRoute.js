const express = require("express");
const multer = require('multer');
const {
    createTicket,
} = require("../controllers/Ticket.crlt");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/createTicket', upload.single('file'), createTicket);

module.exports = router;
