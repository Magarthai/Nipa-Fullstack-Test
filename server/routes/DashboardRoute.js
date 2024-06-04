const express = require("express");
const multer = require('multer');
const {
    getStatusCount,
    getMonthTicket,
    getSuccessErrorCount,
    getStatusAdminCount,
} = require("../controllers/Dashboard.ctrl");

const router = express.Router();

router.get('/getStatusCount',getStatusCount);
router.get('/getMonthTicket', getMonthTicket);
router.get('/getSuccessErrorCount', getSuccessErrorCount);
router.post('/getStatusAdminCount', getStatusAdminCount);
module.exports = router;
