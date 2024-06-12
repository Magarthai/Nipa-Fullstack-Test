"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTicketRepository = exports.TicketRepository = void 0;
const tslib_1 = require("tslib");
const ListTicketDataReturn_1 = require("../dto/ListTicketDataReturn");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer = require("nodemailer");
const db_1 = tslib_1.__importDefault(require("../../../db/db"));
const typedi_1 = require("typedi");
let TicketRepository = class TicketRepository {
    constructor() {
        this.database = (0, db_1.default)("ticket");
    }
    async listAllTicket() {
        const data = await this.database.clone();
        return data;
    }
    async getTicketByStatus(status) {
        try {
            const data = await this.database
                .clone()
                .where("status", status)
                .orderBy("updated_at", "desc");
            return data;
        }
        catch (err) {
            throw err;
        }
    }
    async updateStatusTicket(data) {
        try {
            const ticketData = await (0, db_1.default)("ticket")
                .update(data)
                .where("id", data.id);
            return ticketData;
        }
        catch (err) {
            throw err;
        }
    }
    async findTicketByID(id) {
        try {
            const ticketData = await this.database.clone().where("id", id).first();
            return ticketData;
        }
        catch (err) {
            throw err;
        }
    }
    async createTicket(ticket) {
        try {
            const create = await this.database
                .clone()
                .insert(ticket)
                .returning([ListTicketDataReturn_1.ListTicketDataReturn]);
            return create;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.TicketRepository = TicketRepository;
exports.TicketRepository = TicketRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], TicketRepository);
class MockTicketRepository {
    constructor() {
        this.defaultUserData = [
            {
                id: 1,
                name: "mock",
                email: "test1234",
                detail: "test",
                selectTopic: "testTopic",
                img: "http://",
                recipient: "test",
                recipient_name: "test",
                status: "pending",
                created_at: new Date("2024-06-07 09:12:28.764133+07"),
                updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            },
            {
                id: 2,
                name: "mock2",
                email: "test21234",
                detail: "test2",
                selectTopic: "testTopic2",
                img: "http://2",
                recipient: "test2",
                recipient_name: "test2",
                status: "success",
                created_at: new Date("2024-06-07 09:12:28.764133+07"),
                updated_at: new Date("2024-06-07 15:02:57.81708+07"),
            },
        ];
    }
    listAllTicket() {
        const Ticket = this.defaultUserData;
        return Promise.resolve(Ticket);
    }
    getTicketByStatus(status) {
        throw new Error("Method not implemented.");
    }
    updateStatusTicket(data) {
        throw new Error("Method not implemented.");
    }
    findTicketByID(id) {
        throw new Error("Method not implemented.");
    }
    createTicket(ticket) {
        throw new Error("Method not implemented.");
    }
}
exports.MockTicketRepository = MockTicketRepository;
//# sourceMappingURL=TicketRepository.js.map