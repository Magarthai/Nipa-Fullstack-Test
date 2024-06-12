"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const TicketRepository_1 = require("../repository/TicketRepository");
const TicketStatus_1 = require("../enum/TicketStatus");
const nodemailer = require("nodemailer");
const db_1 = tslib_1.__importDefault(require("../../../db/db"));
const TicketNotFound_1 = require("@app/error/TicketNotFound");
const SendEmailAdapter_1 = require("../adapter/SendEmailAdapter");
const TicketUpdateStatus_1 = require("../enum/TicketUpdateStatus");
let TicketService = class TicketService {
    async useListAllTicket() {
        const data = await this.ticketRepositorys.listAllTicket();
        return data;
    }
    async createTicket(ticket) {
        const data = await this.ticketRepositorys.createTicket(ticket);
        const sendEmail = await this.sendEmailDefination.sendCreateTicketNotification(data);
        return { message: "success", data: data };
    }
    async listTicketByStatus(status) {
        const data = await this.ticketRepositorys.getTicketByStatus(status);
        return { message: "success", data: data };
    }
    async getTicketById(ticketId) {
        const result = await this.ticketRepositorys.findTicketByID(ticketId);
        if (!result) {
            throw new TicketNotFound_1.TicketNotFoundError();
        }
        return result;
    }
    async updateStatusTicket(ticketId, data) {
        const ticketData = await this.getTicketById(ticketId);
        if (ticketData.recipient != null || ticketData.recipient_name != null) {
            return { message: "Already accepted" };
        }
        console.log(data);
        await this.ticketRepositorys.updateStatusTicket(data);
        console.log("test");
        return {
            message: "Success",
        };
    }
    async closeTicketById(id, closingTicket) {
        const { data } = closingTicket;
        const TicketData = await this.ticketRepositorys.findTicketByID(id);
        if (!TicketData) {
            return { message: TicketUpdateStatus_1.TicketUpdateStatus.NOT_FOUND };
        }
        const update = {
            status: data.status,
            solve: data.solve,
        };
        if (TicketData.status != TicketStatus_1.TicketStatus.ACCEPTED) {
            return { message: TicketUpdateStatus_1.TicketUpdateStatus.ALREADY_CLOSE };
        }
        console.log("check");
        const updatedTicket = await (0, db_1.default)("ticket")
            .where({ id: data.id })
            .update(update);
        return {
            message: TicketUpdateStatus_1.TicketUpdateStatus.SUCCESS,
            ticket: updatedTicket,
        };
    }
    async useSendEmail(data) {
        const sendEmail = await this.sendEmailDefination.sendUpdateEmailNotification(data);
        return sendEmail;
    }
};
exports.TicketService = TicketService;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", TicketRepository_1.TicketRepository)
], TicketService.prototype, "ticketRepositorys", void 0);
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", SendEmailAdapter_1.SendEmailDefination)
], TicketService.prototype, "sendEmailDefination", void 0);
exports.TicketService = TicketService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], TicketService);
//# sourceMappingURL=TicketService.js.map