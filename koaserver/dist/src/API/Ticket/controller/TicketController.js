"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const TicketService_1 = require("../view/TicketService");
const typedi_1 = require("typedi");
const TicketNotFound_1 = require("@app/error/TicketNotFound");
const TicketUpdateStatus_1 = require("../enum/TicketUpdateStatus");
let TicketController = class TicketController {
    async listAllTicket() {
        const data = await this.ticketService.useListAllTicket();
        return {
            message: "Ticket fetch successfully",
            ticket: data,
        };
    }
    async createTicket(ticket) {
        const create = await this.ticketService.createTicket(ticket);
        if (!create.data) {
            throw new TicketNotFound_1.TicketNotFoundError("Ticket not found !");
        }
        return { message: "Ticket created successfully" };
    }
    async getTicketByStatus(status) {
        const fetchTicketByStatus = await this.ticketService.listTicketByStatus(status);
        return {
            message: "Ticket fetch successfully",
            ticket: fetchTicketByStatus.data,
        };
    }
    async updateStatus(ticket, id) {
        const update = {
            status: ticket.updateStatus,
            recipient: ticket.recipientId,
            recipient_name: ticket.recipient,
            id: id,
        };
        const updateStatus = await this.ticketService.updateStatusTicket(id, update);
        if (updateStatus.message == TicketUpdateStatus_1.TicketUpdateStatus.NOT_FOUND) {
            throw new TicketNotFound_1.TicketNotFoundError("Ticket not found !");
        }
        if (updateStatus.message == TicketUpdateStatus_1.TicketUpdateStatus.SUCCESS) {
            return {
                message: "Ticket updated successfully",
            };
        }
        return { message: "Already accepted" };
    }
    async close(ticket, id) {
        const update = {
            status: ticket.updateStatus,
            solve: ticket.solve,
            id: id,
        };
        const closeTicket = await this.ticketService.closeTicketById(id, {
            data: update,
        });
        if (closeTicket.message == TicketUpdateStatus_1.TicketUpdateStatus.NOT_FOUND) {
            throw new TicketNotFound_1.TicketNotFoundError("Ticket not found !");
        }
        if (closeTicket.message == TicketUpdateStatus_1.TicketUpdateStatus.SUCCESS) {
            return {
                message: "Ticket updated successfully",
                ticket: closeTicket.ticket,
            };
        }
        return { message: "Already closed" };
    }
    async sendMailNotification(ticket) {
        const sendemail = await this.ticketService.useSendEmail(ticket);
        return sendemail;
    }
};
exports.TicketController = TicketController;
tslib_1.__decorate([
    (0, typedi_1.Inject)(),
    tslib_1.__metadata("design:type", TicketService_1.TicketService)
], TicketController.prototype, "ticketService", void 0);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "listAllTicket", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/"),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "createTicket", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)("/status/:status"),
    tslib_1.__param(0, (0, routing_controllers_1.Param)("status")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "getTicketByStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "updateStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)("/close/:id"),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "close", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/sendemail"),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TicketController.prototype, "sendMailNotification", null);
exports.TicketController = TicketController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/tickets")
], TicketController);
//# sourceMappingURL=TicketController.js.map