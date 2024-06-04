import express from "express";

const multer = require('multer');
const route = express.Router()

const {
    getStatusCount,
    getMonthTicket,
    getSuccessErrorCount,
    getStatusAdminCount,
} = require("../Api/Dashboard/allDashboardApi");


route.get('/dashboards/count',getStatusCount);
route.get('/dashboards', getMonthTicket);
route.get('/dashboards/counts', getSuccessErrorCount);
route.get('/dashboards/:id', getStatusAdminCount);

module.exports = route;
